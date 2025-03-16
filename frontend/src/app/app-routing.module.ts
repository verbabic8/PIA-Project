import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DecoratorComponent } from './decorator/decorator.component';
import { OwnerComponent } from './owner/owner.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminEditUserComponent } from './admin-edit-user/admin-edit-user.component';
import { StartPageComponent } from './start-page/start-page.component';
import { OwnerMeniComponent } from './owner-meni/owner-meni.component';
import { OwnerFirmsComponent } from './owner-firms/owner-firms.component';
import { FirmsInfoComponent } from './firms-info/firms-info.component';
import { DecoratorMeniComponent } from './decorator-meni/decorator-meni.component';
import { OwnerAppointmentsComponent } from './owner-appointments/owner-appointments.component';
import { OwnerMaintenanceComponent } from './owner-maintenance/owner-maintenance.component';
import { DecoratorAppointmentsComponent } from './decorator-appointments/decorator-appointments.component';
import { DecoratorMaintenanceComponent } from './decorator-maintenance/decorator-maintenance.component';
import { DecoratorStatisticsComponent } from './decorator-statistics/decorator-statistics.component';

const routes: Routes = [
  { path: '', component: StartPageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'decorator', component: DecoratorComponent },
  { path: 'owner', component: OwnerComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'adminLogin', component: AdminLoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'admin/editUser/:username', component: AdminEditUserComponent },
  { path: 'ownerMeni', component: OwnerMeniComponent},
  { path: 'ownerFirms', component: OwnerFirmsComponent},
  { path: 'firmsInfo/:name', component: FirmsInfoComponent},
  { path: 'decoratorMeni', component: DecoratorMeniComponent},
  { path: 'ownerAppointments', component: OwnerAppointmentsComponent},
  { path: 'ownerMaintenance', component: OwnerMaintenanceComponent},
  { path: 'decoratorAppointments', component: DecoratorAppointmentsComponent},
  { path: 'decoratorMaintenance', component: DecoratorMaintenanceComponent},
  { path: 'decoratorStatistics', component: DecoratorStatisticsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
