import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Para redirigir después del registro exitoso
import { MatSnackBar } from '@angular/material/snack-bar'; // Para mostrar mensajes de éxito y error
import { AuthService } from '../../../core/auth.service'; // Ajusta esta ruta según tu estructura
import { User } from '../../../models/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  showInputs: boolean[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,  // Injectamos AuthService
    private router: Router,           // Para redirigir después de un registro exitoso
    private snackBar: MatSnackBar     // Para mostrar mensajes de error y éxito
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.showInputs = new Array(7).fill(false); // Cambiar 7 por el número total de campos que tienes
    this.showInputsInOrder();
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get address() {
    return this.registerForm.get('address');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  // Esta es la función llamada en el onSubmit
  onSubmit() {
    if (this.registerForm.valid) {
      this.registerUser();
    } else {
      console.log('Formulario no válido.');
    }
  }

  // Esta función maneja el registro del usuario
  registerUser() {
    const formValue = this.registerForm.value;

    // Creamos un objeto User utilizando la interfaz
    const user: User = {
      name: formValue.firstName,
      last_name: formValue.lastName,
      address: formValue.address,
      phone_number: formValue.phone,
      email: formValue.email,
      password: formValue.password
    };

    // Enviamos el objeto User al servicio AuthService
    this.authService.register(user).subscribe({
      next: (response) => {
        console.log('Registro exitoso', response);
        this.snackBar.open('¡Registro exitoso!', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/auth/login']); // Redirige a la página de login
      },
      error: (error) => {
        console.error('Error de registro', error);

        // Extraemos el código de estado y el mensaje de error
        const errorMessage = error?.error?.message || 'Ocurrió un error desconocido.';
        const errorStatus = error.status || 'Desconocido';

        // Mostramos el error en el SnackBar con el código de estado y el mensaje
        this.snackBar.open(`Error ${errorStatus}: ${errorMessage}`, 'Cerrar', {
          duration: 5000, // Muestra el mensaje por 5 segundos
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  showInputsInOrder() {
    const inputsToShow = [0, 1, 2, 3, 4, 5, 6];
    inputsToShow.forEach((index) => {
      setTimeout(() => {
        this.showInputs[index] = true;
      }, index * 300);
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
