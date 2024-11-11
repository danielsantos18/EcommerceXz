import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../core/user.service';
import { AuthService } from '../../core/auth.service';  // Asegúrate de tener el AuthService importado
import { OtpComponent } from '../../shared/otp/otp.component';
import { User } from '../../models/user.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  user: User = { name: '', last_name: '', email: '', phone_number: '', address: '' };
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

  constructor(
    private fb: FormBuilder,
    private _matDialog: MatDialog,
    private userService: UserService,
    private authService: AuthService,  // Asegúrate de tener AuthService
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id') || '';

    if (this.authService.isAuthenticated()) {
      this.getUserById(userId);
    } else {
      alert('No estás autenticado. Por favor, inicia sesión.');
    }

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

  getUserById(id: string): void {
    this.loading = true;
    const token = this.authService.getToken();  // Obtener el token JWT desde el AuthService

    // Ahora pasamos el token al llamar al servicio
    this.userService.getUserById(id, token).subscribe(
      (user: User) => {
        this.user = user;
        this.fillForm(user);
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
        this.loading = false;
        alert('No se pudo cargar la información del usuario.');
      }
    );
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
        password: this.perfilForm.value.password ? this.perfilForm.value.password : undefined,
      };

      const token = this.authService.getToken();  // Obtener el token para la autenticación

      // Ahora pasamos el token al llamar al servicio para actualizar el usuario
      this.userService.updateUser(this.user.name, token).subscribe(
        (response) => {
          this.user = updatedUser;
          this.isEditMode = false;
          this.loading = false;
          alert('Perfil actualizado con éxito.');
        },
        (error) => {
          console.error('Error actualizando usuario:', error);
          alert('Hubo un error al actualizar el perfil.');
          this.loading = false;
        }
      );
    } else {
      alert('Por favor, asegúrate de que todos los campos sean correctos.');
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
}
