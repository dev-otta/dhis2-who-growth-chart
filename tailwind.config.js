module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            transitionProperty: { width: 'width' },
            colors: {
                'dhis-light': '#79B9E3',
                'dhis-dark': '#3A668F',
                'dhis-secondary': '#1F78B4',
            },
        },
    },
    plugins: [
        // eslint-disable-next-line global-require, import/no-unresolved
        require('@tailwindcss/line-clamp'),
    ],
};
