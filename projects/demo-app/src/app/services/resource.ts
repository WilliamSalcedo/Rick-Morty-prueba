import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../models/character';
import { Episode } from '../models/episode';

export type ResourceType = 'character' | 'episode' | 'location';
export type StatusFilter = 'alive' | 'dead' | 'unknown' | '';
export type ResourceRow = Character | Episode;

interface ApiResponse<T> {
  results: T[];
}

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api';

  private readonly _resource = signal<ResourceType>('character');
  private readonly _status = signal<StatusFilter>('');
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);
  private readonly _characters = signal<Character[]>([]);
  private readonly _episodes = signal<Episode[]>([]);

  readonly resource = this._resource.asReadonly();
  readonly status = this._status.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly rows = computed<ResourceRow[]>(() => {
    if (this._resource() === 'episode') return this._episodes();
    return this._characters();
  });
  constructor(private readonly http: HttpClient) {}

  fetchCharacters(): void {
    this._loading.set(true);
    this._error.set(null);

    const status = this._status();
    const url = status
      ? `${this.baseUrl}/character?status=${status}`
      : `${this.baseUrl}/character`;

    this.http.get<ApiResponse<Character>>(url).subscribe({
      next: (response) => {
        this._characters.set(response.results);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('Could not connect to the dimension. Try again.');
        this._loading.set(false);
      },
    });
  }

  setStatus(status: StatusFilter): void {
    this._status.set(status);
    this.fetchCharacters();
  }

  setResource(resource: ResourceType): void {
    this._resource.set(resource);
    this._status.set('');
    if (resource === 'character') this.fetchCharacters();
    else if (resource === 'episode') this.fetchEpisodes();
  }

  fetchEpisodes(): void {
    this._loading.set(true);
    this._error.set(null);

    const url = `${this.baseUrl}/episode`;

    this.http.get<ApiResponse<Episode>>(url).subscribe({
      next: (response) => {
        this._episodes.set(response.results);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('Could not connect to the dimension. Try again.');
        this._loading.set(false);
      },
    });
  }
}
