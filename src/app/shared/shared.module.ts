import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { OtpComponent } from './otp/otp.component';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    OtpComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    OtpComponent
  ],
})
export class SharedModule { }
