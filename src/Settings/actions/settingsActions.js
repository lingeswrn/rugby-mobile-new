import { SocketService } from 'rbv-core/services/SocketService';

// pulls list id from state
function getListId(list, userData) {
  switch(list) {
    case 'user':
      return Promise.resolve(userData._id);
    case 'athlete-profile':
      return Promise.resolve(userData.athleteProfile._id);
    case 'user-app-config':
      return Promise.resolve(userData.appConfig._id);
    default:
      return Promise.reject({ message: 'no valid list id found' });
  }
}

export function updateUserData(list, update) {
  return (dispatch, getState) => {
    const user = getState().user.data;

    return getListId(list, user)
    .then((id) => SocketService.update(`${list}s`, id, update))
    .then(() => {
      dispatch({
        type: 'UPDATE_USER_DATA/EXTERNAL',
        meta: {
          from: 'settings',
          list
        },
        payload: update
      });
      return Promise.resolve();
    });
  };
}
