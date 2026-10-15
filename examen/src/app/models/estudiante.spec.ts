import { calcularResumen, Estudiante } from './estudiante';

describe('calcularResumen', () => {
  const crearEstudiante = (nota1: number, nota2: number, nota3: number): Estudiante => ({
    id: 1,
    nombre: 'Estudiante de prueba',
    nota1,
    nota2,
    nota3,
  });

  it('calcula la suma, el promedio y el resultado de un estudiante regular', () => {
    expect(calcularResumen(crearEstudiante(16, 18, 15))).toEqual({
      suma: 49,
      promedio: 49 / 3,
      estado: 'Aprobado',
      observacion: 'Regular',
    });
  });

  it('clasifica los promedios desde 17 como excelentes', () => {
    expect(calcularResumen(crearEstudiante(17, 17, 17))).toMatchObject({
      estado: 'Aprobado',
      observacion: 'Excelente',
    });
  });

  it('clasifica los promedios menores que 13 como en riesgo', () => {
    expect(calcularResumen(crearEstudiante(12, 12, 12))).toMatchObject({
      estado: 'Desaprobado',
      observacion: 'En riesgo',
    });
  });
});
