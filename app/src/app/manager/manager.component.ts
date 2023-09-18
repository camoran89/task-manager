import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TaskService } from '../services/task.service';

import { NotificationTypes } from '../components/types/notification-types';

import { ITask } from '../models/task';
import { InputBase } from '../components/models/input-base';
import { Object } from '../components/models/object';

import * as moment from 'moment';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit, OnDestroy, AfterViewInit {

  up: boolean = false;
  hasError: boolean = true;
  panelOpenState: boolean = false;
  save: boolean = true;

  taskId: string = '';
  finishDateValue: string = '';

  error: Array<Object> = new Array<Object>();

  utasks: Array<ITask> = new Array<ITask>();
  ctasks: Array<ITask> = new Array<ITask>();

  username!: InputBase;
  title!: InputBase;
  description!: InputBase;
  category!: InputBase;
  finishDate!: InputBase;

  form: FormGroup;

  constructor(private readonly taskService: TaskService,
    private readonly fb: FormBuilder) {
    this.form = fb.group({
      username: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      finishDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.taskService.findAll().subscribe((data: Array<ITask>) => {
      if (data && data.length > 0) {
        this.utasks = data.filter(x => !x.completed);
        this.ctasks = data.filter(x => x.completed);
      }
    });

    this.username = {
      required: true,
      disabled: false,
      label: "Username",
      min: 2,
      max: 50,
      value: "",
      placeholder: "Ex: Camilo",
      notifications: []
    };

    this.username.notifications.push({ type: NotificationTypes.required, description: "Username must be required" });
    this.username.notifications.push({ type: NotificationTypes.length, description: `Minimum length must be ${this.username.min} and maximum length must be ${this.username.max}` });

    this.title = {
      required: true,
      disabled: false,
      label: "Title",
      min: 2,
      max: 50,
      value: "",
      placeholder: "Ex: Cook",
      notifications: []
    };

    this.title.notifications.push({ type: NotificationTypes.required, description: "Title must be required" });
    this.title.notifications.push({ type: NotificationTypes.length, description: `Minimum length must be ${this.title.min} and maximum length must be ${this.title.max}` });

    this.description = {
      required: false,
      disabled: false,
      label: "Description",
      min: 0,
      max: 250,
      value: "",
      placeholder: "Ex: Cook the breakfast",
      notifications: []
    };

    this.category = {
      required: true,
      disabled: false,
      label: "Category",
      min: 0,
      max: 50,
      value: "",
      placeholder: "Ex: Priority",
      notifications: []
    };

    this.category.notifications.push({ type: NotificationTypes.required, description: "Category must be required" });

    this.finishDate = {
      required: true,
      disabled: false,
      label: "Finish date",
      min: -1,
      max: -1,
      value: "",
      placeholder: "Ex: 10/23/2024 (MM/DD/YYYY)",
      notifications: []
    };

    this.finishDate.notifications.push({ type: NotificationTypes.required, description: "Finish date must be required" });
    this.finishDate.notifications.push({ type: NotificationTypes.date, description: "Must have date format (MM/DD/YYYY)" });
  }

  ngOnDestroy(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onReset();
    }, 1000);
  }

  onReset(): void {
    this.form.reset();
    this.form.get('finishDate')?.setValue(null);
    this.form.get('finishDate')?.updateValueAndValidity();
    this.hasError = true;
    this.error.forEach((x, index) => {
      this.error[index].value = true;
    });
  }

  onSave(): void {
    if (!this.hasError) {
      let task: ITask = {
        id: this.taskId ? this.taskId : '',
        userName: this.form.get('username')?.value,
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value,
        category: this.form.get('category')?.value,
        finishDate: new Date(this.finishDateValue),
        completed: false,
        createdAt: new Date()
      };

      if (this.save) {
        this.taskService.create(task).subscribe(result => {
          this.utasks.push(task);
        });
      } else {
        this.taskService.update(task.id, task).subscribe(result => {
          let pos = this.utasks.findIndex(x => x.id === task.id);
          this.utasks.splice(pos, 1);
          this.utasks.push(task);
        });
      }
      this.onReset();
      this.panelOpenState = false;
    }
  }

  onError(error: boolean, control: string): void {
    if (this.save) {
      let found = this.error.findIndex(x => x.key.toLowerCase() === control.toLowerCase());
      if (found < 0) {
        this.error.push({ key: control, value: error });
      } else {
        this.error[found].value = error;
      }

      this.hasError = this.error.find(x => x.value == true) != undefined;
    }
  }

  getDate(date: string): void {
    this.finishDateValue = date;
  }

  onDelete(id: string): void {
    this.taskService.delete(id).subscribe(result => {
      let pos = this.utasks.findIndex(x => x.id === id);
      this.utasks.splice(pos, 1);
    });
  }

  onComplete(task: ITask): void {
    task.completed = true;
    this.taskService.update(task.id, task).subscribe(result => {
      let pos = this.utasks.findIndex(x => x.id === task.id);
      this.utasks.splice(pos, 1);
      this.ctasks.push(task);
    });
  }

  onOrder(): void {
    this.up = !this.up;

    if (this.up) {
      this.utasks.sort((a, b) => {
        return a.category > b.category ? 1 : a.category < b.category ? -1 : 0;
      });
  
      this.ctasks.sort((a, b) => {
        return a.category > b.category ? 1 : a.category < b.category ? -1 : 0;
      });
    } else {
      this.utasks.sort((a, b) => {
        return a.category > b.category ? -1 : a.category < b.category ? 1 : 0;
      });
  
      this.ctasks.sort((a, b) => {
        return a.category > b.category ? -1 : a.category < b.category ? 1 : 0;
      });
    }
  }

  onUpdate(task: ITask): void {
    this.save = false;
    this.panelOpenState = true;

    this.taskId = task.id;

    this.form.get('username')?.setValue(task.userName);
    this.form.get('title')?.setValue(task.title);
    this.form.get('description')?.setValue(task.description);
    this.form.get('category')?.setValue(task.category);

    let date = moment(task.finishDate).format('MM/DD/YYYY');

    this.form.get('finishDate')?.setValue(date);
    this.form.get('finishDate')?.updateValueAndValidity();

    this.hasError = false;
  }
}
