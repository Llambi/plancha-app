/** Metadatos de presentación por asignatura (nombre + acento). */
export interface AsignaturaMeta {
  code: string;
  nombre: string;
  sigla: string;
  accent: string;
}

export const ASIGNATURAS: Record<string, AsignaturaMeta> = {
  dar: {
    code: 'dar',
    nombre: 'Desarrollo de Aplicaciones en Red',
    sigla: 'DAR',
    accent: '#5F55FF', // darkened from #6C63FF for 4.5:1 contrast with white (issue #43)
  },
  soa: { code: 'soa', nombre: 'Sistemas Operativos Avanzados', sigla: 'SOA', accent: '#C41230' },
  si: { code: 'si', nombre: 'Sistemas Inteligentes', sigla: 'SI', accent: '#2D5BD7' },
  cl: { code: 'cl', nombre: 'Comunicación y Liderazgo', sigla: 'CL', accent: '#0f6e7e' },
  mongodb: { code: 'mongodb', nombre: 'MongoDB', sigla: 'DB', accent: '#00855f' },
};

export function meta(code: string): AsignaturaMeta {
  return (
    ASIGNATURAS[code] ?? {
      code,
      nombre: code.toUpperCase(),
      sigla: code.slice(0, 3).toUpperCase(),
      accent: '#5a5fd6',
    }
  );
}
