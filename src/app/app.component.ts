import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MenuComponent} from "./menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'DemoAngular';
}

export const API_URL = 'http://localhost:8080/test-framework';
