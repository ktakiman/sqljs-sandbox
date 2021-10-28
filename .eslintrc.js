module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "semi": ["error", "always"],
    "indent": ["warn", 2],
    "react/prop-types": "off"
  }
};
