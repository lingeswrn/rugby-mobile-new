import { NetInfo, Platform } from 'react-native';

export const checkInitialConnection = () => {
  if (Platform.OS === 'ios') {
    return new Promise((resolve) => {
      const handleFirstChange = (status) => {
        NetInfo.isConnected.removeEventListener(
          'connectionChange', handleFirstChange
        );
        resolve(status);
      };
      NetInfo.isConnected.addEventListener('connectionChange', handleFirstChange);
    });
  }
  return NetInfo.isConnected;
};
