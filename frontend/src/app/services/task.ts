import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TaskItem {
  _id: string;
  title: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'https://task-management-backend-silk.vercel.app/api/tasks';

  constructor(private http: HttpClient) {}

  // Get all tasks
  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl);
  }

  // Add task
  addTask(task: {
    title: string;
    status: TaskItem['status'];
  }): Observable<TaskItem> {

    return this.http.post<TaskItem>(
      this.apiUrl,
      task
    );
  }

  // Update task
  updateTask(
    id: string,
    task: Partial<TaskItem>
  ): Observable<TaskItem> {

    return this.http.put<TaskItem>(
      `${this.apiUrl}/${id}`,
      task
    );
  }

  // Delete task
  deleteTask(id: string): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}