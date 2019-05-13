import {
  map as _map,
  range as _range,
  startCase as _startCase
} from 'lodash';
import moment from 'moment';

export const getProfileListData = ({ data, appConfig, athleteProfile }) => {
  return [
    {
      label: 'Personal Data',
      separator: true
    }, {
      label: 'Name',
      format: (value) => `${value.first} ${value.last}`,
      value: data.name,
      list: 'user',
      fields: [
        { pick: 'first', label: 'First Name' },
        { pick: 'last', label: 'Last Name' }
      ]
    }, {
      label: 'Email',
      value: data.email,
      list: 'user'
    }, {
      label: 'Date of Birth',
      format: (value) => moment.utc(value).format('DD MMMM, YYYY'),
      value: athleteProfile.dateOfBirth,
      list: 'athlete-profile',
      prop: 'dateOfBirth'
    }, {
      label: 'Height',
      format: (value) => `${value} in.`,
      value: athleteProfile.heightInInches,
      list: 'athlete-profile',
      prop: 'heightInInches',
      type: 'number'
    }, {
      label: 'Weight',
      format: (value) => `${value} kg.`,
      value: athleteProfile.massInKilograms,
      list: 'athlete-profile',
      prop: 'massInKilograms',
      type: 'number'
    }, {
      label: 'Training Data',
      separator: true,
    }, {
      label: 'Units of Measurement',
      format: (value) => _startCase(value),
      value: appConfig.units,
      list: 'user-app-config',
      prop: 'units',
      options: [
        { label: 'Imperial', value: 'imperial' },
        { label: 'Metric', value: 'metric' },
      ],
      description: 'choose between imperial (lbs, mi) and metric (kg, km) units in workouts and training data.'
    }, {
      label: 'Training Level',
      format: (value) => _startCase(value),
      value: athleteProfile.level,
      list: 'athlete-profile',
      prop: 'level',
      options: [
        { label: 'Junior', value: 'junior' },
        { label: 'Club', value: 'club' },
        { label: 'Elite', value: 'elite' },
      ]
    }, {
      label: 'Training Plan Gender',
      format: (value) => _startCase(value),
      value: athleteProfile.trainingPlanGender,
      options: [
        { value: 'female', label: 'Female' },
        { value: 'male', label: 'Male' }
      ],
      list: 'athlete-profile'
    }, {
      label: 'Weight Goal',
      format: (value) => _startCase(value),
      value: athleteProfile.weightGoal || 'maintain',
      options: [
        { value: 'gain', label: 'Gain' },
        { value: 'lose', label: 'Lose' },
        { value: 'maintain', label: 'Maintain' }
      ],
      list: 'athlete-profile'
    }, {
      label: 'Club Data',
      separator: true
    }, {
      label: 'Role',
      format: (value) => _startCase(value),
      value: data.clubRole,
      list: 'user',
      prop: 'clubRole',
      disabled: true
    }, {
      label: 'Gameday',
      value: athleteProfile.gameday,
      list: 'athlete-profile',
      prop: 'gameday',
      options: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ]
    }, {
      label: 'Current Season Cycle',
      format: (value) => `${_startCase(value)}-Season`,
      value: athleteProfile.currentSeasonCycle,
      list: 'athlete-profile',
      options: [
        { value: 'pre', label: 'Pre-season' },
        { value: 'in', label: 'In-season' },
        { value: 'post', label: 'Post-season' },
        { value: 'off', label: 'Off-season' }
      ]
    }, {
      label: 'Season Start Month',
      value: athleteProfile.seasonStartMonth,
      format: (value) => moment(value, 'M').format('MMMM'),
      list: 'athlete-profile',
      options: _map(_range(1, 13), (month) => {
        return {
          value: month,
          label: moment(month, 'M').format('MMMM')
        };
      })
    }

  ];
};
