import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu({
  react: true,
  jsx: true,
  typescript: true,
  rules: {
    'unused-imports/no-unused-vars': 'off',
    'react-refresh/only-export-components': 'off',
    'style/indent': 'off',
  },

}, ...compat.config({
  extends: ['plugin:tailwindcss/recommended'],
}))
