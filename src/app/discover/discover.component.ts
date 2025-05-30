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
  disableHover = false;
  hasTransitioned = false;

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

    // Suponiendo que la transición dura 1000ms (1s)
    setTimeout(() => {
      this.currentIndex++;
      this.resetTransitionFlags();
    }, 500);
  }

  rejectSong() {
    if (this.isTransitioning) return;
    this.disableHoverTemporarily();
    this.isRejected = true;
    this.isTransitioning = true;

    // Suponiendo que la transición dura 1000ms (1s)
    setTimeout(() => {
      this.currentIndex++;
      this.resetTransitionFlags();
    }, 500);
  }

  disableHoverTemporarily() {
    this.disableHover = true;
    setTimeout(() => {
      this.disableHover = false;
    }, 500);
  }

  private resetTransitionFlags() {
    this.isAccepted = false;
    this.isRejected = false;
    this.isTransitioning = false;
  }
}



