import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Estudiante } from '../models/estudiante';

@Injectable({ providedIn: 'root' })
export class EstudianteService {
  private readonly http = inject(HttpClient);

  readonly estudiantes$: Observable<Estudiante[]> = this.http
    .get<Estudiante[]>('https://careli2021.github.io/api_examen/api/estudiante.json')
    .pipe(shareReplay({ bufferSize: 1, refCount: false }));
}
