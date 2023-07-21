import axios, {AxiosResponse}    from 'axios';
import ApiHelper                 from '../Helpers/Api';
import InvitationCard, {Filters} from '../Types/InvitationCard';
import {convertToInvitationCard} from './InvitationCard';
import InvitationCardsResponse   from './Types/Responses/InvitationCards';

type Response = AxiosResponse<InvitationCardsResponse, {}>;

type Result = {
	items: InvitationCard[],
	filters: Filters
};

async function getInvitationCardsByExhibitionId(exhibition_id: number, search_params: URLSearchParams): Promise<Result> {
	const url = `invitation-cards/${exhibition_id}${search_params.size ? `?${search_params.toString()}` : ''}`;
	
	return await ApiHelper
		.getFetcher()
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
					const items = response_data.data.invitation_cards.data;
					
					items.forEach((invitation_card) => {
						result.items.push(convertToInvitationCard(invitation_card));
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

async function getInvitationCards(search_params: URLSearchParams): Promise<Result> {
	const result: Result = {
		items  : [],
		filters: {},
	};
	
	return await Promise.all(
		search_params.getAll('filter[exhibitions][]').map(async (exhibition_id) => {
			return await getInvitationCardsByExhibitionId(Number(exhibition_id), search_params);
		}),
	).then((results): Result => {
		for (const i in results) {
			result.items = result.items.concat(results[i].items);
			
			Object.assign(result.filters, results[i].filters);
		}
		
		return result;
	});
}

export default getInvitationCards;
