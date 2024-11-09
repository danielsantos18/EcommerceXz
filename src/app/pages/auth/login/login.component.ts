import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  showInputs: boolean[] = [];

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]] 
    });
  }

  ngOnInit() {
    this.showInputs = new Array(2).fill(false);
    this.showInputsInOrder(); 
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario válido. Enviando datos:', this.loginForm.value);
    } else {
      console.log('Formulario no válido.');
    }
  }

  showInputsInOrder() {
    const inputsToShow = [0, 1]; 
    inputsToShow.forEach((index) => {
      setTimeout(() => {
        this.showInputs[index] = true;
      }, index * 300); 
    });
  }
}
