import { Artist } from "./Artist";

export class Track {
	
	id: string
	name: string
	author: Artist

	constructor(
		id: string,
		name: string,
		author: Artist
	) {
		this.id = id;
		this.name = name;
		this.author = author;
	}

	static parseJSON(json: any): Track {
		return new Track(
			json['id'],
			json['name'],
			Artist.parseJSON(json['author'])
		);
	}
}
