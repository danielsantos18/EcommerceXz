import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {

  constructor(
    public dialogRef: MatDialogRef<OtpComponent>,
    private router: Router
  ) { }

  otp: string[] = ['', '', '', '']; // Array para almacenar los valores de los campos OTP

  // Manejar el cambio de cada campo de entrada
  onInputChange(event: any, index: number): void {
    const value = event.target.value;
    if (value && index < 4) {
      // Si el campo tiene un valor, ir al siguiente input automáticamente
      (document.getElementById(`input${index + 1}`) as HTMLInputElement)?.focus();
    }
    this.otp[index - 1] = value; // Almacenar el valor en el array OTP
  }

  // Verificar el OTP
  verifyOTP(): void {
    const otpCode = this.otp.join('');
    if (otpCode === '1234') {  // Ejemplo de validación del OTP
      alert('OTP Verified!');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  }

  // Método para salir del diálogo (si es necesario)
  exitOTP(): void {
    this.dialogRef.close();
  }

  // Método para re-enviar el código OTP (si es necesario)
  resendCode(): void {
    alert('Resending OTP...');
  }
}
