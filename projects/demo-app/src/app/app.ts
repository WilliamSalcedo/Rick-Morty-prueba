import { Component } from '@angular/core';
import { ButtonComponent, CardComponent, TableComponent, SelectComponent } from 'ui-lib';
import type { TableColumn, SelectOption } from 'ui-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent, CardComponent, TableComponent, SelectComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  columns: TableColumn[] = [
    { key: 'name', header: 'Name' },
    { key: 'species', header: 'Species' },
    { key: 'status', header: 'Status' },
  ];

  rows = [
    { name: 'Rick Sanchez', species: 'Human', status: 'Alive' },
    { name: 'Morty Smith', species: 'Human', status: 'Alive' },
    { name: 'Alien Googah', species: 'Alien', status: 'Dead' },
  ];

  resourceOptions: SelectOption[] = [
    { label: 'Characters', value: 'characters' },
    { label: 'Episodes', value: 'episodes' },
    { label: 'Locations', value: 'locations' },
  ];

  statusOptions: SelectOption[] = [
    { label: 'Alive', value: 'alive' },
    { label: 'Dead', value: 'dead' },
    { label: 'Unknown', value: 'unknown' },
  ];
}
