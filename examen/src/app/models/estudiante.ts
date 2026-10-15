export interface Estudiante {
  id: number;
  nombre: string;
  nota1: number;
  nota2: number;
  nota3: number;
}

export interface ResumenAcademico {
  suma: number;
  promedio: number;
  estado: 'Aprobado' | 'Desaprobado';
  observacion: 'Excelente' | 'Regular' | 'En riesgo';
}

export function calcularResumen(estudiante: Estudiante): ResumenAcademico {
  const suma = estudiante.nota1 + estudiante.nota2 + estudiante.nota3;
  const promedio = suma / 3;

  return {
    suma,
    promedio,
    estado: promedio >= 13 ? 'Aprobado' : 'Desaprobado',
    observacion: promedio >= 17 ? 'Excelente' : promedio >= 13 ? 'Regular' : 'En riesgo',
  };
}
