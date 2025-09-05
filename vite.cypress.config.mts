import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        react({
            include: /\.(jsx?|tsx?)$/,
        }),
        tailwindcss(),
    ],
    resolve: { 
        alias: { 
            '@': path.resolve(__dirname, './src'),
        },
    },
    esbuild: {},
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
                '.ts': 'tsx',
            },
        },
    },
    define: {
        global: 'globalThis',
    },
});
