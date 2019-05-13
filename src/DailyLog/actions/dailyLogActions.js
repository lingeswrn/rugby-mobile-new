/* MOVED TO DAILY LOG SERVICE */

// import types from 'src/actionTypes';
// import _ from 'lodash';
// import { DailyLogService } from 'rbv-core/services/Rugbyvault/DailyLogService';
//
// export function getDailyLogs() {
//   return (dispatch, getState) => {
//     return DailyLogService.getOrCreate(getState().user.data._id)
//     .then((doc) => {
//       dispatch({
//         type: types.GET_DAILY_LOGS,
//         payload: {
//           all: doc.entries,
//           current: _.last(doc.entries),
//           id: doc._id
//         }
//       });
//       return Promise.resolve(_.last(doc.entries));
//     });
//   };
// }
//
// export function getCurrentDailyLogEntry() {
//   return (dispatch, getState) => {
//     return DailyLogService.getOrCreateCurrentEntry(
//       getState().user.data._id,
//       getState().dailyLogs.current
//     )
//     .then(({ data }) => {
//       dispatch({
//         type: types.SET_CURRENT_DAILY_LOG,
//         payload: data
//       });
//       return Promise.resolve(data);
//     });
//   };
// }
//
// export function updateDailyLog(formData) {
//   return (dispatch, getState) => {
//     const { current } = getState().dailyLogs;
//     const user = getState().user.data._id;
//     return DailyLogService.updateEntry(user, current._id, {
//       ...formData,
//       _id: current._id
//     })
//     .then(({ data }) => {
//       console.log({ data });
//       dispatch({
//         type: types.SET_CURRENT_DAILY_LOG, payload: data.entry
//       });
//       dispatch({
//         type: 'UPDATE_USER_DATA/EXTERNAL',
//         payload: data.profile,
//         meta: { list: 'athlete-profile' }
//       });
//       return Promise.resolve(data);
//     });
//   };
// }
