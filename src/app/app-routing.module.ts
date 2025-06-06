import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './aboutUs/aboutUs.component';
import { AccountManagementComponent } from './accountManagement/accountManagement.component';
import { SettingsComponent } from './settings/settings.component';
import { DiscoverComponent } from './discover/discover.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './accountManagement/login/login.component';
import { CallbackComponent } from './accountManagement/callback/callback.component';
import { LogoutComponent } from './accountManagement/logout/logout.component';
import { FirstPreferencesComponent } from './accountManagement/first-preferences/first-preferences.component';
import { DiscoverRandomComponent } from './discover-random/discover-random.component';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
class AuthGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate(): boolean {
		if (localStorage.getItem('spotifyId')) {
			return true;
		}
		this.router.navigate(['/acc/login']);
		return false;
	}
}

const routes: Routes = [
	{ path: 'home', component: HomeComponent},

	{ path: 'acc', component: AccountManagementComponent, children:[
		{path: 'callback', component: CallbackComponent },
		{path: 'first-preferences', component: FirstPreferencesComponent},
		{path: 'login', component: LoginComponent},
		{path: 'logout', component: LogoutComponent}
	]},
	
	// { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
	{ path: 'discover', component: DiscoverComponent, canActivate: [AuthGuard] },
	{ path: 'discoverRandom', component: DiscoverRandomComponent, canActivate: [AuthGuard] },
	// { path: 'about-us', component: AboutUsComponent },

	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
