import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  // Datos del usuario (pueden venir de un servicio)
  user = {
    firstName: 'Luis Miguel',
    lastName: 'Miranda',
    email: 'luis.miranda@email.com',
    phoneNumber: '+1234567890',
    address: 'Calle Ficticia 123, Ciudad, País',
    profilePic: 'assets/profile-pic.jpg',  // Ruta de la imagen de perfil
    password: 'password'
  };

  // Formulario reactivo
  perfilForm!: FormGroup;
  isEditMode = false; // Controlar el modo de edición
  loading = false; // Estado de carga
  successMessage: string = ''; // Mensaje de éxito
  errorMessage: string = ''; // Mensaje de error

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Inicializar el formulario con los datos del usuario
    this.perfilForm = this.fb.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      phoneNumber: [this.user.phoneNumber, [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Valida 10 dígitos
      address: [this.user.address, [Validators.required]],
      password: ['', [Validators.minLength(6)]], // Nuevo campo para contraseña
      confirmPassword: ['', [Validators.minLength(6)]] // Nuevo campo para confirmación de contraseña
    }, {
      // Validación para que las contraseñas coincidan
      validator: this.passwordMatchValidator
    });
  }

  // Validar que las contraseñas coincidan
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  // Cambiar entre modo de lectura y edición
  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.resetForm();
    }
  }

  // Guardar los datos editados
  saveChanges(): void {
    if (this.perfilForm.valid) {
      this.loading = true;
      setTimeout(() => {
        this.updateUserData();
        this.isEditMode = false;
        this.loading = false;
        this.successMessage = 'Los cambios fueron guardados correctamente';
      }, 2000); // Simulamos un retraso de 2 segundos
    } else {
      this.errorMessage = 'Por favor, asegúrate de que todos los campos sean correctos.';
    }
  }

  // Actualizar los datos del usuario
  updateUserData(): void {
    this.user.firstName = this.perfilForm.value.firstName;
    this.user.lastName = this.perfilForm.value.lastName;
    this.user.email = this.perfilForm.value.email;
    this.user.phoneNumber = this.perfilForm.value.phoneNumber;
    this.user.address = this.perfilForm.value.address;
    // Solo actualizamos la contraseña si está definida
    if (this.perfilForm.value.password) {
      this.user['password'] = this.perfilForm.value.password;
    }
  }

  // Cancelar la edición
  cancelEdit(): void {
    this.isEditMode = false;
    this.resetForm();
  }

  // Resetear el formulario cuando se cancela la edición
  resetForm(): void {
    this.perfilForm.reset({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber,
      address: this.user.address,
      password: '',
      confirmPassword: ''
    });
  }
}