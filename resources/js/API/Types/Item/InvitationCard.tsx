/* InvitationCard */
import {TemplateType} from '../../../Types/InvitationCard';
import Fair           from './Fair';
import MainPicture    from './MainPicture';
import Product        from './Product';

export default interface InvitationCard {
	id: number,
	logo: string, // URL
	main_pictures?: MainPicture[],
	brand: string, // نام برند
	slogan: string, // شعار شرکت
	template_type: TemplateType,
	description: string,
	products: Product[],
	saloon: number,
	booth: number,
	started_at: string, // Datetime
	finished_at: string, // Datetime
	fair: Fair,
	description_header: string,
	description_footer: string,
	manager_photo: string, // URL
	manager_name: string,
	manager_position: string,
	manager_title: string,
	manager_description: string,
	lat: number,
	lng: number,
	instagram_link: string,
	youtube_link: string,
	website_link: null | string, // URL
	video_link: string, // URL
};
