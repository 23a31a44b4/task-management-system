import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService, TaskItem } from '../services/task';

@Component({
  selector: 'app-task',
  imports: [FormsModule],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task implements OnInit {

  // =========================
  // Form variables
  // =========================

  newTask: string = '';
  searchText: string = '';
  filterStatus: string = 'All';


  // =========================
  // Edit variables
  // =========================

  editId: string = '';
  editTaskTitle: string = '';


  // =========================
  // Task data
  // =========================

  tasks: TaskItem[] = [];


  // =========================
  // Phase 2 - UI state
  // =========================

  loading: boolean = false;

  message: string = '';

  messageType: 'success' | 'error' | '' = '';


  // =========================
  // Constructor
  // =========================

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}


  // =========================
  // Component initialization
  // =========================

  ngOnInit(): void {
    this.loadTasks();
  }


  // =========================
  // Load tasks
  // =========================

  loadTasks(): void {

    this.loading = true;

    this.taskService.getTasks().subscribe({

      next: (data: TaskItem[]) => {

        console.log('Tasks received:', data);

        this.tasks = data;

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Error loading tasks:', error);

        this.loading = false;

        this.showError(
          'Unable to load tasks. Please check the server.'
        );

        this.cdr.detectChanges();
      }

    });
  }


  // =========================
  // Add task
  // =========================

  addTask(): void {

    // Prevent empty task
    if (this.newTask.trim() === '') {

      this.showError('Please enter a task.');

      return;
    }

    this.loading = true;

    const task = {

      title: this.newTask.trim(),

      status: 'Pending' as const
    };


    this.taskService.addTask(task).subscribe({

      next: (newTask: TaskItem) => {

        this.tasks = [
          ...this.tasks,
          newTask
        ];

        this.newTask = '';

        this.loading = false;

        this.showSuccess(
          'Task added successfully!'
        );

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'Error adding task:',
          error
        );

        this.loading = false;

        this.showError(
          'Failed to add task. Please try again.'
        );

        this.cdr.detectChanges();
      }

    });
  }


  // =========================
  // Start editing task
  // =========================

  editTask(task: TaskItem): void {

    this.editId = task._id;

    this.editTaskTitle = task.title;
  }


  // =========================
  // Save edited task
  // =========================

  saveTask(): void {

    // Prevent empty title
    if (this.editTaskTitle.trim() === '') {

      this.showError(
        'Task title cannot be empty.'
      );

      return;
    }

    this.loading = true;

    this.taskService.updateTask(

      this.editId,

      {
        title: this.editTaskTitle.trim()
      }

    ).subscribe({

      next: (updatedTask: TaskItem) => {

        this.tasks = this.tasks.map(task =>

          task._id === this.editId
            ? updatedTask
            : task

        );

        this.editId = '';

        this.editTaskTitle = '';

        this.loading = false;

        this.showSuccess(
          'Task updated successfully!'
        );

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'Error updating task:',
          error
        );

        this.loading = false;

        this.showError(
          'Failed to update task. Please try again.'
        );

        this.cdr.detectChanges();
      }

    });
  }


  // =========================
  // Cancel editing
  // =========================

  cancelEdit(): void {

    this.editId = '';

    this.editTaskTitle = '';

    this.clearMessage();
  }


  // =========================
  // Change task status
  // =========================

  changeStatus(
    id: string,
    status: TaskItem['status']
  ): void {

    this.loading = true;

    this.taskService.updateTask(

      id,

      {
        status: status
      }

    ).subscribe({

      next: (updatedTask: TaskItem) => {

        this.tasks = this.tasks.map(task =>

          task._id === id
            ? updatedTask
            : task

        );

        this.loading = false;

        this.showSuccess(
          'Task status updated!'
        );

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'Error changing status:',
          error
        );

        this.loading = false;

        this.showError(
          'Failed to update task status.'
        );

        this.cdr.detectChanges();
      }

    });
  }


  // =========================
  // Delete task
  // =========================

  deleteTask(id: string): void {

    const confirmed = window.confirm(
      'Are you sure you want to delete this task?'
    );

    if (!confirmed) {

      return;
    }

    this.loading = true;

    this.taskService.deleteTask(id).subscribe({

      next: () => {

        this.tasks = this.tasks.filter(
          task => task._id !== id
        );

        this.loading = false;

        this.showSuccess(
          'Task deleted successfully!'
        );

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'Error deleting task:',
          error
        );

        this.loading = false;

        this.showError(
          'Failed to delete task. Please try again.'
        );

        this.cdr.detectChanges();
      }

    });
  }


  // =========================
  // Success message
  // =========================

  showSuccess(message: string): void {

    this.message = message;

    this.messageType = 'success';

    setTimeout(() => {

      this.clearMessage();

    }, 3000);
  }


  // =========================
  // Error message
  // =========================

  showError(message: string): void {

    this.message = message;

    this.messageType = 'error';

    setTimeout(() => {

      this.clearMessage();

    }, 4000);
  }


  // =========================
  // Clear message
  // =========================

  clearMessage(): void {

    this.message = '';

    this.messageType = '';
  }


  // =========================
  // Total tasks
  // =========================

  get totalTasks(): number {

    return this.tasks.length;
  }


  // =========================
  // Pending tasks
  // =========================

  get pendingTasks(): number {

    return this.tasks.filter(

      task => task.status === 'Pending'

    ).length;
  }


  // =========================
  // In Progress tasks
  // =========================

  get inProgressTasks(): number {

    return this.tasks.filter(

      task => task.status === 'In Progress'

    ).length;
  }


  // =========================
  // Completed tasks
  // =========================

  get completedTasks(): number {

    return this.tasks.filter(

      task => task.status === 'Completed'

    ).length;
  }


  // =========================
  // Search + Filter
  // =========================

  get filteredTasks(): TaskItem[] {

    return this.tasks.filter(task => {

      const matchesSearch =

        task.title
          .toLowerCase()
          .includes(
            this.searchText.toLowerCase()
          );


      const matchesStatus =

        this.filterStatus === 'All' ||

        task.status === this.filterStatus;


      return (
        matchesSearch &&
        matchesStatus
      );

    });
  }

}