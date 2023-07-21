import axios, {AxiosResponse} from 'axios';
import ApiHelper              from '../Helpers/Api';
import Picture                from '../Types/Picture';
import Sell                   from '../Types/Sell';
import SpecialSellsResponse   from './Types/Responses/SpecialSells';
import MainPictureItem        from './Types/Item/MainPicture';

type Response = AxiosResponse<SpecialSellsResponse, {}>;

type Result = {
	item: Sell
};


async function getSell(id: number, search_params: URLSearchParams): Promise<Result> {
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
		                      const result: Result = {
			                      item: {
				                      id         : 0,
				                      image      : '',
				                      pictures   : [],
				                      title      : '',
				                      slogan     : '',
				                      description: '',
				                      products   : [],
			                      },
		                      };
		                      
		                      if (response) {
			                      const response_data = response.data;
			                      
			                      if (response_data.status_code === 200) {
				                      const items = response_data.data.special_sells.data;
				                      
				                      items.forEach((special_sell) => {
					                      result.item = {
						                      id         : special_sell.id,
						                      image      : special_sell.logo,
						                      pictures   : special_sell.main_pictures.map((main_picture: MainPictureItem): Picture => {
							                      return {
								                      source: main_picture.link,
							                      };
						                      }),
						                      title      : special_sell.brand,
						                      slogan     : special_sell.slogan,
						                      description: special_sell.description,
						                      products   : special_sell.products,
					                      };
				                      });
			                      }
		                      }
		                      
		                      return result;
	                      });
}

export default getSell;
