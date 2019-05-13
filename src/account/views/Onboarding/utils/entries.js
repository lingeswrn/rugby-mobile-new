import _ from 'lodash';
export const entries = [
  { title: 'welcome to rugbyvault',
    description: 'Before you get started, you\'ll need to complete your athlete profile. Rugbyvault uses data from your athlete profile to customize your training plan.',
    buttonLabel: 'get started',
    hideBack: true
  },
  { title: 'name',
    description: '',
    fields: [
      {
        label: 'given name',
        name: 'firstname',
        iconName: 'address-card',
        // formProps: { parse: (val) => _.upperFirst(val) }
      },
      { label: 'surname',
        name: 'lastname',
        iconName: 'address-card-o',
        // formProps: { parse: (val) => _.upperFirst(val) }
      }
    ]
  },
  { title: 'date of birth',
    description: '',
    fields: [{
      iconName: 'calendar-o',
      label: 'date of birth',
      name: 'dateOfBirth',
      format: 'D MMMM, YYYY',
      type: 'date'
    }]
  },
  { title: 'region',
    description: 'choose wisely; you won\'t be able to change this later.',
    fields: [
      { label: 'region', name: 'region', iconName: 'globe',
        options: [
          { label: 'Australia', key: 'australia' },
          { label: 'New Zealand', key: 'new zealand' },
          { label: 'United Kingdom', key: 'united kingdom' },
          { label: 'United States', key: 'united states' },
          { label: 'Other', key: 'other' }
        ]
      }
    ]
  },
  { title: 'units of measurement',
    fields: [
      { label: 'units', name: 'units', iconName: 'globe',
        options: [
          { label: 'Metric', key: 'metric' },
          { label: 'Imperial', key: 'imperial' }
        ]
      }
    ]
  },
  { title: 'height',
    description: '(in inches)',
    fields: [
      { label: 'height',
        name: 'heightInInches',
        iconName: 'angle-up',
        units: 'in',
        options: _.map(_.range(48, 96), (int) => ({
          label: int.toString(), key: int
        })),
      }
    ]
  },
  { title: 'mass',
    description: '(in kilograms)',
    fields: [
      { label: 'mass',
        name: 'massInKilograms',
        iconName: 'tachometer', units: 'kg',
        options: _.map(_.range(50, 200), (int) => ({
          label: int.toString(), key: int
        }))
      }
    ]
  },
  { title: 'gender',
    description: '',
    fields: [
      { label: 'gender',
        name: 'trainingPlanGender',
        iconName: 'venus-mars',
        options: [
          { label: 'Male', key: 'male' }, { label: 'Female', key: 'female' }
        ]
      }
    ]
  },
  { title: 'training level',
    description: '',
    fields: [
      { label: 'level',
        name: 'level',
        iconName: 'cubes',
        options: [
          { label: 'Junior', key: 'junior' },
          { label: 'Club', key: 'club' },
          { label: 'Elite', key: 'elite' }
        ]
      }
    ]
  },
  { title: 'game day',
    description: 'the day you typically have fixtures',
    fields: [
      { label: 'gameday',
        name: 'gameday',
        iconName: 'calendar',
        options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      }
    ]
  },
  { title: 'weight goal',
    buttonLabel: 'done',
    hideBack: true,
    fields: [
      { label: 'weight goal',
        name: 'weightGoal',
        iconName: 'balance-scale',
        options: [
          { key: 'gain', label: 'Gain' },
          { key: 'lose', label: 'Lose' },
          { key: 'maintain', label: 'Maintain' }
        ]
      },
    ]
  },
  { title: 'excellent work',
    description: 'You\'ve just about got it. Now on to our final step: the Strength Test',
    buttonLabel: 'onward',
    complete: true,
    hideBack: true
  }
];
