import FiltersBase from './Filters';

export interface Filters extends FiltersBase {
}

export default interface Place {
	id: number,
	name: string,
	description: null | string,
	image: string,
	is_internal: boolean,
	slider: boolean
}
