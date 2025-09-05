import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const viteConfig = defineConfig((configEnv) => {
    const { mode } = configEnv;
    return {
        plugins: [
            react(),
            tailwindcss(),
        ],
        clearScreen: mode !== 'development',
        resolve: { 
            alias: { 
                '@': path.resolve(__dirname, './src'),
            },
        },
        esbuild: {
            loader: 'jsx',
            include: /.*\.jsx?$/,
        },
        optimizeDeps: {
            esbuildOptions: {
                loader: {
                    '.js': 'jsx',
                    '.ts': 'tsx',
                },
            },
        },
    };
});
export default viteConfig;
