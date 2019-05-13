import * as sty from './AssessmentsList.style';
import _ from 'lodash';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { View } from 'native-base';
import { Text } from 'src/lib/components';
import { AssessmentCard } from './AssessmentCard';

export class AssessmentsList extends Component {
  constructor(props) {
    super(props);
    this.state = { active: true };
  }

  render() {
    const { assessments } = this.props;
    if (_.isEmpty(assessments)) return null;
    const { active } = this.state;
    return (
      <View>
        <TouchableOpacity
          style={ sty.titleWrapper(active) }
          activeOpacity={ 0.8 }
          onPress={ () => this.setState({ active: !active }) }
        >
          <Text h1 style={ sty.title(active) }>
            Assessments
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
        <Collapsible collapsed={ !this.state.active }>
          {_.map(assessments, (assessment) => (
            <AssessmentCard key={ assessment._id } assessment={ assessment } />
          ))}
        </Collapsible>
      </View>
    );
  }
}
