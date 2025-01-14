import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { SectionsModule } from '../sections/sections.module';
import { HomeComponent } from './home/home.component';
import { LoginPlumberComponent } from './plumber/login/login.component';
import { LoginCompanyComponent } from './company/login/login.component';
import { Plumber } from '../models/plumber';
import { RegisterCompanyComponent } from './company/register/register.component';
import { RegisterPlumberComponent } from './plumber/register/register.component';

@NgModule({
  declarations: [

    HomeComponent,
    LoginComponent,
    InicioComponent,
    LoginPlumberComponent,
    LoginCompanyComponent,
    RegisterCompanyComponent,
    RegisterPlumberComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SectionsModule
  ], exports: [
    LoginComponent,
    InicioComponent,
    HomeComponent,
    LoginPlumberComponent,
    LoginCompanyComponent,
    RegisterCompanyComponent,
    RegisterPlumberComponent
  ]
})
export class PagesModule { }
