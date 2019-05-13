import firebase from 'react-native-firebase';
/**
 *
 * wrapper for basic user actions, per Firebase web documentation. For full
 * requirements on functionality please refer to Firebase auth docs at:
 *
 * https://firebase.google.com/docs/auth/web/manage-users
 *
 * NOTE: In general, functions return a promise with a standard callback
 * signature – ((data|null) => {}, (err) => {}) – which should be handled in
 * context.
 */

class _AuthService  {
  constructor() {
    this.Auth = firebase.auth();
    this.Messaging = firebase.messaging();
    this.Instance = firebase.iid;
  }

  get user() { return this.Auth.currentUser; }

  getToken() {
    return this.getUserAsync()
    .then((user) => {
      if (user) {
        return user.getIdToken().then((token) => Promise.resolve(token));
      } return Promise.resolve(user);
    });
  }

  async getUserAsync() {
    return new Promise((resolve, reject) => {
      if (this.user) resolve(this.user);
      else reject({ message: 'no user found' });
    });
  }

  authenticateUser(credentials) {
    const { username, password } = credentials;
    return this.Auth.signInWithEmailAndPassword(username, password)
    .catch(err => {
      console.log('Sign in failed', err);
      return Promise.reject(err);
    });
  }

  createNewAccount(email, password) {
    return this.Auth.createUserWithEmailAndPassword(email, password)
    .then(() => this.getUserAsync())
    .catch(err => {
      // If the firebase user exists, just sign them in
      if (err.code === 'auth/email-already-in-use') {
        return this.authenticateUser({ username: email, password });
      }
      return Promise.reject(err);
    });
  }

  deleteUser() {
    return this.user.delete();
  }

  reauthenticateUser(credentials) {
    return this.user.reauthenticate(credentials);
  }

  sendPasswordResetEmail(emailAddress) {
    try {
      return this.Auth.sendPasswordResetEmail(emailAddress);
    } catch ({ code, message }) {
      console.log(`Password reset failed with
      code ${code} because ${message}`);
    }
    return null;
  }

  sendVerificationEmail() {
    return this.user.sendEmailVerification();
  }

  updatePassword(newPassword) {
    return this.user.updatePassword(newPassword);
  }

  signOut() {
    return this.Auth.signOut()
    .catch(({ code, message }) => console.log(`account creation failed with
        code ${code} because ${message}`));
  }

  updateProfile(update) {
    return this.getUserAsync()
    .then((user) => {
      return user.updateProfile(update);
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
  }

  // NOTIFICATIONS _____________________________________________________________
  requestPermissions() { return this.Messaging.requestPermissions(); }
  getInstance() { return this.Messaging.getToken(); }
  getBadgeNumber() { return this.Messaging.getBadgeNumber(); }
  setBadgeNumber(num) { return this.Messaging.setBadgeNumber(num); }
}

export const AuthService = new _AuthService();
