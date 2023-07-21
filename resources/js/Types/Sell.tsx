import Picture from './Picture';
import Product from './Product';

export default interface Place {
	id: number,
	image: string, // URL
	pictures: Picture[],
	title: string,
	slogan: string,
	description: string,
	products: Product[],
}
