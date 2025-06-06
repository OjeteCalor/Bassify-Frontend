import { Component, OnInit, OnDestroy } from '@angular/core';
import { Track } from '../Class/Track';
import { CommonModule } from '@angular/common';
import { LikedTrack } from '../Class/LikedTrack';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-discover-random',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './discover-random.component.html',
  styleUrls: ['./discover-random.component.css'],
})
export class DiscoverRandomComponent implements OnInit {
  tracks: Track[] = [];
  likedTracks: LikedTrack[] = [];
  currentIndex: number = 0;
  isAccepted = false;
  isRejected = false;
  isTransitioning = false;
  disableHover = false;
  hasTransitioned = false;

  isPlaying = false;
  volume = 0.5;

  private audio = new Audio();

  private isLoadingMore: boolean = false; // Evita cargas duplicadas

  ngOnInit(): void {
    this.loadInitialTracks();

    this.audio.volume = this.volume;
    this.loadAudioPreview();
  }


  acceptSong() {
    if (this.isTransitioning) return;
    this.disableHoverTemporarily();
    this.isAccepted = true;
    this.isRejected = false;
    this.isTransitioning = true;

    setTimeout(() => {
      this.resetTransitionFlags();
    }, 500);
  }

  rejectSong() {
    if (this.isTransitioning) return;
    this.disableHoverTemporarily();
    this.isRejected = true;
    this.isAccepted = false;
    this.isTransitioning = true;

    setTimeout(() => {
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
    console.log('Añadiendo canción a lista de vistas');

    const track = this.tracks[this.currentIndex];

    const likedTrack = new LikedTrack(
      track.trackSpotifyId,
      track.name,
      track.imageURL,
      track.previewURL,
      {
        name: track.artist.name,
        id: track.artist.id,
        genres: track.artist.genres ?? [],
      },
      this.isAccepted
    );

    this.likedTracks.push(likedTrack);
    console.log('likedTracks:', this.likedTracks);

    if (this.likedTracks.length >= 10) {
      this.sendLikedTracks().catch((error) =>
        console.error('Error al enviar los datos:', error)
      );
    }

    this.currentIndex++;
    this.loadAudioPreview();

    // Si quedan 10 o menos canciones, y no estamos ya cargando más, pedimos más
    if (this.tracks.length - this.currentIndex <= 10 && !this.isLoadingMore) {
      this.loadMoreTracks();
    }

    this.isAccepted = false;
    this.isRejected = false;
    this.isTransitioning = false;
    this.hasTransitioned = false;

    this.audio.pause();
    this.isPlaying = false;
  }

  private loadInitialTracks(): void {
    console.log('Cargando canciones iniciales (random)...');
    fetch(`${environment.apiV1Uri}/tracks/discover/random`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar canciones iniciales');
        }
        return response.json();
      })
      .then((data) => {
        for (const trackData of data) {
          const track = Track.parseJSON(trackData);
          this.tracks.push(track);
        }
        console.log('Canciones iniciales cargadas:', this.tracks.length);
        this.loadAudioPreview();
      })
      .catch((error) =>
        console.error('Error al cargar canciones iniciales:', error)
      );
  }

  private async loadMoreTracks(): Promise<void> {
    this.isLoadingMore = true; // <-- activo flag

    console.log('Cargando más canciones random...');
    try {
      const response = await fetch(`${environment.apiV1Uri}/tracks/discover/random`);
      if (!response.ok) {
        throw new Error('Error al cargar más canciones');
      }
      const newTracks = await response.json();

      for (const trackData of newTracks) {
        const newTrack = Track.parseJSON(trackData);
        this.tracks.push(newTrack);
      }
      console.log('Se agregaron nuevas canciones. Total:', this.tracks.length);
    } catch (error) {
      console.error('Error al cargar nuevas canciones:', error);
    } finally {
      this.isLoadingMore = false; // <-- desactivo flag
    }
  }

  private async sendLikedTracks(): Promise<void> {
    const spotifyId = localStorage.getItem('spotifyId') ?? '';
    if (!spotifyId) {
      console.warn('Spotify ID no encontrado en localStorage');
      return;
    }

    console.log('Enviando canciones escuchadas al backend...');
    const response = await fetch(
      `${environment.apiV1Uri}/tracks/discover/listened/${spotifyId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.likedTracks),
      }
    );

    if (!response.ok) {
      throw new Error('Error al enviar los datos');
    }

    this.likedTracks = [];
    console.log('Canciones enviadas correctamente, lista limpia.');
  }

  togglePlayback() {
    if (!this.audio.src) {
      this.loadAudioPreview();
    }

    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  onVolumeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.volume = parseFloat(input.value);
    this.audio.volume = this.volume;
  }

  private loadAudioPreview() {
    if (this.tracks.length > this.currentIndex) {
      this.audio.src = this.tracks[this.currentIndex].previewURL;
      this.audio.load();

      setTimeout(() => {
        this.audio
          .play()
          .then(() => {
            this.isPlaying = true;
          })
          .catch((err) => {
            console.log('Error al iniciar reproducción automática:', err);
            this.isPlaying = false;
          });
      }, 1000);
    } else {
      this.audio.src = '';
      this.isPlaying = false;
    }
  }
}
