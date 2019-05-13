import * as sty from './WorkoutSummary.style';
import * as actions from 'src/training/actions';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, View } from 'native-base';
import { withRouter } from 'react-router';
import { SceneContainer, Text, Button } from 'src/lib/components';
import {
  ActivitySummaryList
} from '../components';

class _WorkoutSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: ''
    };
  }

  updateWorkout(update) {
    const id = this.props.workout.current._id;
    return this.props.updateWorkout(id, update);
  }

  componentDidMount() {
    const { current, template } = this.props.workout;
    this.updateWorkout({
      ...current,
      workoutTemplate: template._id
    });
  }

  componentWillUnmount() {
    const { note } = this.props.workout.current;

    if (note && note !== this.state.note) {
      this.updateWorkout({ note: this.state.note });
    }
  }

  onPressDone() {
    return this.updateWorkout({ completedAt: moment(), status: 'complete' })
    .then(() => this.props.onCompleteWorkout())
    .then(() => this.props.history.push('/weekly-routine'));
  }

  render() {
    const { activities } = this.props;

    return (
      <View style={ sty.viewWrapper }>
        <SceneContainer
          hideSceneFooter
          title='Summary'
          containerStyle={ sty.containerStyle }
          scrollEnabled
        >
          <View style={ sty.titleWrapper }>
            <Text h1 style={ sty.title }>OVERVIEW</Text>
          </View>
          <ActivitySummaryList activities={ activities }/>
          <View style={ sty.titleWrapper }>
            <Text h1 style={ sty.title }>NOTES</Text>
          </View>
          <Input
            multiline
            numberOfLines={ 5 }
            onChangeText={ (note) => this.setState({ note }) }
            returnKeyType='done'
            placeholder='Add any additional inormation here...'
            style={ sty.notesText }
          />
        </SceneContainer>
        <View style={ sty.doneButton }>
          <Button
            onPress={ () => this.onPressDone() }
            label='save'
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { training, user } = state;
  return {
    ...training,
    activities: training.queue.processed,
    user
  };
}

export const WorkoutSummary = withRouter(connect(
  mapStateToProps,
  actions
)(_WorkoutSummary));
