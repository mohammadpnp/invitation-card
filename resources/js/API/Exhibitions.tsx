import axios, {AxiosResponse} from 'axios';
import ApiHelper             from '../Helpers/Api';
import Exhibition, {Filters} from '../Types/Exhibition';
import {convertToExhibition} from './Exhibition';
import FairsResponse          from './Types/Responses/Fairs';

type Response = AxiosResponse<FairsResponse, {}>;

type Result = {
	items: Exhibition[],
	filters: Filters
};

async function getExhibitions(search_params: URLSearchParams): Promise<Result> {
	const parameters = {
		// page: 1,
		// per_page: 10,
		// archive: 1,
	};
	
	const query_string = ApiHelper.toQueryString(parameters);
	
	const url = `fairs${search_params.size ? `?${search_params.toString()}` : ''}`;
	
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
			                      items  : [],
			                      filters: {},
		                      };
		                      
		                      if (response) {
			                      const response_data = response.data;
			                      
			                      if (response_data.status_code === 200) {
				                      const items = response_data.data.fairs.data;
				                      
				                      items.forEach((fair) => {
					                      result.items.push(convertToExhibition(fair));
				                      });
									  
				                      const filters = response_data.data.filters;
				                      
				                      if (filters) {
					                      for (const [key, {data}] of Object.entries(filters)) {
						                      result.filters[key] = data;
					                      }
				                      }
			                      }
		                      }
		                      
		                      return result;
	                      });
}

export default getExhibitions;
