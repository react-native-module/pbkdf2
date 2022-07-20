package com.reactnativepbkdf2;

import static org.assertj.core.api.Assertions.*;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.Hex;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

class Unit {
  public String key;
  public byte[] keyBytes;
  public String salt;
  public int iterations;
  public int dkLen;
  public HashMap<String, String> results;

  public static String UTF8ToBase64(String utf8String) {
    return Base64.encodeBase64String(utf8String.getBytes());
  }

  public static String HexStringToBase64(String hexString) {
    try {
      return Base64.encodeBase64String(
        Hex.decodeHex(hexString.toCharArray())
      );
    } catch (Exception e) {
      System.out.println(e);
      return "";
    }
  }



  public Unit(int iterations, int dkLen, HashMap<String, String> results) {
    this.iterations = iterations;
    this.dkLen = dkLen;
    this.results = results;
  }

  public Unit(String key, String salt, int iterations, int dkLen, HashMap<String, String> results) {
    this.key = key;
    this.salt = salt;
    this.iterations = iterations;
    this.dkLen = dkLen;
    this.results = results;
  }

  public Unit(byte[] keyBytes, String salt, int iterations, int dkLen, HashMap<String, String> results) {
    this.keyBytes = keyBytes;
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
      Unit.UTF8ToBase64("password"),
      Unit.UTF8ToBase64("salt"),
      1,
      32,
      new HashMap<String, String>() {
        {
          put("sha1", Unit.HexStringToBase64("0c60c80f961f0e71f3a9b524af6012062fe037a6e0f0eb94fe8fc46bdc637164"));
          put("sha256", Unit.HexStringToBase64("120fb6cffcf8b32c43e7225256c4f837a86548c92ccc35480805987cb70be17b"));
          put("sha512", Unit.HexStringToBase64("867f70cf1ade02cff3752599a3a53dc4af34c7a669815ae5d513554e1c8cf252"));
          put("sha224", Unit.HexStringToBase64("3c198cbdb9464b7857966bd05b7bc92bc1cc4e6e63155d4e490557fd85989497"));
          put("sha384", Unit.HexStringToBase64("c0e14f06e49e32d73f9f52ddf1d0c5c7191609233631dadd76a567db42b78676"));
          put("ripemd160", Unit.HexStringToBase64("b725258b125e0bacb0e2307e34feb16a4d0d6aed6cb4b0eee458fc1829020428"));
        }
      }
    ));
    valid.add(new Unit(
      Base64.encodeBase64String("password".getBytes()),
      Base64.encodeBase64String("salt".getBytes()),
      2,
      32,
      new HashMap<String, String>() {
        {
          put("sha1", Unit.HexStringToBase64("ea6c014dc72d6f8ccd1ed92ace1d41f0d8de8957cae93136266537a8d7bf4b76"));
          put("sha256", Unit.HexStringToBase64("ae4d0c95af6b46d32d0adff928f06dd02a303f8ef3c251dfd6e2d85a95474c43"));
          put("sha512", Unit.HexStringToBase64("e1d9c16aa681708a45f5c7c4e215ceb66e011a2e9f0040713f18aefdb866d53c"));
          put("sha224", Unit.HexStringToBase64("93200ffa96c5776d38fa10abdf8f5bfc0054b9718513df472d2331d2d1e66a3f"));
          put("sha384", Unit.HexStringToBase64("54f775c6d790f21930459162fc535dbf04a939185127016a04176a0730c6f1f4"));
          put("ripemd160", Unit.HexStringToBase64("768dcc27b7bfdef794a1ff9d935090fcf598555e66913180b9ce363c615e9ed9"));
        }
      }
    ));
    valid.add(new Unit(
      Base64.encodeBase64String("password".getBytes()),
      Base64.encodeBase64String("salt".getBytes()),
      1,
      64,
      new HashMap<String, String>() {
        {
          put("sha1", Unit.HexStringToBase64("0c60c80f961f0e71f3a9b524af6012062fe037a6e0f0eb94fe8fc46bdc637164ac2e7a8e3f9d2e83ace57e0d50e5e1071367c179bc86c767fc3f78ddb561363f"));
          put("sha256", Unit.HexStringToBase64("120fb6cffcf8b32c43e7225256c4f837a86548c92ccc35480805987cb70be17b4dbf3a2f3dad3377264bb7b8e8330d4efc7451418617dabef683735361cdc18c"));
          put("sha512", Unit.HexStringToBase64("867f70cf1ade02cff3752599a3a53dc4af34c7a669815ae5d513554e1c8cf252c02d470a285a0501bad999bfe943c08f050235d7d68b1da55e63f73b60a57fce"));
          put("sha224", Unit.HexStringToBase64("3c198cbdb9464b7857966bd05b7bc92bc1cc4e6e63155d4e490557fd859894978ab846d52a1083ac610c36c2c5ea8ce4a024dd691064d5453bd17b15ea1ac194"));
          put("sha384", Unit.HexStringToBase64("c0e14f06e49e32d73f9f52ddf1d0c5c7191609233631dadd76a567db42b78676b38fc800cc53ddb642f5c74442e62be44d727702213e3bb9223c53b767fbfb5d"));
          put("ripemd160", Unit.HexStringToBase64("b725258b125e0bacb0e2307e34feb16a4d0d6aed6cb4b0eee458fc18290204289e55d962783bf52237d264cbbab25f18d89d8c798f90f558ea7b45bdf3d08334"));
        }
      }
    ));
    valid.add(new Unit(
      Base64.encodeBase64String("password".getBytes()),
      Base64.encodeBase64String("salt".getBytes()),
      2,
      64,
      new HashMap<String, String>() {
        {
          put("sha1", Unit.HexStringToBase64("ea6c014dc72d6f8ccd1ed92ace1d41f0d8de8957cae93136266537a8d7bf4b76c51094cc1ae010b19923ddc4395cd064acb023ffd1edd5ef4be8ffe61426c28e"));
          put("sha256", Unit.HexStringToBase64("ae4d0c95af6b46d32d0adff928f06dd02a303f8ef3c251dfd6e2d85a95474c43830651afcb5c862f0b249bd031f7a67520d136470f5ec271ece91c07773253d9"));
          put("sha512", Unit.HexStringToBase64("e1d9c16aa681708a45f5c7c4e215ceb66e011a2e9f0040713f18aefdb866d53cf76cab2868a39b9f7840edce4fef5a82be67335c77a6068e04112754f27ccf4e"));
          put("sha224", Unit.HexStringToBase64("93200ffa96c5776d38fa10abdf8f5bfc0054b9718513df472d2331d2d1e66a3f97b510224f700ce72581ffb10a1c99ec99a8cc1b951851a71f30d9265fccf912"));
          put("sha384", Unit.HexStringToBase64("54f775c6d790f21930459162fc535dbf04a939185127016a04176a0730c6f1f4fb48832ad1261baadd2cedd50814b1c806ad1bbf43ebdc9d047904bf7ceafe1e"));
          put("ripemd160", Unit.HexStringToBase64("768dcc27b7bfdef794a1ff9d935090fcf598555e66913180b9ce363c615e9ed953b95fd07169be535e38afbea29c030e06d14f40745b1513b7ccdf0e76229e50"));
        }
      }
    ));
    valid.add(new Unit(
      Base64.encodeBase64String("password".getBytes()),
      Base64.encodeBase64String("salt".getBytes()),
      4096,
      32,
      new HashMap<String, String>() {
        {
          put("sha1", Unit.HexStringToBase64("4b007901b765489abead49d926f721d065a429c12e463f6c4cd79401085b03db"));
          put("sha256", Unit.HexStringToBase64("c5e478d59288c841aa530db6845c4c8d962893a001ce4e11a4963873aa98134a"));
          put("sha512", Unit.HexStringToBase64("d197b1b33db0143e018b12f3d1d1479e6cdebdcc97c5c0f87f6902e072f457b5"));
          put("sha224", Unit.HexStringToBase64("218c453bf90635bd0a21a75d172703ff6108ef603f65bb821aedade1d6961683"));
          put("sha384", Unit.HexStringToBase64("559726be38db125bc85ed7895f6e3cf574c7a01c080c3447db1e8a76764deb3c"));
          put("ripemd160", Unit.HexStringToBase64("99a40d3fe4ee95869791d9faa24864562782762171480b620ca8bed3dafbbcac"));
        }
      }
    ));
    valid.add(new Unit(
      Base64.encodeBase64String("passwordPASSWORDpassword".getBytes()),
      Base64.encodeBase64String("saltSALTsaltSALTsaltSALTsaltSALTsalt".getBytes()),
      4096,
      40,
      new HashMap<String, String>() {
        {
          put("sha1", Unit.HexStringToBase64("3d2eec4fe41c849b80c8d83662c0e44a8b291a964cf2f07038b6b89a48612c5a25284e6605e12329"));
          put("sha256", Unit.HexStringToBase64("348c89dbcbd32b2f32d814b8116e84cf2b17347ebc1800181c4e2a1fb8dd53e1c635518c7dac47e9"));
          put("sha512", Unit.HexStringToBase64("8c0511f4c6e597c6ac6315d8f0362e225f3c501495ba23b868c005174dc4ee71115b59f9e60cd953"));
          put("sha224", Unit.HexStringToBase64("056c4ba438ded91fc14e0594e6f52b87e1f3690c0dc0fbc05784ed9a754ca780e6c017e80c8de278"));
          put("sha384", Unit.HexStringToBase64("819143ad66df9a552559b9e131c52ae6c5c1b0eed18f4d283b8c5c9eaeb92b392c147cc2d2869d58"));
          put("ripemd160", Unit.HexStringToBase64("503b9a069633b261b2d3e4f21c5d0cafeb3f5008aec25ed21418d12630b6ce036ec82a0430ef1974"));
        }
      }
    ));
//    @TODO : fix this test
//    valid.add(new Unit(
//      "pass\\u00000word",
//      "sa\\u00000lt",
//      4096,
//      16,
//      new HashMap<String, String>() {
//        {
//          put("sha1", "345cbad979dfccb90cac5257bea6ea46");
//          put("sha256", "1df6274d3c0bd2fc7f54fb46f149dda4");
//          put("sha512", "336d14366099e8aac2c46c94a8f178d2");
//          put("sha224", "0aca9ca9634db6ef4927931f633c6453");
//          put("sha384", "b6ab6f8f6532fd9c5c30a79e1f93dcc6");
//          put("ripemd160", "914d58209e6483e491571a60e433124a");
//        }
//      }
//    ));
//    @TODO : fix this test
//    valid.add(new Unit(
//      ef6000709456e8e6f60ee52f723456b3570990f0d68993d2260c99a48c68183c
//      Hex.encodeHexString("63ffeeddccbbaa".getBytes(StandardCharsets.UTF_8)),
//      "63ffeeddccbbaa",
//        "Y//u3cy7qg==",
//      new byte[] {
//        54,  51, 102, 102, 101,
//        101, 100, 100,  99,  99,
//        98,  98,  97,  97
//      },
//             new byte[] {
//               89,  47, 47, 117,  51,
//               99, 121, 55, 113, 103,
//               61,  61
//       },
//       "salt",
//       1,
//       32,
//       new HashMap<String, String>() {
//         {
//           put("sha1", "f6635023b135a57fb8caa89ef8ad93a29d9debb1b011e6e88bffbb212de7c01c");
// //          string 63ffeeddccbbaa =>
// //          1a12b21aa46bd3bed3a23b8ad072a1465585344b1516252618aabbc41276dada
// //          "63ffeeddccbbaa".getBytes(StandardCharsets.UTF_8) =>
// //          ef6000709456e8e6f60ee52f723456b3570990f0d68993d2260c99a48c68183c
// //          new byte[] {
// //            54,  51, 102, 102, 101,
// //            101, 100, 100,  99,  99,
// //            98,  98,  97,  97
// //          } =>
// //          ef6000709456e8e6f60ee52f723456b3570990f0d68993d2260c99a48c68183c (same)
//           // node에서 문자열은 UTF-16임 (기본)
//           put("sha256", "dadd4a2638c1cf90a220777bc85d81859459513eb83063e3fce7d081490f259a");
//           put("sha512", "f69de451247225a7b30cc47632899572bb980f500d7c606ac9b1c04f928a3488");
//           put("sha224", "9cdee023b5d5e06ccd6c5467463e34fe461a7ed43977f8237f97b0bc7ebfd280");
//           put("sha384", "25c72b6f0e052c883a9273a54cfd41fab86759fa3b33eb7920b923abaad62f99");
//           put("ripemd160", "08609cb567308b81164fe1307c38bb9b87b072a756ce8d74760c4d216ee4e9fb");
//         }
//       }
//     ));
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
        String result;
        if (null != u.keyBytes) {
          result = Pbkdf2Module.pbkdf2Native(u.keyBytes, u.salt, u.iterations, u.dkLen, entry.getKey());
        } else {
          result = Pbkdf2Module.pbkdf2Native(u.key, u.salt, u.iterations, u.dkLen, entry.getKey());
        }
        assertThat(result).isEqualTo(entry.getValue());
      }
    }
  }
}
