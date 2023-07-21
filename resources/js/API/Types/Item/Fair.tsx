import Place from './Place';

/* Exhibition */
interface Fair {
	id: number,
	name: string,
	title: string,
	poster: string,
	presenter: null | string,
	start_date_at: string,
	end_date_at: string,
	place: null | Place
}

export default Fair;
