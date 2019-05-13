import React, { Component } from 'react';
import { Switch, Route } from 'react-router-native';
import _ from 'lodash';
import { Drawer } from 'src/lib/components';
import { RouteAnimation } from './RouteAnimation';
import { ConnectionStatus } from '../components';

import { requireUser } from '../hoc';
const routes = _.concat([],
  require('src/account/routes').AccountRoutes,
  require('src/Assessments/routes').AssessmentsRoutes,
  require('src/DailyLog/routes').DailyLogRoutes,
  require('src/dashboard/routes').DashboardRoutes,
  require('src/FitnessTest/routes').FitnessTestRoutes,
  require('src/Injuries/routes').InjuriesRoutes,
  require('src/Matches/routes').MatchesRoutes,
  require('src/Messages/routes').MessageRoutes,
  require('src/Settings/routes').SettingsRoutes,
  require('src/Subscription/routes').SubscriptionRoutes,
  require('src/training/routes').TrainingRoutes,

  require('src/testing_only/routes').TestRoutes
);
class _AppRoutes extends Component {
  constructor(props) { super(props); }

  renderRoutes() {
    return _.map(routes, ({ ...rest }, index) =>
      <Route exact key={ index } { ...rest } />
    );
  }

  render() {
    const { history, location } = this.props;
    return (
      <Drawer>
        <ConnectionStatus>
          <RouteAnimation history={ history } location={ location }>
            <Switch location={ location }>{ this.renderRoutes() }</Switch>
          </RouteAnimation>
        </ConnectionStatus>
      </Drawer>
    );
  }
}

export const AppRoutes = requireUser(_AppRoutes);
