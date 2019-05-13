import * as sty from './Invitations.style';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { View } from 'native-base';
import { InvitationCard } from 'src/account/sharedComponents';
import { Text } from 'src/lib/components/Text';
import { TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';

export class _Invitations extends Component {
  constructor(props) { super(props); }

  renderCards(items) {
    return _.map(items, (item, index) => (
      <InvitationCard key={ index }
        handleAccept={ () => this.props.acceptInvitation(item._id) }
        handleReject={ () => this.props.rejectInvitation(item._id) }
        item={ item }
        wrapperStyle={ sty.cardWrapper }
      />
    ));
  }

  render() {
    const { items, title, open, status, toggleOpen } = this.props;
    const empty = _.isEmpty(items);
    const active = (open && !empty);
    return (
      <View style={ sty.wrapper }>
        <TouchableOpacity style={ sty.titleWrapper(active) }
          activeOpacity={ 0.8 }
          disabled={ empty }
          onPress={ empty ? () => toggleOpen(status, open)  : null }
        >
          <Text h1 style={ sty.title(active) }>{ title }</Text>
          <Text>
            <Text h1 style={ sty.countParen(active) }>{ '( '}</Text>
            <Text h1 style={ sty.countNumber(active) }>
              { `${items.length}` }
            </Text>
            <Text h1 style={ sty.countParen(active) }>{ ' )'}</Text>
          </Text>
        </TouchableOpacity>
        <Collapsible collapsed={ !open }
          style={ sty.listWrapper(active) }
        >
          { this.renderCards(items) }
        </Collapsible>
      </View>
    );
  }
}

export const Invitations = withRouter(_Invitations);
