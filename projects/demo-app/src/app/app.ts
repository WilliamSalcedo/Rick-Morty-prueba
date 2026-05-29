import { Component, OnInit } from '@angular/core';
import { TableComponent, SelectComponent } from 'ui-lib';
import type { TableColumn, SelectOption } from 'ui-lib';
import { ResourceService } from './services/resource';
import type { StatusFilter } from './services/resource';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TableComponent, SelectComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  constructor(protected readonly resourceService: ResourceService) {}

  ngOnInit(): void {
    this.resourceService.fetchCharacters();
  }

  columns: TableColumn[] = [
    { key: 'name', header: 'Name' },
    { key: 'species', header: 'Species' },
    { key: 'status', header: 'Status' },
    { key: 'origin.name', header: 'Origin' },
    { key: 'location.name', header: 'Location' },
  ];

  statusOptions: SelectOption[] = [
    { label: 'Alive', value: 'alive' },
    { label: 'Dead', value: 'dead' },
    { label: 'Unknown', value: 'unknown' },
  ];

  onStatusChange(status: string): void {
    this.resourceService.setStatus(status as StatusFilter);
  }
}
