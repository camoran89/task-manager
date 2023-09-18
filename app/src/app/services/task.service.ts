import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs";

import { environment } from '../../environments/environment.development';
import { ITask } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly apiBaseUrl: string = environment.apiBaseUrl;
  private readonly taskBaseUrl: string = 'api/TaskManager/'

  constructor(private readonly http: HttpClient) { }

  findAll(): Observable<Array<ITask>> {
    return this.http.get<Array<ITask>>(`${this.apiBaseUrl}${this.taskBaseUrl}`);
  }

  findById(id: string): Observable<ITask> {
    return this.http.get<ITask>(`${this.apiBaseUrl}${this.taskBaseUrl}${id}`);
  }

  create(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(`${this.apiBaseUrl}${this.taskBaseUrl}`, task);
  }

  update(id: string, task: ITask): Observable<ITask> {
    return this.http.put<ITask>(`${this.apiBaseUrl}${this.taskBaseUrl}${id}`, task);
  }

  delete(id: string): Observable<ITask> {
    return this.http.delete<ITask>(`${this.apiBaseUrl}${this.taskBaseUrl}${id}`);
  }
}
