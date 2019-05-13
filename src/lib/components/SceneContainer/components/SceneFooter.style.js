import { colors, darken, lighten } from 'rbv-core/colors';

export const wrapper = {
  backgroundColor: 'transparent'
};
export const footerButton = {
  backgroundColor: 'transparent',
  paddingLeft: 10,
  paddingRight: 10,
  alignItems: 'center',
  justifyContent: 'space-between',
  flex: 1
};

export const icon = {
  fontSize: 22
};

export const buttonText = {
  fontSize: 10,
  fontWeight: '200'
};

export const gradient = [
  // darken(colors.gray.darker, 0.25),
  // darken(colors.gray.darker, 0.1),
];

export const activeTab = {
  footerButton: {
    ...footerButton,
    shadowColor: colors.gray.darkest
  },
  icon: {
    fontSize: 24,
    color: lighten(colors.primary.lighter, 0.15)
  },
  buttonText: {
    ...buttonText,
    color: lighten(colors.primary.lighter, 0.15),
    fontWeight: '400'
  },
  gradient: [
    colors.primary.dark,
    darken(colors.primary.dark, 0.1),
    darken(colors.primary.dark, 0.15)
  ]
};

export const disabledTab = {
  ...activeTab,
  buttonText: {
    ...activeTab.buttonText,
    color: colors.gray.dark
  },
  icon: {
    ...activeTab.icon,
    color: colors.gray.dark
  },
  gradient: [
    lighten(colors.gray.dark, 0.35),
    lighten(colors.gray.dark, 0.35)
  ]
};
export const image = {
  height: 16,
  width: 16
};
