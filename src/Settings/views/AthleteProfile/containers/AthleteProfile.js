import * as sty from './AthleteProfile.style.js';
import * as actions from '../../../actions';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  isBoolean as _isBoolean
} from 'lodash';
import { ProfileList } from '../components';

import { SceneContainer } from 'src/lib/components';

class _AthleteProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setEditingStatus(false);
  }

  setEditingStatus(value) {
    let status = value;
    if (!_isBoolean(value)) {
      status = !this.props.athleteProfile.editing;
    }

    this.props.setEditingStatus(status);
  }


  render() {
    const { athleteProfile: { editing }} = this.props;
    return (
      <SceneContainer
        style={ sty.wrapper }
        title='My Profile'
      >
        <ProfileList
          editing={ editing }
          { ...this.props.user } />
      </SceneContainer>
    );
  }
}

export const AthleteProfile = connect(({ athleteProfile, user }) => {
  return {
    athleteProfile,
    user
  };
}, actions)(_AthleteProfile);
