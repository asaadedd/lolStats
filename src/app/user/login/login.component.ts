import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'stats-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    const ageExpression = new RegExp('^[0-9]*$');
    const passwordExpression = new RegExp('(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])');
    this.loginForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.pattern(ageExpression)]],
      riotId: ['', [Validators.required]],
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(27),
        Validators.pattern(passwordExpression)
      ]]
    });
  }
}
