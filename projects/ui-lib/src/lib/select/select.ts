import { Component, ChangeDetectionStrategy, input, output, model } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.html',
  styleUrl: './select.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  options = input<SelectOption[]>([]);
  label = input<string>('');
  placeholder = input<string>('Select an option');
  loading = input<boolean>(false);
  disabled = input<boolean>(false);

  value = model<string | null>(null);

  selectionChange = output<SelectOption>();

  onChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const selectedOption = this.options().find((option) => option.value === select.value) ?? null;
    this.value.set(selectedOption?.value ?? null);
    if (selectedOption) {
      this.selectionChange.emit(selectedOption);
    }
  }
}
