import axios, {AxiosResponse} from 'axios';
import ApiHelper              from '../Helpers/Api';
import Exhibition             from '../Types/Exhibition';
import Place, {Filters}       from '../Types/Place';
import {convertToPlace}       from './Place';
import FairPlacesResponse     from './Types/Responses/FairPlaces';

type Response = AxiosResponse<FairPlacesResponse, {}>;

type Result = {
    all: {},
	items: Place[],
	filters: Filters
};

async function getPlaces(search_params: URLSearchParams): Promise<Result> {
	const parameters = {
		// page: 1,
		// per_page: 10,
		// archive: 1,
	};

	const query_string = ApiHelper.toQueryString(parameters);

	const url = `fairs/fair-places${search_params.size ? `?${search_params.toString()}` : ''}`;

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
                                  all: {},
			                      items  : [],
			                      filters: {},
		                      };

		                      if (response) {
			                      const response_data = response.data;

			                      if (response_data.status_code === 200) {
				                      const items = response_data.data.fair_places.data;

				                      items.forEach((fair_place) => {
					                      result.items.push(convertToPlace(fair_place));
				                      });

				                      const filters = response_data.data.filters;

				                      if (filters) {
					                      for (const [key, {data}] of Object.entries(filters)) {
						                      result.filters[key] = data;
					                      }
				                      }
                                      result.all = response.data
			                      }
		                      }

		                      return result;
	                      });
}

export default getPlaces;
