import * as sty from './MatchList.style.js';
import * as actions from '../../../actions';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button, SceneContainer, Text } from 'src/lib/components';
import { View } from 'native-base';
import { ListComponent } from '../components';

class _MatchList extends Component {
  constructor(props) {
    super(props);
    this.squad = props.user.data.squad;
    this.orgStatus = props.user.organizations.active.status;
  }

  componentDidMount() {
    this.props.getMatches();
  }

  renderZeroDataContent() {
    return (
      <View style={ sty.zeroDataWrapper }>
        <Text h3>{'no fixtures found'}</Text>
        <Button
          bordered
          large={ false }
          primary
          label='add a fixture to your schedule'
          icon='plus'
          onPress={ () => this.props.setEditingMatch()
          .then(() => this.props.history.push('/matches/create'))
          }
          style={ sty.createButton }
        />
      </View>
    );
  }

  renderLists(items, type) {
    if (_.isEmpty(items)) return null;
    if (type === 'organization' && this.orgStatus !== 'active') return null;
    const title =
      type === 'user' ? 'My Fixtures' : `${this.squad.name} Fixtures`;
    return (
      <ListComponent
        editMatch={ (payload) => this.props.setEditingMatch(payload)
        .then(() => this.props.history.push('/matches/create'))
        }
        items={ items }
        removeMatch={ this.props.removeMatch }
        title={ title }
        type={ type }
      />
    );
  }

  render() {
    const { all } = this.props.matches;
    return (
      <SceneContainer
        handleRefresh={ this.props.getMatches }
        style={ sty.wrapper }
        title='Fixtures'
        headerButtons={{
          left: { icon: 'plus', onPress: () => this.props.setEditingMatch()
          .then(() => this.props.history.push('/matches/create'))  }
        }}
      >
        {_.isEmpty(all) ? (
          this.renderZeroDataContent()
        ) : (
          <View>
            <View>
              {this.renderLists(
                _.filter(all, { type: 'organization' }),
                'organization'
              )}
            </View>
            <View>
              {this.renderLists(_.filter(all, { type: 'user' }), 'user')}
            </View>
          </View>
        )}
      </SceneContainer>
    );
  }
}

export const MatchList = connect(
  ({ matches, user }) => {
    return { matches, user };
  },
  actions
)(_MatchList);
