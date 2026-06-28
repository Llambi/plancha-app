import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import prettier from 'eslint-config-prettier';

// Flat config. `eslint-config-prettier` va al final para desactivar las reglas de
// formato (de eso se encarga Prettier). El contenido de examen (src/content) NO se
// lintea ni se reformatea: debe permanecer verbatim (ver .claude/rules).
export default tseslint.config(
  {
    ignores: [
      'dist/',
      '.astro/',
      'node_modules/',
      'src/content/',
      'playwright-report/',
      'test-results/',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    // Scripts cliente embebidos en .astro corren en el navegador.
    files: ['**/*.astro'],
    languageOptions: {
      globals: { document: 'readonly', window: 'readonly', localStorage: 'readonly' },
    },
  },
  {
    // Postura de adopción: el linter ayuda sin bloquear por patrones preexistentes
    // del código cliente escrito a mano. Los errores reales (recommended) siguen
    // fallando la CI; estos quedan como aviso o desactivados con justificación.
    rules: {
      // Catch vacíos intencionales en scripts cliente: `try { … } catch {}`.
      'no-empty': ['error', { allowEmptyCatch: true }],
      // El sanitizador de MongoPractica casa caracteres de control a propósito.
      'no-control-regex': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'none' },
      ],
    },
  },
  prettier,
);
