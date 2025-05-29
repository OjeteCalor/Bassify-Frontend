import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import canciones from '../../../public/canciones.json'

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css'],
  imports: [CommonModule] 
})
export class DiscoverComponent {
  songs: any[] = [];
  currentIndex: number = 0;
  isAccepted = false;
  isRejected = false;

  ngOnInit() {
    this.songs = canciones;
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
