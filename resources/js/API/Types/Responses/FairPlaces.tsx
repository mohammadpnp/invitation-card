import Response from '../Response';
import Place    from '../Item/Place';

/* Places */
type FairPlaces = Response & {
	data: {
		fair_places: {
			data: Place[],
		},
	},
};

export default FairPlaces;
