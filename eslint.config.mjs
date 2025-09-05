import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
    // Global ignores
    {
        ignores: [
            'build/**',
            'tailwind.css',
            'src/locales/**',
            'node_modules/**',
            '.d2/**',
        ],
    },
    
    // Base configuration for all JavaScript files
    {
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                // Browser globals
                window: 'readonly',
                document: 'readonly',
                console: 'readonly',
                clearTimeout: 'readonly',
                setTimeout: 'readonly',
                // Test globals
                cy: 'readonly',
                before: 'readonly',
                beforeEach: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly',
                Cypress: 'readonly',
                // App specific
                appPackage: 'readonly',
            },
        },
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            
            // Indentation and formatting
            'indent': ['error', 4],
            'jsx-quotes': ['error', 'prefer-single'],
            'comma-dangle': [
                'error',
                {
                    arrays: 'always-multiline',
                    objects: 'always-multiline',
                    imports: 'always-multiline',
                    exports: 'always-multiline',
                    functions: 'always-multiline',
                },
            ],
            
            // React specific
            'react/jsx-indent': ['warn', 4],
            'react/jsx-indent-props': ['error', 4],
            'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
            'react/prop-types': 'off',
            'react/require-default-props': 'off',
            'react/jsx-props-no-spreading': 'off',
            'react/function-component-definition': 'off',
            'react/button-has-type': 'off',
            
            // React Hooks
            'react-hooks/exhaustive-deps': 'error',
            'react-hooks/rules-of-hooks': 'error',
            
            // General rules
            'no-console': ['error', { allow: ['warn', 'error'] }],
            'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
            'no-param-reassign': 'off',
            'no-unused-expressions': 'off',
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'linebreak-style': 'off',
            'eol-last': ['error', 'always'],
            'max-len': ['error', { code: 150 }],
            'camelcase': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    
    // Configuration for TypeScript files
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                // Browser globals
                window: 'readonly',
                document: 'readonly',
                console: 'readonly',
                clearTimeout: 'readonly',
                setTimeout: 'readonly',
                // Test globals
                cy: 'readonly',
                before: 'readonly',
                beforeEach: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly',
                Cypress: 'readonly',
                // App specific
                appPackage: 'readonly',
                // TypeScript/React globals
                JSX: 'readonly',
                HTMLUListElement: 'readonly',
                CanvasRenderingContext2D: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tsPlugin.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            
            // Disable base rules that are covered by TypeScript
            'no-unused-vars': 'off',
            'no-redeclare': 'off',
            'no-shadow': 'off',
            'indent': 'off', // Disable to avoid conflicts with TypeScript
            
            // TypeScript specific rules
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
            '@typescript-eslint/no-unused-expressions': 'off',
            
            // React with TypeScript
            'react/jsx-indent': ['warn', 4],
            'react/jsx-indent-props': ['error', 4],
            'react/jsx-filename-extension': ['warn', { extensions: ['.ts', '.tsx'] }],
            'react/prop-types': 'off',
            'react/require-default-props': 'off',
            'react/jsx-props-no-spreading': 'off',
            'react/function-component-definition': 'off',
            'react/button-has-type': 'off',
            
            // React Hooks - relaxed for complex patterns
            'react-hooks/exhaustive-deps': 'warn',
            'react-hooks/rules-of-hooks': 'warn',
            
            // General rules
            'jsx-quotes': ['error', 'prefer-single'],
            'comma-dangle': [
                'error',
                {
                    arrays: 'always-multiline',
                    objects: 'always-multiline',
                    imports: 'always-multiline',
                    exports: 'always-multiline',
                    functions: 'always-multiline',
                },
            ],
            'no-console': 'off', // Allow console in TypeScript files for development
            'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
            'no-param-reassign': 'off',
            'no-unused-expressions': 'off',
            'linebreak-style': 'off',
            'eol-last': ['error', 'always'],
            'max-len': ['error', { code: 150 }],
            'camelcase': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    
    // Node.js configuration files
    {
        files: ['**/*.config.js', '**/d2.config.js', '**/postcss.config.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                module: 'readonly',
                exports: 'readonly',
                require: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                process: 'readonly',
                console: 'readonly',
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            'no-console': 'off',
            'indent': ['error', 4],
        },
    },
];