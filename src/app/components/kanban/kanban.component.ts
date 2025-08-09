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
  newTaskColor: string = '#e4f663'; 

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
        this.loadTasks(); 
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
    this.taskService.getTasksByStatus('to_do').subscribe(tasks => {
      this.toDoTasks = tasks.map(task => {
        const color = localStorage.getItem(`taskColor_${task.id}`) || '#e4f663';
        return { ...task, color };
      });
    });
    this.taskService.getTasksByStatus('doing').subscribe(tasks => {
      this.doingTasks = tasks.map(task => {
        const color = localStorage.getItem(`taskColor_${task.id}`) || '#e4f663';
        return { ...task, color };
      });
    });
    this.taskService.getTasksByStatus('done').subscribe(tasks => {
      this.doneTasks = tasks.map(task => {
        const color = localStorage.getItem(`taskColor_${task.id}`) || '#e4f663';
        return { ...task, color };
      });
    });
  }

  initAddTask(){
    this.isAddingTask = true;
  }

  addTask() {
    const userEmail = localStorage.getItem('email') || '';
    const newTaskData = {
      taskName: this.newTaskName,
      userEmail: userEmail
    };

    this.taskService.postNewTask(newTaskData).subscribe({
      next: (response) => {
        const newTaskId = response.id;
        localStorage.setItem(`taskColor_${newTaskId}`, this.newTaskColor);
        console.log('Task added successfully:', response);
        this.newTaskName = '';
        this.loadTasks();
      },
      error: (error) => {
        console.error('Error adding task:', error);
        alert('Name cannot be empty');
      }
    });
    this.isAddingTask = false;
  }

  clearStorage() { 
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  drop(event: DragEvent, newStatus: string) {
  event.preventDefault();

  if (!this.draggedTask) {
    console.warn('Nenhuma task foi arrastada.');
    return;
  }

  const taskToUpdate = this.draggedTask;

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

  this.draggedTask = null;
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
