import { describe, it, expect } from 'vitest';
import {
  pinsKeyFor,
  serializePins,
  parsePins,
  togglePinned,
  stripTags,
  truncateLabel,
  subBranchId,
  subBranchLabel,
  jumpPinTarget,
  isCorrectPick,
} from '../../src/lib/minimap';

describe('pinsKeyFor()', () => {
  it('namespaces the key by scope', () => {
    expect(pinsKeyFor('practica-si')).toBe('plancha:minimap-pins:practica-si');
    expect(pinsKeyFor('esquemas-soa')).toBe('plancha:minimap-pins:esquemas-soa');
  });
});

describe('serializePins()/parsePins()', () => {
  it('round-trips an id list', () => {
    expect(parsePins(serializePins(['q-1', 't1-s2']))).toEqual(['q-1', 't1-s2']);
  });

  it('returns [] for null/empty/invalid input', () => {
    expect(parsePins(null)).toEqual([]);
    expect(parsePins('')).toEqual([]);
    expect(parsePins('{not json')).toEqual([]);
  });

  it('returns [] when the value is not an array', () => {
    expect(parsePins(JSON.stringify({ a: 1 }))).toEqual([]);
    expect(parsePins('42')).toEqual([]);
  });

  it('drops non-string entries instead of throwing', () => {
    expect(parsePins(JSON.stringify(['q-1', 2, null, 'q-2']))).toEqual(['q-1', 'q-2']);
  });
});

describe('togglePinned()', () => {
  it('adds an id that is not pinned yet', () => {
    expect(togglePinned(['q-1'], 'q-2')).toEqual(['q-1', 'q-2']);
  });

  it('removes an id that is already pinned', () => {
    expect(togglePinned(['q-1', 'q-2'], 'q-1')).toEqual(['q-2']);
  });
});

describe('stripTags()', () => {
  it('removes inline HTML tags, keeping the text', () => {
    expect(stripTags('¿Qué es <code>O(n)</code>?')).toBe('¿Qué es O(n)?');
  });
});

describe('truncateLabel()', () => {
  it('keeps short labels untouched', () => {
    expect(truncateLabel('1 · Pregunta corta', 52)).toBe('1 · Pregunta corta');
  });

  it('truncates with an ellipsis past the max length', () => {
    const long = '1 · ' + 'x'.repeat(60);
    const out = truncateLabel(long, 52);
    expect(out.length).toBe(52);
    expect(out.endsWith('…')).toBe(true);
  });
});

describe('subBranchId()/subBranchLabel()', () => {
  it('derives a stable id and label from the tema id/num and index', () => {
    expect(subBranchId('t1', 0)).toBe('t1-s1');
    expect(subBranchId('t1', 2)).toBe('t1-s3');
    expect(subBranchLabel('1', 0, 'Estados de un proceso')).toBe('1.1 · Estados de un proceso');
  });
});

describe('isCorrectPick()', () => {
  it('is true only when picked exactly matches correct (order-independent)', () => {
    expect(isCorrectPick([0, 2], [2, 0])).toBe(true);
    expect(isCorrectPick([1], [1])).toBe(true);
  });

  it('is false for unanswered, partial or wrong picks', () => {
    expect(isCorrectPick([1], [])).toBe(false);
    expect(isCorrectPick([0, 2], [0])).toBe(false);
    expect(isCorrectPick([0], [1])).toBe(false);
  });
});

describe('jumpPinTarget()', () => {
  const order = ['q-1', 'q-2', 'q-3', 'q-4', 'q-5'];
  const pinned = new Set(['q-2', 'q-4']);

  it('jumps forward to the next pinned id after the current one', () => {
    expect(jumpPinTarget(order, pinned, 'q-1', 1)).toBe('q-2');
    expect(jumpPinTarget(order, pinned, 'q-2', 1)).toBe('q-4');
  });

  it('wraps around to the first pin when past the last one', () => {
    expect(jumpPinTarget(order, pinned, 'q-4', 1)).toBe('q-2');
    expect(jumpPinTarget(order, pinned, 'q-5', 1)).toBe('q-2');
  });

  it('jumps backward to the previous pinned id before the current one', () => {
    expect(jumpPinTarget(order, pinned, 'q-5', -1)).toBe('q-4');
    expect(jumpPinTarget(order, pinned, 'q-4', -1)).toBe('q-2');
  });

  it('wraps around to the last pin when before the first one', () => {
    expect(jumpPinTarget(order, pinned, 'q-2', -1)).toBe('q-4');
    expect(jumpPinTarget(order, pinned, 'q-1', -1)).toBe('q-4');
  });

  it('returns null when nothing is pinned', () => {
    expect(jumpPinTarget(order, new Set(), 'q-1', 1)).toBeNull();
  });

  it('falls back to the first/last pin when there is no current anchor', () => {
    expect(jumpPinTarget(order, pinned, null, 1)).toBe('q-2');
    expect(jumpPinTarget(order, pinned, null, -1)).toBe('q-4');
  });
});
