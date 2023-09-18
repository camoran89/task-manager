import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { v4 as uuidv4 } from 'uuid';

import { NotificationTypes } from '../../types/notification-types';

import { InputBase } from '../../models/input-base';
import { Notification } from '../../models/notification';

import { Utils } from '../../utils/utils';

@Component({
  selector: 'text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true
    }
  ]
})
export class TextFieldComponent implements ControlValueAccessor, OnInit {

  @Input()
  config!: InputBase;

  @Output()
  error: EventEmitter<boolean> = new EventEmitter<boolean>();

  isRequired: boolean = false;
  isDisabled: boolean = false;

  id: string = "";
  value: string = "";

  requiredError: Notification | undefined;
  lengthError: Notification | undefined;

  private onChange!: (value: string) => void;
  private onBlur!: () => void;

  constructor() {
    this.id = uuidv4();
  }

  ngOnInit(): void {
    this.isRequired = this.config.required;
    this.isDisabled = this.config.disabled;

    this.requiredError = this.config.notifications.find(x => x.type == NotificationTypes.required);
    this.lengthError = this.config.notifications.find(x => x.type == NotificationTypes.length);

    this.error.emit(true);
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
    this.onChange(value);
    this.value = value;
    this.hasError();
  }

  hasCharacters(): boolean {
    return this.value ? !(!this.value && this.value.length == 0) : false;
  }

  hasRigthLength(): boolean {
    return this.value ? !(this.config.min != undefined && this.value.length < this.config.min ||
      this.config.max != undefined && this.value.length > this.config.max) : false;
  }

  hasError(): void {
    let buff: Array<boolean> = new Array<boolean>();

    if (this.requiredError != undefined) {
      buff.push(this.hasCharacters());
    }

    if (this.lengthError != undefined) {
      buff.push(this.hasRigthLength());
    }

    this.error.emit(buff.find(x => x == false) == false ? true : false);
  }
}
