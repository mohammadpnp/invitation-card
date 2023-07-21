import axios, {AxiosResponse} from 'axios';
import ApiHelper                    from '../Helpers/Api';
import Picture                from '../Types/Picture';
import Sell                   from '../Types/Sell';
import SpecialSellResponse   from './Types/Responses/SpecialSell';
import MainPictureItem        from './Types/Item/MainPicture';

type Response = AxiosResponse<SpecialSellResponse, {}>;

type Result = Sell;


async function getSell(id: number, search_params: URLSearchParams): Promise<Result> {
	const parameters = {
		// page: 1,
		// per_page: 10,
		// archive: 1,
	};
	
	const query_string = ApiHelper.toQueryString(parameters);
	
	const url = `special-sells/${id}/show${search_params.size ? `?${search_params.toString()}` : ''}`;
	
	return await ApiHelper.getFetcher()
	                .get(url)
	                .catch((thrown) => {
		                if (axios.isCancel(thrown)) {
			                console.log('Request canceled', thrown.message);
		                } else {
			                // handle error
		                }
	                })
	                .then((response: Response | void): Result => {
		                const sells: Result = {
			                id         : 0,
			                image      : '',
			                pictures   : [],
			                title      : '',
			                slogan     : '',
			                description: '',
			                products   : [],
		                };
		                
		                if (response) {
			                const response_data = response.data;
			                
			                if (response_data.status_code === 200) {
				                const special_sell = response_data.data.special_sell;
				                
				                sells.id         = special_sell.id;
				                sells.image      = special_sell.logo;
				                sells.pictures   = special_sell.main_pictures.map((main_picture: MainPictureItem): Picture => {
					                return {
						                source: main_picture.link,
					                };
				                });
				                sells.title      = special_sell.brand;
				                sells.slogan     = special_sell.slogan;
				                sells.description= special_sell.description;
				                sells.products   = special_sell.products;
			                }
		                }
		                
		                return sells;
	                });
}

export default getSell;
