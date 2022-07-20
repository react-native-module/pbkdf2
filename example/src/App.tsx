import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { pbkdf2 } from '@react-native-module/pbkdf2';
import { Buffer } from 'buffer';
import { pbkdf2Sync } from '../../src/node-api';

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();
  const [bufferResult, setBufferResult] = React.useState<string | undefined>();

  const expected =
    '120fb6cffcf8b32c43e7225256c4f837a86548c92ccc35480805987cb70be17b';
  React.useEffect(() => {
    pbkdf2('password', 'salt', 1, 32, 'sha256', (err, derivedKey) => {
      if (err) {
        console.warn(err.message);
      } else {
        setResult(derivedKey.toString('hex'));
      }
    });
    pbkdf2(
      Buffer.from('cGFzc3dvcmQ=', 'base64'), // password
      Buffer.from('c2FsdA==', 'base64'), // salt
      1,
      32,
      'sha256',
      (err, derivedKey) => {
        if (err) {
          console.warn(err.message);
        } else {
          setBufferResult(derivedKey.toString('hex'));
        }
      }
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text>String Result: {result}</Text>
      <Text>same Result: {result === expected ? 'Same' : 'Diff'}</Text>
      <Text>Buffer Result: {bufferResult}</Text>
      <Text>same Buffer Result: {result === expected ? 'Same' : 'Diff'}</Text>
      <Text>Equal: {result === bufferResult ? 'OK' : 'Error'}</Text>
      <Text>
        Expected:
        {expected}
      </Text>
      <Text>
        Sync: {pbkdf2Sync('password', 'salt', 1, 32, 'sha256').toString('hex')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
