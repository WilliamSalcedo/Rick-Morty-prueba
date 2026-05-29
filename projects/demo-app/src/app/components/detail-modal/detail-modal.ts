import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'ui-lib';
import type { ResourceType, ResourceRow } from '../../services/resource';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-detail-modal',
  standalone: true,
  imports: [CommonModule, CardComponent, LucideAngularModule],
  templateUrl: './detail-modal.html',
  styleUrl: './detail-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailModalComponent {
  row = input<ResourceRow | null>(null);
  resourceType = input<ResourceType>('character');

  closed = output<void>();
  readonly xIcon = X;

  onClose(): void {
    this.closed.emit();
  }

  getNestedField(key: string, nested: string): unknown {
    const row = this.row();
    if (!row) return null;
    const parent = row[key];
    if (parent && typeof parent === 'object') {
      return (parent as Record<string, unknown>)[nested];
    }
    return null;
  }

  getEpisodeCount(): number {
    const row = this.row();
    if (!row) return 0;
    const episodes = row['episode'];
    if (Array.isArray(episodes)) return episodes.length;
    return 0;
  }

  getCharacterCount(): number {
    const row = this.row();
    if (!row) return 0;
    const characters = row['characters'];
    if (Array.isArray(characters)) return characters.length;
    return 0;
  }

  getResidentCount(): number {
    const row = this.row();
    if (!row) return 0;
    const residents = row['residents'];
    if (Array.isArray(residents)) return residents.length;
    return 0;
  }
}
