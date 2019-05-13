import * as actions from '../actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';

export const ensureTrainingPlan = (ComposedComponent) => {
  class EnsureTrainingPlan extends Component {
    constructor(props) { super(props); }
    render() { return <ComposedComponent { ...this.props } />; }
  }
  return connect(({ injuries, training, user }) => {
    return { injuries, training, user };
  }, actions)(EnsureTrainingPlan);
};
