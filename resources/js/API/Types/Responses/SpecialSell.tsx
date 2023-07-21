import Response    from '../Response';
import SpecialSell from '../Item/SpecialSell';

/* Sells */
type SpecialSells = Response & {
	data: {
		special_sell: SpecialSell,
	},
};

export default SpecialSells;
