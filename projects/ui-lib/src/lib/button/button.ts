import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  label = input<string>('');
  variant = input<'primary' | 'secondary' | 'danger'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  clicked = output<void>();

  handleClick(): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit();
    }
  }

  buttonClasses(): string {
    const base =
      'inline-flex items-center justify-center font-medium rounded transition-all duration-200 cursor-pointer';

    const variants = {
      primary: 'bg-green-400 text-black hover:bg-green-300 border border-green-400',
      secondary: 'bg-transparent text-green-400 border border-green-400 hover:bg-green-400/10',
      danger: 'bg-red-600 text-white border border-red-600 hover:bg-red-500',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    const disabledClasses =
      this.disabled() || this.loading() ? 'opacity-50 cursor-not-allowed' : '';

    return `${base} ${variants[this.variant()]} ${sizes[this.size()]} ${disabledClasses}`;
  }
}
