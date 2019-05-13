import * as actions from '../actions';

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { injectBeepTestSounds } from 'src/FitnessTest/hoc';
import { Loader } from 'src/lib/components';

export function ensureCurrentBeepTest(ComposedComponent) {
  class HOC extends Component {
    constructor(props) { super(props); }

    render() {
      return (
        <ComposedComponent { ...this.props } />
      );
    }
  }

  const mapStateToProps = ({ fitnessTest }) => ({
    ComposedComponent,
    all: fitnessTest.completed,
    results: fitnessTest.current
  });

  return compose(
    withRouter,
    injectBeepTestSounds,
    connect(mapStateToProps, actions)
  )(HOC);
}
