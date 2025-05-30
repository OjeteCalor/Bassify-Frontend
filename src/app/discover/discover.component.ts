import { Component, OnInit } from '@angular/core';
import { Track } from '../Class/Track';
import { CommonModule } from '@angular/common';
import { LikedTrack } from '../Class/LikedTrack';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class DiscoverComponent implements OnInit {
  tracks: Track[] = [];
  likedTracks: LikedTrack[] = [];
  currentIndex: number = 0;
  isAccepted = false;
  isRejected = false;
  isTransitioning = false;
  hasTransitioned = false;
  disableHover = false;

  ngOnInit(): void {
    fetch('/canciones.json')
      .then((response) => response.json())
      .then((data) => {
        for (const trackData of data['tracks']) {
          const track = Track.parseJSON(trackData);
          this.tracks.push(track);
        }
      })
      .catch((error) => console.error('Error al leer el archivo:', error));
  }

 acceptSong() {
  if (this.isTransitioning) return;
  this.disableHoverTemporarily();
  this.isAccepted = true;
  this.isTransitioning = true;
  this.hasTransitioned = false;
}

rejectSong() {
  if (this.isTransitioning) return;
  this.disableHoverTemporarily();
  this.isRejected = true;
  this.isTransitioning = true;
  this.hasTransitioned = false;
}

disableHoverTemporarily() {
  this.disableHover = true;
  setTimeout(() => {
    this.disableHover = false;
  }, 500); // 1 segundo
}

  onTransitionEnd(event: TransitionEvent) {
    // Solo actuamos cuando termine la transición de transform o opacity
    if ((event.propertyName === 'transform' || event.propertyName === 'opacity') && (this.isAccepted || this.isRejected)) {
      this.hasTransitioned = true;

	  	console.log("añadiendo cancion a lista de vistas"); // se llama dos veces

			let likedTrack = new LikedTrack(this.tracks[this.currentIndex].id, this.isAccepted, this.tracks[this.currentIndex].author.genres)
			this.likedTracks.push(likedTrack);

			console.log("likedTracks: ", this.likedTracks);

			// enviar datos cada 10 canciones
			if (10 <= this.likedTracks.length) {
				const id_user = '';
				fetch(`${environment.apiV1Uri}/tracks/discover/listened/${id_user}`, {
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(this.likedTracks)
				})

				.then(response => {return response.json()})
				.then(data => {
					if (data.status !== 200) {
						throw new Error('Error al enviar los datos');
					}
					this.likedTracks = [];
				})

				.catch(error => console.error('Error en la petición HTTP:', error));
			}
			

      setTimeout(() => {
        this.currentIndex++;
        this.isAccepted = false;
        this.isRejected = false;
        this.isTransitioning = false;
        this.hasTransitioned = false;
      }, 100);
    }
  }
}
