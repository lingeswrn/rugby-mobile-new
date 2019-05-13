import * as actions from '../actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Loader } from 'src/lib/components';

export function getAssessments(ComposedComponent) {
  class AssessmentsHOC extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <Loader
          title='Loading Assessments'
          onMount={ this.props.getAssessments }
          id='getAssessments'
          path='/assessments'
        >
          <ComposedComponent { ...this.props } />
        </Loader>
      );
    }
  }

  return withRouter(connect(({ assessments, user }) => ({
    assessments, user
  }), actions)(AssessmentsHOC));
}
