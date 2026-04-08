import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationComponent } from "./layout/notification/notification.component";
import { HeaderComponent } from "./layout/header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotificationComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl:  './app.css'
})
export class App {
  protected readonly title = signal('auto-diary');
}
