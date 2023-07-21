import axios, {AxiosResponse} from 'axios';
import ApiHelper              from '../Helpers/Api';
import Place, {Filters}       from '../Types/Place';
import PlaceItem              from './Types/Item/Place';
import FairPlaceResponse      from './Types/Responses/FairPlace';

type Response = AxiosResponse<FairPlaceResponse, {}>;

type Result = {
	item: Place,
	filters: Filters
};

async function getPlace(id: number, search_params: URLSearchParams): Promise<Result> {
	const parameters = {
		// page: 1,
		// per_page: 10,
		// archive: 1,
	};
	
	const query_string = ApiHelper.toQueryString(parameters);
	
	const url = `fairs/fair-places/${id}${search_params.size ? `?${search_params.toString()}` : ''}`;
	
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
			                      item   : {
				                      id         : 0,
				                      name       : '',
				                      description: null,
				                      image      : '',
				                      is_internal: false,
				                      slider     : false,
			                      },
			                      filters: {},
		                      };
		                      
		                      if (response) {
			                      const response_data = response.data;
			                      
			                      if (response_data.status_code === 200) {
				                      result.item = convertToPlace(response_data.data.fair_place)
			                      }
		                      }
		                      
		                      return result;
	                      });
}

export function convertToPlace(item: PlaceItem): Place {
	return {
		id         : item.id,
		name       : item.name,
		description: item.description,
		image      : item.poster,
		is_internal: item.is_internal,
		slider     : item.slider,
	};
}

export default getPlace;
