import * as sty from './AssessmentCard.style';
import React, { Component } from 'react';
import moment from 'moment';
import { View } from 'native-base';
import { Text } from 'src/lib/components';

export class AssessmentCard extends Component {
  getTitle = () => {
    const { assessment } = this.props;
    if (assessment.peerAssessor) return 'Peer Assessment';
    if (assessment.evaluation) return 'Game Evaluation';
    if (assessment.expectations) return 'Game Expectations';
    return 'Assessment';
  };

  render() {
    const title = this.getTitle();
    const {
      evaluation,
      expectations,
      performance,
      assessment,
      createdBy,
      createdAt,
      peerAssessor
    } = this.props.assessment;
    return (
      <View style={ sty.container }>
        <Text h5>{title}</Text>
        <Text style={ sty.createdBy }>
          {peerAssessor
            ? `Assigned by ${createdBy.name.first} ${
              createdBy.name.last
            } on ${moment(createdAt).format('MMM D, YYYY')}`
            : `Created by ${createdBy.name.first} ${
              createdBy.name.last
            } on ${moment(createdAt).format('MMM D, YYYY')}`}
        </Text>
        <View style={ sty.content }>
          {evaluation ? (
            <View>
              <Text style={ sty.label }>Evaluation</Text>
              <Text>{evaluation}</Text>
            </View>
          ) : null}
          {expectations ? (
            <View>
              <Text style={ sty.label }>Game expectations</Text>
              <Text>{expectations}</Text>
            </View>
          ) : null}
          {peerAssessor ? (
            <View>
              <Text style={ sty.label }>Assessed by</Text>
              <Text>{
                `${peerAssessor.name.first} ${peerAssessor.name.last}`
              }</Text>
            </View>
          ) : null
          }
          {assessment ? (
            <View>
              <Text style={ sty.label }>Assessment</Text>
              <Text>{assessment}</Text>
            </View>
          ) : (
            peerAssessor ? (
              <View>
                <Text style={ sty.label }>Assessment</Text>
                <Text>Pending</Text>
              </View>
            ) : null
          )}
          {performance ? (
            <View>
              <Text style={ sty.label }>Performance</Text>
              <Text>{`${performance} / 10`}</Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}
