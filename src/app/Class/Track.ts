export class Track {
	id: number
	name: string
	img: string

	constructor(
		id: number,
		name: string,
		img: string
	) {
		this.id = id;
		this.name = name;
		this.img = img;
	}

	static parseJSON(json: any): Track {
		return new Track(
			json['id'],
			json['name'],
			json['img'],
		);
	}
}
