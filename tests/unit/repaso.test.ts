import { describe, it, expect } from 'vitest';
import { buildRepasoGroups } from '../../src/lib/repaso';
import type { SearchRecord } from '../../src/lib/search';

function record(
  overrides: Partial<SearchRecord> & Pick<SearchRecord, 'id' | 'asignatura'>,
): SearchRecord {
  return {
    asignaturaNombre: 'Sistemas Inteligentes',
    sigla: 'SI',
    accent: '#2D5BD7',
    tipo: 'practica',
    tipoLabel: 'Práctica de examen',
    titulo: '¿Pregunta?',
    texto: '¿Pregunta?',
    url: `/plancha-app/practica/${overrides.asignatura}#q-${overrides.id.split('-').pop()}`,
    ...overrides,
  };
}

describe('buildRepasoGroups()', () => {
  it('groups a subject whose failed ids have matching records', () => {
    const records = [record({ id: 'test-si-q1', asignatura: 'si' })];
    const groups = buildRepasoGroups(records, { si: ['q-q1'] });
    expect(groups).toEqual([
      {
        asignatura: 'si',
        asignaturaNombre: 'Sistemas Inteligentes',
        sigla: 'SI',
        accent: '#2D5BD7',
        items: records,
      },
    ]);
  });

  it('omits a subject whose failed id has no matching record', () => {
    const records = [record({ id: 'test-si-q2', asignatura: 'si' })];
    const groups = buildRepasoGroups(records, { si: ['q-q1'] });
    expect(groups).toEqual([]);
  });

  it('omits a subject with no failed ids', () => {
    const records = [record({ id: 'test-si-q1', asignatura: 'si' })];
    const groups = buildRepasoGroups(records, { si: [] });
    expect(groups).toEqual([]);
  });

  it('produces separate groups for failures across several subjects', () => {
    const siRecord = record({ id: 'test-si-q1', asignatura: 'si' });
    const darRecord = record({
      id: 'test-dar-q3',
      asignatura: 'dar',
      asignaturaNombre: 'Desarrollo de Aplicaciones en Red',
      sigla: 'DAR',
      accent: '#5F55FF',
    });
    const groups = buildRepasoGroups([siRecord, darRecord], { si: ['q-q1'], dar: ['q-q3'] });
    expect(groups).toHaveLength(2);
    expect(groups.find((g) => g.asignatura === 'si')?.items).toEqual([siRecord]);
    expect(groups.find((g) => g.asignatura === 'dar')?.items).toEqual([darRecord]);
  });

  it('only includes non-practica or unrelated records that are not requested', () => {
    const records = [
      record({ id: 'test-si-q1', asignatura: 'si' }),
      record({ id: 'test-si-q2', asignatura: 'si' }),
    ];
    const groups = buildRepasoGroups(records, { si: ['q-q1'] });
    expect(groups).toHaveLength(1);
    expect(groups[0].items).toEqual([records[0]]);
  });
});
