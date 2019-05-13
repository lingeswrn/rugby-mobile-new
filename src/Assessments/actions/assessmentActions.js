import types from 'src/actionTypes';
import { SocketService } from 'rbv-core/services/SocketService/SocketService';

export const getAssessments = () => (dispatch, getState) => {
  const userId = getState().user.data._id;
  return SocketService.list('athlete-evaluations', { query:
    // gets 1) assessments of the user
    // AND gets 2) assessments of a)other users that are b)assinged to this
    // user that c)have not been completed yet
    {
      $or: [
        { $and: [
          { peerAssessor: userId },
          { assessment: null },
          { user: { $ne: null }}
        ]}, { $and: [
          { user: userId },
          { assessment: null }
        ]}
      ]
    }
  })
  .then(payload => {
    dispatch({ type: types.GET_ASSESSMENTS, payload });
    return Promise.resolve(payload);
  });
};

export const editAssessment = (id, body) => (dispatch) => {
  return SocketService.update('athlete-evaluations', id, body)
  .then((results) => {
    dispatch(getAssessments());
    return Promise.resolve(results);
  })
  .catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });
};
