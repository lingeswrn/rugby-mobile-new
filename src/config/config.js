import {
  FORGE_AUTH_ON_LOAD,
  FORGE_AUTH_PASSWORD,
  FORGE_AUTH_USERNAME,
  INSTABUG_TOKEN,
  STRIPE_TOKEN
} from 'react-native-dotenv';

export const config =  {
  forgeAuth: FORGE_AUTH_ON_LOAD,
  forgedCredentials: {
    // TODO: maybe don't expose plaintext credentials
    username: FORGE_AUTH_USERNAME,
    password: FORGE_AUTH_PASSWORD
  },
  INSTABUG_TOKEN,
  LOCAL_STORE_KEY: 'rugbyvault',

  // drawer menu items
  drawerItems: [{
    icon: 'tachometer',
    label: 'Home',
    to: '/'
  }, {
    icon: 'pencil-square-o',
    label: 'Daily Log',
    to: '/daily-log'
  }, {
    icon: 'flash',
    label: 'Workouts',
    to: '/weekly-routine'
  }, {
    icon: 'user',
    label: 'My Profile',
    to: '/account/athlete-profile'
  }, {
    icon: 'comment',
    label: 'Message Boards',
    to: '/messages'
  }, {
    icon: 'bar-chart',
    label: 'Fitness Tests',
    to: '/fitness-tests'
  }, {
    icon: 'clipboard',
    label: 'Assessments',
    to: '/assessments'
  }, {
    icon: 'exclamation-triangle',
    label: 'Injuries',
    to: '/injuries'
  }, {
    icon: 'envelope',
    label: 'Invitations',
    to: '/invitation'
  }, {
    icon: 'calendar-o',
    label: 'Fixture Schedule',
    to: '/matches'
  }, {
    icon: 'credit-card',
    label: 'Subscription',
    to: '/account/subscription'
  }],
  stripeToken: STRIPE_TOKEN,
  dataVersion: 20180110
};
