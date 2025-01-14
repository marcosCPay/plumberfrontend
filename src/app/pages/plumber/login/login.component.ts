import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Plumber } from 'src/app/models/plumber';
import axios from 'axios';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginPlumberComponent implements OnInit {
  pipe = new DatePipe('en-US');
  formLogin: FormGroup;
  todayWithPipe: any;
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    public form: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicializar el formulario
    this.formLogin = this.form.group({
      email: [''],
      password: ['']
    });
  }

  // Método para mostrar el mensaje de carga
  isLoading() {
    Swal.fire({
      allowOutsideClick: false,
      width: '200px',
      text: 'Cargando...',
    });
    Swal.showLoading();
  }

  // Método para ocultar el mensaje de carga
  stopLoading() {
    Swal.close();
  }

  ngOnInit(): void {

    // Redireccionar al inicio si ya hay un token de acceso en las cookies
    if (this.cookieService.check('token_access') == false) {
      this.router.navigateByUrl('login');
    }

    // Obtener la fecha actual formateada
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy  h:mm:ss a');
    /* Comentar este bloque temporalmente
    if (this.authService.estaAutenticado()) {
      this.router.navigateByUrl("inicio");
      var r = this.authService.obtenerUserLogeado();
      if (r.administrador) {
        this.router.navigate(['/mantenimiento/empresa']);
      } else if (r.supervisor) {
        this.router.navigate(['/inventario/apertura']);
      } else {
        this.router.navigate(['/inventario/toma']);
      }
    }
    */
  }

  submit() {
    // Crear un nuevo usuario con los datos del formulario
    const plumber = new Plumber();
    plumber.email = this.formLogin.value.email;
    plumber.password = this.formLogin.value.password;

    // Mostrar un mensaje de carga mientras se realiza la autenticación
    
    // Llamar al servicio de autenticación
    this.authService.loginPlumber(plumber).subscribe((r: any) => {
      if (r == null) {
        
        // Si la autenticación falla, redireccionar a la página de inicio de sesión y cerrar el mensaje de carga
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'Authentication error',
          text: 'Incorrect email or password',
        });
        
      } else {
        console.log(r);
        // Si la autenticación tiene éxito, almacenar el token de acceso y realizar verificaciones adicionales
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'Login',
          text: 'Entering...',
        });
        Swal.showLoading();
        // Retrasar la redirección para que se vea el popup
        setTimeout(() => {
          Swal.close();
          this.router.navigate(['/inicio/mantenimiento']);
        }, 2000); // 2000ms delay (2 seconds)
      }
    });
  }

}
