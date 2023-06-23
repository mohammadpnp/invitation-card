import axios, {AxiosInstance} from 'axios';

export default class Helper {
	public static getFetcher(): AxiosInstance {
		return axios.create(
			{
				baseURL: 'https://api.example.com',
			},
		);
	}
	
	public static formatDate(date_time: string): string {
		return new Date(date_time).toLocaleDateString('fa', {
			year : 'numeric',
			month: 'short',
			day  : 'numeric',
		});
	}
}
