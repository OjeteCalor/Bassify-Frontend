import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManagementComponent } from './accountManagement.component';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
	declarations: [
		AccountManagementComponent,
		LoginComponent,
		LogoutComponent,
	],
	imports: [
		FormsModule,
		CommonModule,
		RouterModule
	],
})
export class AccountManagementModule { }
