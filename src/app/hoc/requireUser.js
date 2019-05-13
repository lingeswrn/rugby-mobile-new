import * as actions from 'src/account/actions';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'src/lib/components/Loader';
import { withRouter } from 'react-router';
import _ from 'lodash';

export function requireUser(ComposedComponent) {
  class AuthProvider extends Component {
    constructor(props) {
      super(props);
      this.state = {
        complete: false,
        loaderText: 'Updating User Data',
        runningAuthCheck: true
      };
    }

    componentWillMount() {
      this.runAuthCheck();
    }

    runAuthCheck() {
      const { runningAuthCheck } = this.state;
      if (!runningAuthCheck) {
        this.setState({ runningAuthCheck: true });
      }
      if (this.props.location.pathname === '/login') {
        this.setState({ runningAuthCheck: false });
      } else {
        this.props.checkAuthStatus()
        .then(() => this.setState({ runningAuthCheck: false }))
        .catch(() => this.setState({ runningAuthCheck: false }));
      }
    }

    getAuthStatus() {
      const { pathname } = this.props.location;
      const {
        authenticating, isAuthenticated, isNewAccount, onboardingStage
      } = this.props.user;
      const { runningAuthCheck } = this.state;
      // will check auth status unless an excepting condition is met
      switch (true) {
        case runningAuthCheck:
          // console.log('already checking auth');
          break;
        case (pathname === '/login' || _.includes(pathname, 'onboarding')):
          // console.log('already logging in');
          this.setState({ complete: true, runningAuthCheck: false }); break;
        case isNewAccount:
          // console.log('is new account');
          this.props.history.push('/onboarding');
          this.setState({ complete: true, runningAuthCheck: false }); break;
        // user tries to go to training activity without completing str. test
        case (onboardingStage === 'strength-test' && (
          _.includes(pathname, 'weekly-routine') ||
          _.includes(pathname, 'workout')
        )):
          // console.log('onboarding stage is strength-test');
          this.props.history.push('/strength-test/introduction', {
            showRedirectAlert: true
          });
          this.setState({ complete: true, runningAuthCheck: false }); break;
        case isAuthenticated:
          // console.log('user is authenticated');
          this.setState({ complete: true, runningAuthCheck: false }); break;
        case authenticating:
          // console.log('currently authenticating');
          break;
        case (!isAuthenticated):
          // console.log('pushing to login');
          this.props.history.push('/login');
          break;
        default:
          // console.log('all tests passed; running auth check');
          this.runAuthCheck();
          break;
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      const { location = {}, user = {}} = nextProps;
      switch(true) {
        // router has changed
        case (!_.isMatch(location, this.props.location)):
          // console.log('router changed');
          return true;
        // user has changed
        case (!_.isMatch(user, this.props.user)):
          // console.log('user changed');
          return true;
        // local state has changed
        case (!_.isMatch(nextState, this.state)):
          // console.log('local state changed');
          return true;
        default: return false;
      }
    }

    componentDidUpdate(prevProps) {
      const wasAuthenticated = prevProps.user.isAuthenticated;
      const { isAuthenticated, isNewAccount } = this.props.user;
      if (!wasAuthenticated && isAuthenticated) {
        // console.log('user auth status changed');
        if (isNewAccount) this.props.history.push('/onboarding');
        else {
          let pathname = '/';
          if (
            this.props.history.entries.length &&
            _.last(this.props.history.entries).pathname !== '/login'
          ) pathname = _.last(this.props.history.entries).pathname;
          this.props.history.push(pathname);
        }
      } else this.getAuthStatus();
    }

    render() {
      const { complete, loaderText } = this.state;
      if (complete) return <ComposedComponent { ...this.props } />;
      return <Loader title={ loaderText } />;
    }
  }

  return withRouter(connect(({ router, user }) => ({
    router,
    user
  }), actions)(AuthProvider));
}
