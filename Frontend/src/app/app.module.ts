import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // form module and reactive forms

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { GenerateComponent } from './components/generate/generate.component';
import { RegisterComponent } from './components/register/register.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FilterPipe } from './Pipe/filter.pipe';
import { QRCodeModule } from 'angularx-qrcode';
import { DropzoneDirective } from './Diritive/dropzone.directive';
import { ScanLogsComponent } from './components/scan-logs/scan-logs.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QrcodeComponent } from './components/qrcode/qrcode.component';
import { CovidFormComponent } from './components/covid-form/covid-form.component';
import { ScannerComponent } from './components/scanner/scanner.component';
import { AdminLandPageComponent } from './components/admin-land-page/admin-land-page.component'
import { UpdateProfileComponent } from './components/update-profile/update-profile.component'
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { UProfileComponent } from './components/userProfile/u-profile.component';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SpinnerComponent } from './components/spinner/spinner.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    FilterPipe,
    CovidFormComponent,
    ScanLogsComponent,
    SidenavComponent,
    DropzoneDirective,
    ForgotComponent,
    GenerateComponent,
    DropzoneDirective,
    QrcodeComponent,
    ScannerComponent,
    AdminLandPageComponent,
    UpdateProfileComponent,
    ScannerComponent,
    MobileNavComponent,
    UProfileComponent,
    ResetPasswordComponent,
    SpinnerComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    QRCodeModule,
    FontAwesomeModule,
    ZXingScannerModule,
    NgxPaginationModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
