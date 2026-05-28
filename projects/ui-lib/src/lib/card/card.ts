import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  title = input<string>('');
  subtitle = input<string | null>(null);
  elevation = input<'flat' | 'raised' | 'outlined'>('flat');

  headerClicked = output<void>();

  onHeaderClick(): void {
    this.headerClicked.emit();
  }

  cardClasses(): string {
    const base = 'rounded-lg overflow-hidden w-full';

    const elevations = {
      flat: 'bg-gray-900 border border-gray-800',
      raised: 'bg-gray-900 border border-gray-800 shadow-lg shadow-black/50',
      outlined: 'bg-transparent border border-green-400',
    };

    return `${base} ${elevations[this.elevation()]}`;
  }
}
