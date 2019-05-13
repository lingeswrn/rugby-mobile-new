export const button = (hidden, left) => {
  const display = hidden ? { display: 'none' } : {};
  const leftButton = left ? { marginRight: 20 } : {};
  return {
    flex: 1,
    ...display,
    ...leftButton
  };
};

export const submitButton = {
  flex: 1,
  marginRight: 20
};

export const resetButton = {
  flex: 1,
};

export const shitButton = {
  flex: 1,
  marginLeft: 20,
  display: 'none'
};

export const buttonContainer = {
  // marginBottom: 25,
  flexDirection: 'row',
  justifyContent: 'space-around'
};
