import * as sty from './StrengthTestIntroduction.style';
import * as actions from 'src/FitnessTest/actions';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, SceneContainer, Text } from 'src/lib/components';
import { withRouter } from 'react-router';
import { Toast, View } from 'native-base';

class _StrengthTestIntroduction extends Component {
  constructor(props) {
    super(props);
    this.state = { hideBackButton: false };
  }
  showToast() {
    return Toast.show({
      supportedOrientations: ['portrait'],
      text: 'Hey!\n \nYou need to complete a strength test before commencing your Training Plan.',
      position: 'bottom',
      duration: 5000,
      type: 'warning'
    });
  }

  componentDidMount() {
    const { state } = this.props.location;
    if (state && state.showRedirectAlert) { this.showToast(); }
    if (state && state.disableGoBack) {
      this.setState({ hideBackButton: true });
    }
  }

  onPressStart() { this.props.history.push('/strength-test/instructions'); }
  render() {
    return (
      <SceneContainer
        title={ 'Strength Test' }
        headerButtons={{ left: this.state.hideBackButton ? 'empty' : null }}
      >
        <View style={ sty.titleWrapper }>
          <Text h1 inverse>{ 'introduction' }</Text>
        </View>
        <View style={ sty.body }>
          <Text style={ sty.bodyText }>
            { 'A personalized training plan starts with a thorough assessment of your current fitness.' }
          </Text>
          <Text style={ sty.bodyText }>
            <Text h6 style={ sty.strong }>{ 'Strength Tests' }</Text>
            { ' are a snapshot of your fitness profile. Rugbyvault uses data from your Strength Tests to estimate load the first time you complete an acitivity.' }
          </Text>
          <Text style={ sty.bodyText }>
            { 'Rugbyvault\'s Training Plan Intelligence system uses data from your Strength Tests as part of the formula that helps make recommendatations to help optimize your performance based on the training goals you and your trainer set up.' }
          </Text>
          <Text style={ sty.bodyText }>
            { 'You may take Strength Tests as often as you\'d like, but we recommend completing a Strength Test every ' }
            <Text h6 style={ sty.strong }>{ '12 weeks' }</Text>
            { '.' }
          </Text>
        </View>
        <View style={ sty.buttonWrapper }>
          <Button onPress={ () => this.onPressStart() }
            style={ sty.button }
            label='next'
            iconRight
            icon='angle-right'
          />
        </View>
      </SceneContainer>
    );
  }
}

function mapStateToProps(state) {
  const { strengthTest } = state;
  return { ...strengthTest };
}

export const StrengthTestIntroduction = withRouter(connect(
  mapStateToProps, actions
)(_StrengthTestIntroduction));
