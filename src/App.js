import React from 'react';
import Plugin from './Plugin';
import './tailwind.css';
import './index.css';
// eslint-disable-next-line no-unused-vars
const query = { me: { resource: 'me' } };

const MyApp = () => (
    <div>
        <Plugin
            pluginSource={'http://localhost:3002/plugin.html'}
        />
    </div>
);

export default MyApp;
