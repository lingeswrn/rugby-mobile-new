import * as actions from '../actions';
import * as sty from './Loader.style';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { Text, View, Spinner } from 'native-base';

class _Loader extends Component {
  constructor(props) {
    super(props);
    this.state = { locationMatch: true };
  }

  componentWillMount() {
    const { id, onMount, onLoadingStart, onLoadingComplete, path } = this.props;
    const { pathname } = this.props.history.location;

    if (path && path !== pathname) {
      this.setState({ locationMatch: false });
    } else if (_.isFunction(onMount)) {
      onLoadingStart(id)
      .then(() => onMount())
      .then(() => onLoadingComplete(id));
    }
  }

  renderLoader() {
    return (
      <View style={{ ...sty.wrapper, ...this.props.containerStyle }}>
        <Spinner color={ sty.loaderColor } />
        <Text style={ sty.loaderText }>
          { this.props.title || 'Loading...'}
        </Text>
      </View>
    );
  }

  componentWillUnmount() {
    const { id, resetLoader } = this.props;
    if (id) resetLoader(id);
  }

  render() {
    const { locationMatch } = this.state;
    const { children, onMount } = this.props;
    const loaderState = this.props.loader[this.props.id] || {};
    const { complete } = loaderState;

    if ((_.isFunction(onMount) && complete === true) || !locationMatch) {
      return children;
    }
    return (this.renderLoader());
  }
}

export const Loader = withRouter(connect((state) => {
  return {
    loader: state.loader
  };
}, actions)(_Loader));
