import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { v4 as uuidv4 } from 'uuid';

import { NotificationTypes } from '../../types/notification-types';

import { InputBase } from '../../models/input-base';
import { Notification } from '../../models/notification';

import { Utils } from '../../utils/utils';

@Component({
  selector: 'password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordFieldComponent),
      multi: true
    }
  ]
})
export class PasswordFieldComponent implements ControlValueAccessor, OnInit {

  @Input()
  config!: InputBase;

  @Output()
  error: EventEmitter<boolean> = new EventEmitter<boolean>();

  isRequired: boolean = false;
  isPasswordHide: boolean = true;
  isDisabled: boolean = false;

  id: string = "";
  value: string = "";

  requiredError: Notification | undefined;
  lengthError: Notification | undefined;
  numberError: Notification | undefined;
  uppercaseError: Notification | undefined;
  lowercaseError: Notification | undefined;
  specialCharError: Notification | undefined;

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
    this.numberError = this.config.notifications.find(x => x.type == NotificationTypes.number);
    this.uppercaseError = this.config.notifications.find(x => x.type == NotificationTypes.uppercase);
    this.lowercaseError = this.config.notifications.find(x => x.type == NotificationTypes.lowercase);
    this.specialCharError = this.config.notifications.find(x => x.type == NotificationTypes.specialchar);

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

  containsNumbers(): boolean {
    return this.value ? Utils.containsNumbers(this.value) : false;
  }

  hasUppercaseCharacter(): boolean {
    return this.value ? Utils.hasUppercase(this.value) : false;
  }

  hasLowercaseCharacter(): boolean {
    return this.value ? Utils.hasLowercase(this.value) : false;
  }

  hasSpecialCharacter(): boolean {
    return this.value ? Utils.hasSpecialCharacter(this.value) : false;
  }

  hasError(): void {
    let buff: Array<boolean> = new Array<boolean>();

    if (this.requiredError != undefined) {
      buff.push(this.hasCharacters());
    }

    if (this.lengthError != undefined) {
      buff.push(this.hasRigthLength());
    }

    if (this.numberError != undefined) {
      buff.push(this.containsNumbers());
    }

    if (this.uppercaseError != undefined) {
      buff.push(this.hasUppercaseCharacter());
    }

    if (this.lowercaseError != undefined) {
      buff.push(this.hasLowercaseCharacter());
    }

    if (this.specialCharError != undefined) {
      buff.push(this.hasSpecialCharacter());
    }

    this.error.emit(buff.find(x => x == false) == false ? true : false);
  }
}
