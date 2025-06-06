import { Artist } from './Artist';

export class LikedTrack {
  trackSpotifyId: string;
  name: string;
  imageURL: string;
  previewURL: string;
  artist: {
    name: string;
    spotifyId: string;
    genres: string[];
  };
  liked: boolean;

  constructor(
    trackSpotifyId: string,
    name: string,
    imageURL: string,
    previewURL: string,
    artist: Artist,
    liked: boolean
  ) {
    this.trackSpotifyId = trackSpotifyId;
    this.name = name;
    this.imageURL = imageURL;
    this.previewURL = previewURL;
    this.artist = {
      name: artist.name,
      spotifyId: artist.id,
      genres: artist.genres ?? []
    };
    this.liked = liked;
  }
}
