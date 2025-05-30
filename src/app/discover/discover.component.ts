import { Component, OnInit } from '@angular/core';
import { Track } from '../Class/Track';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class DiscoverComponent implements OnInit {
  tracks: Track[] = [];
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
  }, 1000); // 1 segundo
}

  onTransitionEnd(event: TransitionEvent) {
    // Solo actuamos cuando termine la transición de transform o opacity
    if ((event.propertyName === 'transform' || event.propertyName === 'opacity') && (this.isAccepted || this.isRejected)) {
      this.hasTransitioned = true;

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
