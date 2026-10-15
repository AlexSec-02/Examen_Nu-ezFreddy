import { Routes } from '@angular/router';
import { EstudianteDetalle } from './estudiante-detalle/estudiante-detalle';
import { EstudianteLista } from './estudiantes/estudiantes';

export const routes: Routes = [
  { path: '', component: EstudianteLista },
  { path: 'estudiante/:id', component: EstudianteDetalle },
  { path: '**', redirectTo: '' },
];
