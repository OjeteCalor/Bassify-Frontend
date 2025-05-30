import { Artist } from "./Artist";

export class Track {
	
	id: string
	name: string
	imageUrl:string
	previewUrl:string
	author: Artist
	

	constructor(
		id: string,
		name: string,
		imageUrl:string,
		previewUrl:string,
		author: Artist
	) {
		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
		this.previewUrl = previewUrl;
		this.author = author;
	}

	static parseJSON(json: any): Track {
		return new Track(
			json['id'],
			json['name'],
			json['imageUrl'],
			json['previewUrl'],
			Artist.parseJSON(json['author'])
		);
	}
}