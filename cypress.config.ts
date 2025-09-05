import { defineConfig } from 'cypress';

export default defineConfig({
    video: false,

    component: {
        setupNodeEvents() {},
        devServer: {
            framework: 'react',
            bundler: 'vite',
            viteConfig: {
                configFile: './vite.cypress.config.mts',
            },
        },
    },

    e2e: {
        setupNodeEvents() {
      // implement node event listeners here
        },
    },
});
