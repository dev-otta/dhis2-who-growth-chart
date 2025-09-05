const config = {
    type: 'app',
    name: 'capture-growth-chart',
    title: 'Capture Growth Chart',
    description: 'A plugin for displaying growth charts in the Capture app',
    minDHIS2Version: '2.38',
    entryPoints: { plugin: './src/Plugin.tsx' },
    viteConfigExtensions: 'vite.config.mts',
};

module.exports = config;
