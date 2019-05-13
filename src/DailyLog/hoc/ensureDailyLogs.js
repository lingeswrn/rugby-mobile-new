import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Loader } from 'src/lib/components';
import { DailyLogService } from 'rbv-core/services/Rugbyvault/DailyLogService';

export function ensureDailyLogs(ComposedComponent) {
  class DailyLogHOC extends Component {
    constructor(props) {
      super(props);
    }

    fetchDailyLogs = () => {
      return this.props.DailyLogService().getOrCreate()
      .then(() => this.props.DailyLogService().getOrCreateCurrentEntry());
    };

    render() {
      return (
        <Loader
          title='Crunching Numbers'
          onMount={ this.fetchDailyLogs }
          id='ensureDailyLogs'
          path='/daily-log'
        >
          <ComposedComponent { ...this.props } />
        </Loader>
      );
    }
  }

  return withRouter(connect((state) => {
    return {
      dailyLogs: state.dailyLogs,
      user: state.user
    };
  }, { DailyLogService })(DailyLogHOC));
}
