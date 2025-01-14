import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlumberService } from 'src/app/service/plumber.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Plumber } from 'src/app/models/plumber';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  // Variables to hold the state
  nameLabel: string = 'Name';  // Default label for Self-employed
  securityNumberLabel: string = 'SSN';
  securityNumberSpan: string = 'Social Security Number'
  infoPaypalLabel: string = 'Paypal'
  formRegister: FormGroup;
  isSelfEmployed:boolean=true;
  isPaypal:boolean=true;
  constructor(

    public form: FormBuilder,
    private plumberService: PlumberService,
    private router: Router
  ) { // Inicializar el formulario
    this.formRegister = this.form.group({
      companyName:['',[Validators.required]],
      name: ['',[Validators.required]],
      lastName:['',[Validators.required]],
      securityNumber: ['',[Validators.required, Validators.pattern(/^\d{9}$/)],],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]],
      phone: ['',[Validators.required, Validators.pattern(/^\+1\d{10}$/)]],
      paymentMethod:['',[Validators.required]]
    });}

  // Function to update the label based on the selected registration type
  selectRegistrationType(type: string): void {
    if (type === 'selfEmployed') {
      this.isSelfEmployed=true;
      this.nameLabel = 'Name';
      this.securityNumberLabel = 'SSN';
      this.securityNumberSpan = 'Social Security Number';
    } else if (type === 'companyRep') {
      this.isSelfEmployed=false;
      this.nameLabel = 'Company Name';
      this.securityNumberLabel = 'EIN';
      this.securityNumberSpan = 'Employer Identification Number';
    } else if (type === 'paypal') {
      this.isPaypal=true;
      this.infoPaypalLabel = 'Paypal';
    } else if (type === 'bank') {
      this.infoPaypalLabel = 'Bank Account';
      this.isPaypal=false;
    }
  }

  ngOnInit(): void {

  }

  // Función para guardar un negocio
  submit() {
    var plumber = new Plumber();
    plumber.company_name=this.formRegister.value.companyName;
    plumber.name = this.formRegister.value.name;
    plumber.last_name = this.formRegister.value.lastName;
    if(this.isSelfEmployed==true){
      plumber.social_security = this.formRegister.value.securityNumber;
    }else{
      plumber.ein=this.formRegister.value.securityNumber;
    }
    //plumber.ein=123;
    plumber.email = this.formRegister.value.email;
    plumber.password = this.formRegister.value.password;
    plumber.phone_number = this.formRegister.value.phone;
    plumber.address = 'Home';
    plumber.paypal_bank=this.formRegister.value.paymentMethod;
    if(this.isSelfEmployed==true){
      plumber.is_self_employed = 1;
    }else{
      plumber.is_self_employed = 0;
    }
    console.log(plumber);
    var solicitud = this.plumberService.createPlumber(plumber);

    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to save the record?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Save`,
      denyButtonText: `Cancel`,
      allowOutsideClick: false,
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'Saving record',
          text: 'Loading...',
        });
        Swal.showLoading();

        solicitud.subscribe(r => {
          Swal.fire({
            allowOutsideClick: false,
            icon: 'success',
            title: 'Success',
            text: 'Saved successfully!',
          }).then((result) => {
            window.location.reload();
          });
        }, err => {
          console.log(err);

          if (err.name == "HttpErrorResponse") {
            Swal.fire({
              allowOutsideClick: false,
              icon: 'error',
              title: 'Error connecting',
              text: 'Communication error with the server',
            });
            return;
          }

          Swal.fire({
            allowOutsideClick: false,
            icon: 'error',
            title: err.name,
            text: err.message,
          });
        });
      }
    });
  }


}
