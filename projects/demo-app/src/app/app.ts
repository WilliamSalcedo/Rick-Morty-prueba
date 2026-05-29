import { Component, OnInit } from '@angular/core';
import { TableComponent, SelectComponent } from 'ui-lib';
import type { TableColumn, SelectOption } from 'ui-lib';
import { ResourceService } from './services/resource';
import type { StatusFilter, ResourceType, ResourceRow } from './services/resource';
import { HeaderComponent } from './components/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TableComponent, SelectComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  constructor(protected readonly resourceService: ResourceService) {}

  ngOnInit(): void {
    this.resourceService.fetchCharacters();
  }

  get columns(): TableColumn[] {
    const resource = this.resourceService.resource();

    if (resource === 'episode') {
      return [
        { key: 'name', header: 'Name' },
        { key: 'episode', header: 'Code' },
        { key: 'air_date', header: 'Air Date' },
      ];
    }

      if (resource === 'location') {
        return [
          { key: 'name', header: 'Name' },
          { key: 'type', header: 'Type' },
          { key: 'dimension', header: 'Dimension' },
        ];
      }

    return [
      { key: 'name', header: 'Name' },
      { key: 'species', header: 'Species' },
      { key: 'status', header: 'Status' },
      { key: 'origin.name', header: 'Origin' },
      { key: 'location.name', header: 'Location' },
    ];
  }

  statusOptions: SelectOption[] = [
    { label: 'Alive', value: 'alive' },
    { label: 'Dead', value: 'dead' },
    { label: 'Unknown', value: 'unknown' },
  ];

  resourceOptions: SelectOption[] = [
    { label: 'Characters', value: 'character' },
    { label: 'Episodes', value: 'episode' },
    { label: 'Locations', value: 'location' },
  ];

  onStatusChange(status: string): void {
    this.resourceService.setStatus(status as StatusFilter);
  }

  onResourceChange(resource: string): void {
    this.resourceService.setResource(resource as ResourceType);
  }

  get rows(): ResourceRow[] {
    return this.resourceService.rows();
  }
}
