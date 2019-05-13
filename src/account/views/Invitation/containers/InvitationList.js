import * as sty from './InvitationList.style.js';
import * as actions from '../../../actions';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { SceneContainer, Text } from 'src/lib/components';
import { View } from 'native-base';
import { Invitations } from '../components';

class _InvitationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [
        { status: 'created', title: 'awaiting response', open: true },
        { status: 'complete', title: 'responded', open: true }
      ]
    };
  }

  componentWillMount() {
    this.props.getInvitations();
  }

  toggleOpen = (status, open) => {
    const listIndex = _.findIndex(this.state.lists, { status });
    const lists = _.clone(this.state.lists);
    lists[listIndex].open = !open;
    this.setState({ lists });
  }

  renderList(list, key) {
    const { user: { organizations: { invitations }},
      handleInvitation } = this.props;
    const filtered = _.filter(invitations, { status: list.status });
    // if (_.isEmpty(filtered)) return null;*
    return (
      <Invitations key={ key }
        acceptInvitation={ (id) => handleInvitation(id, 'accepted') }
        items={ filtered }
        rejectInvitation={ (id) => handleInvitation(id, 'rejected') }
        toggleOpen={ (s, o) => this.toggleOpen(s, o) }
        { ...list }
      />
    );
  }

  render() {
    const { invitations } = this.props.user.organizations;
    // const invitations = [];
    return (
      <SceneContainer
        handleRefresh={ this.props.getInvitations }
        style={ sty.wrapper }
        title='Invitations'
        headerButtons={{
          left: { icon: 'angle-left', to: '/' }
        }}
      >
        { _.isEmpty(invitations) ? this.ZeroData :
          _.map(this.state.lists, (list, key) =>
            this.renderList(list, key)) }
      </SceneContainer>
    );
  }

  get ZeroData() {
    const { user } = this.props;
    return (
      <View style={ sty.zeroDataWrapper }>
        <Text h3>{ 'no invitations found for' }</Text>
        <Text h3>{ user.account.email }</Text>
      </View>
    );
  }
}

export const InvitationList = connect(({ user }) => {
  return { user };
}, actions)(_InvitationList);
