import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Eye, Trash2, TriangleAlert, SearchX } from 'lucide-angular';

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
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T extends Record<string, unknown>> {
  readonly eyeIcon = Eye;
  readonly trashIcon = Trash2;
  readonly alertIcon = TriangleAlert;
  readonly searchXIcon = SearchX;
  columns = input<TableColumn[]>([]);
  rows = input<T[]>([]);
  loading = input<boolean>(false);
  emptyMessage = input<string>('No hay resultados');
  errorMessage = input<string | null>(null);
  showImage = input<boolean>(false);
  imageSource = input<string>('image');
  statusKey = input<string | null>(null);

  actionTriggered = output<TableAction<T>>();

  onAction(action: 'view' | 'delete', row: T): void {
    this.actionTriggered.emit({ action, row });
  }

  skeletonRows(): number[] {
    return new Array(5).fill(0).map((_: unknown, i: number) => i);
  }

  getNestedValue(row: T, key: string): unknown {
    return key.split('.').reduce((obj: unknown, keyPart: string) => {
      if (obj && typeof obj === 'object') {
        return (obj as Record<string, unknown>)[keyPart];
      }
      return null;
    }, row);
  }
}
