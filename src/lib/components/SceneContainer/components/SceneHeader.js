import * as sty from './SceneHeader.style';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Body,
  Header,
  Left,
  Right,
  Subtitle,
  Title,
} from 'native-base';

import { isEmpty as _isEmpty } from 'lodash';

import * as drawerActions from 'src/lib/components/Drawer/actions';
import { getHeaderButton } from './HeaderButtons';

class _SceneHeader extends Component {
  constructor(props) { super(props); }

  renderLeftButton() {
    const { headerButtons } = this.props;
    const leftButton = _isEmpty(headerButtons) ?
      'back' : headerButtons.left || 'back';
    return getHeaderButton(leftButton);
  }

  renderRightButton() {
    const { drawer, headerButtons } = this.props;
    const rightButton = _isEmpty(headerButtons) ?
      'drawer' : headerButtons.right || 'drawer';

    return getHeaderButton(rightButton,  {
      toggleDrawer: () => this.props.setDrawerState(!drawer.isOpen)
    });
  }

  renderSubtitle(subtitle) {
    return subtitle ?
      <Subtitle style={ sty.subtitle }>{ subtitle }</Subtitle> : null;
  }
  render() {
    const {
      hasTabs,
      subtitle = null,
      title,
      noShadow = true
    } = this.props;
    return (
      <Header
        hasTabs={ hasTabs }
        noShadow={ noShadow }
        style={ sty.header }
      >
        <Left>
          { this.renderLeftButton() }
        </Left>
        <Body style={ sty.body }>
          <Title style={ sty.title }>{ title }</Title>
          { this.renderSubtitle(subtitle) }
        </Body>
        <Right>
          { this.renderRightButton() }
        </Right>
      </Header>
    );
  }
}

function mapStateToProps(state) {
  const { drawer } = state;
  return { drawer };
}

export const SceneHeader = connect(
  mapStateToProps,
  drawerActions)(_SceneHeader);
