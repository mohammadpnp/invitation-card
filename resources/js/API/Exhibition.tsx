import axios, {AxiosResponse} from 'axios';
import ApiHelper              from '../Helpers/Api';
import Exhibition             from '../Types/Exhibition';
import Filters                from '../Types/Filters';
import {convertToPlace}       from './Place';
import FairsResponse          from './Types/Responses/Fairs';
import FairItem               from './Types/Item/Fair';

type Response = AxiosResponse<FairsResponse, {}>;

type Result = {
    all: {},
	items: Exhibition[],
	filters: Filters
};

async function getExhibition(id: number, search_params: URLSearchParams): Promise<Result> {
	const parameters = {
		id,
		// page: 1,
		// per_page: 10,
		// archive: 1,
	};

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
                                  all: {},
			                      items  : [],
			                      filters: {},
		                      };

		                      if (response) {
			                      const response_data = response.data;

			                      if (response_data.status_code === 200) {
				                      const items = response_data.data.fairs;

				                      items.data.forEach((fair) => {
					                      result.items.push(convertToExhibition(fair));
				                      });

				                      const response_filters = response_data.data.filters;

				                      if (response_filters) {
					                      if (response_filters.tags) {
						                      result.filters.tags = response_filters.tags.data;
					                      }
				                      }
                                      result.all = response.data
			                      }
		                      }

		                      return result;
	                      });
}

export function convertToExhibition(fair: FairItem): Exhibition {
	return {
		id         : fair.id,
		title      : fair.name,
		description: fair.title,
		image      : fair.poster,
		presenter  : fair.presenter,
		start_at   : fair.start_date_at,
		end_at     : fair.end_date_at,
		place      : fair.place ? convertToPlace(fair.place) : null,
	};
}

export default getExhibition;
