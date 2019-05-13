import * as sty from './FeedList.style';
import _ from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { List, ListItem, View, Icon } from 'native-base';
import { Text } from 'src/lib/components';

class _FeedList extends Component {
  selectFeed(id) {
    return this.props._RTS.setSelectedFeed(id)
    .then(() => this.props.history.push({ pathname: '/messages/conversation' }));
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

  renderItems() {
    console.log('rendering feeds: ', this.props.realtime.feeds.feeds);
    return _.map(
      this.props.realtime.feeds,
      ({ name, id, users, recipient }) => {
        const hasJoined = _.find(users, { id: this.props._RTS.user._id });
        return (
          <ListItem
            style={ sty.itemWrapper }
            key={ id }
            onPress={
              _.isEmpty(hasJoined)
                ? () =>
                  this.props._RTS.joinFeed(id).then(() => this.selectFeed(id))
                : () => this.selectFeed(id)
            }

          >
            <View>
              <Text h6>{name}</Text>
              <Text style={ sty.names }>
                {this.recipientText({ users, recipient })}
              </Text>
            </View>
            <View style={ sty.itemRightContainer }>
              <Icon name='chevron-right' style={ sty.itemIcon } />
            </View>
          </ListItem>
        );
      }
    );
  }

  render() {
    if (_.isEmpty(this.props.realtime.feeds)) {
      return (
        <View style={ sty.emptyContainer }>
          <Text>No messages</Text>
        </View>
      );
    }
    return <List>{this.renderItems()}</List>;
  }
}

export const FeedList = withRouter(_FeedList);
