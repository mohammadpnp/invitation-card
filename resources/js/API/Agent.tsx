import axios, {AxiosResponse} from 'axios';
import ApiHelper              from '../Helpers/Api';
import Agent                  from '../Types/Agent';
import {Filters}              from '../Types/Place';
import Deputize               from './Types/Item/Deputize';
import DeputizesResponse      from './Types/Responses/Deputizes';

type Response = AxiosResponse<DeputizesResponse, {}>;

type Result = {
	items: Agent[],
	filters: Filters
};

async function getAgent(id: number, search_params: URLSearchParams): Promise<Result> {
	const parameters = {
		// page: 1,
		// per_page: 10,
		// archive: 1,
	};
	
	const query_string = ApiHelper.toQueryString(parameters);
	
	const url = `deputize/${id}/show${search_params.size ? `?${search_params.toString()}` : ''}`;
	
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
				                      const items = response_data.data.deputizes.data;
				                      
				                      items.forEach((deputize) => {
					                      result.items.push(convertToAgent(deputize));
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

function convertToAgent(deputize: Deputize): Agent {
	return {
		id         : deputize.id,
		title      : deputize.brand,
		description: deputize.description,
		image      : deputize.logo,
	};
}

export default getAgent;
