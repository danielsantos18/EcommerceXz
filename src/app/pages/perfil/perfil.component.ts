import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../core/user.service';
import { AuthService } from '../../core/auth.service';  // Asegúrate de tener el AuthService importado
import { OtpComponent } from '../../shared/otp/otp.component';
import { User } from '../../models/user.interface';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  user: User = { name: '', last_name: '', email: '', phone_number: '', address: '', password: '' };
  perfilForm!: FormGroup;
  isEditMode = false;
  loading = false;
  selectedSection: string = 'personalData';
  recoveryMethod: string = '';
  recoveryCode: string = '';
  isCodeValid: boolean = false;
  recoveryCodeInvalid: boolean = false;
  methodSelected: boolean = false;
  recoveryCodeSent: boolean = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private _matDialog: MatDialog,
    private userService: UserService,
    private authService: AuthService,  // Asegúrate de tener AuthService
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadUserData();
    this.initializeForm();
  }

  initializeForm(): void {
    this.perfilForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],  // Valida 10 dígitos
      address: ['', [Validators.required]],
      password: ['', [Validators.minLength(6)]],
      confirmPassword: ['', [Validators.minLength(6)]],
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  loadUserData(): void {
    const userId = this.authService.getUserIdFromToken();  // Obtener el ID del usuario desde el token
    const token = this.authService.getToken();  // Obtener el token JWT desde el AuthService

    // Verificar si el token y el userId están disponibles
    if (!token) {
      alert('No se encontró el token de autenticación.');
      return;
    }

    if (!userId) {
      console.log('No se pudo obtener el ID del usuario desde el token.');
      return;
    }

    console.log('Token:', token);  // Verificar si el token está disponible
    console.log('User ID:', userId);  // Verificar si el ID está correctamente pasando

    // Realizar la solicitud HTTP para cargar los datos del usuario
    this.loading = true;
    console.log('Realizando solicitud HTTP para cargar los datos del usuario...');

    this.userService.getUserById(userId, token).subscribe({
      next: (response) => {
        this.isLoading = false
        if (response.status === 200) {
          this.user = response.data;  // Guardamos los datos del usuario
          this.fillForm(this.user);  // Llama a fillForm para llenar el formulario
          console.log('Usuario cargado correctamente', this.user); // Mostrar datos del usuario por consola
        } else {
          console.error('Error al cargar usuario', response.message);  // En caso de que el estado no sea 200
        }
      },
      error: (error) => {
        this.isLoading = false
        console.error('Error de conexión con la API', error);  // Manejo de errores si la solicitud falla
      },
    });
  }


  fillForm(user: User): void {
    this.perfilForm.setValue({
      firstName: user.name,
      lastName: user.last_name,
      email: user.email,
      phoneNumber: user.phone_number,
      address: user.address,
      password: '',
      confirmPassword: ''
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.resetForm();
    }
  }

  saveChanges(): void {
    if (this.perfilForm.valid) {
      this.loading = true;
      const updatedUser: User = {
        name: this.perfilForm.value.firstName,
        last_name: this.perfilForm.value.lastName,
        email: this.perfilForm.value.email,
        phone_number: this.perfilForm.value.phoneNumber,
        address: this.perfilForm.value.address,
      };

      const token = this.authService.getToken();  // Obtener el token para la autenticación
      const id = this.authService.getUserIdFromToken();

      if (!token) {
        alert('Token no encontrado. No puedes actualizar los datos sin estar autenticado.');
        this.loading = false;
        return;
      }

      // Pasar el token y el userId al servicio de actualización
      this.userService.updateUser(id, token, updatedUser).subscribe({
        next: () => {
          this.user = updatedUser;
          this.isEditMode = false;
          this.loading = false;
          this.snackBar.open('Usuario actualizado', 'Cerrar', {
            duration: 3000
          });
        },
        error: (error) => {
          this.loading = false;
          const message = error?.error?.message || 'Error desconocido';
          console.error('Error actualizando usuario:', message);
          this.snackBar.open(message, 'Cerrar', {
            duration: 3000
          });
        }
      });

    } else {
      alert('Por favor, asegúrate de que todos los campos sean correctos.');
    }
  }

  onSubmit(): void {
    if (this.perfilForm.valid) {
      this.isLoading = true;
      this.saveChanges();
    } else {
      alert('El formulario tiene errores. Por favor, revísalo.');
    }
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.resetForm();
  }

  resetForm(): void {
    this.fillForm(this.user);
  }

  openModal(): void {
    const dialogRef = this._matDialog.open(OtpComponent, {});
  }

  openEditSection(section: string): void {
    this.selectedSection = section;
  }

  sendRecoveryCode(): void {
    if (!this.recoveryMethod) {
      alert('Por favor, selecciona un método de recuperación.');
      return;
    }

    this.loading = true;
    setTimeout(() => {
      this.recoveryCodeSent = true;
      this.loading = false;
      alert('Código de recuperación enviado.');
    }, 1000);
  }

  onMethodChange(): void {
    this.methodSelected = true;
    this.recoveryCodeSent = false;
  }

  changePassword() {

  }
}
