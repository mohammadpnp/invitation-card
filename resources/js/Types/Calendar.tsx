import FiltersBase from './Filters';

export interface Filters extends FiltersBase {
}
export default interface Calendar {
	id: number,
	title: string,
	description: string,
	image: string,
	telephone: string,
	start_at: string,
	end_at: string,
}
