/**
 * Minimap navigation — pure, testable helpers (pin storage de/serialization,
 * label derivation, pin-jump targeting). DOM wiring (rail/drawer build, scroll
 * spy, drag-to-scrub) lives in `Minimap.astro`; this module has no DOM
 * dependency so it can be unit-tested in isolation.
 */

const STORAGE_PREFIX = 'plancha:minimap-pins:';

/** `localStorage` key for a page's pinned anchors (one set per scope). */
export function pinsKeyFor(scope: string): string {
  return `${STORAGE_PREFIX}${scope}`;
}

export function serializePins(ids: string[]): string {
  return JSON.stringify(ids);
}

/** Defensive parse: anything that isn't an array of strings becomes `[]`. */
export function parsePins(raw: string | null): string[] {
  if (!raw) return [];
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === 'string');
}

/** Toggles `id` in/out of a pin id list, returning a new array. */
export function togglePinned(ids: readonly string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
}

/** Strips HTML tags, for using verbatim question/title text as a plain label. */
export function stripTags(s: string): string {
  return s.replace(/<[^>]*>/g, '');
}

/** Truncates a label to `max` chars, appending an ellipsis when it overflows. */
export function truncateLabel(s: string, max = 52): string {
  const clean = s.trim();
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
}

/** Whether a set of picked option indices exactly matches the correct set. */
export function isCorrectPick(correct: readonly number[], picked: readonly number[]): boolean {
  return picked.length === correct.length && picked.every((p) => correct.includes(p));
}

/** id assigned to the n-th (0-based) top-level branch of a tema's outline tree. */
export function subBranchId(temaId: string, index: number): string {
  return `${temaId}-s${index + 1}`;
}

/** Label shown in the rail/drawer for a sub-branch ("<num>.<n> · <name>"). */
export function subBranchLabel(temaNum: string, index: number, name: string): string {
  return truncateLabel(`${temaNum}.${index + 1} · ${name}`, 52);
}

/**
 * Given all anchor ids in document order, the pinned subset, and the id of the
 * anchor currently in view, returns the id to jump to for n/p (next/previous
 * pinned) navigation — wrapping around at either end. `null` if nothing is
 * pinned.
 */
export function jumpPinTarget(
  orderedIds: readonly string[],
  pinned: ReadonlySet<string>,
  currentId: string | null,
  dir: 1 | -1,
): string | null {
  const pins = orderedIds.filter((id) => pinned.has(id));
  if (!pins.length) return null;
  const idx = currentId ? orderedIds.indexOf(currentId) : -1;
  if (dir > 0) {
    return pins.find((id) => orderedIds.indexOf(id) > idx) ?? pins[0];
  }
  const before = pins.filter((id) => orderedIds.indexOf(id) < idx);
  return before.length ? before[before.length - 1] : pins[pins.length - 1];
}
