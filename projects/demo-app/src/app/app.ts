import { Component } from '@angular/core';
import { ButtonComponent } from 'ui-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
