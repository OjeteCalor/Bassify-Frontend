import { Component, OnInit } from '@angular/core';
import { Track } from '../Class/Track';

@Component({
	selector: 'app-discover',
	templateUrl: './discover.component.html',
	styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

	tracks: Track[] = [];

	ngOnInit(): void {
		fetch('/canciones.json')
			.then(response => response.json())
			.then(data => {
				for (const trackData of data['tracks']) {
					const track = Track.parseJSON(trackData);
					this.tracks.push(track);
				}
			})
			.catch(error => console.error('Error al leer el archivo:', error))
		;
	}

}
