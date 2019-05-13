import Bug from 'instabug-reactnative';
import { config } from 'src/config';

class Instabug {
  constructor() {
    Bug.setColorTheme(Bug.colorTheme.light);
    Bug.startWithToken(config.INSTABUG_TOKEN, [Bug.invocationEvent.none]);
  }

  invoke(getState) {
    const { email, name } = getState().user.data;
    Bug.identifyUserWithEmail(email, `${name.first} ${name.last}`);
    Bug.invoke();
  }
}

export const InstabugService = new Instabug();
