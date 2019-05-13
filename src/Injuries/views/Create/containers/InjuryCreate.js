import * as sty from './InjuryCreate.style.js';
import * as actions from '../../../actions';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import {
  DatetimePicker,
  FormPicker,
  SceneContainer,
  SpinnerOverlay,
  validators
} from 'src/lib/components';
import { View, Toast } from 'native-base';
const { required } = validators;

export class Create extends Component {
  constructor(props) {
    super(props);
    this.editing = !_.isEmpty(props.injuries.editing);
    this.muscleGroupOptions = _.map(props.staticData.muscleGroups,
      ({ _id, name }) => ({ key: _id, label: _.upperFirst(name) }));
    this.bodyPartOptions = _.map(props.staticData.bodyParts,
      ({ _id, name }) => ({ key: _id, label: _.upperFirst(name) }));
  }

  onSubmit = (formData) =>
    this.editing
      ? this.props.updateInjury(formData)
      : this.props.createInjury(formData)
      .catch(err => Toast.show({
        text: err.message,
        position: 'bottom',
        type: 'danger',
        duration: 2500
      }))

  render() {
    const {
      handleSubmit,
      injuries,
      submitting,
    } = this.props;
    const { selectOptions } = injuries.listMetadata.options;
    return (
      <SceneContainer
        title='New Injury Report'
        headerButtons={{
          left: { text: 'cancel', to: '/injuries', navMethod: 'replace' },
          right: {
            text: this.editing ? 'Update' : 'Create',
            onPress: handleSubmit(this.onSubmit)
          }
        }}
      >
        <SpinnerOverlay visible={ submitting }/>
        <View style={ sty.wrapper }>
          <View style={ sty.formContainer }>
            <Field name='type'
              component={ FormPicker }
              label='injury type'
              format={ (v) => _.upperFirst(v) }
              parse={ (v) => _.toLower(v) }
              options={ (_.map(selectOptions.type, (v) => _.upperFirst(v))) }
              validate={ [required] }
            />
            <Field component={ DatetimePicker }
              name='occurredOn'
              props={{ label: 'occurred on' }}
              validate={ [required] }
            />
            <Field name='reportedPainLevel'
              component={ FormPicker }
              label='pain level'
              format={ (v) => _.toString(v) }
              parse={ (v) => _.parseInt(v) }
              options={ (_.map(_.range(1, 10), (v) => _.toString(v))) }
              validate={ [required] }
            />
            <Field name='bodyPart'
              component={ FormPicker }
              label='body part'
              options={ this.bodyPartOptions }
              validate={ [required] }
            />
            <Field name='muscleGroup'
              component={ FormPicker }
              label='muscle group'
              options={ this.muscleGroupOptions }
            />
          </View>
        </View>
      </SceneContainer>
    );
  }
}

export const ConnectedForm = reduxForm({
  enableReinitialize: true,
  form: 'injury:create'
})(Create);

export const InjuryCreate = connect(({ injuries, staticData, user }) => ({
  initialValues: injuries.editing, injuries, staticData, user
}), actions)(ConnectedForm);
