import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingAdminComponent } from './landing-admin/landing-admin.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { MasterLandingComponent } from './master-landing/master-landing.component';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { UserlayoutComponent } from './userlayout/userlayout.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin/master', component: MasterLandingComponent },
  { path: 'user/master', component: UserLandingComponent },

  // App user routes goes here here
  {
    path: '',
    component: UserlayoutComponent,
    children: [
      { path: 'landing', component: LandingComponent },
      { path: 'dashboard', component: DashboardComponent }
    ]
  },

  // App admin routes goes here here
  {
    path: 'admin',
    component: AdminlayoutComponent,
    children: [
      { path: 'landing', component: LandingAdminComponent },
      { path: 'dashboard', component: DashboardComponent }
    ]
  },


  { path: '**', redirectTo: '' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,

  ]
})
export class AppRoutingModule { }
