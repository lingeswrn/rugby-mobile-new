import { AuthService } from 'src/lib/services';

export const checkPermissions = () => dispatch => {
  return AuthService.requestPermissions()
  .then(({ granted }) => {
    console.log(granted);
    return Promise.resolve();
  })
  .catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });
};
