import _ from 'lodash';
import * as sty from './AssessmentsListContainer.style';
import React, { Component } from 'react';
import { View } from 'native-base';
import { SceneContainer, Text } from 'src/lib/components';
import { AssessmentsList, PeerAssessmentsList } from 'src/Assessments/views/components';

export class AssessmentsListContainer extends Component {
  render() {
    const all = _.reverse(_.sortBy(this.props.assessments.all, ['createdAt']));

    const userAssessments = [];
    const peerAssessments = [];

    _.map(all, (assessment) => {
      return assessment.peerAssessor
        ? assessment.peerAssessor._id === this.props.user.data._id
          ? peerAssessments.push(assessment)
          : userAssessments.push(assessment)
        : userAssessments.push(assessment);
    });

    return (
      <View>
        <SceneContainer
          handleRefresh={ this.props.getAssessments }
          style={ sty.container }
          title='Assessments'
          headerButtons={{
            left: { icon: 'angle-left', to: '/' }
          }}
        >
          {
            _.isEmpty(all) ? (
              <View style={ sty.zeroDataWrapper }>
                <Text h3>No assessments found</Text>
              </View>
            ) : (
              <View>
                <PeerAssessmentsList assessments={ peerAssessments } />
                <AssessmentsList assessments={ userAssessments } />
              </View>
            )
          }
        </SceneContainer>
      </View>
    );
  }
}
