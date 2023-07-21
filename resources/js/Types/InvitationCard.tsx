import Exhibition  from './Exhibition';
import Picture     from './Picture';
import Poem        from './Poem';
import FiltersBase from './Filters';

export interface Filters extends FiltersBase {
}

interface Manager {
	name: string,
	picture: string,
	position: string,
	title: string,
	description: string,
}

export type TemplateType = 1 | 2 | 3 | 4 | 5 | 6 | 7;


export default interface InvitationCard {
	id: number,
	logo: string,
	pictures: Picture[],
	title: string,
	slogan: string,
	template_type: TemplateType,
	
	description?: {
		header: string,
		body: string,
		footer: string,
	},
	
	hall: number,
	booth: number,
	exhibition?: undefined | Exhibition,
	poem?: undefined | Poem,
	manager?: undefined | Manager
}
