import { Component } from '@angular/core';
import { ButtonComponent, CardComponent } from 'ui-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
