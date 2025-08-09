import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/model/task.model';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})

export class KanbanComponent implements OnInit {

  draggedTask: any;

  isAddingTask: boolean = false;

  toDoTasks: Task[] = [];
  doingTasks: Task[] = [];
  doneTasks: Task[] = [];

  newTaskName: string = '';

  constructor(private taskService:TaskService, private http:HttpClient){}

  cancelAddTask() {
    this.isAddingTask = false;
    this.newTaskName = '';
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe({
      next: (response) => {
        console.log('Task deleted successfully:', response);
        this.loadTasks(); // Reload tasks after deletion
      },
      error: (error) => {
        console.error('Error deleting task:', error);
        alert('Failed to delete task: ' + error.message);  
      }
    });

  }

  drag(event: DragEvent, task: any) {
    this.draggedTask = task;
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  ngOnInit(): void {
    this.loadTasks();
  }
  
  loadTasks(): void{
    this.taskService.getTasksByStatus('to_do').subscribe(tasks => this.toDoTasks = tasks);
    this.taskService.getTasksByStatus('doing').subscribe(tasks => this.doingTasks = tasks);
    this.taskService.getTasksByStatus('done').subscribe(tasks => this.doneTasks = tasks);
  }

  initAddTask(){
    this.isAddingTask = true;
  }

  addTask() {
    this.taskService.postNewTask({taskName: this.newTaskName, userEmail: 'jade@gmail.com'}).subscribe({
      next: (response) => {
        console.log('Task added successfully:', response);
        this.newTaskName = '';
        this.loadTasks();
      },
      error: (error) => {
        console.error('Error adding task:', error);
      }
    });
    this.isAddingTask = false;
  }


  drop(event: DragEvent, newStatus: string) {
  event.preventDefault();

  if (!this.draggedTask) {
    console.warn('Nenhuma task foi arrastada.');
    return;
  }

  const taskToUpdate = this.draggedTask; // ← Cópia local

  this.removeFromCurrentList(taskToUpdate);
  this.addToNewList(taskToUpdate, newStatus);

  this.taskService.updateTaskStatus(taskToUpdate.id, newStatus.toLowerCase()).subscribe({
    next: () => {
      console.log(`Task ${taskToUpdate.id} updated to status ${newStatus}`);
    },
    error: (error) => {
      console.error('Error updating task status', error);
      alert('Failed to update task status: ' + error.message);
    }
  });

  this.draggedTask = null; // ← Agora tudo bem zerar aqui
}


  removeFromCurrentList(task: any) {
    [this.toDoTasks, this.doingTasks, this.doneTasks].forEach(list => {
      const index = list.indexOf(task);
      if (index > -1) list.splice(index, 1);
    });
  }


  addToNewList(task: any, status: string) {
    if (status === 'TO_DO') this.toDoTasks.push(task);
    else if (status === 'DOING') this.doingTasks.push(task);
    else if (status === 'DONE') this.doneTasks.push(task);
  }
}
