import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Track } from '../Class/Track';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  tracks: Track[] = [];
  currentIndex: number = 0;
  isAccepted = false;
  isRejected = false;

  ngOnInit(): void {
    fetch('/canciones.json')
      .then(response => response.json())
      .then(data => {
        this.tracks = data.tracks.map((trackData: any) => Track.parseJSON(trackData));
      })
      .catch(error => console.error('Error al cargar canciones:', error));
  }

  acceptSong() {
    this.isAccepted = true;
  }

  rejectSong() {
    this.isRejected = true;
  }

  onTransitionEnd() {
    if (this.isAccepted || this.isRejected) {
      this.currentIndex++;
      this.isAccepted = false;
      this.isRejected = false;
    }
  }
}
