import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompanyService } from 'src/app/service/company.service';
import { ServiceAreaService } from 'src/app/service/serviceArea.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Company } from 'src/app/models/company';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterCompanyComponent implements OnInit {
  // Variables to hold the state

  infoPaypalLabel: string = 'Paypal'
  formRegister: FormGroup;
  isPaypal: boolean = true;
  serviceAreas: any;
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    public form: FormBuilder,
    private companyService: CompanyService,
    private serviceAreaService: ServiceAreaService,
  ) { // Inicializar el formulario
    this.formRegister = this.form.group({
      name: ['', [Validators.required]],
      contactName: ['', [Validators.required]],
      ein: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\+1\d{10}$/)]],
      paymentMethod: ['', [Validators.required]],
      serviceAreaId: ['', [Validators.required]]
    });
  }

  // Function to update the label based on the selected registration type
  selectRegistrationType(type: string): void {
    if (type === 'paypal') {
      this.isPaypal = true;
      this.infoPaypalLabel = 'Paypal';
    } else if (type === 'bank') {
      this.infoPaypalLabel = 'Bank Account';
      this.isPaypal = false;
    }
  }
  get() {
    this.serviceAreaService.getServiceAreas().subscribe(response => {
      this.serviceAreas = response;
    });
  }


  ngOnInit(): void {
    this.get()
  }

  // Función para guardar un negocio
  submit() {

    var company = new Company();
    company.name = this.formRegister.value.name;
    company.contact_name = this.formRegister.value.contactName;
    company.ein = this.formRegister.value.ein;
    company.email = this.formRegister.value.email;
    company.password = this.formRegister.value.password;
    company.phone_number = this.formRegister.value.phone;
    company.address = 'Home';
    company.paypal_bank = this.formRegister.value.paymentMethod;
    company.service_area_id = this.formRegister.value.serviceAreaId;
    var solicitud = this.companyService.createCompany(company);
    if (this.formRegister.valid) {
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


}
