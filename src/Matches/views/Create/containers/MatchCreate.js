import * as sty from './MatchCreate.style.js';
import * as actions from '../../../actions';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import {
  Button,
  DatetimePicker,
  FormPicker,
  Input,
  SceneContainer,
  SpinnerOverlay,
  validators
} from 'src/lib/components';
import { View, Toast } from 'native-base';
const { required } = validators;

export class Create extends Component {
  constructor(props) {
    super(props);
    this.editing = !_.isEmpty(props.initialValues);
  }

  onSubmit = (formData) => this.editing
    ? this.props.updateMatch(formData)
    : this.props.createMatch(_.omit(formData, ['_id']))
    .catch(err => Toast.show({
      text: err.message,
      position: 'bottom',
      type: 'danger',
      duration: 2500
    }))

  render() {
    const { pristine, invalid, submitting } = this.props;
    return (
      <SceneContainer title='New Match'>
        <SpinnerOverlay visible={ submitting }/>
        <View style={ sty.wrapper }>
          <View style={ sty.formContainer }>
            <Field component={ DatetimePicker }
              name='date'
              props={{ label: 'Date' }}
              validate={ [required] }
            />
            <Field component={ DatetimePicker }
              name='matchStartTime'
              props={{
                label: 'start time',
                mode: 'time',
                format: 'hh:mm A',
                iconName: 'clock-o'
              }}
            />
            <Field component={ DatetimePicker }
              name='arriveAtTime'
              props={{
                label: 'arrive at',
                mode: 'time',
                format: 'hh:mm A',
                iconName: 'clock-o'
              }}
            />
            <Field component={ Input }
              name='opponent'
              props={{ label: 'Opponent', iconName: 'ban' }}
              validate={ [required] }
            />
            <Field component={ FormPicker }
              name={ 'locationType' }
              validate={ [required] }
              props={{
                options: ['home', 'away'],
                label: 'Home/Away'
              }}
            />
            <Field component={ Input }
              name='location.description'
              props={{ label: 'Field', iconName: 'map-marker' }}
            />
            <Button primary
              large={ false }
              label={ this.editing ? 'Update' : 'Create' }
              style={ sty.submitButton }
              onPress={ this.props.handleSubmit(this.onSubmit) }
              disabled={ pristine || invalid || submitting }
            />
          </View>
        </View>
      </SceneContainer>
    );
  }
}

export const ConnectedForm = reduxForm({ form: 'match:create' })(Create);

export const MatchCreate = connect(({ matches }) => ({
  initialValues: matches.editing
}), actions)(ConnectedForm);
