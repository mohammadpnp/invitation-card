import Response from '../Response';
import Deputize from '../Item/Deputize';

/* Agents */
type Deputizes = Response & {
	data: {
		deputizes: {
			data: Deputize[],
		},
	},
};

export default Deputizes;
