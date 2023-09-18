import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotificationTypes } from '../components/types/notification-types';

import { InputBase } from '../components/models/input-base';
import { Object } from '../components/models/object';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements AfterViewInit {

  hasError: boolean = true;

  error: Array<Object> = new Array<Object>();

  phoneConfig!: InputBase;
  idConfig!: InputBase;
  bdConfig!: InputBase;
  commentsConfig!: InputBase;
  emailConfig!: InputBase;
  userConfig!: InputBase;
  passConfig!: InputBase;

  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = fb.group({
      phone: ['', Validators.required],
      id: ['', Validators.required],
      bd: ['', Validators.required],
      comments: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.idConfig = {
      required: true,
      disabled: false,
      label: "Id number",
      min: 1,
      max: 10,
      value: "",
      placeholder: "Type your id number",
      notifications: []
    };

    this.idConfig.notifications.push({ type: NotificationTypes.required, description: "Id number must be required" });
    this.idConfig.notifications.push({ type: NotificationTypes.number, description: "Must have number format" });
    this.idConfig.notifications.push({ type: NotificationTypes.length, description: `Minimum length must be ${this.idConfig.min} and maximum length must be ${this.idConfig.max}` });

    this.commentsConfig = {
      required: true,
      disabled: false,
      label: "Comments",
      min: 0,
      max: 250,
      value: "",
      placeholder: "Type your comments here",
      notifications: []
    };

    this.commentsConfig.notifications.push({ type: NotificationTypes.required, description: "Comments must be required" });
    this.commentsConfig.notifications.push({ type: NotificationTypes.length, description: `Minimum length must be ${this.commentsConfig.min} and maximum length must be ${this.commentsConfig.max}` });

    this.phoneConfig = {
      required: true,
      disabled: false,
      label: "Phone number",
      min: 10,
      max: 12,
      value: "",
      placeholder: "Type your phone number",
      notifications: []
    };

    this.phoneConfig.notifications.push({ type: NotificationTypes.required, description: "Phone number must be required" });
    this.phoneConfig.notifications.push({ type: NotificationTypes.phone, description: "Must have phone format" });

    this.bdConfig = {
      required: true,
      disabled: false,
      label: "Birthday",
      min: -1,
      max: -1,
      value: "",
      placeholder: "Type your birthday (MM/DD/YYYY)",
      notifications: []
    };

    this.bdConfig.notifications.push({ type: NotificationTypes.required, description: "Birthday must be required" });
    this.bdConfig.notifications.push({ type: NotificationTypes.date, description: "Must have date format (MM/DD/YYYY)" });

    this.emailConfig = {
      required: true,
      disabled: false,
      label: "Email",
      min: 0,
      max: Infinity,
      value: "",
      placeholder: "Type your email",
      notifications: []
    };

    this.emailConfig.notifications.push({ type: NotificationTypes.required, description: "Email must be required" });
    this.emailConfig.notifications.push({ type: NotificationTypes.email, description: "Must have email format" });

    this.userConfig = {
      required: true,
      disabled: false,
      label: "Username",
      min: 2,
      max: 50,
      value: "",
      placeholder: "Type your username",
      notifications: []
    };

    this.userConfig.notifications.push({ type: NotificationTypes.required, description: "Username must be required" });
    this.userConfig.notifications.push({ type: NotificationTypes.length, description: `Minimum length must be ${this.userConfig.min} and maximum length must be ${this.userConfig.max}` });

    this.passConfig = {
      required: true,
      disabled: false,
      label: "Password",
      min: 8,
      max: 20,
      value: "",
      placeholder: "Type your password",
      notifications: []
    };

    this.passConfig.notifications.push({ type: NotificationTypes.required, description: "Password must be required" });
    this.passConfig.notifications.push({ type: NotificationTypes.length, description: `Minimum length must be ${this.passConfig.min} and maximum length must be ${this.passConfig.max}` });
    this.passConfig.notifications.push({ type: NotificationTypes.number, description: "Must have a number" });
    this.passConfig.notifications.push({ type: NotificationTypes.lowercase, description: "Must have a lowercase character" });
    this.passConfig.notifications.push({ type: NotificationTypes.uppercase, description: "Must have a uppercase character" });
    this.passConfig.notifications.push({ type: NotificationTypes.specialchar, description: "Must have a special character (@,$,!,%,*,?,&)" });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onReset();
    }, 1000);
  }

  onReset(): void {
    this.form.reset();
    this.hasError = true;
    this.error.forEach((x, index) => {
      this.error[index].value = true;
    });
  }

  onSave(): void {
    if (!this.hasError) {
      debugger;
      this.onReset();
    }
  }

  onError(error: boolean, control: string): void {
    let found = this.error.findIndex(x => x.key === control.toLowerCase());
    if (found < 0) {
      this.error.push({ key: control, value: error });
    } else {
      this.error[found].value = error;
    }

    this.hasError = this.error.find(x => x.value == true) != undefined;
  }
}
