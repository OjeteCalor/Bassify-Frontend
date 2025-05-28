import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './aboutUs/aboutUs.component';
import { AccountManagementComponent } from './accountManagement/accountManagement.component';
import { SettingsComponent } from './settings/settings.component';
import { DiscoverComponent } from './discover/discover.component';
import { CallbackComponent } from './callback/callback.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'acc', component: AccountManagementComponent },
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
