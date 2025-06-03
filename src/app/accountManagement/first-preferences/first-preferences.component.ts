import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-first-preferences',
	templateUrl: './first-preferences.component.html',
	styleUrls: ['./first-preferences.component.css'],
	imports: [FormsModule]
})
export class FirstPreferencesComponent implements OnInit{

	genres: string[] = [];


  ngOnInit(): void {
	
	fetch(`/genres.json`, {
	// fetch(`${environment.apiV1Uri}/tracks/genres/get`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' }
	})
	.then((response) => response.json())
	.then((data) => {
		if (data.status !== 200) {
			throw new Error('Error al enviar los datos');
		}
		this.genres = data["genres"];
	})
	.catch((error) =>
		console.error('Error en la petición HTTP:', error)
	);

  }


	onSubmit(form: any) {

		let selectedGenres:string[] = [];
		this.genres.forEach(genre => {
			if (form.value[genre] === true) {
				selectedGenres.push(genre)
			}
		});
		
		console.log('Géneros seleccionados:', selectedGenres);
		
		
		fetch(`/genres.json`, {
		// fetch(`${environment.apiV1Uri}/account/create/preferences`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({"selected_genres":selectedGenres})
		})
		.then((response) => response.json())
		.then((data) => {
			if (data.status !== 200) {
				throw new Error('Error al enviar los datos');
			}
			console.log("datos enviados correctamente, redirijir a discover");
		})
		.catch((error) =>
			console.error('Error en la petición HTTP:', error)
		);
	}

}
