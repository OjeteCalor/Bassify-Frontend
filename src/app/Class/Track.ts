import { Artist } from "./Artist";

export class Track {
	
	trackSpotifyId:string
	id: string
	name: string
	imageURL:string
	previewURL:string
	artist: Artist
	

	constructor(
		trackSpotifyId:string,
		id: string,
		name: string,
		imageURL:string,
		previewURL:string,
		artist: Artist
	) {
		this.trackSpotifyId = trackSpotifyId;
		this.id = id;
		this.name = name;
		this.imageURL = imageURL;
		this.previewURL = previewURL;
		this.artist = artist;
	}

	static parseJSON(json: any): Track {
		return new Track(
			json['trackSpotifyId'],
			json['id'],
			json['name'],
			json['imageURL'],
			json['previewURL'],
			Artist.parseJSON(json['artist'])
		);
	}
}