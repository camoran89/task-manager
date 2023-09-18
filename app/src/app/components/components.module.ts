import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PasswordFieldComponent } from './components/password-field/password-field.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { EmailFieldComponent } from './components/email-field/email-field.component';
import { PhoneFieldComponent } from './components/phone-field/phone-field.component';
import { NumberFieldComponent } from './components/number-field/number-field.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { DateFieldComponent } from './components/date-field/date-field.component';
import { SelectFieldComponent } from './components/select-field/select-field.component';

@NgModule({
  declarations: [
    PasswordFieldComponent,
    InputFieldComponent,
    EmailFieldComponent,
    PhoneFieldComponent,
    NumberFieldComponent,
    TextFieldComponent,
    DateFieldComponent,
    SelectFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  exports: [
    PasswordFieldComponent,
    InputFieldComponent,
    EmailFieldComponent,
    PhoneFieldComponent,
    NumberFieldComponent,
    TextFieldComponent,
    DateFieldComponent,
    SelectFieldComponent
  ]
})
export class ComponentsModule { }
