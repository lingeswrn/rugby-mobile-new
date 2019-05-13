import * as sty from './ActivityShow.style';

import React, { Component } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { View } from 'native-base';
import { Bar } from 'react-native-progress';
import { SceneContainer, ActivityRestTimer as Timer } from 'src/lib/components';

import { colors } from 'rbv-core/colors';
import _ from 'lodash';
import { NavPanel, SetList } from '../components';
import {
  ActivityImage, ActivityPicker, ValueSelectors
} from '../../../sharedComponents';

export class ActivityShow extends Component {
  constructor(props) {
    super(props);
    this.totalActivities = props.queue.all.length;
    this.state = { displayTimer: false };
  }

  getActivityTemplateOptions() {
    const { staticData: { activityTemplates }} = this.props;
    return _.filter(activityTemplates,
      { activityType: 'weights' });
  }

  next(unit, isSkipping = true, jumpTo) {
    const { activity } = this.props;
    const {
      current,
      current: { model, target, activityIndex, activityNumber },
      currentSet,
      currentSet: { setIndex, setNumber }
    } = activity;
    const isLastSet = setNumber === target.sets;
    const isLastActivity = activityNumber === this.totalActivities;
    // passing undefined to process() triggers a push to workout summary
    const nextActivityIndex = isLastActivity ? undefined : activityNumber;
    const nextSetIndex = jumpTo || setIndex + 1;

    // show rest timer unless user is skipping or if the workout is over
    if (!isSkipping) {
      if (!(isLastActivity && isLastSet)) this.runTimer();
      this.props.modifyActivity(model, currentSet);
    }

    // if it's the last set, or if it's the last activity and unit is activity,
    // process, and pass nextIndex or undefined
    if (isLastSet || (isLastActivity && unit === 'activity')) {
      return this.props.process(current, nextActivityIndex);
    // if it's not the last set, go to next
    } else if (unit === 'activity') {
      return this.props.setActivityIndex(activityIndex + 1);
    }
    return this.props.setCurrentSet(current, nextSetIndex);
  }

  prev(unit) {
    const { activity, queue: { all }} = this.props;
    const {
      current,
      current: { activityIndex },
      currentSet: { setIndex }
    } = activity;
    const isFirstSet = setIndex === 0;
    const prevSetIndex = setIndex ? setIndex - 1 : 0;
    const prevActivityIndex = activityIndex ? activityIndex - 1 : 0;


    if (unit === 'activity') {
      return this.props.setActivityIndex(prevActivityIndex);
    } else if (isFirstSet) {
      const prevActivity = all[prevActivityIndex];
      const prevTargetSets = prevActivity.target.sets;

      return this.props.setActivityIndex(prevActivityIndex)
      .then(() => this.props.setCurrentSet(current, prevTargetSets - 1));
    }
    return this.props.setCurrentSet(current, prevSetIndex);
  }

  runTimer = () => this.setState({ displayTimer: true });
  endTimer = () => this.setState({ displayTimer: false });

  renderTimer() {
    if (this.state.displayTimer) return <Timer onCancel={ this.endTimer } />;
    return null;
  }

  render() {
    if (_.isEmpty(this.props.activity.current)) return <View />;
    const {
      activity: {
        current, current: { template = {}, activityNumber }, currentSet
      },
      swapActivity,
      profile = {},
      units
    } = this.props;
    return (
      <View style={ sty.sceneWrapper }>
        <SceneContainer
          title={ 'Workout' }
          scrollEnabled={ false }
          subtitle={ `Activity ${activityNumber} of ${this.totalActivities}` }
          hideSceneFooter
          containerStyle={ sty.containerSyle }
          headerButtons={{
            left: { icon: 'angle-left', onPress: this.props.history.goBack },
            right: { text: 'complete', to: '/workouts/summary' }
          }}
        >
          {/* BAR height = 5 */}
          <Bar
            progress={ activityNumber / this.totalActivities }
            color={ colors.brand.primary }
            borderRadius={ 0 }
            width={ Dimensions.get('window').width }
            borderWidth={ 0 }
            height={ 5 }
          />
          {/* RESPONSIVE HEIGHT !!!!!!!!!!!!!!!!!! */}
          <ActivityImage
            template={ template }
            gender={ profile.trainingPlanGender }
          />
          {/* PICKER height 50 */}
          <ActivityPicker
            selected={ template.activity._id }
            index={ activityNumber - 1 }
            items={ this.getActivityTemplateOptions() }
            onValueChange={ swapActivity }
          />
          {/* SET LIST height 150 */}
          <ScrollView contentContainerStyle={ sty.setListWrapper }>
            <SetList { ...current }
              units={ units }
              currentSet={ currentSet }
              onSelectItem={ (jumpTo) => this.next('set', true, jumpTo) }
            />
          </ScrollView>
        </SceneContainer>
        <View style={ sty.activityControlsWrapper }>
          {/* VALUE SELECTORS height 150 */}
          <ValueSelectors { ...currentSet }
            units={ units }
            onChange={ this.props.updateCurrentSet }
            displayWeight={ _.isMatch(template.activity, { trainingType: 'lifting' }) }
          />
          {/* NAV PANEL height 50 */}
          <NavPanel
            onNextActivity={ () => this.next('activity', true) }
            onNextSet={ () => this.next('set', true) }
            onPrevActivity={ () => this.prev('activity') }
            onPrevSet={ () => this.prev('set') }
            onSetComplete={ () => this.next('set', false) }
          />
        </View>
        { this.renderTimer() }
      </View>
    );
  }
}
