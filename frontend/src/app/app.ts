import { Component } from '@angular/core';
import { Task } from './task/task';

@Component({
  selector: 'app-root',
  imports: [Task],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}