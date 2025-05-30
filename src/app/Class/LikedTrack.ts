export class LikedTrack {


	id: string
	liked: boolean
	genres: string[]
	

	constructor(
		id: string,
		liked: boolean,
		genres: string[]
	) {
		this.id = id;
		this.liked = liked;
		this.genres = genres;
	}
}
