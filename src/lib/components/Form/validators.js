
export const required = value => value ? undefined : 'Required';

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = min => value =>
  value && value.length > min ?
    `Must be at least ${min} characters` :
    undefined;

export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

export const minValue = (value) => {
  // console.log({ value });
  return value && value.length < 8 ?
  {
    message: 'Password must be at least 8 characters',
    code: 'validation error/short password'
  } : undefined;
};


export const isEmail = (value) => {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  {
    message: 'Enter a valid email address',
    code: 'validation error/invalid email'
  } : undefined;
};
