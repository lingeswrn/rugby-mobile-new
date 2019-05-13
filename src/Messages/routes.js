import _ from 'lodash';
import { Messages, ViewConversation } from './views';
import { connectRealtime } from './hoc';

const messageRoutes = [
  {
    component: connectRealtime(Messages),
    path: '/messages'
  },
  {
    component: ViewConversation,
    path: '/messages/conversation'
  }
];

export const MessageRoutes = _.concat(
  messageRoutes
);
