package com.reactnativepbkdf2;

import static org.assertj.core.api.Assertions.*;
import org.junit.jupiter.api.Test;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

class Unit {
  public String key;
  public String salt;
  public int iterations;
  public int dkLen;
  public HashMap<String, String> results;

  public Unit(String key, String salt, int iterations, int dkLen, HashMap<String, String> results) {
    this.key = key;
    this.salt = salt;
    this.iterations = iterations;
    this.dkLen = dkLen;
    this.results = results;
  }
}

class UnitArray {
  public ArrayList<Unit> valid = new ArrayList<Unit>();
  public ArrayList<Unit> inValId = new ArrayList<Unit>();
  public UnitArray() {
    valid.add(new Unit(
      "password",
      "salt",
      1,
      32,
      new HashMap<String, String>() {
        {
          put("sha1", "0c60c80f961f0e71f3a9b524af6012062fe037a6e0f0eb94fe8fc46bdc637164");
          put("sha256", "120fb6cffcf8b32c43e7225256c4f837a86548c92ccc35480805987cb70be17b");
          put("sha512", "867f70cf1ade02cff3752599a3a53dc4af34c7a669815ae5d513554e1c8cf252");
          put("sha224", "3c198cbdb9464b7857966bd05b7bc92bc1cc4e6e63155d4e490557fd85989497");
          put("sha384", "c0e14f06e49e32d73f9f52ddf1d0c5c7191609233631dadd76a567db42b78676");
          put("ripemd160", "b725258b125e0bacb0e2307e34feb16a4d0d6aed6cb4b0eee458fc1829020428");
        }
      }
    ));
  }
}

public class UnitTest {

   @Test
   public void test() {
     // this test from
     // https://github.com/crypto-browserify/pbkdf2/blob/a458d11da613fd4b14651b52e2b1caaa6977b089/test/index.js
     UnitArray unitArray = new UnitArray();
     for (Unit u : unitArray.valid) {
       for (Map.Entry<String, String> entry: u.results.entrySet()) {
         String result = Pbkdf2Module.pbkdf2Native(u.key, u.salt, u.iterations, u.dkLen, entry.getKey());
         assertThat(result).isEqualTo(entry.getValue());
       }
     }
  }
}
