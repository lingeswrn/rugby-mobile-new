import _ from 'lodash';
import moment from 'moment';
import { ConnectedSocket } from 'rbv-core/services/SocketService';
import types from 'src/actionTypes';

export class DailyLog {
  constructor(dispatch, getState) {
    this.dispatch = dispatch;
    this.getState = getState;
  }

  Socket(config) {
    return ConnectedSocket(this.dispatch, this.getState, config);
  }

  handleGetResp({ entries }) {
    const current = _.last(entries);
    this.dispatch({ type: types.GET_DAILY_LOGS, payload: { all: entries }});
    this.dispatch({ type: types.SET_CURRENT_DAILY_LOG, payload: current });
    return Promise.resolve(current);
  }

  updateAthleteProfileMass(massInKilograms) {
    if (!massInKilograms) return Promise.resolve();
    return this.dispatch(
      { type: 'MODIFY_ATHLETE_PROFILE', payload: { massInKilograms }}
    );
  }

  createEntry() {
    console.log('### creating new daily log entry ###');
    const { id } = this.getState().dailyLogs;
    const body = {
      date: moment(),
      dayOfYear: moment().dayOfYear(),
      year: moment().year()
    };
    return this.Socket({ queue: true })
    .subDocs('daily-logs.entries', id).create(body)
    .then((change) => this.handleGetResp(change))
    .catch((err) => {
      if (err === 'disconnected') {
        /* handle offline payload here; sub-doc handler returns entire doc */
        this.dispatch({ type: types.SET_CURRENT_DAILY_LOG, payload: body });
        return Promise.resolve(body);
      }
      return Promise.reject(err);
    });
  }

  getLogs() {
    const { dailyLogs, user } = this.getState();
    return this.Socket({
      offlinePayload: { payload: { entries: dailyLogs.all, _id: dailyLogs.id }}
    }).search('daily-logs', { query: { user: user.data._id }})
    .then(({ results }) => {
      const { entries, _id } = results[0] || {};
      this.dispatch({ type: types.GET_DAILY_LOGS, payload: {
        all: entries || [],
        current: _.last(entries) || {},
        id: _id
      }});
      return Promise.resolve(entries);
    });
  }

  getOrCreateCurrentEntry = () => {
    const { current } = this.getState().dailyLogs;
    if (_.isUndefined(current) || _.isEmpty(current)) {
      return this.createEntry();
    }
    const { dayOfYear: day, year } = current;
    const isSame = (moment().dayOfYear() === day) && (moment().year() === year);
    if (!isSame) {
      return this.createEntry();
    }
    return Promise.resolve(current);
  }

  async updateEntry(update) {
    const { id, current } = this.getState().dailyLogs;
    const { dayOfYear, year } = current;
    /* do lookup by DoY, year, because offline-creates don't have _id  */
    const change = await this.Socket({
      queue: true,
      offlinePayload: { payload: { ...current, ...update }}
    }).subDocs('daily-logs.entries', id)
    .update({ dayOfYear, year }, { ...update, status: 'complete' });
    await this.updateAthleteProfileMass(update.weight);
    return this.handleGetResp(change);
  }
}

export const DailyLogService = () => (...args) => new DailyLog(...args);
