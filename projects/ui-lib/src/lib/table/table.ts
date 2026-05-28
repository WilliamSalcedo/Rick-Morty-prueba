import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  header: string;
}

export interface TableAction<T> {
  action: 'view' | 'delete';
  row: T;
}


@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T extends Record<string, unknown>> {
  columns = input<TableColumn[]>([]);
  rows = input<T[]>([]);
  loading = input<boolean>(false);
  emptyMessage = input<string>('No hay resultados');
  errorMessage = input<string | null>(null);

  actionTriggered = output<TableAction<T>>();

  onAction(action: 'view' | 'delete', row: T): void {
    this.actionTriggered.emit({ action, row });
  }

  skeletonRows(): number[] {
    return new Array(5).fill(0).map((_: unknown, i: number) => i);
  }
}