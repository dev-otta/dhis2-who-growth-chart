import React from 'react';
import Plugin from './Plugin';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const query = { me: { resource: 'me' } };

const MyApp = () => (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
        <Plugin
            pluginSource={'http://localhost:3002/plugin.html'}
        />
    </div>
);

export default MyApp;
