import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { cantBeStrider } from '../../../shared/validators/validators';

@Component({
	templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
	public myForm = this.fb.group({
		name: ['', [Validators.required]],
		email: ['', [Validators.required]],
		username: ['', [Validators.required, cantBeStrider]],
		password: ['', [Validators.required, Validators.minLength(6)]],
		password2: ['', [Validators.required]],
	});

	constructor(private fb: FormBuilder) {}

	isValidField(field: string) {
		// TODO: obtener validación desde un servicio
	}

	onSubmit() {
		this.myForm.markAllAsTouched();
	}
}
