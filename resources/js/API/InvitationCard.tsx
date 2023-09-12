import axios, {AxiosResponse} from 'axios';
import ApiHelper              from '../Helpers/Api';
import InvitationCard         from '../Types/InvitationCard';
import {convertToExhibition}  from './Exhibition';
import InvitationCardResponse from './Types/Responses/InvitationCard';
import InvitationCardItem     from './Types/Item/InvitationCard';
import MainPictureItem        from './Types/Item/MainPicture';
import PoemItem               from './Types/Item/Poem';

type Response = AxiosResponse<InvitationCardResponse, {}>;

type Result = {
	item: InvitationCard
};

async function getInvitationCard(id: number, search_params: URLSearchParams): Promise<Result> {
	const parameters = {
		// page: 1,
		// per_page: 10,
		// archive: 1,
	};

	const query_string = ApiHelper.toQueryString(parameters);

	const url = `invitation-cards/${id}/show${search_params.size ? `?${search_params.toString()}` : ''}`;

	return await ApiHelper.getFetcher()
	                      .get(url)
	                      .catch((thrown) => {
		                      if (axios.isCancel(thrown)) {
			                      console.warn('Request canceled', thrown.message);
		                      } else {
			                      console.error(thrown);
		                      }
	                      })
	                      .then((response: Response | void): Result => {
		                      const result: Result = {
			                      item: {
				                      id           : 0,
				                      logo         : '',
				                      pictures     : [],
				                      title        : '',
				                      slogan       : '',
				                      hall         : 0,
				                      booth        : 0,
				                      template_type: 1,
			                      },
		                      };

		                      if (response) {
			                      const response_data = response.data;

			                      if (response_data.status_code === 200) {
				                      /* Poem */
				                      Object.assign(result.item, convertToInvitationCard(response_data.data.invitation_card));

				                      const poem: PoemItem = response_data.data.poem;

				                      if (poem.poem && poem.voice_url) {
					                      result.item.poem = {
						                      verses: poem.poem,
						                      voice : poem.voice_url,
					                      };
				                      }
			                      }
		                      }

		                      return result;
	                      });
}

export function convertToInvitationCard(item: InvitationCardItem): InvitationCard {
	/* Invitation Card */
	return {
		id  : item.id,
		logo: item.logo,

		pictures: item.main_pictures ? item.main_pictures.map((main_picture: MainPictureItem) => (
			{
				source: main_picture.link,
			}
		)) : [],

		title        : item.brand,
		slogan       : item.slogan,
		hall         : item.saloon,
		booth        : item.booth,
		template_type: item.template_type,

		exhibition: item.fair ? convertToExhibition(item.fair) : undefined,

		description: {
			header: item.description_header,
			body  : item.description,
			footer: item.description_footer,
		},

		manager: {
			name       : item.manager_name,
			picture    : item.manager_photo,
			position   : item.manager_position,
			title      : item.manager_title,
			description: item.manager_description,
		},
	};
}

export default getInvitationCard;
