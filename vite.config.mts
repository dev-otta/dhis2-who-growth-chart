import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const viteConfig = defineConfig(async (configEnv) => {
    const { mode } = configEnv;
    return {
        plugins: [
            tailwindcss(),
        ],
        clearScreen: mode !== 'development',
        resolve: { 
            alias: { 
                '@': path.resolve(__dirname, './src'),
            },
        },
    };
});
export default viteConfig;
