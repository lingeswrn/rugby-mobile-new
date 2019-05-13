import * as sty from './CardioActivity.style';
import _ from 'lodash';
import React, { Component } from 'react';
import KeepAwake from 'react-native-keep-awake';
import { View } from 'native-base';
import { SceneContainer } from 'src/lib/components';

import {
  CardioActivityTimer as Timer,
  CardioSummary,
  SegmentChart,
  SegmentTabs,
  SelectionOverlay
} from 'src/training/views/CardioActivity/components';

export class CardioActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialSelection: false,
      activeSegment: undefined,
      activeSegmentIndex: 0,
      totalSegments: undefined,
      showSummary: false
    };
  }

  handleEndWorkout() {
    const { totalSegments, activeSegment } = this.state;
    const { current, current: { model }} = this.props.activity;
    const activeSegmentNumber = activeSegment.segmentNumber;
    const isIncomplete = (activeSegmentNumber < totalSegments);
    const score = _.round(activeSegmentNumber / totalSegments, 2);

    let duration = current.cardioTotals.duration;
    if (isIncomplete) {
      duration = _.sumBy(
        _.slice(current.cardioSegments, activeSegmentNumber),
        'durationSeconds'
      );
    }
    this.setState({ showSummary: true });

    this.props.updateWorkout(this.props.workout._id, {
      cardioStatus: isIncomplete ? 'incomplete' : 'complete',
      cardioDuration: duration,
      cardioSegmentsComplete: this.state.activeSegment.segmentNumber,
      cardioProfile: model.cardioProfile
    });
    this.props.saveCardioActivity({
      ...model,
      time: duration,
      status: isIncomplete ? 'incomplete' : 'complete',
      score
    });
  }

  handleEndSegment() {
    const segments = this.props.activity.current.cardioSegments;
    const { activeSegment, activeSegmentIndex, totalSegments } = this.state;
    if (activeSegment.segmentNumber < totalSegments) {
      const nextSegmentIndex = activeSegmentIndex + 1;
      this.setState({
        activeSegment: segments[nextSegmentIndex],
        activeSegmentIndex: nextSegmentIndex
      });
    } else {
      this.handleEndWorkout();
    }
  }

  handleInitialSelection(model) {
    return this.props.handleCardioSelections(model, this.props.workout)
    .then(({ current }) => {
      const { cardioSegments } = current;
      // sets the first segment from returned data
      this.setState({
        initialSelection: true,
        activeSegment: cardioSegments[0],
        totalSegments: cardioSegments.length
      });
    });
  }

  renderSelectionOverlay() {
    const { model } = this.props.activity.current;
    return (
      <SelectionOverlay
        handleUpdate={
          (update) => this.props.modifyActivity(update, {}, 'cardio')
        }
        activity={ model }
        templates={ _.filter(this.props.templates, { activityType: 'cardio' }) }
        cardioTemplate={ this.props.template.cardioActivityTemplates[0] }
        onPressStart={
          () => this.handleInitialSelection(model)
        }
        profiles={ this.props.profiles }
      />
    );
  }

  render() {
    const {
      activity: {
        activityTemplate,
        current: { cardioSegments, cardioTotals }
      }
    } = this.props;
    const { initialSelection, showSummary } = this.state;
    if (showSummary) {
      return (
        <CardioSummary
          activity={ this.props.activity }
          workout={ this.props.workout }
        />
      );
    }
    if (initialSelection) {
      return (
        <View>
          <KeepAwake />
          <SceneContainer
            title={ 'Workout' }
            subtitle={ `Today's ${ activityTemplate.name }` }
            scrollEnabled={ (!initialSelection || showSummary) }
            hideSceneFooter
            containerStyle={ sty.containerSyle }
            headerButtons={{
              left: {
                text: 'Done',
                onPress: () => this.handleEndWorkout()
              },
              right: {
                icon: 'step-forward',
                onPress: () => this.handleEndSegment()
              }
            }}
          >
            <SegmentTabs
              { ...this.state }
              activity={ this.props.activity }
            />
            <SegmentChart
              segments={ cardioSegments }
              activeSegmentIndex={ this.state.activeSegmentIndex }
            />
          </SceneContainer>
          <Timer
            onEndSegment={ () => this.handleEndSegment() }
            initialWorkoutValue={ cardioTotals.duration }
            { ...this.state }
          />
        </View>
      );
    }
    return this.renderSelectionOverlay();
  }
}
