import * as actions from '../actions';

import React, { Component } from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Drawer as BaseDrawer } from 'native-base';
import { drawerStyles } from './Drawer.style';
import { DrawerContent } from '../components';

class _Drawer extends Component {
  constructor(props) {
    super(props);
  }

  closeDrawer = () => {
    return this.props.setDrawerState(false)
    .then(() => {
      this._drawer._root.close();
      return Promise.resolve();
    });
  }

  openDrawer = () => {
    return this.props.setDrawerState(true)
    .then(() => {
      this._drawer._root.open();
      return Promise.resolve();
    });
  }

  render() {
    const { drawer, children } = this.props;
    const type = Platform.OS === 'android' ? 'displace' : 'overlay';
    return (
      <BaseDrawer
        acceptPan={ false }
        closedDrawerOffset={ -3 }
        content={
          <DrawerContent
            handleCloseDrawer={ this.closeDrawer }
            handleSignOut={ this.props.handleSignOutButtonPress }
            handleReportBug={ this.props.handleReportBug }
          />
        }
        onClose={ this.closeDrawer }
        onOpen={ this.openDrawer }
        open={ drawer.isOpen }
        openDrawerOffset={ 0.2 }
        panCloseMask={ 0.2 }
        ref={ (ref) => { this._drawer = ref; } }
        style={ drawerStyles }
        tapToClose
        type={ type }
      >
        { children }
      </BaseDrawer>
    );
  }
}

export const Drawer = withRouter(
  connect(({ drawer }) => ({ drawer }), actions)(_Drawer)
);
