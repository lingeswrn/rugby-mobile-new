import * as sty from './CreateAccount.style';
import * as actions from 'src/account/actions';

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { formValueSelector, Field, reduxForm } from 'redux-form';
import { Toast, View } from 'native-base';
import { Button, Input, Text, validators, SpinnerOverlay } from 'src/lib/components';

class CreateAccountForm extends Component {
  constructor(props) {
    super(props);
  }

  _onSubmit = (formData) => this.props.createAccount(formData)
  .catch((err) => {
    console.log('err', err);
    return Toast.show({
      text: err.message,
      position: 'bottom',
      type: 'danger',
      duration: 2500
    });
  })

  render() {
    const {
      connection: { connected },
      handleSubmit,
      pristine,
      submitting,
    } = this.props;
    return (
      <View style={ sty.formContainer }>
        <SpinnerOverlay visible={ submitting }/>
        <Field name='email'
          component={ Input }
          props={{
            autoCorrect: false,
            autoCapitalize: 'none',
            autoFocus: false,
            keyboardType: 'email-address',
            returnKeyType: 'next',
            secureTextEntry: false,
            selectTextOnFocus: false,
            clearTextOnFocus: false,
            enablesReturnKeyAutomatically: true,
            keyboardAppearance: 'dark',
            label: 'Email',
            containerStyle: sty.textInputContainer,
            style: sty.textInput,
            iconName: 'user-o'
          }}
          validate={ [
            validators.isEmail
          ] }
        />
        <Field name='password'
          component={ Input }
          props={{
            autoCorrect: false,
            autoCapitalize: 'none',
            autoFocus: false,
            keyboardType: 'default',
            returnKeyType: 'next',
            secureTextEntry: true,
            selectTextOnFocus: true,
            clearTextOnFocus: true,
            enablesReturnKeyAutomatically: true,
            keyboardAppearance: 'dark',
            label: 'Password',
            iconName: 'lock',
            inputStyle: sty.inputStyle
          }}
          validate={ [
            validators.minValue
          ] }
        />
        <Field name='confirmPassword'
          component={ Input }
          props={{
            autoCorrect: false,
            autoCapitalize: 'none',
            autoFocus: false,
            keyboardType: 'default',
            returnKeyType: 'next',
            secureTextEntry: true,
            selectTextOnFocus: true,
            clearTextOnFocus: true,
            enablesReturnKeyAutomatically: true,
            keyboardAppearance: 'dark',
            label: 'Confirm Password',
            iconName: 'unlock-alt',
            inputStyle: sty.inputStyle
          }}
          validate={ [
            validators.minValue
          ] }
        />
        {/* <Field name='betaAccessCode'
          component={ Input }
          props={{
            autoCorrect: false,
            autoCapitalize: 'none',
            autoFocus: false,
            keyboardType: 'default',
            returnKeyType: 'done',
            secureTextEntry: true,
            selectTextOnFocus: true,
            clearTextOnFocus: true,
            enablesReturnKeyAutomatically: true,
            keyboardAppearance: 'dark',
            label: 'beta access code'
          }}
        /> */}
        <Button onPress={ handleSubmit(this._onSubmit) }
          primary
          style={ sty.submitButton }
          disabled={ submitting  || pristine || !connected }
          label={ 'sign up' }
        />
        { connected ? null
          : <Text h5 danger style={ sty.disconnectedText }>
            { 'cannot sign in without connection ' }
          </Text>
        }
      </View>
    );
  }
}

const Form = reduxForm({
  form: 'createAccount',
  touchOnChange: false
})(CreateAccountForm);

const selector = formValueSelector('createAccount');
function mapStateToProps(state) {
  const { connection } = state;
  const {
    email, password, confirmPassword
  } = selector(
    state,
    'email', 'password', 'confirmPassword'
  );

  return { email, password, confirmPassword, connection };
}

export const CreateAccount = connect(mapStateToProps, actions)(Form);
