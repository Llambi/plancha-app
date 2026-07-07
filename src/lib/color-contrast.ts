/** WCAG relative luminance / contrast ratio for hex colors. */

function srgbToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(hex: string): number {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

/** WCAG contrast ratio (1 to 21) between two hex colors, order-independent. */
export function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1) + 0.05;
  const l2 = relativeLuminance(hex2) + 0.05;
  return Math.max(l1, l2) / Math.min(l1, l2);
}
