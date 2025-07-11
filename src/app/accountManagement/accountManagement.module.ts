import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManagementComponent } from './accountManagement.component';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
	declarations: [
	],
	imports: [
		FormsModule,
		CommonModule,
		RouterModule,
		AccountManagementComponent
	],
	providers: [
		provideHttpClient(),
	],
})
export class AccountManagementModule { }
