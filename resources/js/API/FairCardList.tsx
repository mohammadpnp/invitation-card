import axios, {AxiosResponse}    from 'axios';
import ApiHelper                 from '../Helpers/Api';
import InvitationCard, {Filters} from '../Types/InvitationCard';
import {convertToInvitationCard} from './InvitationCard';
import InvitationCardsResponse   from './Types/Responses/InvitationCards';
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;
import {logDOM} from "@testing-library/react";

type Response = AxiosResponse<InvitationCardsResponse, {}>;

type Result = {
    all: any
    items: InvitationCard[],
    filters: Filters
};

async function getFairCardsListByExhibitionId(exhibition_id: number, search_params: URLSearchParams): Promise<Result> {
    const url = `fairs/${exhibition_id}/card-list/${search_params.size ? `?${search_params.toString()}` : ''}`;

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
                all: {},
                items  : [],
                filters: {},
            };

            if (response) {

                // const response_data = response.data;
                //
                // if (response_data.status_code === 200) {
                //     const items = response_data.data.invitation_cards.data;
                //
                //     items.forEach((invitation_card) => {
                //         result.items.push(convertToInvitationCard(invitation_card));
                //     });
                //
                //     const filters = response_data.data.filters;
                //
                //     if (filters) {
                //         for (const [key, {data}] of Object.entries(filters)) {
                //             result.filters[key] = data;
                //         }
                //     }
                // }

                result.all = response.data
            }

            return result;
        });
}

async function getFairCardList(search_params: URLSearchParams): Promise<Result> {
    const result: Result = {
        all: {},
        items  : [],
        filters: {},
    };

    return await Promise.all(
        search_params.getAll('filter[exhibitions][]').map(async (exhibition_id) => {
            return await getFairCardsListByExhibitionId(Number(exhibition_id), search_params);
        }),
    ).then((results): Result => {

        for (const i in results) {
            result.items = result.items.concat(results[i].items);

            Object.assign(result.filters, results[i].filters);
        }
        result.all = {...results[0].all}

        return result;
    });
}

export default getFairCardList;
