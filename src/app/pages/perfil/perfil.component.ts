import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OtpComponent } from '../../shared/otp/otp.component';

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
    phoneNumber: '1234567890',
    address: 'Calle Ficticia 123, Ciudad, País',
    profilePic: 'assets/profile-pic.jpg',  // Ruta de la imagen de perfil
    password: 'password'
  };

  // Formulario reactivo
  perfilForm!: FormGroup;
  isEditMode = false; // Controlar el modo de edición
  loading = false; // Estado de carga
  selectedSection: string = 'personalData'; // Sección seleccionada (inicia en "Datos Personales")
  recoveryMethod: string = ''; // Método de recuperación (email o phone)
  recoveryCode: string = ''; // Código de recuperación ingresado
  isCodeValid: boolean = false; // Validación del código
  recoveryCodeInvalid: boolean = false; // Bandera para errores en el código
  methodSelected: boolean = false; // Bandera para saber si el usuario seleccionó el método
  recoveryCodeSent: boolean = false; // Nuevo estado para saber si el código fue enviado

  constructor(private fb: FormBuilder, private _matDialog: MatDialog) { }

  ngOnInit(): void {
    // Inicializar el formulario con los datos del usuario
    this.perfilForm = this.fb.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      phoneNumber: [this.user.phoneNumber, [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Valida 10 dígitos
      address: [this.user.address, [Validators.required]],
      password: ['', [Validators.minLength(6)]], // Nuevo campo para contraseña
      confirmPassword: ['', [Validators.minLength(6)]], // Nuevo campo para confirmación de contraseña
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

  // Cambiar la sección activa
  openEditSection(section: string): void {
    this.selectedSection = section;
  }

  // Guardar los datos editados
  saveChanges(): void {
    if (this.perfilForm.valid) {
      this.loading = true;
      setTimeout(() => {
        this.updateUserData();
        this.isEditMode = false;
        this.loading = false;
        alert('Los cambios fueron guardados correctamente');
      }, 2000); // Simulamos un retraso de 2 segundos
    } else {
      alert('Por favor, asegúrate de que todos los campos sean correctos.');
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
    // Restablecer valores de la recuperación
    this.recoveryMethod = '';
    this.recoveryCode = '';
    this.isCodeValid = false;
    this.recoveryCodeInvalid = false;
    this.methodSelected = false;
    this.recoveryCodeSent = false; // Resetear el estado
  }

  // Método que se llama cuando se selecciona un método de recuperación
  onMethodChange(): void {
    this.methodSelected = true;
    this.recoveryCode = ''; // Reiniciar el código de recuperación
    this.isCodeValid = false; // Resetear la validación del código
    this.recoveryCodeInvalid = false; // Resetear el error del código
  }

  // Simulación de la verificación del código de recuperación
  verifyRecoveryCode(): void {
    // Simulación de validación del código (aquí deberías hacerlo de manera real)
    if (this.recoveryCode === '123456') { // Código de ejemplo
      this.isCodeValid = true;
      this.recoveryCodeInvalid = false;
    } else {
      this.isCodeValid = false;
      this.recoveryCodeInvalid = true;
    }
  }

  // Función para habilitar los campos de cambio de contraseña
  enablePasswordFields(): void {
    if (this.isCodeValid) {
      this.perfilForm.get('password')?.enable();
      this.perfilForm.get('confirmPassword')?.enable();
    }
  }

  sendRecoveryCode() {
    this.loading = true;
    setTimeout(() => {
      // Simulación de envío de código
      this.recoveryCodeInvalid = false;  // Suponemos que el código es válido
      this.isCodeValid = true;
      this.recoveryCodeSent = true; // Marcar como enviado
      this.loading = false;
    }, 2000); // Simulación de 2 segundos de espera
  }

  openModal(): void {
    const dialogRef = this._matDialog.open(OtpComponent, {
    });
  }
}
