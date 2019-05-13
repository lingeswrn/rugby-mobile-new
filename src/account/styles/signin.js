import { colors } from '../../lib/constants';
export default {
  container: {
    flex: 1,
    backgroundColor: colors.gray.darkest
  },
  form: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  inputs: {
    borderColor: colors.brand.primary,
    borderRadius: 10,
    borderWidth: 1,
    color: colors.brand.primary,
    height: 50,
    marginBottom: 10,
    marginLeft: 50,
    marginRight: 50,
    padding: 10,
    textAlign: 'center',
  },
  loginButton: {
    height: 50,
    alignSelf: 'stretch',
    marginLeft: 50,
    marginRight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.brand.primary,
    borderRadius: 10,
    margin: 20
  },
  loginButtonText: {
    color: colors.gray.lightest,
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center'
  },
  disabledButton: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.gray.primary
  },
  disabledButtonText: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.gray.darker,
    textAlign: 'center'
  },
  activeButton: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  activeButtonText: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.brand.primary,
    textAlign: 'center'
  }
};
