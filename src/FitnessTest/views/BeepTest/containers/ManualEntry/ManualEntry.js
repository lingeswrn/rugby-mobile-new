import * as sty from './ManualEntry.style';
import * as actions from 'src/FitnessTest/actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { withRouter } from 'react-router';
import { View } from 'react-native';
import { Icon, Button } from 'native-base';
import {
  Button as LibButton,
  DatetimePicker,
  NumberPicker,
  validators,
  SpinnerOverlay
} from 'src/lib/components';

class _ManualEntry extends Component {
  onSubmit = (formData) => {
    return this.props.saveBeepTest(formData)
    .then(() => this.props.history.push('/beep-test/completed'));
  };

  getMaxShuttles = (level) => {
    const speed =
      level === 1 ? (8 * 5) / 18 : ((8.5 + 0.5 * (level - 1)) * 5) / 18;
    // distance run over the entire level (meters) FUN MATH
    const levelDistance = speed * 60 + 20 - ((speed * 60) % 20);
    // the number of shuttles in the level
    const shuttlesPerLevel = levelDistance / 20;
    return shuttlesPerLevel;
  };

  renderShuttleField = () => {
    const { level } = this.props;
    if (!level) return null;
    return (
      <Field
        component={ NumberPicker }
        name='shuttle'
        props={{
          label: 'shuttle',
          max: this.getMaxShuttles(level),
          disabled: !level
        }}
        validate={ [validators.required] }
      />
    );
  };

  render() {
    const { handleSubmit, invalid, pristine, submitting } = this.props;
    return (
      <View style={ sty.container }>
        <SpinnerOverlay visible={ submitting }/>
        <View style={ sty.header }>
          <Button
            transparent
            onPress={ () => this.props.history.push('/fitness-tests',
              { skipFetchData: true }
            ) }
          >
            <Icon name='close' style={ sty.icon } />
          </Button>
        </View>
        <View style={ sty.innerContainer }>
          <View style={ sty.fields }>
            <Field
              component={ DatetimePicker }
              name='completedAt'
              props={{ label: 'completed on' }}
              validate={ [validators.required] }
            />
            <Field
              component={ NumberPicker }
              name='level'
              props={{ max: 21, label: 'Level' }}
              validate={ [validators.required] }
            />
            {this.renderShuttleField()}
          </View>
          <LibButton
            disabled={ invalid || pristine || submitting }
            onPress={ handleSubmit(this.onSubmit) }
            label='submit'
          />
        </View>
      </View>
    );
  }
}

const form = 'beep-test';
const ConnectedForm = reduxForm({ form })(_ManualEntry);
const selector = formValueSelector(form);

export const ManualEntry = withRouter(
  connect(
    (state) => ({ level: selector(state, 'level') }),
    actions
  )(ConnectedForm)
);
