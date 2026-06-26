// @ts-check
import { defineConfig } from 'astro/config';
import { BASE, SITE } from './src/data/site';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: SITE,
  base: BASE,
});
