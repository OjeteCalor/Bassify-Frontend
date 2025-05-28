import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './aboutUs/aboutUs.component';
import { AccountManagementComponent } from './accountManagement/accountManagement.component';
import { SettingsComponent } from './settings/settings.component';
import { DiscoverComponent } from './discover/discover.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './accountManagement/login/login.component';
import { CallbackComponent } from './callback/callback.component';

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'acc', component: AccountManagementComponent, children:[
		{path: 'login', component: LoginComponent}
	]},
	{ path: 'settings', component: SettingsComponent },
	{ path: 'discover', component: DiscoverComponent },
	{ path: 'about-us', component: AboutUsComponent },
	{ path: 'callback', component: CallbackComponent },

	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
