import Response from '../Response';
import Place    from '../Item/Place';

/* Places */
type FairPlaces = Response & {
	data: {
		fair_place: Place,
	},
};

export default FairPlaces;
