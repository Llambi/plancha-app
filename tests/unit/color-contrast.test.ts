import { describe, it, expect } from 'vitest';
import { contrastRatio } from '../../src/lib/color-contrast';

describe('contrastRatio()', () => {
  it('is 21:1 for black vs white (WCAG max)', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 1);
  });

  it('is 1:1 for a color against itself', () => {
    expect(contrastRatio('#ffffff', '#ffffff')).toBeCloseTo(1, 5);
  });

  it('is order-independent', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(contrastRatio('#ffffff', '#000000'), 5);
  });

  it('matches the original DAR accent falling short of 4.5:1 (issue #43)', () => {
    expect(contrastRatio('#6C63FF', '#ffffff')).toBeCloseTo(4.32, 1);
  });
});
