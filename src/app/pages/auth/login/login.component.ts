import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  // Importa el router para redirigir después del login
import { AuthService } from '../../../core/auth.service'; // Servicio de autenticación
import { MatSnackBar } from '@angular/material/snack-bar'; // Para mostrar mensajes de error

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  showInputs: boolean[] = [];
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,  // Inyecta AuthService
    private router: Router,           // Inyecta Router
    private snackBar: MatSnackBar     // Inyecta MatSnackBar para mostrar los mensajes de error
  ) {
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

  // Método que se llama al enviar el formulario
  onSubmit() {
    if (this.loginForm.valid) {
      this.loginUser();
    } else {
      console.log('Formulario no válido.');
    }
  }

  // Esta función maneja el inicio de sesión
  loginUser() {
    const formValue = this.loginForm.value;

    // Llamamos al servicio de autenticación
    this.authService.login(formValue).subscribe({
      next: (response) => {
        // Si la autenticación es exitosa, guarda el token
        this.authService.setToken(response.token);

        // Redirige al usuario a la página deseada, por ejemplo, el dashboard
        this.router.navigate(['/home']);
        console.log(response);
      },
      error: (error) => {
        console.error('Error en iniciar', error);

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

  // Muestra los inputs de forma ordenada con retraso
  showInputsInOrder() {
    const inputsToShow = [0, 1];
    inputsToShow.forEach((index) => {
      setTimeout(() => {
        this.showInputs[index] = true;
      }, index * 300);
    });
  }
}
