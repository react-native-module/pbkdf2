package com.reactnativepbkdf2;

import android.util.Base64;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import org.spongycastle.crypto.Digest;
import org.spongycastle.crypto.digests.SHA1Digest;
import org.spongycastle.crypto.digests.SHA256Digest;
import org.spongycastle.crypto.digests.SHA512Digest;
import org.spongycastle.crypto.digests.SHA224Digest;
import org.spongycastle.crypto.digests.SHA384Digest;
import org.spongycastle.crypto.digests.RIPEMD160Digest;
import org.spongycastle.crypto.generators.PKCS5S2ParametersGenerator;
import org.spongycastle.crypto.params.KeyParameter;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;

@ReactModule(name = Pbkdf2Module.NAME)
public class Pbkdf2Module extends ReactContextBaseJavaModule {
  public static final String NAME = "Pbkdf2";

  public Pbkdf2Module(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  public static String pbkdf2Native(String password, String salt, int iterations, int keySize, String hash) {
    byte[] decodedPassword = password.getBytes(StandardCharsets.UTF_8);
    byte[] decodedSalt = salt.getBytes(StandardCharsets.UTF_8);

    Digest digest = getDigestByName(hash);
    PKCS5S2ParametersGenerator gen = new PKCS5S2ParametersGenerator(digest);
    gen.init(decodedPassword, decodedSalt, iterations);
    byte[] key = ((KeyParameter) gen.generateDerivedParameters(keySize * 8)).getKey();
    // Cannot run on Test module or mock this
    // import android.util.Base64;
    // promise.resolve(Base64.encodeToString(key,Base64.DEFAULT));
    return toHex(key);
  }

  private static String toHex(byte[] bytes) {
    BigInteger bi = new BigInteger(1, bytes);
    return String.format("%0" + (bytes.length << 1) + "x", bi);
  }

  private static Digest getDigestByName(String digestName) {
    switch (digestName.toLowerCase()) {
      case "sha1":
        return new SHA1Digest();
      case "sha256":
        return new SHA256Digest();
      case "sha512":
        return new SHA512Digest();
      case "sha224":
        return new SHA224Digest();
      case "sha384":
        return new SHA384Digest();
      case "ripemd160":
        return new RIPEMD160Digest();
      default:
        throw new Error("Invalid digest:" + digestName.toLowerCase());
    }
  }

  @ReactMethod
  public void derive(String password, String salt, int iterations, int keySize, String hash, Promise promise) {
    promise.resolve(pbkdf2Native(password, salt, iterations, keySize, hash));
  }
}
