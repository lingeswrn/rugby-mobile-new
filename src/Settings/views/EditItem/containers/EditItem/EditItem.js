import * as sty from './EditItem.style';
import * as actions from 'src/Settings/actions';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native';
import {
  camelCase as _camelCase,
  has as _has,
  get as _get
} from 'lodash';
import { Text, View } from 'native-base';

import { Loader, SceneContainer } from 'src/lib/components';

import {
  Enum,
  TextInput,
  MultiTextInput,
  DatePicker
} from '../../components';

class _EditItem extends Component {
  constructor(props) {
    super(props);
    const item = props.location.state || {};
    this.state = {
      value: item.value,
      updating: false
    };
  }

  handleSave(item) {
    const property = item.prop || _camelCase(item.label);
    const { value } = this.state;
    this.setState({ updating: true });
    return this.props.updateUserData(item.list, {
      [property]: value
    })
    .then(() => this.props.history.goBack());
  }

  handleChangeValue = (value) => {
    this.setState({ value });
  }

  renderInput(item) {
    if (this.state.updating) {
      return (
        <Loader
          containerStyle={ sty.savingSpinner }
          title='Saving'
        />
      );
    }
    const { value } = this.state;
    let InputComponent = TextInput;
    switch(true) {
      case _has(item, 'options'):
        InputComponent = Enum;
        break;
      case _has(item, 'fields'):
        InputComponent = MultiTextInput;
        break;
      case _get(item, 'prop') === 'dateOfBirth':
        InputComponent = DatePicker;
        break;
      default:
        break;
    }
    return (
      <View>
        <InputComponent
          item={ item }
          value={ value }
          onChange={ this.handleChangeValue }
        />
        <Text style={ sty.description }>{ item.description }</Text>
      </View>
    );
  }

  render() {
    const item = this.props.location.state;
    return (
      <SceneContainer
        hideSceneFooter
        headerButtons={{
          left: {
            text: 'Cancel',
            onPress: () => this.props.history.goBack(),
            disabled: this.state.updating
          },
          right: {
            text: 'Done',
            onPress: () => this.handleSave(item),
            disabled: this.state.updating
          }
        }}
        scrollEnabled={ false }
        style={ sty.wrapper }
        title={ item.label }
      >
        <View style={ sty.inputWrapper }>
          { this.renderInput(item) }
        </View>
      </SceneContainer>
    );
  }
}

export const EditItem = withRouter(connect(() => {
  return {};
}, actions)(_EditItem));
