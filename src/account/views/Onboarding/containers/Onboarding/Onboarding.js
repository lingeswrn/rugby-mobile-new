import * as sty from './Onboarding.style';
import * as actions from 'src/account/actions';

import { Dimensions } from 'react-native';
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { View, Toast } from 'native-base';
import { entries } from '../../utils';
import { SlideEntry } from '../../components';
import { reduxForm } from 'redux-form';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';

class _Onboarding extends Component {
  completeOnboarding = (data) => {
    return this.props.handleOnboardingData(data)
    .then(this.props.handleCompleteOnboarding)
    .catch(err => Toast.show({
      text: err.message,
      position: 'bottom',
      type: 'danger',
      duration: 2500
    }));
  }

  renderItem = (item, index) => {
    return (
      <SlideEntry key={ index }
        index={ index }
        entries={ entries.length }
        values={ this.props.fields ? this.props.fields.values : {} }
        data={ item }
        onNext={ this.handleNext }
        onPrev={ this.handlePrev }
        onSubmit={ item.complete
          ? this.props.handleSubmit(this.completeOnboarding)
          : this.handleNext
        }
      />
    );
  }

  get gradient() {
    return (
      <LinearGradient
        colors={ sty.gradColors }
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 0.5, y: 1 }}
        style={ sty.genStyle.gradient }
      />
    );
  }

  handleNext = () => this._swiper.scrollBy(1, true);
  handlePrev = () => this._swiper.scrollBy(-1, true);

  render() {
    return (
      <View style={ sty.container }>
        { this.gradient }
        <Swiper ref={ (c) => { this._swiper = c; } }
          index={ 0 }
          loop={ false }
          autoplay={ false }
          style={ sty.slideContentCntainer }
          scrollEnabled={ false }
          width={ Dimensions.get('window').width }
          { ...sty.pagination }
        >
          { _.map(entries, this.renderItem) }
        </Swiper>
      </View>
    );
  }
}

export const Onboarding = reduxForm({
  form: 'onboarding'
})(connect((state) => ({
  user: state.user,
  fields: state.form.onboarding
}), actions
)(_Onboarding));
