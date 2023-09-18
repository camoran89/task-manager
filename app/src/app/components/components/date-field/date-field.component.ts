import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { v4 as uuidv4 } from 'uuid';

import { NotificationTypes } from '../../types/notification-types';

import { InputBase } from '../../models/input-base';
import { Notification } from '../../models/notification';

import { Utils } from '../../utils/utils';

@Component({
  selector: 'date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateFieldComponent),
      multi: true
    }
  ]
})
export class DateFieldComponent implements ControlValueAccessor, OnInit {

  @Input()
  config!: InputBase;

  @Output()
  error: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  date: EventEmitter<string> = new EventEmitter<string>();

  isRequired: boolean = false;
  isDisabled: boolean = false;

  id: string = "";
  value: string = "";

  requiredError: Notification | undefined;
  dateError: Notification | undefined;

  private onChange!: (value: string) => void;
  private onBlur!: () => void;

  constructor() {
    this.id = uuidv4();
  }

  ngOnInit(): void {
    this.isRequired = this.config.required;
    this.isDisabled = this.config.disabled;

    this.requiredError = this.config.notifications.find(x => x.type == NotificationTypes.required);
    this.dateError = this.config.notifications.find(x => x.type == NotificationTypes.date);

    this.error.emit(true);
    this.date.emit('');
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    if (fn) {
      this.onChange = fn;
    }
  }

  registerOnTouched(fn: any): void {
    if (fn) {
      this.onBlur = fn;
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInputChange(event: Event): void {
    var value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.hasError();
    this.date.emit(this.value);
  }

  onDateChange(value: string): void {
    this.value = value;
    this.hasError();
    this.date.emit(this.value);
  }

  hasCharacters(): boolean {
    return this.value ? !(!this.value && this.value.length == 0) : false;
  }

  hasDateFormat(): boolean {
    return this.value ? Utils.hasDateFormat(this.value) : false;
  }

  hasError(): void {
    let buff: Array<boolean> = new Array<boolean>();

    if (this.requiredError != undefined) {
      buff.push(this.hasCharacters());
    }

    if (this.dateError != undefined) {
      buff.push(this.hasDateFormat());
    }

    this.error.emit(buff.find(x => x == false) == false ? true : false);
  }
}
