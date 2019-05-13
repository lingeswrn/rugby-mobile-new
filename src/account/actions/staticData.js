import types from 'src/actionTypes';
import { ConnectedSocket } from 'rbv-core/services/SocketService/ConnectedSocket';


export const getStaticData = () => (dispatch, gS) =>
  ConnectedSocket(dispatch, gS).handleEvent('staticData')
  .then((data) => {
    dispatch({ type: types.GET_STATIC_DATA, payload: data });
    return Promise.resolve(data);
  })
  .catch((err) => {
    if (err === 'disconnected') return Promise.resolve();
    return Promise.reject(err);
  });
