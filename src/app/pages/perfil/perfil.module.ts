import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { SharedModule } from "../../shared/shared.module";
import { MaterialModule } from '../../shared/material/material.module';
import { PerfilComponent } from './perfil.component';
import { SharedModule } from "../../shared/shared.module";
import { MaterialModule } from '../../shared/material/material.module';
import { PerfilRoutingModule } from './perfil-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PerfilComponent
  ],
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PerfilModule { }
