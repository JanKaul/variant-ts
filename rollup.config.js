import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'es'
    },
    plugins: [nodeResolve({ browser: true, preferBuiltins: false }), commonjs(), typescript({
        target: "es2020", declaration: true, outDir: "dist", esModuleInterop: true
    })]
};