module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    // Tus reglas personalizadas aquí
    "react/react-in-jsx-scope": "off", // No es necesario importar React cuando se usa Next.js
    'jsx-a11y/anchor-is-valid': 'off', // No es necesario que los enlaces tengan una referencia
  },
};
