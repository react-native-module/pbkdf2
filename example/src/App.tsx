import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { pbkdf2 } from '@react-native-module/pbkdf2';
import { Buffer } from 'buffer';

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();
  const [bufferResult, setBufferResult] = React.useState<string | undefined>();

  React.useEffect(() => {
    pbkdf2('cGFzc3dvcmQ=', 'c2FsdA==', 1, 16, 'sha256', (err, derivedKey) => {
      if (err) {
        console.warn(err.message);
      } else {
        setResult(derivedKey.toString('hex'));
      }
    });
    pbkdf2(
      Buffer.from('cGFzc3dvcmQ=', 'base64'),
      Buffer.from('c2FsdA==', 'base64'),
      1,
      16,
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
      <Text>Result: {result}</Text>
      <Text>Buffer Result: {bufferResult}</Text>
      <Text>Equal: {result === bufferResult ? 'OK' : 'Error'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
