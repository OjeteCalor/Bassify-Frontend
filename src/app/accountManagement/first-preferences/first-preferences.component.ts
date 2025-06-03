import { Component, inject, Injectable, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-first-preferences',
	templateUrl: './first-preferences.component.html',
	styleUrls: ['./first-preferences.component.css'],
	standalone: true,
	imports: [
		FormsModule
	]
})

@Injectable({providedIn: 'root'})
export class FirstPreferencesComponent implements OnInit{
 	private http = inject(HttpClient);

	genres: string[] = [];
	message: string = "";


  ngOnInit(): void {
	
	this.message = "Cargando..."
	this.http.get(`${environment.apiV1Uri}/tracks/genres`).subscribe(
		(response) => {
			console.log(response);
			this.message = ""
		},
		(error) => {
			this.message = "Error al cargar generos: " + error["message"] ;
			console.log(error);
		}
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
