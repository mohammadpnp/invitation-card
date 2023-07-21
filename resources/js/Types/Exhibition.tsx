import Place from './Place';
import FiltersBase from './Filters';

export interface Filters extends FiltersBase {}
export default interface Exhibition {
	id: number,
	image: string,
	title: string,
	description: null | string,
	presenter: null | string,
	start_at: string,
	end_at: string,
	place: null | Place
}
