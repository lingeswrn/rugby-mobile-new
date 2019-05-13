import { colors } from 'rbv-core/colors';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Animated, Easing, View } from 'react-native';

const INDETERMINATE_WIDTH_FACTOR = 0.3;
const BAR_WIDTH_ZERO_POSITION = INDETERMINATE_WIDTH_FACTOR /
  (1 + INDETERMINATE_WIDTH_FACTOR);

export class ProgressBar extends Component {
  static propTypes = {
    animated: PropTypes.bool,
    borderColor: PropTypes.string,
    borderRadius: PropTypes.number,
    borderWidth: PropTypes.number,
    children: PropTypes.node,
    color: PropTypes.string,
    height: PropTypes.number,
    indeterminate: PropTypes.bool,
    progress: PropTypes.number,
    style: PropTypes.object,
    unfilledColor: PropTypes.string,
    width: PropTypes.number,
  };

  static defaultProps = {
    animated: true,
    borderRadius: 0,
    borderWidth: 2,
    color: colors.brand.primary,
    height: 150,
    indeterminate: false,
    progress: 0,
    width: undefined,
  };

  constructor(props) {
    super(props);
    const progress = Math.min(Math.max(props.progress, 0), 1);
    this.state = {
      progress: new Animated.Value(
        props.indeterminate ? INDETERMINATE_WIDTH_FACTOR : progress
      ),
      animationValue: new Animated.Value(BAR_WIDTH_ZERO_POSITION),
    };
  }

  componentDidMount() {
    if (this.props.indeterminate) {
      this.animate();
    }
  }

  componentWillReceiveProps(props) {
    if (props.indeterminate !== this.props.indeterminate) {
      if (props.indeterminate) {
        this.animate();
      } else {
        Animated.spring(this.state.animationValue, {
          toValue: BAR_WIDTH_ZERO_POSITION,
        }).start();
      }
    }
    if (
      props.indeterminate !== this.props.indeterminate ||
      props.progress !== this.props.progress
    ) {
      const progress = (props.indeterminate
        ? INDETERMINATE_WIDTH_FACTOR
        : Math.min(Math.max(props.progress, 0), 1)
      );

      if (props.animated) {
        Animated.spring(this.state.progress, {
          toValue: progress,
          bounciness: 0,
        }).start();
      } else {
        this.state.progress.setValue(progress);
      }
    }
  }

  animate() {
    this.state.animationValue.setValue(0);
    Animated.timing(this.state.animationValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      isInteraction: false,
    }).start((endState) => {
      if (endState.finished) {
        this.animate();
      }
    });
  }

  render() {
    const {
      borderColor,
      borderRadius,
      borderWidth,
      children,
      color,
      height = 150,
      style,
      unfilledColor,
      ...restProps
    } = this.props;

    const innerHeight = height - (borderWidth * 2);
    const containerStyle = {
      alignSelf: 'stretch',
      flex: 1,
      height,
      borderWidth,
      borderBottomWidth: 0,
      borderColor: borderColor || color,
      borderRadius,
      overflow: 'hidden',
      backgroundColor: unfilledColor,
    };
    const progressStyle = {
      backgroundColor: color,
      flex: 1,
      height: innerHeight,
      transform: [{
        translateY: this.state.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [innerHeight / 2, 0],
        }),
      }, {
        translateX: this.state.animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [innerHeight * -INDETERMINATE_WIDTH_FACTOR, innerHeight],
        }),
      }, {
        scaleY: this.state.progress,
      }],
    };

    return (
      <View
        style={ [containerStyle, style] }
        { ...restProps }
      >
        <Animated.View style={ progressStyle } />
        {children}
      </View>
    );
  }
}
