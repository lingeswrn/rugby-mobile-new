import { colors } from '../../lib/constants';

export default {
  form: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  inputs: {
    height: 50,
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 0,
    padding: 10,
    borderRadius: 10,
    borderColor: colors.brand.primary,
    textAlign: 'center',
    color: colors.brand.primary
  },
  loginButton: {
    height: 50,
    alignSelf: 'stretch',
    marginLeft: 0,
    marginRight: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.brand.primary,
    borderRadius: 10,
    margin: 20
  },
  loginButtonText: {
    fontSize: 24,
    fontWeight: '400',
    color: colors.gray.lightest,
    textAlign: 'center'
  },
  acceptTerms: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  eulaText: {
    fontSize: 16,
    color: colors.gray.primary,
    marginLeft: 10,
    textDecorationLine: 'underline'
  }
};
