import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.scss']
})
export class FormFieldErrorComponent implements OnChanges {
  @Input() form!: FormGroup;
  @Input() isSubmit!: boolean;
  @Input() formControlNameString!: string;
  @Input() displayField!: string;
  error: string = "";

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isSubmit']) {
      if (this.form.controls[this.formControlNameString].errors?.['required'] === true) {
        this.error = this.displayField + ' is required';
      } else if (this.form.controls[this.formControlNameString].errors?.['email'] === true) {
        this.error = 'This email is not valid'
      }
    }
  }
}
