import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseComponent } from './modules/case/case.component';
import { ClientComponent } from './modules/client/client.component';
import { ProductComponent } from './modules/product/product.component';
import { UserComponent } from './modules/user/user.component';
import { SupplierComponent } from './modules/supplier/supplier.component';
import { EntryComponent } from './modules/entry/entry.component';
import { OutputComponent } from './modules/output/output.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { OperationsComponent } from './modules/operations/operations.component';
import { MovementsComponent } from './modules/movements/movements.component';
import { UbicationComponent } from './modules/ubication/ubication.component';
import { OrderComponent } from './modules/order/order.component';
import { BusinessComponent } from './modules/business/business.component';
import { SessionComponent } from './modules/session/session.component';
import { MessageComponent } from './modules/message/message.component';
import { DocumentComponent } from './modules/document/document.component';
import { LoginCompanyComponent } from './modules/company/login/login.component';
import { LoginPlumberComponent } from './modules/plumber/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterCompanyComponent } from './modules/company/register/register.component';
import { RegisterPlumberComponent } from './modules/plumber/register/register.component';
import { MantenimientoComponent } from './sections/mantenimiento/mantenimiento.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'company/login',
    component: LoginCompanyComponent
  },
  {
    path: 'plumber/login',
    component: LoginPlumberComponent
  },
  {
    path: 'company/register',
    component: RegisterCompanyComponent
  },
  {
    path: 'plumber/register',
    component: RegisterPlumberComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'inicio',
    component: InicioComponent,
    
    children: [
      {
        path: 'mantenimiento',
        component: MantenimientoComponent,
        children: [
          { path: 'open-cases', component: CaseComponent},
          { path: 'client', component: ClientComponent},
          { path: 'product', component: ProductComponent },
          { path: 'user', component: UserComponent },
          { path: 'supplier', component: SupplierComponent },
          { path: 'entry', component: EntryComponent },
          { path: 'output', component: OutputComponent },
          { path: 'operations', component: OperationsComponent },
          { path: 'movements', component: MovementsComponent },
          { path: 'ubication', component: UbicationComponent },
          { path: 'business', component: BusinessComponent,},
          { path: 'order', component: OrderComponent },
          { path: 'session', component: SessionComponent },
          { path: 'message', component: MessageComponent },
          { path: 'document', component: DocumentComponent }
        ]
      },
      {
        path: '',
        redirectTo: 'mantenimiento',
        pathMatch: 'full'
      }
    ]
  },
  // Agrega una ruta para manejar cualquier otra ruta no definida
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
