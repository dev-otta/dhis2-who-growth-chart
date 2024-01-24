import React from 'react'
import Plugin from "./Plugin";

const query = {
    me: {
        resource: 'me',
    },
}

const MyApp = () => (
    <div>
        <Plugin
            pluginSource={'http://localhost:3002/plugin.html'}
        />
    </div>
)

export default MyApp
