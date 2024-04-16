import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import * as customValidators from '../../../shared/validators/validators';
import { ValidatorService } from '../../../shared/service/validator.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
	templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
	public myForm = this.fb.group(
		{
			// name: ['', [Validators.required, Validators.pattern(customValidators.firstNameAndLastnamePattern)]],
			// email: ['', [Validators.required, Validators.pattern(customValidators.emailPattern)]],
			// username: ['', [Validators.required, customValidators.cantBeStrider]],
			name: ['', [Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern)]],
			// email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [new EmailValidator()]],
			email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
			username: ['', [Validators.required, this.validatorService.cantBeStrider]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			password2: ['', [Validators.required]],
		},
		{
			validators: [this.validatorService.isFieldOneEqualFieldTwo('password', 'password2')],
		}
	);

	constructor(private fb: FormBuilder, private validatorService: ValidatorService, private emailValidator: EmailValidator) {}

	isValidField(field: string) {
		return this.validatorService.isValidField(this.myForm, field);
	}

	onSubmit() {
		this.myForm.markAllAsTouched();
	}
}
