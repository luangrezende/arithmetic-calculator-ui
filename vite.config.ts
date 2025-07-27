import path from 'path';
import checker from 'vite-plugin-checker';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const PORT = 3040;

export default defineConfig({
    plugins: [
        react(),
        checker({
            typescript: true,
            eslint: {
                lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
                dev: { logLevel: ['error'] },
            },
            overlay: {
                position: 'tl',
                initialIsOpen: false,
            },
        }),
    ],
    define: {
        __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    },
    resolve: {
        alias: [
            {
                find: /^~(.+)/,
                replacement: path.join(process.cwd(), 'node_modules/$1'),
            },
            {
                find: /^src(.+)/,
                replacement: path.join(process.cwd(), 'src/$1'),
            },
        ],
    },
    assetsInclude: ['**/*.svg'],
    server: {
        port: PORT,
        host: true,
    },
    preview: {
        port: PORT,
        host: true,
    },
});
