import Filter from './Filter';

/* Filters */
export default interface Filters {
	[key: string]: {
		data: Filter[]
	}
}
