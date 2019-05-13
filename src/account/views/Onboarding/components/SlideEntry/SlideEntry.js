import sty from './SlideEntry.style';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { View } from 'native-base';
import { Field } from 'redux-form';
import { Button } from 'src/lib/components/Button';
import { Text } from 'src/lib/components/Text';
import { Input } from 'src/lib/components/Form/Input';
import { DatetimePicker } from 'src/lib/components/Form/DatetimePicker';
import { FormPicker } from 'src/lib/components/Form/FormPicker';
export class SlideEntry extends Component {
  constructor(props) { super(props); }

  getFieldComponent(type) {
    switch(type) {
      case 'date': return DatetimePicker;
      case 'enum': return FormPicker;
      default: return Input;
    }
  }

  renderFormFields() {
    const { fields } = this.props.data;
    return _.map(fields, ({ name, type, formProps, ...rest }, index) => {
      const Type = _.isEmpty(rest.options) ? type : 'enum';
      let Comp = Input;
      switch(Type) {
        case 'date': Comp = DatetimePicker; break;
        case 'enum': Comp = FormPicker; break;
        default: break;
      }
      return (
        <Field { ...formProps }
          key={ index }
          component={ Comp }
          name={ name }
          props={{
            inverse: true,
            ...rest
          }}
        />
      );
    });
  }

  disabledNext() {
    const fields = _.map(this.props.data.fields, 'name');
    switch (true) {
      case (this.props.index === 0 || this.props.index === this.props.entries):
        return false;
      case _.filter(this.props.values, (value, key) => {
        return _.includes(fields, key) && !_.isUndefined(value);
      }).length === fields.length:
        return false;
      default:
        return true;
    }
  }

  render() {
    const {
      data: { buttonLabel, description, hideBack, title },
      onPrev,
      onSubmit
    } = this.props;
    return (
      <View style={ sty.slideWrapper }>
        <View style={ sty.container }>
          <View style={ sty.titleWrapper }>
            <Text h1 inverse>{ title }</Text>
            <Text inverse style={ sty.description }>{ description }</Text>
          </View>
          <View style={ sty.contentWrapper }>
            { this.renderFormFields() }
            <View style={ sty.buttonWrapper }>
              <View style={ sty.buttonContainer }>
                { hideBack
                  ? null :
                  <Button light
                    label={ 'back' }
                    onPress={ onPrev }
                    style={ sty.button }
                  />
                }
                <Button light
                  disabled={ this.disabledNext() }
                  label={ buttonLabel || 'next' }
                  onPress={ onSubmit }
                  style={ sty.button }
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

SlideEntry.propTypes = {
  data: PropTypes.object.isRequired
};
