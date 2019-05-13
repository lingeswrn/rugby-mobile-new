import * as sty from './ViewConversation.style';
import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectRealtimeService } from 'src/lib/services/realtime';
import { SceneContainer } from 'src/lib/components';
import { View } from 'native-base';
import { Text } from 'src/lib/components';

class _ViewConversation extends Component {
  constructor(props) {
    super(props);
    this._RTS = props.connectRealtimeService();
  }

  renderMessages({ id }) {
    const messages = this.props.realtime.messages[id];
    if (_.isEmpty(messages)) return null;
    return (
      <View style={ sty.list }>
        {_.map(messages, (message) => (
          <View style={ sty.listItem } key={ message.id }>
            <View style={ sty.nameContainer }>
              <Text style={ sty.name }>
                {_.upperCase(message.from.name.full)}
              </Text>
              <Text style={ sty.time }>
                {moment(message.createdAt).format('MMM D, YYYY | h:mm a')}
              </Text>
            </View>
            <View style={ sty.contentContainer }>
              <Text style={ sty.content }>{message.content}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  }

  renderRecipients() {
    const { recipients, users } = this.conversation;
    return (
      <View style={ sty.heading }>
        <Text h6 style={ sty.headingText }>
          {_.isEmpty(recipients)
            ? _.truncate(_.join(_.map(users, (user) => user.name.full), ', '), {
              length: 50
            })
            : recipients[0].name}
        </Text>
      </View>
    );
  }

  recipientText = ({ recipient, users }) => {
    if (recipient) return recipient.name;
    if (users) {
      const withoutMe = _.filter(users, ({ id }) => id !== this.props.user._id);
      if (_.isEmpty(withoutMe)) return null;
      return _.truncate(
        _.join(_.map(withoutMe, (item) => item.name.full), ', ')
      );
    }
    return '';
  };

  render() {
    const conversation = this._RTS.selectedFeed;
    return (
      <View>
        <SceneContainer
          headerButtons={{
            left: { icon: 'angle-left', to: '/messages' }
          }}
          title={ conversation.name }
          hideSceneFooter
        >
          <View style={ sty.heading }>
            <Text h6 style={ sty.headingText }>
              {this.recipientText(conversation)}
            </Text>
          </View>
          {this.renderMessages(conversation)}
        </SceneContainer>
      </View>
    );
  }
}

export const ViewConversation = connect(
  ({ realtime, user }) => ({
    realtime,
    user: user.data
  }),
  { connectRealtimeService }
)(_ViewConversation);
