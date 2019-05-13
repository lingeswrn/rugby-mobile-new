import moment from 'moment';
import { SocketService } from '../SocketService';

export class FitnessTest {
  constructor() {}

  createAndSave(body) {
    const fitnessTest = {
      type: 'beep',
      completedAt: moment(),
      status: 'complete',
      ...body
    };
    return SocketService.create('fitness-tests', fitnessTest)
    .then(res => Promise.resolve(res));
  }

  getPastBeepTests(_id) {
    return SocketService.search('fitness-tests', {
      query: { user: _id, type: 'beep' }
    }).then(({ results }) => Promise.resolve(results));
  }

  getBeepTest(_id) {
    return SocketService.findById('fitness-tests', _id, {})
    .then(payload => Promise.resolve(payload));
  }
}

export const FitnessTestService = new FitnessTest();
