import MainPicture from './MainPicture';
import Product     from './Product';

/* Agent */
export default interface Deputize {
	id: number,
	main_pictures: MainPicture[],
	brand: string, // نام برند
	logo: string, // URL
	slogan: string, // شعار شرکت
	description: string,
	products: Product[],
	lat: number,
	lng: number,
	instagram_link: string, // URL
	youtube_link: string, // URL
	video_link: string // URL
	website_link: string, // URL
};
