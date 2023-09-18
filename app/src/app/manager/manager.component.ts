import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit, OnDestroy {

  constructor(private readonly taskService: TaskService) {

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }
}
