import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl:string = "http://localhost:8080/task";

  constructor(private http:HttpClient) { }

  getTasksByStatus(status: string): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.apiUrl}/${status}`);
  }

  updateTaskStatus(taskId: number, newStatus: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${taskId}/${newStatus}`, {}, { responseType: 'text' });
  }

  postNewTask(taskData: {taskName: string, userEmail: string}): Observable<any> {
    return this.http.post(this.apiUrl, taskData, { responseType: 'text' });
  }
  
  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${taskId}`, {responseType: 'text'})
  }
}