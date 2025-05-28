import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first-preferences',
  templateUrl: './first-preferences.component.html',
  styleUrls: ['./first-preferences.component.css']
})
export class FirstPreferencesComponent {

	genres: string[] = ['rock','roll'];

	onSubmit() {
		console.log('genres:', this.genres);
	}

}
