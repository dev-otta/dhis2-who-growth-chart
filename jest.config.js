module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapping: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    testMatch: [
        '**/__tests__/**/*.(js|jsx|ts|tsx)',
        '**/*.(test|spec).(js|jsx|ts|tsx)',
    ],
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
        '!src/index.js',
    ],
    passWithNoTests: true,
};
