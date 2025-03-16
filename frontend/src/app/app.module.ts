import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DecoratorComponent } from './decorator/decorator.component';
import { OwnerComponent } from './owner/owner.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminEditUserComponent } from './admin-edit-user/admin-edit-user.component';
import { StartPageComponent } from './start-page/start-page.component';
import { FiltrerPipe } from './filtrer.pipe';
import { OwnerMeniComponent } from './owner-meni/owner-meni.component';
import { OwnerFirmsComponent } from './owner-firms/owner-firms.component';
import { FirmsInfoComponent } from './firms-info/firms-info.component';
import { DecoratorMeniComponent } from './decorator-meni/decorator-meni.component';
import { OwnerAppointmentsComponent } from './owner-appointments/owner-appointments.component';
import { OwnerMaintenanceComponent } from './owner-maintenance/owner-maintenance.component';
import { DecoratorAppointmentsComponent } from './decorator-appointments/decorator-appointments.component';
import { DecoratorMaintenanceComponent } from './decorator-maintenance/decorator-maintenance.component';
import { DecoratorStatisticsComponent } from './decorator-statistics/decorator-statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DecoratorComponent,
    OwnerComponent,
    AdminComponent,
    AdminLoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    AdminEditUserComponent,
    StartPageComponent,
    FiltrerPipe,
    OwnerMeniComponent,
    OwnerFirmsComponent,
    FirmsInfoComponent,
    DecoratorMeniComponent,
    OwnerAppointmentsComponent,
    OwnerMaintenanceComponent,
    DecoratorAppointmentsComponent,
    DecoratorMaintenanceComponent,
    DecoratorStatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
