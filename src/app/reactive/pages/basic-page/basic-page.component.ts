import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/service/validator.service';

const rtx590 = {
	name: 'RTX 5090',
	price: 2500,
	inStorage: 6,
};

@Component({
	templateUrl: './basic-page.component.html',
	styles: ``,
})
export class BasicPageComponent implements OnInit {
	// public myForm: FormGroup = new FormGroup({
	// 	name: new FormControl(''),
	// 	price: new FormControl(0),
	// 	inStorage: new FormControl(0),
	// });

	public myForm: FormGroup = this.fb.group({
		name: ['', [Validators.required, Validators.minLength(3)]],
		price: [0, [Validators.required, Validators.min(0)]],
		inStorage: [0, [Validators.required, Validators.min(0)]],
	});

	constructor(private fb: FormBuilder, private validatorService: ValidatorService) {}

	ngOnInit(): void {
		// this.myForm.reset(rtx590);
	}

	// isValidField(field: string): boolean | null {
	// 	return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
	// }

	isValidField(field: string) {
		return this.validatorService.isValidField(this.myForm, field);
	}

	getFieldError(field: string): string | null {
		if (!this.myForm.controls[field]) return null;

		const errors = this.myForm.controls[field].errors || {};

		for (const key of Object.keys(errors)) {
			switch (key) {
				case 'required':
					return 'Este campo es requerido';
				case 'minlength':
					return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
			}
		}
		return null;
	}

	onSave(): void {
		if (this.myForm.invalid) {
			this.myForm.markAllAsTouched();
			return;
		}
		console.log(this.myForm.value);
		this.myForm.reset({ price: 10, inStorage: 0 });
	}
}
