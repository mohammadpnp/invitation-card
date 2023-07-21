import axios, {AxiosResponse} from 'axios';
import ApiHelper                    from '../Helpers/Api';
import Survey                 from '../Types/Survey';
import SurveyResponse         from './Types/Responses/Survey';
import SurveyItem             from './Types/Item/Survey';

type Response = AxiosResponse<SurveyResponse, {}>;

async function postSurvey(id: number, value: number, search_params: URLSearchParams): Promise<Survey> {
	const parameters = {
		// page: 1,
		// per_page: 10,
		// archive: 1,
	};
	
	// TODO: complete data
	const data = {
		value,
	};
	
	const query_string = ApiHelper.toQueryString(parameters);
	
	const url = `invitation-cards/${id}/survey${search_params.size ? `?${search_params.toString()}` : ''}`;
	
	return await ApiHelper.getFetcher()
	                .post(url, data)
	                .catch((thrown) => {
		                if (axios.isCancel(thrown)) {
			                console.log('Request canceled', thrown.message);
		                } else {
			                // handle error
		                }
	                })
	                .then((response: Response | void): Survey => {
		                const survey = {
			                id: 0,
		                };
		                
		                if (response) {
			                const response_data = response.data;
			                
			                if (response_data.status_code === 200) {
				                const item: SurveyItem = response_data.data.survey.data;
				                
				                if (item.id) {
					                survey.id = item.id;
				                }
			                }
		                }
		                
		                return survey;
	                });
}

export default postSurvey;
