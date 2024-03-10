import { defineConfig } from 'cypress';

export default defineConfig({
    video: false,
    component: {
        setupNodeEvents() {},
        devServer: {
            framework: 'create-react-app',
            bundler: 'webpack',
        },
    },
});
