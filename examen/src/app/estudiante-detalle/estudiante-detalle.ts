import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { calcularResumen, Estudiante } from '../models/estudiante';
import { EstudianteService } from '../services/estudiante.service';

@Component({
  imports: [DecimalPipe, RouterLink],
  selector: 'app-estudiante-detalle',
  templateUrl: './estudiante-detalle.html',
})
export class EstudianteDetalle {
  private readonly route = inject(ActivatedRoute);
  private readonly estudianteService = inject(EstudianteService);

  readonly estudiante = signal<Estudiante | null>(null);
  readonly resumen = computed(() => {
    const estudiante = this.estudiante();
    return estudiante ? calcularResumen(estudiante) : null;
  });
  readonly cargando = signal(true);
  readonly noEncontrado = signal(false);
  readonly error = signal(false);

  constructor() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = Number(params.get('id'));
          return this.estudianteService.estudiantes$.pipe(
            map((estudiantes) => estudiantes.find((estudiante) => estudiante.id === id) ?? null),
          );
        }),
      )
      .subscribe({
        next: (estudiante) => {
          this.estudiante.set(estudiante);
          this.noEncontrado.set(estudiante === null);
          this.cargando.set(false);
        },
        error: (error: unknown) => {
          console.error('No se pudo cargar el detalle del estudiante.', error);
          this.error.set(true);
          this.cargando.set(false);
        },
      });
  }
}
