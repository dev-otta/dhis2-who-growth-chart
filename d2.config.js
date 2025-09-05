const config = {
    type: 'app',
    id: '09f48f78-b67c-4efa-90ad-9ac2fed53bb8',
    name: 'capture-growth-chart',
    title: 'Capture Growth Chart',
    description: 'A plugin for displaying growth charts in the Capture app',
    minDHIS2Version: '2.38',
    entryPoints: { plugin: './src/Plugin.tsx' },
    viteConfigExtensions: 'vite.config.mts',
};

module.exports = config;
