import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import Pbkdf2 from 'react-native-fast-pbkdf2';

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();

  React.useEffect(() => {
    (async () => {
      let res = await Pbkdf2.derive(
        'cGFzc3dvcmQ=',
        'c2FsdA==',
        1,
        16,
        'sha-256'
      );
      console.warn(res);
      setResult(res);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
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
