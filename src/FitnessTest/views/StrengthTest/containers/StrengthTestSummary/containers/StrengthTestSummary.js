import * as sty from './StrengthTestSummary.style';
import * as actions from 'src/FitnessTest/actions';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SceneContainer } from 'src/lib/components';
import { withRouter } from 'react-router';
import { ActivityCompareList, ActivitySummaryList } from '../components';
import { isEmpty as _isEmpty } from 'lodash';

class _StrengthTestSummary extends Component {
  constructor(props) { super(props); }

  onPressStart = () => {
    this.props.onLeaveCompletedStrengthTest();
    this.props.history.push('/fitness-tests');
  }

  render() {
    const { previous, compiledActivities } = this.props;
    const ActivityList = _isEmpty(previous) ?
      ActivitySummaryList : ActivityCompareList;
    return (
      <SceneContainer
        title={ 'Strength Test' }
        subtitle={ 'Summary' }
        hideSceneFooter
        containerStyle={ sty.containerStyle }
        headerButtons={{
          left: 'none',
          right: {
            text: 'done',
            onPress: this.onPressStart
          }
        }}
      >
        <ActivityList activities={ compiledActivities } />
      </SceneContainer>
    );
  }
}

const mapStateToProps = ({ staticData, strengthTest }) => ({
  staticData, ...strengthTest
});

export const StrengthTestSummary = withRouter(connect(
  mapStateToProps, actions
)(_StrengthTestSummary));
