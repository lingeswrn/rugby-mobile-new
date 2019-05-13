// /* start of a decent middleware, but useless because
//  * SocketService runs outside dispatch..... duh.
//  */
// import _ from 'lodash';
// export const socketServiceMiddleware = (store) =>
//   (next) => (action = {}) => {
//     // const result = next(action);
//     const pattern = new RegExp('^@@API');
//     if (pattern.test(action.type)) {
//       // check connection status
//       const { connected } = store.getState().connection;
//       // handle offline stuff
//       if (_.has(action, ['meta', 'offline'])) {
//         const { offline } = action.meta;
//         if (!connected) return () => Promise.reject('disconnected');
//       }
//     }
//     return next(action);
//   };
