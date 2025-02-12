import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config({
    languageOptions: {
        parserOptions: {
            project: true,
            tsconfigRootDir: import.meta.dirname
        }
    },
    files: ['**/*.ts'],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommendedTypeChecked, eslintConfigPrettier],
    rules: {
        'no-console': 'warn',
        'no-useless-catch': 0,
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'default',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'allow'
            },
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE']
            },
            {
                selector: 'import',
                format: ['camelCase', 'PascalCase']
            },
            {
                selector: 'function',
                format: ['camelCase']
            },
            {
                selector: 'parameter',
                format: ['camelCase'],
                leadingUnderscore: 'allow'
            },
            {
                selector: 'class',
                format: ['PascalCase']
            },
            {
                selector: 'classProperty',
                format: ['camelCase', 'UPPER_CASE'],
                modifiers: ['static']
            },
            {
                selector: 'interface',
                format: ['PascalCase'],
                custom: {
                    regex: '^I[A-Z]',
                    match: true
                }
            },
            {
                selector: 'typeAlias',
                format: ['PascalCase']
            },
            {
                selector: 'enum',
                format: ['PascalCase']
            },
            {
                selector: 'enumMember',
                format: ['UPPER_CASE']
            },
            {
                selector: 'typeParameter',
                format: ['PascalCase', 'UPPER_CASE']
            },
            {
                selector: 'objectLiteralProperty',
                format: ['camelCase', 'UPPER_CASE']
            },
            {
                selector: 'objectLiteralMethod',
                format: ['camelCase', 'UPPER_CASE']
            }
        ],
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-call': 'off'
    }
})

