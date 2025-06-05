import { Artist } from "./Artist";

export class Track {
	
	id: string
	name: string
	imageUrl:string
	previewUrl:string
	artist: Artist
	

	constructor(
		id: string,
		name: string,
		imageUrl:string,
		previewUrl:string,
		artist: Artist
	) {
		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
		this.previewUrl = previewUrl;
		this.artist = artist;
	}

	static parseJSON(json: any): Track {
		return new Track(
			json['id'],
			json['name'],
			json['imageUrl'],
			json['previewUrl'],
			Artist.parseJSON(json['artist'])
		);
	}
}