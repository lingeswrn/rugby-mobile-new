import * as sty from './StrengthTestShow.style';

import React, { Component } from 'react';
import { View } from 'native-base';
import { Bar } from 'react-native-progress';
import _ from 'lodash';
import {
  Loader, SceneContainer, ActivityRestTimer as Timer
} from 'src/lib/components';
import { colors } from 'rbv-core/colors';
import { NavPanel, MiniList } from '../components';
import {
  ActivityImage, ActivityPicker, ValueSelectors
} from 'src/training/sharedComponents';

export class StrengthTestShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      displayTimer: false,
      muscleGroup: _.find(props.muscleGroups, {
        _id: props.strengthTest.currentActivity.muscleGroup
      })
    };
    this.totalActivities = props.strengthTest.enqueuedActivities.length;
  }

  componentDidMount() {
    const { strengthTest: { completedActivities }} = this.props;
    if (completedActivities.length === this.totalActivities) {
      return this.props.history.replace('/strength-test/summary');
    }
    return Promise.resolve();
  }

  runTimer = () => {
    const { enqueuedActivities, completedActivities } = this.props.strengthTest;
    if (completedActivities.length + 1 < enqueuedActivities.length) {
      this.setState({ displayTimer: true });
    } return this.completeActivity();
  }

  navigateStrengthTestActivity(forward) {
    const activityList =
      _.concat([], this.props.strengthTest.enqueuedActivities);
    forward ?
      activityList.push(activityList.shift()) :
      activityList.unshift(activityList.pop());
    return this.props.navigateStrengthTestActivity(activityList)
    .then(() => {
      const { completedActivities } = this.props.strengthTest;
      const template =
        _.find(completedActivities,
          { muscleGroup: activityList[0].model.muscleGroup });
      const activityTemplate = _.isUndefined(template) ?
        activityList[0].activityTemplates[0]._id :
        template.activityTemplate;
      const muscleGroup = _.isUndefined(template) ?
        activityList[0].model.muscleGroup :
        template.muscleGroup;
      this.props.modifyCurrentActivityModel({ activityTemplate, muscleGroup })
      .then(() => Promise.resolve());
    });
  }

  updateModel(update) { this.props.modifyCurrentActivityModel(update); }

  renderTimer() {
    if (this.state.displayTimer) {
      return (
        <Timer onCancel={ () => this.setState({ displayTimer: false }) } />
      );
    } return null;
  }

  processActivity() {
    return this.props.processStrengthTestActivity({
      ...this.props.strengthTest.currentActivity,
      status: 'complete'
    })
    .then((nextIndex) => {
      // check for incompletes
      if (nextIndex >= this.totalActivities) {
        // no incompletes loop through list push to server
        // processStrengthTestActivity(completedActivities)
        return this.props.history.push('/strength-test/summary');
      } return Promise.resolve();
    });
  }

  // or update
  completeActivity() {
    const {
      strengthTest: {
        completedActivities,
        currentActivity,
        enqueuedActivities
      }
    } = this.props;
    this.props.completeActivity({ ...currentActivity, status: 'complete' }, completedActivities)
    .then((activities) => {
      if (enqueuedActivities.length > activities.length) {
        return this.navigateStrengthTestActivity(true);
      }
      return this.props.history.push('/strength-test/summary');
    });
  }

  render() {
    const { muscleGroup } = this.state;
    const {
      athleteProfile,
      strengthTest: {
        completedActivities,
        currentActivity,
        enqueuedActivities
      },
      muscleGroups,
      units
    } = this.props;
    if (completedActivities.length + 1 <= this.totalActivities) {
      return (
        <View>
          <SceneContainer title={ 'Strength Test' }
            subtitle={ muscleGroup.name }
            hideSceneFooter
            containerStyle={ sty.sceneContainerStyle }
            scrollEnabled={ false }
          >
            <Bar
              progress={
                (completedActivities.length + 1) / this.totalActivities
              }
              color={ colors.brand.primary }
              borderRadius={ 0 }
              width={ 375 } // TODO: adjust for other screen sizes
              borderWidth={ 0 }
              height={ 5 }
            />
            <ActivityImage gender={ athleteProfile.trainingPlanGender }
              template={{ activity: _.find(
                enqueuedActivities[0].activityTemplates, {
                  _id: currentActivity.activityTemplate
                })
              }}
            />
            <ActivityPicker
              selected={
                currentActivity.activityTemplate
              }
              items={ enqueuedActivities[0].activityTemplates }
              index={ 0 }
              onValueChange={
                (val) => this.updateModel({ activityTemplate: val })
              }
            />
            <MiniList all={ enqueuedActivities }
              complete={ completedActivities }
              muscleGroups={ muscleGroups }
              currentIndex={ 0 }
              currentActivity={ currentActivity }
              units={ units }
            />
          </SceneContainer>
          <View style={ sty.activityControlsWrapper }>
            <ValueSelectors { ...currentActivity }
              units={ units }
              onChange={ this.props.modifyCurrentActivityModel }
              displayWeight
              maxReps={ 11 }
            />
            <NavPanel
              onSetComplete={ () => this.runTimer() }
              onNavigate={ (v) => this.navigateStrengthTestActivity(v) }
            />
          </View>
          { this.renderTimer() }
        </View>
      );
    }
    return <Loader title='Processing Activity' />;
  }
}
