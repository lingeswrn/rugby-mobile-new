import * as sty from './PeerAssessmentsList.style';
import _ from 'lodash';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { View } from 'native-base';
import { Text } from 'src/lib/components';
import { PeerAssessmentCard } from './PeerAssessmentCard';

export class PeerAssessmentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      activeId: undefined
    };
  }

  setactiveId = (activeId) => {
    return _.isEmpty(this.state.activeId)
      ? this.setState({ activeId })
      : this.setState({ activeId: undefined });
  };

  render() {
    const { assessments } = this.props;
    if (_.isEmpty(assessments)) return null;
    const { active, activeId } = this.state;
    return (
      <View>
        <TouchableOpacity
          style={ sty.titleWrapper(active) }
          activeOpacity={ 0.8 }
          onPress={ () => this.setState({ active: !active }) }
        >
          <Text h1 style={ sty.title(active) }>
            Peer Assessments
          </Text>
          <Text>
            <Text h1 style={ sty.countParen(active) }>
              {'( '}
            </Text>
            <Text h1 style={ sty.countNumber(active) }>
              {`${assessments.length}`}
            </Text>
            <Text h1 style={ sty.countParen(active) }>
              {' )'}
            </Text>
          </Text>
        </TouchableOpacity>
        <Collapsible collapsed={ !active }>
          {_.map(assessments, (assessment) => (
            <PeerAssessmentCard
              setactiveId={ this.setactiveId }
              activeId={ activeId }
              key={ assessment._id }
              assessment={ assessment }
            />
          ))}
        </Collapsible>
      </View>
    );
  }
}
