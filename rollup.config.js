import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const inputSrc = [
  ['./src/index.ts', 'es', 'module'],
  ['./src/index.ts', 'cjs', 'commonjs'],
];

const extensions = ['js', '.mjs', '.json', '.ts', '.native.ts', '.native.js'];

export default inputSrc.map(([input, format, directoryName]) => {
  return {
    input,
    output: {
      dir: `lib/${directoryName}`,
      format,
    },
    preserveModules: true,
    external: ['buffer', '@react-native-module/utility'],
    plugins: [
      typescript(),
      nodeResolve(),
      // https://velog.io/@peterkimzz/rollup-%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8
      // CommonJS 로 작성된 모듈들을 ES6 바꾸어서 rollup이 해석할 수 있게 도와줍니다.
      commonjs({
        extensions,
      }),
    ],
  };
});
