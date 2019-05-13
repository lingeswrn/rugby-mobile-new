import * as sty from './SceneFooter.style';
import React, { Component } from 'react';
// import { Image } from 'react-native';
// import Svg from 'react-native-svg';
import {
  Button,
  Footer,
  FooterTab,
  Icon,
  Text
} from 'native-base';
import {
  upperCase as _upperCase
} from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import {
  // DashboardIcon,
  HomeIcon,
  WorkoutsIcon
} from './icons';

export class SceneFooter extends Component {
  constructor(props) {
    super(props);
  }

  renderStyles({ disabled, to }, path) {
    switch (true) {
      case disabled:
        return sty.disabledTab;
      case path === to:
        return sty.activeTab;
      default:
        return sty;
    }
  }

  renderImageOrIcon(tab, style) {
    const { image, icon } = tab;
    if (image) {
      return image;
    }
    return (
      <Icon
        style={ style.icon }
        name={ icon } />
    );
  }
  renderTabs(tabs) {
    const { push } = this.props.history;
    const path = this.props.location.pathname;

    return tabs.map((tab, index) => {
      const style = this.renderStyles(tab, path);
      const { to, label, disabled } = tab;
      return (
        <FooterTab key={ index }>
          <LinearGradient
            colors={ style.gradient }
            style={ style.footerButton }
          >
            <Button style={ style.footerButton }
              onPress={ () => push(to) }
              disabled={ disabled }
            >
              { this.renderImageOrIcon(tab, style) }
              <Text style={ style.buttonText }>{ _upperCase(label) }</Text>
            </Button>
          </LinearGradient>
        </FooterTab>
      );
    });
  }

  render() {
    return (
      <Footer style={ sty.wrapper }>
        { this.renderTabs([
          {
            to: '/',
            label: 'home',
            image: (<HomeIcon />)
          }, {
            to: '/weekly-routine',
            label: 'workouts',
            image: (<WorkoutsIcon />)
          }, {
            to: '/account/athlete-profile',
            label: 'my profile',
            icon: 'user-o'
            // image: (<DashboardIcon />)
          }, {
            to: '/daily-log',
            label: 'daily log',
            icon: 'pencil-square-o',
            // disabled: true
            // image: (<DashboardIcon />)
          },

        ]) }
      </Footer>
    );
  }
}
