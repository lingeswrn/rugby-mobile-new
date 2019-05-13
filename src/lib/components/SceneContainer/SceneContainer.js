import * as sty from './SceneContainer.style';

import React, { Component } from 'react';
import _ from 'lodash';
import { ImageBackground, RefreshControl } from 'react-native';
import { withRouter } from 'react-router-native';
import { Container, Content } from 'native-base';
import { SceneFooter, SceneHeader } from './components';

const bgImage = require('../../../images/logo/red-25.png');

class _SceneContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false };
  }
  handleRefresh = () => {
    this.setState({ refreshing: true });
    return this.props.handleRefresh()
    .then(() => this.setState({ refreshing: false }));
  }
  renderSceneHeader() {
    const { hideSceneHeader, title } = this.props;
    if (hideSceneHeader) return null;
    return <SceneHeader hasTabs={ false } title={ title } { ...this.props } />;
  }

  renderSceneFooter() {
    const { hideSceneFooter = true } = this.props;
    if (hideSceneFooter) return null;
    return <SceneFooter { ...this.props }/>;
  }

  render() {
    const {
      handleRefresh,
      refreshTitle = 'Refreshing...',
      hideSceneHeader,
      scrollEnabled,
      containerStyle = {}
    } = this.props;
    const sceneWrapper = scrollEnabled ? sty.scene : sty.fixed;
    const headerAdjustment = hideSceneHeader ? sty.headerlessScene : {};
    return (
      <ImageBackground source={ bgImage }
        style={ sty.bgImageContainer }
        resizeMode='contain'
        resizeMethod='auto'
      >
        <Container style={{ ...sceneWrapper, ...containerStyle }}>
          { this.renderSceneHeader() }
          <Content { ...this.props }
            style={{ ...sceneWrapper, ...headerAdjustment }}
            refreshControl={ _.isFunction(handleRefresh) ?
              <RefreshControl
                refreshing={ this.state.refreshing }
                onRefresh={ this.handleRefresh }
                title={ refreshTitle }
                { ...sty.refresh }
              />
              : null }
          >
            { this.props.children }
          </Content>
          { this.renderSceneFooter() }
        </Container>
      </ImageBackground>
    );
  }
}

export const SceneContainer = withRouter(_SceneContainer);
