export class Artist {

	id: string
	name: string
	genres: string[]

	constructor(
		id: string,
		name: string,
		genres: string[]
	) {
		this.id = id;
		this.name = name;
		this.genres = genres;
	}

	
	static parseJSON(json: any): Artist {
		return new Artist(
			json['id'],
			json['name'],
			json['genres']
		);
	}
}