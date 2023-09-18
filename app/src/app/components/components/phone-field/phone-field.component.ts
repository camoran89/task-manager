import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { v4 as uuidv4 } from 'uuid';

import { NotificationTypes } from '../../types/notification-types';

import { InputBase } from '../../models/input-base';
import { Notification } from '../../models/notification';

import { Utils } from '../../utils/utils';

@Component({
  selector: 'phone-field',
  templateUrl: './phone-field.component.html',
  styleUrls: ['./phone-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneFieldComponent),
      multi: true
    }
  ]
})
export class PhoneFieldComponent implements ControlValueAccessor, OnInit {

  @Input()
  config!: InputBase;

  @Output()
  error: EventEmitter<boolean> = new EventEmitter<boolean>();

  isRequired: boolean = false;
  isDisabled: boolean = false;

  maxlength!: number;

  id: string = "";
  value: string = "";

  requiredError: Notification | undefined;
  phoneError: Notification | undefined;

  private onChange!: (value: string) => void;
  private onBlur!: () => void;

  constructor() {
    this.id = uuidv4();
  }

  ngOnInit(): void {
    this.isRequired = this.config.required;
    this.isDisabled = this.config.disabled;

    this.maxlength = this.config.max;

    this.requiredError = this.config.notifications.find(x => x.type == NotificationTypes.required);
    this.phoneError = this.config.notifications.find(x => x.type == NotificationTypes.phone);

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
    var lastChar = value[value.length - 1];

    if (!Utils.containsNumbers(lastChar) && !Utils.hasPhoneSpecialCharacter(lastChar)) {
      value = value.substring(0, value.length - 1);
      (event.target as HTMLInputElement).value = value;
    }

    this.onChange(value);
    this.value = value;
    this.hasError();
  }

  hasCharacters(): boolean {
    return this.value ? !(!this.value && this.value.length == 0) : false;
  }

  hasPhoneFormat(): boolean {
    return this.value ? Utils.hasPhoneFormat(this.value) : false;
  }

  hasError(): void {
    let buff: Array<boolean> = new Array<boolean>();

    if (this.requiredError != undefined) {
      buff.push(this.hasCharacters());
    }

    if (this.phoneError != undefined) {
      buff.push(this.hasPhoneFormat());
    }

    let error = buff.find(x => x == false) == false ? true : false;

    this.config.max = !error ? this.value.length : this.maxlength;

    this.error.emit(error);
  }
}
