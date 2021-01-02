module.exports = {
	root: true,
	env: {
		node: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
		project: './tsconfig.eslint.json',
		tsconfigRootDir: __dirname,
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'prefer-const': 'error',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-unused-params': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
	},
};
