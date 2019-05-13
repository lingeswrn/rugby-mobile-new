import * as actions from '../actions';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Loader } from 'src/lib/components';


export function getCompletedTests(ComposedComponent) {
  class HOC extends Component {
    constructor(props) { super(props); }

    fetchData = () => {
      switch(this.props.match.path) {
        case('/strength-test/completed'):
          return this.props.getCompletedStrengthTests();
        case('/beep-test/completed'):
        case('/beep-test/summary'):
          return this.props.getBeepTests();
        default: return Promise.resolve();
      }
    }

    render() {
      return (
        <Loader
          id='getCompletedTests'
          onMount={ this.fetchData }
          title='Getting Results'
        >
          <ComposedComponent { ...this.props } />
        </Loader>
      );
    }
  }

  const mapStateToProps = ({ strengthTest, fitnessTest, user }) => ({
    ComposedComponent,
    strengthTests: strengthTest.completed,
    beepTests: fitnessTest.completed,
    units: user.data.appConfig.units
  });

  return withRouter(connect(mapStateToProps, actions)(HOC));
}
