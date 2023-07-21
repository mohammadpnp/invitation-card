import Response from '../Response';
import Fair     from '../Item/Fair';

type Fairs = Response & {
	data: {
		fairs: {
			data: Fair[],
		},
	},
};

export default Fairs;
