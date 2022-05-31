import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ScanLogsComponent } from './components/scan-logs/scan-logs.component';
import { CovidFormComponent } from './components/covid-form/covid-form.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { GenerateComponent } from './components/generate/generate.component';
import { QrcodeComponent } from './components/qrcode/qrcode.component'
import { UProfileComponent } from './components/userProfile/u-profile.component';
import { ScannerComponent } from './components/scanner/scanner.component';
import { AdminLandPageComponent } from './components/admin-land-page/admin-land-page.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { AuthGuard } from './shared/auth.guard';
import { AdminGuard } from './shared/admin.guard';
import { helpDeskGuard } from './shared/help-desk.guard';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'register',
    canActivate: [AdminGuard],
    component:RegisterComponent
  },
  {
    path: 'user-list',
    canActivate: [AdminGuard],
    component: UserListComponent
  },
  {
    path: 'user-profile',
    canActivate: [AuthGuard],
    component: UProfileComponent
  },
  {
    path: 'user-profile/:user_id',
    canActivate: [helpDeskGuard],
    component: UProfileComponent
  },
  {
    path: 'scan-logs',
    canActivate: [AdminGuard],
    component: ScanLogsComponent
  },
  {
    path:'covid',
    canActivate: [AuthGuard],
    component:CovidFormComponent
  },
  {
    path:'generate',
    component:GenerateComponent
  },
  {
    path:'create-password',
    component:ForgotComponent
  },
  {
    path: 'qrcode',
    canActivate: [AuthGuard],
    component: QrcodeComponent
  },

  {
    path: 'scan',
    canActivate: [helpDeskGuard],
    component: ScannerComponent
  },
  {
    path: 'admin-dashboard',
    canActivate: [AdminGuard],
    component: AdminLandPageComponent
  },
  {
    path: 'nav-btm',
    component: MobileNavComponent
  },

  {
    path: 'update-profile',
    canActivate: [AuthGuard],
    component:UpdateProfileComponent
  },
  {
    path:'reset-password/:token',
    component: ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }