import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManagementComponent } from './accountManagement.component';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
	AccountManagementComponent,
],
  imports: [
	CommonModule,
	RouterModule
  ],
})
export class AccountManagementModule { }
