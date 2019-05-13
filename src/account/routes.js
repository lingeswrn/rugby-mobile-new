
import { LoginScreen } from './containers/LoginScreen';
import { Onboarding, InvitationList } from './views';

export const AccountRoutes = [
  {
    component: LoginScreen,
    path: '/login'
  },
  {
    component: Onboarding,
    path: '/onboarding'
  },
  {
    component: InvitationList,
    path: '/invitation'
  }
];
