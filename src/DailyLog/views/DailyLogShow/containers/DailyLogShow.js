import * as sty from './DailyLogShow.style';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { getFormValues, Field, reduxForm } from 'redux-form';
import { Toast, View } from 'native-base';
import { FormContainer, SceneContainer, Text, SpinnerOverlay } from 'src/lib/components';
import { Input } from 'src/lib/components/Form/Input';
import { NumberPicker } from 'src/lib/components/Form/NumberPicker';
import { Slider } from 'src/lib/components/Form/Slider';
import Collapse from 'react-native-collapsible';
import { TouchableOpacity } from 'react-native';
import { DailyLogService } from 'rbv-core/services/Rugbyvault/DailyLogService';

class _DailyLogShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      open: 0
    };
  }

  onSubmit = (formData) => {
    this.setState({ submitting: true });
    this.props.DailyLogService().updateEntry(formData)
    .then(() => this.props.history.push('/'))
    .catch((err) => {
      this.setState({ submitting: false });
      Toast.show({
        text: _.isObject(err) ? err.message : err,
        type: 'danger',
        duration: 4000
      });
    });
  }

  getSectionFraction(vals, active) {
    const { formData } = this.props;
    const complete = _.reduce(vals, (memo, val) => {
      const value = formData[val];
      return (!_.isNumber(value) && _.isEmpty(value)) ? memo : memo + 1;
    }, 0);
    return (
      <Text h1 style={ sty.section(active).title }>
        {`${complete} / ${vals.length}`}
      </Text>
    );
  }

  renderSectionTitle(name, val, fields) {
    const { formData } = this.props;
    const { open } = this.state;
    const active = open === val;
    const complete = _.reduce(fields, (memo, field) => {
      const value = formData[field];
      return (!_.isNumber(value) && _.isEmpty(value)) ? memo : memo + 1;
    }, 0);
    return (
      <TouchableOpacity
        onPress={ () => this.setState({ open: val }) }
        style={ sty.section(active).titleWrapper }
      >
        <Text h1 style={ sty.section(active).title }>{ name }</Text>
        <Text h1 style={ sty.section(active).subtitle }>
          {`${complete} / ${fields.length}`}
        </Text>
      </TouchableOpacity>
    );
  }

  renderFormSection({ input, slider, title, val }) {
    const { component, icon, name, ...rest } = input;
    const { open } = this.state;
    return (
      <View key={ val } style={ sty.sectionWrapper }>
        <SpinnerOverlay visible={ this.state.submitting }/>
        { this.renderSectionTitle(title, val, [name, slider.name ]) }
        <Collapse style={ sty.formSectionContainer }
          collapsed={ open !== val }
        >
          <View style={ sty.inputWrapper }>
            <Field name={ input.name }
              component={ component || NumberPicker }
              format={ component ? (value) => _.toString(value) : null }
              // parse={ (value) => _.toNumber(value) }
              props={{
                autoCapitalize: 'none',
                autoCorrect: false,
                autoFocus: false,
                iconName: icon,
                keyboardAppearance: 'dark',
                keyboardType: 'decimal-pad',
                returnKeyType: 'next',
                ...rest
                // TODO: reset once weight converter is implemented
                // units: units === 'imperial' ? 'lbs.' : 'kg.'
              }}
            />
          </View>
          <View style={ sty.inputWrapper }>

            <Field name={ slider.name }
              component={ Slider }
              props={{ label: slider.label, tickLabels: slider.tickLabels }}
            />
          </View>
        </Collapse>
      </View>
    );
  }

  renderFormSections(sections) {
    return _.map(sections, (sec) => this.renderFormSection(sec));
  }

  render() {
    const {
      dailyLogs: { current },
      handleSubmit,
      history,
      pristine,
      submitting,
      // units
    } = this.props;
    return (
      <SceneContainer
        hideSceneFooter
        title={ 'Daily Log' }
        subtitle={ moment(current.date).format('D MMMM, YYYY') }
        headerButtons={{
          left: {
            icon: 'angle-left',
            onPress: () => history.push('/'),
            disabled: submitting
          },
          right: {
            text: 'save',
            onPress: handleSubmit(this.onSubmit),
            disabled: pristine || submitting
          }
        }}
      >
        <FormContainer style={ sty.wrapper }>
          { this.renderFormSections([{
            input: {
              icon: 'tachometer',
              label: 'weight',
              name: 'weight',
              units: 'kg.',
              min: 50,
              max: 250,
              format: '0.0'
            },
            slider: {
              label: 'mood',
              name: 'moodRating',
              tickLabels: ['idle', 'motivated']
            },
            title: 'vitals',
            val: 0
          }, {
            input: {
              icon: 'moon-o',
              label: 'sleep duration',
              name: 'sleepDuration',
              units: 'hrs.'
            },
            slider: {
              label: 'sleep quality',
              name: 'sleepQuality',
              tickLabels: ['restless', 'energized']
            },
            title: 'sleep',
            val: 1
          }, {
            input: {
              icon: 'cutlery',
              label: 'calories in',
              name: 'caloriesIn',
              units: 'cals.',
              component: Input
            },
            slider: {
              label: 'food quality',
              name: 'caloriesInQuality',
              tickLabels: ['poor', 'healthy']
            },
            title: 'nutrition',
            val: 2
          }]) }
        </FormContainer>
      </SceneContainer>
    );
  }
}

const Form = reduxForm({
  destroyOnUnmount: true,
  form: 'dailyLog',
  touchOnChange: false,
})(_DailyLogShow);


export const DailyLogShow = connect((state) => {
  const { athleteProfile, appConfig: { units }} = state.user.data;
  const { current } = state.dailyLogs;
  return {
    initialValues: {
      ...current,
      weight: _.toString(athleteProfile.massInKilograms)
    },
    units,
    formData: getFormValues('dailyLog')(state) || {}
  };
}, { DailyLogService })(Form);
