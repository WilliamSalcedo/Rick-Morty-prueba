import { Component } from '@angular/core';
import { ButtonComponent, CardComponent, TableComponent } from 'ui-lib';
import { TableColumn } from 'ui-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent, CardComponent, TableComponent],
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
}
