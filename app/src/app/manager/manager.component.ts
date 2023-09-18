import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ITask } from '../models/task';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit, OnDestroy {

  tasks: Array<ITask> = new Array<ITask>();

  constructor(private readonly taskService: TaskService) {

  }

  ngOnInit(): void {
    this.taskService.findAll().subscribe((data: Array<ITask>) => {
      if (data && data.length > 0) {
        this.tasks = data;
      }
    });
  }

  ngOnDestroy(): void {

  }
}
