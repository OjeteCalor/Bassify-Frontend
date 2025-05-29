export class Track {
	id: number
	name: string

	constructor(
		id: number,
		name: string
	) {
		this.id = id;
		this.name = name;
	}

	static parseJSON(json: any): Track {
		return new Track(
			json['id'],
			json['name']
		);
	}
}
