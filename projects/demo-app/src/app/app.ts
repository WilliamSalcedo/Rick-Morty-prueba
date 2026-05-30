import { Component, OnInit, signal } from '@angular/core';
import { TableComponent, SelectComponent } from 'ui-lib';
import type { TableColumn, SelectOption } from 'ui-lib';
import { ResourceService } from './services/resource';
import type { StatusFilter, ResourceType, ResourceRow } from './services/resource';
import { HeaderComponent } from './components/header/header';
import { DetailModalComponent } from './components/detail-modal/detail-modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TableComponent, SelectComponent, HeaderComponent, DetailModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  constructor(protected readonly resourceService: ResourceService) {}

  selectedRow: ResourceRow | null = null;
  statusValue = signal<string | null>(null);

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
    this.statusValue.set(null);
    this.resourceService.setResource(resource as ResourceType);
  }

  get rows(): ResourceRow[] {
    return this.resourceService.rows();
  }

  onViewAction(event: { action: 'view' | 'delete'; row: ResourceRow }): void {
    if (event.action === 'view') {
      this.selectedRow = event.row;
    } else {
      console.log('Delete action triggered:', event.row);
    }
  }

  onCloseModal(): void {
    this.selectedRow = null;
  }

  onRetry(): void {
    this.resourceService.setResource(this.resourceService.resource());
  }
}
