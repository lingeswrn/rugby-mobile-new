import * as sty from './HeaderButtons.style';

import React, { Component } from 'react';
import { Button, Icon, View } from 'native-base';
import { withRouter } from 'react-router';

export class _Back extends Component {
  constructor(props) { super(props);}

  render() {
    const { history } = this.props;
    if (history.index > 0) {
      return (
        <Button transparent onPress={ () => history.goBack() }>
          <Icon style={ sty.icon } name='angle-left' />
        </Button>
      );
    }
    return <View />;
  }
}

export const Back = withRouter(_Back);
