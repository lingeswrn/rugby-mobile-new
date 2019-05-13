import * as actions from '../actions';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Loader } from 'src/lib/components';


export function getDashboardData(ComposedComponent) {
  class HOC extends Component {
    constructor(props) { super(props); }

    fetchData = async() => {
      if (this.props.locationState) {
        if (this.props.locationState.skipFetchData) return Promise.resolve();
      }
      if (!this.props.user.data.athleteProfile.strengthTest) {
        await this.props.setFirstTestFlag(true);
        return this.props.history.replace('/strength-test/introduction');
      }
      await this.props.setFirstTestFlag(false);
      await this.props.getPrevStrengthTest();
      await this.props.getBeepTests();
      return Promise.resolve();
    }

    render() {
      return (
        <Loader
          id='getDashboardData'
          onMount={ this.fetchData }
          title='Getting Previous Tests'
          path='/fitness-tests'
        >
          <ComposedComponent { ...this.props } />
        </Loader>
      );
    }
  }

  const mapStateToProps = ({ user, strengthTest, fitnessTest, router }) => ({
    user,
    strengthTest,
    fitnessTest,
    units: user.data.appConfig.units,
    locationState: router.location.state
  });

  return withRouter(connect(mapStateToProps, actions)(HOC));
}
