/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

// getViteConfig da acceso a los módulos virtuales de Astro (astro:content, etc.)
// por si un test necesita importar de src/content/config.ts.
export default getViteConfig({
  test: {
    include: ['tests/unit/**/*.{test,spec}.ts'],
    environment: 'node',
  },
});
