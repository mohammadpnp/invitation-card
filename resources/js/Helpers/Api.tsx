import axios, {AxiosInstance} from 'axios';

export default class Api {
	public static getFetcher(): AxiosInstance {
		const axios_instance = axios.create(
			{
				baseURL: 'http://185.97.116.249/api/',
				//baseURL: 'https://expo-start.ir/api/',
			},
		);
		
		//axios_instance.defaults.withCredentials = true;
		axios_instance.defaults.headers.common['Access-Control-Allow-Origin']      = '*';
		axios_instance.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
		axios_instance.defaults.headers.common['Access-Control-Allow-Methods']     = '*';
		axios_instance.defaults.headers.common['Access-Control-Allow-Headers']     = '*';
		
		return axios_instance;
	}
	
	public static toQueryString(parameters: object): string {
		return new URLSearchParams(parameters as URLSearchParams).toString();
	}
}
