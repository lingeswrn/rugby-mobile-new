import * as sty from './NavPanel.style';
import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Icon } from 'native-base';

export class NavPanel extends Component {
  constructor(props) { super(props); }

  render() {
    return (
      <LinearGradient colors={ sty.wrapperGradient }
        start={{ x: 0.5, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        style={ sty.wrapper }
      >
        <Button transparent
          style={ sty.navButton }
          onPress={ this.props.onPrevActivity }
        >
          <Icon name='angle-double-left' style={ sty.icon } />
        </Button>
        <Button transparent
          style={ sty.navButton }
          onPress={ this.props.onPrevSet }
        >
          <Icon name='angle-left' style={ sty.icon } />
        </Button>
        <Button style={ sty.doneButton }
          onPress={ this.props.onSetComplete }
        >
          <Icon name='check' style={ sty.buttonIcon } />
        </Button>
        <Button transparent
          style={ sty.navButton }
          onPress={ this.props.onNextSet }
        >
          <Icon name='angle-right' style={ sty.icon } />
        </Button>
        <Button transparent
          style={ sty.navButton }
          onPress={ this.props.onNextActivity }
        >
          <Icon name='angle-double-right' style={ sty.icon } />
        </Button>
      </LinearGradient>
    );
  }
}
