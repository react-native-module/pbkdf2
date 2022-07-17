#import "Pbkdf2.h"
#import <CommonCrypto/CommonCrypto.h>

@implementation Pbkdf2

RCT_EXPORT_MODULE()

// Example method
// See // https://reactnative.dev/docs/native-modules-ios
RCT_REMAP_METHOD(derive,
                 withPassword:(nonnull NSString*)password
                 withSalt:(nonnull NSString*)salt
                 withRounds:(nonnull NSNumber*)rounds
                 withKeyLength:(nonnull NSNumber*)keyLength
                 withHash:(nonnull NSString*)hash
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    
    NSMutableData *derivedKey = [NSMutableData dataWithLength: [keyLength unsignedIntValue]];
    NSData *passwordData = [[NSData alloc] initWithBase64EncodedString:password options:0];
    NSData *saltData = [[NSData alloc] initWithBase64EncodedString:salt options:0];
    
    CCPseudoRandomAlgorithm prf = kCCPRFHmacAlgSHA1;
    if ([hash isEqualToString:@"sha512"]) {
        prf = kCCPRFHmacAlgSHA512;
    }
    if ([hash isEqualToString:@"sha256"]) {
        prf = kCCPRFHmacAlgSHA256;
    }

    CCKeyDerivationPBKDF(kCCPBKDF2,               // algorithm
                         passwordData.bytes,           // password
                         passwordData.length,          // passwordLength
                         saltData.bytes,              // salt
                         saltData.length,             // saltLen
                         prf,       // PRF
                         [rounds unsignedIntValue],                  // rounds
                         derivedKey.mutableBytes, // derivedKey
                         derivedKey.length);      // derivedKeyLen

    resolve([derivedKey base64EncodedStringWithOptions:0]);
}

@end
