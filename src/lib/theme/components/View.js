import variable from './../variables/platform';

export default (variables = variable) => {
  const viewTheme = {
    '.padder': {
      padding: variables.contentPadding
    },
    'flex': 1
  };


  return viewTheme;
};
