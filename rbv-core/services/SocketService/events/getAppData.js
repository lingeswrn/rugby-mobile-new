import { SocketService } from '../SocketService';
import { defaultLists, setSyncedDataKeys } from '../utils';


export const getAppData = (email, lists = defaultLists) => {
  return SocketService.handleEvent('get-data', email, lists)
  .then(setSyncedDataKeys);
};
