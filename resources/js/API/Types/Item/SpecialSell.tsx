import MainPicture from './MainPicture';
import Product     from './Product';

/* Sell */
export default interface SpecialSell {
	id: number,
	main_pictures: MainPicture[],
	brand: string, // نام برند
	logo: string, // URL
	slogan: string, // شعار شرکت
	description: string,
	products: Product[],
};
