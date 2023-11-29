import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private _http: HttpClient) { }

  getCustomers(): Observable<any> {
    return this._http.get('http://localhost:5050/api/customer');
  }

  addTask(title: any, date: Date, customerId: string): Observable<any> {
    return this._http.post('http://localhost:5050/api/tasks', { title, date, customerId });
  }

  getTasks(): Observable<any> {
    return this._http.get('http://localhost:5050/api/tasks');
  }

  deleteTask(id: any): Observable<any> {
    return this._http.delete(`http://localhost:5050/api/tasks/${id}`)
  }

  updateTaskDone(id: string, isDone: boolean): Observable<any> {
    return this._http.put(`http://localhost:5050/api/tasks/${id}`, { isDone });
  }

  updateTaskTitle(id: string, title: string): Observable<any> {
    return this._http.put(`http://localhost:5050/api/tasks/${id}`, { title });
  }
}
