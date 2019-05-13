import * as actions from '../actions';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'src/lib/components';


export function ensureCompiledActivities(ComposedComponent) {
  class HOC extends Component {
    constructor(props) { super(props); }

    fetchData = () => this.props.compileCompletedActivities();

    render() {
      return (
        <Loader
          id='ensureCompiledActivities'
          onMount={ this.fetchData }
          title='Scoring Strength Test'
        >
          <ComposedComponent />
        </Loader>
      );
    }
  }

  function mapStateToProps(state) {
    return {
      strengthTest: state.strengthTest,
      user: state.user
    };
  }

  return connect(mapStateToProps, actions)(HOC);
}
