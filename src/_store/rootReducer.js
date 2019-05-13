import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as network } from 'react-native-offline';
import { routerReducer as router } from 'react-router-redux';

import {
  appReducer as app,
  connectionReducer as connection,
  storageReducer as storage } from '../app/reducers';
import { assessmentsReducer as assessments } from '../Assessments/reducers';
import { athleteProfileReducer as athleteProfile } from '../Settings/reducers';
import { fitnessTestReducer as fitnessTest } from '../FitnessTest/reducers';
import { dailyLogReducer as dailyLogs } from '../DailyLog/reducers';
import { dashboardReducer as dashboard } from '../dashboard/reducers';
import { drawerReducer as drawer } from '../lib/components/Drawer/reducers';
import { injuriesReducer as injuries } from '../Injuries/reducers';
import { loaderReducer as loader } from '../lib/components/Loader/reducers';
import { matchesReducer as matches } from '../Matches/reducers';
import { realtimeReducer as realtime } from '../Messages/reducers';
import { strengthTestReducer as strengthTest } from '../FitnessTest/reducers';
import { subscriptionReducer as subscription } from '../Subscription/reducers';
import { trainingReducer as training } from '../training/reducers';
import { userReducer as user, staticDataReducer as staticData } from '../account/reducers';

export const rootReducer = combineReducers({
  app,
  assessments,
  athleteProfile,
  connection,
  dailyLogs,
  dashboard,
  drawer,
  fitnessTest,
  form,
  injuries,
  loader,
  matches,
  network,
  realtime,
  router,
  staticData,
  storage,
  strengthTest,
  subscription,
  training,
  user,
});
