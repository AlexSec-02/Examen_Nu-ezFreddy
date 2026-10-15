import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Estudiante } from '../models/estudiante';
import { EstudianteService } from '../services/estudiante.service';

@Component({
  imports: [RouterLink],
  selector: 'app-estudiante-lista',
  templateUrl: './estudiantes.html',
})
export class EstudianteLista {
  private readonly estudianteService = inject(EstudianteService);

  readonly estudiantes = signal<Estudiante[]>([]);
  readonly cargando = signal(true);
  readonly error = signal(false);

  constructor() {
    this.estudianteService.estudiantes$.subscribe({
      next: (estudiantes) => {
        this.estudiantes.set(estudiantes);
        this.cargando.set(false);
      },
      error: (error: unknown) => {
        console.error('No se pudo cargar la lista de estudiantes.', error);
        this.error.set(true);
        this.cargando.set(false);
      },
    });
  }
}
