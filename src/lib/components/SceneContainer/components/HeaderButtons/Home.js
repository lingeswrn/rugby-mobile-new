import * as sty from './HeaderButtons.style';

import React, { Component } from 'react';
import { Button, Icon } from 'native-base';
import { withRouter } from 'react-router';

export class _Home extends Component {
  constructor(props) { super(props); }

  render() {
    const { history } = this.props;
    return (
      <Button transparent onPress={ () => history.replace('/') }>
        <Icon style={ sty.icon } name='home' />
      </Button>
    );
  }
}
export const Home = withRouter(_Home);
