import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.scss']
})
export class FormFieldErrorComponent implements OnChanges {
  @Input() isLegacy = false;
  @Input() form!: FormGroup;
  @Input() isSubmit!: boolean;
  @Input() formControlNameString!: string;
  @Input() displayField!: string;
  @Input() error: string = "";

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isSubmit']) {
      console.log(this.formControlNameString);
      console.log(this.form.controls[this.formControlNameString].errors);
      if (this.form.controls[this.formControlNameString].errors?.['required'] === true) {
        this.error = this.displayField + ' is required';
      } else if (this.form.controls[this.formControlNameString].errors?.['email'] === true) {
        this.error = 'This email is not valid'
      } else if (this.form.controls[this.formControlNameString].errors?.['passwordEz'] === true) {
        this.error = 'Your password is too easy.';
      } else if (this.form.controls[this.formControlNameString].errors?.['passwordMatch'] === true) {
        this.error = 'Your passwords don\'t match';
      }
    }
  }
}
