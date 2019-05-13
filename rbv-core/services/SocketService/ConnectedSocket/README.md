# ConnectedSocket
SocketService with helpers added to socket service to handle data requests when no network connectivity is available. As it turns out, there are bunch of simpler ways this could have been handled if we'd paid attention to it sooner, but all of those methods would require a more thorough re-write of the structure. This seems to be the the least intrusive method for making sure events are handled properly when no connection is present.



## Implementation 
There are two basic ways to use the connected socket service:
  - without offline handler (action is skipped in offline)
  - with offline handler (action returns some alternate piece of data)

Each method is described below
  
### Without Offline Handler

If `ConnectedSocket` is passed without a config object, the event will return a promise rejection where the error is simply `'disconnected'`. Make sure these rejections are handled, while still passing all other rejections.


> *NOTE:* in an event sequence, all subsequent events in the promise chain will be cancelled as well. This is usually the expected behavior, but may require more detailed handling.
well.
```es6
// someActionFile.js

import { ConnectedSocket } from 'rbv-core/services/SocketService';

export const someAction = (data) => (dispatch, getState) => {
  return ConnectedSocket(dispatch, getState).handleEvent('someEvent')
  .then((data) => { ...handle the data... })
  .catch((err) => {
    if (err === 'disconnected') return Promise.resolve();
    return Promise.reject(err);
  })
}

```

### With Offline Handler
The optional third argument passed to `ConnectedSocket` is an object detailing how the event should be handled in an offline scenario. It has several options (detailed below), but the basic implementation is as follows:

```es6
// someActionFile.js

import { ConnectedSocket } from 'rbv-core/services/SocketService';

export const actionWithConfig = (data) => (dispatch, getState) => {
  return ConnectedSocket(dispatch, getState, {
      offlinePayload: {
        dependsOn: ({ stateChunk }) => _.has(stateChunk, 'someProp'),
        fromState: ({ stateChunk }) => stateChunk.someProp
      }
    }).handleEvent('someEvent')
  .then((data) => { ...handle the data... })
  .catch((err) => {
    if (err === 'disconnected') return Promise.resolve();
    return Promise.reject(err);
  })
}

```

# Alternative
Here's a quick list of other possible solutions, and their drawbacks.

- react-native-offline's onboard handlers
  - re-evaluates "thunks" when connection is re-established, but doesn't return the original function, so everything that depends on a promise, which is to say, everytlhing, breaks.
- custom redux middleware
  - api calls are made before first "dispatch", and so are outside of redux's control. Dammit.
