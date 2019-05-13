import * as sty from './RouteAnimation.style';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Animated } from 'react-native';
import { View } from 'native-base';

export class RouteAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = { previousChildren: null };
  }
  static propTypes = {
    children: PropTypes.node,
    anim: PropTypes.object,
    atParent: PropTypes.bool,
    animating: PropTypes.bool
  }

  animateTransition(previousChildren) {
    const animationValue = new Animated.Value(0);
    animationValue.addListener(({ value }) => {
      if (value === 1) {
        this.setState({ animationValue: null, previousChildren: null });
      }
    });
    this.setState({ animationValue, previousChildren });
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true
    }).start();
  }

  renderAnimatedView() {
    const { action } = this.props.history;
    const { animationValue, previousChildren } = this.state;
    let pushFrom = 'right';
    switch (action) {
      case 'POP': pushFrom = 'left'; break;
      case 'REPLACE': case 'REDIRECT': pushFrom = 'bottom'; break;
      default: break;
    }

    if (previousChildren) {
      return (
        <Animated.View style={ sty.animation(animationValue, pushFrom) }>
          { React.Children.map(previousChildren, (child) => {
            return React.cloneElement(child, { isTransitioning: true });
          }) }
        </Animated.View>
      );
    }
    return null;
  }

  render() {
    return <View>{ this.props.children }{ this.renderAnimatedView() }</View>;
  }

  componentWillReceiveProps(nextProps) {
    const nextPath = nextProps.location.pathname;
    const thisPath = this.props.location.pathname;
    const navigating = nextPath !== thisPath;
    const signingOut = thisPath !== '/login' && nextPath === '/login';
    if (navigating && !signingOut) this.animateTransition(this.props.children);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { pathname } = nextProps.location;
    switch(true) {
      case (pathname !== this.props.location.pathname): return true;
      case !_.isMatch(nextState, this.state): return true;
      default: return false;
    }
  }
}
