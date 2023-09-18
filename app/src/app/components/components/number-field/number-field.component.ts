import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { v4 as uuidv4 } from 'uuid';

import { NotificationTypes } from '../../types/notification-types';

import { InputBase } from '../../models/input-base';
import { Notification } from '../../models/notification';

import { Utils } from '../../utils/utils';

@Component({
  selector: 'number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberFieldComponent),
      multi: true
    }
  ]
})
export class NumberFieldComponent implements ControlValueAccessor, OnInit {

  @Input()
  config!: InputBase;

  @Output()
  error: EventEmitter<boolean> = new EventEmitter<boolean>();

  isRequired: boolean = false;
  isDisabled: boolean = false;

  minNumber: number = -Infinity;
  maxNumber: number = Infinity;

  id: string = "";
  value: string = "";

  requiredError: Notification | undefined;
  lengthError: Notification | undefined;
  numberError: Notification | undefined;

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

    this.minNumber = Utils.getMinNumber(this.config.min);
    this.maxNumber = Utils.getMaxNumber(this.config.max);

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

    if (!Utils.containsNumbers(lastChar)) {
      value = value.substring(0, value.length - 1);
      (event.target as HTMLInputElement).value = value;
    }

    if (Number.parseFloat(value) < this.minNumber) {
      value = this.minNumber.toString();
      (event.target as HTMLInputElement).value = value;
    }

    if (Number.parseFloat(value) > this.maxNumber) {
      value = this.maxNumber.toString();
      (event.target as HTMLInputElement).value = value;
    }

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

    this.error.emit(buff.find(x => x == false) == false ? true : false);
  }
}
