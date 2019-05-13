import * as sty from './Signin.style';
import * as actions from '../../actions';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, Field, reduxForm } from 'redux-form';
import { Toast, View } from 'native-base';
import { Button, Input, Text, validators, SpinnerOverlay } from 'src/lib/components';

class SigninForm extends Component {
  constructor(props) { super(props); }
  componentDidMount() { this.props.reset(); }
  _onSubmit = (values) => {
    return this.props.signIn(values)
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
        <Field name={ 'username' }
          component={ Input }
          props={{
            iconName: 'user',
            autoCapitalize: 'none',
            autoCorrect: false,
            autoFocus: false,
            keyboardAppearance: 'dark',
            keyboardType: 'email-address',
            returnKeyType: 'next',
            label: 'Email'
          }}
          validate={ [validators.isEmail] }
        />
        {/* Android secureText doesn't work with keyboardType email-address */}
        <Field name={ 'password' }
          component={ Input }
          props={{
            iconName: 'lock',
            autoCapitalize: 'none',
            autoCorrect: false,
            autoFocus: false,
            keyboardAppearance: 'dark',
            keyboardType: 'default',
            returnKeyType: 'next',
            label: 'Password',
            clearTextOnFocus: false,
            secureTextEntry: true,
            inputStyle: sty.inputStyle
          }}
          validate={ [validators.minValue] }
        />
        <Button onPress={ handleSubmit(this._onSubmit) }
          primary
          style={ sty.submitButton }
          disabled={ submitting  || pristine || !connected }
          label={ 'sign in' }
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
  enableReinitialize: true,
  forceUnregisterOnUnmount: true,
  form: 'signin',
  touchOnChange: false,
  persistentSubmitErrors: false,
  initialValues: {}
})(SigninForm);

const selector = formValueSelector('signin');
function mapStateToProps(state) {
  const { connection } = state;
  const { username, password } = selector(state, 'username', 'password');
  return { connection, username, password };
}

export const Signin = connect(mapStateToProps, actions)(Form);
