import * as sty from './InjuryList.style.js';
import * as actions from 'src/Injuries/actions';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button, SceneContainer, Text } from 'src/lib/components';
import { View } from 'native-base';
import { Injuries } from '../components';

class _InjuryList extends Component {
  constructor(props) {
    super(props);
    // this.organization = props.user.organizations.active;
    // this.orgStatus = this.organization.status;
    this.state = {
      lists: [
        { status: 'new', title: 'awaiting assessment', open: true },
        { status: 'assessed', title: 'current', open: true },
        { status: 'closed', title: 'recovered', open: false }
      ]
    };
  }

  toggleOpen = (status, open) => {
    const { lists } = this.state;
    const listIndex = _.findIndex(lists, { status });
    lists[listIndex].open = !open;
    this.setState({ lists });
  }

  renderList(list, key) {
    const { injuries: { all }, editInjury, removeInjury } = this.props;
    const filtered = _.filter(all, { status: list.status });
    // if (_.isEmpty(filtered)) return null;
    return (
      <Injuries key={ key }
        editInjury={ editInjury }
        items={ filtered }
        removeInjury={ removeInjury }
        toggleOpen={ this.toggleOpen }
        { ...list }
      />
    );
  }

  render() {
    const { all } = this.props.injuries;
    return (
      <SceneContainer
        handleRefresh={ this.props.getInjuries }
        style={ sty.wrapper }
        title='Injuries'
        headerButtons={{
          left: { icon: 'angle-left', to: '/' },
          right: _.isEmpty(all) ? undefined : {
            icon: 'plus',
            onPress: () => this.props.clearEditingInjury()
            .then(() => this.props.history.push('/injuries/create'))
          }
        }}
      >
        { _.isEmpty(all) ? this.ZeroData :
          _.map(this.state.lists, (list, key) => this.renderList(list, key)) }
      </SceneContainer>
    );
  }

  get ZeroData() {
    return (
      <View style={ sty.zeroDataWrapper }>
        <Text h3>{ 'no injuries found' }</Text>
        <Button label='report an injury'
          icon='plus'
          onPress={ () => this.props.clearEditingInjury()
          .then(() => this.props.history.push('/injuries/create'))
          }
          style={ sty.createButton }
        />
      </View>
    );
  }
}

export const InjuryList = connect(({ injuries, user }) => {
  return { injuries, user };
}, actions)(_InjuryList);
