import axios, {AxiosResponse} from 'axios';
import ApiHelper              from '../Helpers/Api';
import Appreciation           from '../Types/Appreciation';
import Filters                from '../Types/Filters';
import PaperCardsResponse     from './Types/Responses/PaperCards';

type Response = AxiosResponse<PaperCardsResponse, {}>;

type Result = {
	items: Appreciation[],
	filters: Filters
};

async function getAppreciations(id: number, search_params: URLSearchParams): Promise<Result> {
	const parameters = {
		// page: 1,
		// per_page: 10,
		// archive: 1,
	};
	
	const query_string = ApiHelper.toQueryString(parameters);
	
	const url = `appreciation/${id}${search_params.size ? `?${search_params.toString()}` : ''}`;
	
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
				                      const items = response_data.data.paper_cards.data;
				                      
				                      items.forEach((appreciation) => {
					                      result.items.push(
						                      {
							                      id         : appreciation.id,
							                      title      : appreciation.name,
							                      description: '',
							                      image      : appreciation.poster,
						                      },
					                      );
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

export default getAppreciations;
