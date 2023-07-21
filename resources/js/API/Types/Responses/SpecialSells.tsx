import Response    from '../Response';
import SpecialSell from '../Item/SpecialSell';

/* Sells */
type SpecialSells = Response & {
	data: {
		special_sells: {
			data: SpecialSell[],
		},
	},
};

export default SpecialSells;
