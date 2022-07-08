package com.reactnativepbkdf2;

//import static org.assertj.core.api.Assertions.*;

import android.app.Activity;
import android.app.PendingIntent.getActivity
import android.content.Context;

import com.facebook.react.bridge.PromiseImpl;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.Promise;
import org.assertj.core.api.Assertions.*

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;

//@Config(
//  application = TestApplication.class
//)

public class UnitTest {

//  private Pbkdf2Module pbkdf2;
  private lateinit var pbkdf2: Pbkdf2Module;

  // @BeforeEach
  // public void beforeEach() {
  @BeforeEach
  fun beforeEach() {
    // Retrieve application context.
    // Context applicationContext = Activity.getApplicationContext();
//    val applicationContext: Context = getApplicationContext

    // Recreate ReactApplicationContext which ReactModule depends upon.
    // ReactApplicationContext sole purpose as documented in its source code
    // is to preserve type integrity of ApplicationContext over Context
    // (which android Context obviously does not). This should be safe
    // thus. See my post here:
    // `https://stackoverflow.com/questions/49962298/writing-unit-test-for-react-native-native-android-methods`.
    // ReactApplicationContext reactApplicationContext = new ReactApplicationContext(applicationContext);
//    val reactApplicationContext: ReactApplicationContext = ReactApplicationContext(applicationContext);

    // Instantiate the module.
    //    reactModule = new ReactModule(reactApplicationContext);
//    pbkdf2 = Pbkdf2Module(reactApplicationContext);
    //    Pbkdf2Module pbkdf2 = new Pbkdf2Module();
  }

  // @Test
  // public void test() {
  @Test
  fun test() {
    assertThat("aaa").contains("a");

    // PromiseImpl p = new PromiseImpl();
//    val p: PromiseImpl = PromiseImpl();
//    assertThat(pbkdf2.derive("password", "salt", 1, 32, "", null))
//      .isNotNull;

  }
}

