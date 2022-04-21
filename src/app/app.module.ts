import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { DataListingComponent } from './data-listing/data-listing.component';
import { LandingComponent } from './landing/landing.component';
import { UserlayoutComponent } from './userlayout/userlayout.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';
import { LandingAdminComponent } from './landing-admin/landing-admin.component';
import { ProcessModalComponent } from './process-modal/process-modal.component';
import { MasterImportComponent } from './admin/master-import/master-import.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { MasterLandingComponent } from './master-landing/master-landing.component';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { EditMasterComponent } from './edit-master/edit-master.component';
import { ViewMasterComponent } from './view-master/view-master.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ModalFormComponent,
    DataListingComponent,
    LandingComponent,
    UserlayoutComponent,
    UserHeaderComponent,
    AdminlayoutComponent,
    LandingAdminComponent,
    ProcessModalComponent, 
    MasterImportComponent, MasterLandingComponent, UserLandingComponent, EditMasterComponent, ViewMasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    GridModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalFormComponent]
})
export class AppModule { }
