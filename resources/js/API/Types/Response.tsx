import Filters from './Filters';
import Links   from './Links';
import Meta    from './Meta';

export default interface Response {
	status_code: number,
	message: string,
	server_time: string,
	data: {
		filters?: Filters,
		links: Links,
		meta: Meta
	}
}
