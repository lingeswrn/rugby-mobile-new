package com.rugbyvault;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.gettipsi.stripe.StripeReactPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.microsoft.codepush.react.CodePush;
import com.instabug.reactlibrary.RNInstabugReactnativePackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.beefe.picker.PickerViewPackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
// import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new StripeReactPackage(),
            new SplashScreenReactPackage(),
            new LinearGradientPackage(),
            new KCKeepAwakePackage(),
            new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
            		new RNInstabugReactnativePackage.Builder("YOUR_ANDROID_APPLICATION_TOKEN",MainApplication.this)
							.setInvocationEvent("shake")
							.setPrimaryColor("#1D82DC")
							.setFloatingEdge("left")
							.setFloatingButtonOffsetFromTop(250)
							.build(),
            new RNSoundPackage(),
            new PickerViewPackage(),
            new RNFirebaseAuthPackage(),
            new RNFirebaseMessagingPackage(),
        		new RNInstabugReactnativePackage.Builder(BuildConfig.INSTABUG_TOKEN,MainApplication.this)
    					.setInvocationEvent("shake")
    					.setPrimaryColor("#DE2629")
    					.setFloatingEdge("left")
    					.setFloatingButtonOffsetFromTop(250)
    					.build()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index.android";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  // @Override
  // protected String getJSBundleFile() {
  //     return CodePush.getJSBundleFile();
  // }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
