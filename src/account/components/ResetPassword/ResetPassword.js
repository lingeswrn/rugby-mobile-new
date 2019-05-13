import * as sty from './ResetPassword.style';
import * as actions from '../../actions';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, Field, reduxForm } from 'redux-form';
import { Toast, View } from 'native-base';
import { Button, Input, Text, validators, SpinnerOverlay } from 'src/lib/components';

class ResetForm extends Component {
  constructor(props) { super(props); }

  _onSubmit = (values) => {
    this.props.resetPassword(values)
    .then((email) => {
      return Toast.show({
        text: `Instructions to reset your password has been sent to ${email}`,
        position: 'top',
        type: 'success',
        duration: 2500
      });
    })
    .catch(({ code, message }) => {
      let text = '';
      switch (code) {
        case 'auth/user-not-found':
          text = 'We can\'t seem to find that email address. Have you created an account?';
          break;
        case 'auth/wrong-password':
          text = 'Incorrect Password. Try again.';
          break;
        default:
          text = message;
      }
      return Toast.show({
        text,
        position: 'bottom',
        type: 'danger',
        duration: 2500
      });
    });
  }

  render() {
    const {
      connection: { connected }, handleSubmit, pristine, submitting
    } = this.props;

    return (
      <View style={ sty.formContainer }>
        <SpinnerOverlay visible={ submitting }/>
        <Field name={ 'email' }
          component={ Input }
          props={{
            iconName: 'user',
            autoCapitalize: 'none',
            autoCorrect: false,
            autoFocus: true,
            keyboardAppearance: 'dark',
            keyboardType: 'email-address',
            returnKeyType: 'next',
            label: 'Email'
          }}
          validate={ [validators.isEmail] }
        />
        <Button onPress={ handleSubmit(this._onSubmit) }
          primary
          style={ sty.submitButton }
          disabled={ submitting  || pristine || !connected }
          label={ 'reset password' }
        />
        { connected ? null
          : <Text h5 danger style={ sty.disconnectedText }>
            { 'cannot reset password without connection ' }
          </Text>
        }
      </View>
    );
  }
}

const Form = reduxForm({
  form: 'resetPassword',
  touchOnChange: false
})(ResetForm);

const selector = formValueSelector('resetPassword');
function mapStateToProps(state) {
  const { connection } = state;
  const email = selector(state, 'email');
  return { connection, email };
}

export const ResetPassword = connect(mapStateToProps, actions)(Form);
