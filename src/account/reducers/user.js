import types, { _global } from 'src/actionTypes';
import { LOAD } from 'redux-storage';
import { assign as _assign } from 'lodash';
const INITIAL_STATE = {
  account: {},
  authenticating: false,
  data: {},
  isAuthenticated: false,
  isNewAccount: false,
  onboardingStage: 'profile',
  organizations: {
    all: [],
    active: {},
    invitations: []
  }
};

export function userReducer(state = INITIAL_STATE, { type, payload, meta }) {
  switch (type) {
    case _global.SYNC: return { ...state, data: payload.user };
    case types.REFRESH_USER: return { ...state, ...payload };
    case types.USER_AUTH_ATTEMPT: return { ...state, account: payload };
    case types.RESET_DATA_VERSION_CHANGE: case types.GET_USER_CUSTOM_DATA:
      return { ...state, ...payload };
    case types.USER_IS_AUTHENTICATING:
      return { ...state, authenticating: payload };
    case types.SET_AUTH_STATUS: return { ...state, isAuthenticated: payload };
    case types.MODIFY_ATHLETE_PROFILE: {
      return {
        ...state,
        data: {
          ...state.data,
          athleteProfile: { ...state.data.athleteProfile, ...payload }
        }
      };
    }
    case types.CREATE_ACCOUNT: return { ...state, ...payload };
    case types.MODIFY_USER_ACCOUNT:
      return { ...state, account: _assign(state.account, payload) };
    case types.SET_ONBOARDING_STAGE:
      return { ...state, ...payload };
    case types.MODIFY_APP_CONFIG:
      return {
        ...state,
        data: {
          ...state.data, appConfig: { ...state.data.appConfig, ...payload }
        }
      };
    case types.GET_INVITATIONS:
      return {
        ...state,
        organizations: {
          ...state.organizations,
          invitations: payload
        }
      };
    case 'SET_USER_STATUS_FLAG': return { ...state, ...payload };
    case 'UPDATE_USER_DATA/EXTERNAL':
      if (!meta || !meta.list) {
        console.warn('Action ignored. `UPDATE_USER_DATA` requires an action with `meta` property, which much specify `list` being updated');
        return state;
      }

      switch(meta.list) {
        case 'user': return { ...state, data: { ...state.data, ...payload }};
        case 'athlete-profile':
          return { ...state,
            data: { ...state.data,
              athleteProfile: { ...state.data.athleteProfile, ...payload }
            }
          };
        case 'user-app-config':
          return { ...state,
            data: { ...state.data,
              appConfig: { ...state.data.appConfig, ...payload }
            }
          };
        case 'strength-test':
          return { ...state,
            data: { ...state.data,
              athleteProfile: { ...state.data.athleteProfile,
                strengthTest: payload
              }
            }
          };
        default: return state;
      }
    case _global.RESET_USER_DATA: return INITIAL_STATE;
    case 'RESET_TRAINING_PLAN':
      return {
        ...state,
        data: {
          ...state.data,
          athleteProfile: {
            ...state.data.athleteProfile, activeTrainingPlan: undefined
          }
        }
      };
    case LOAD: return { ...state, isAuthenticated: false };
    default: return state;
  }
}
