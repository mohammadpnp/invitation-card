import Response  from '../Response';
import PaperCard from '../Item/PaperCard';

/* Appreciations */
type PaperCards = Response & {
	data: {
		paper_cards: {
			data: PaperCard[],
		},
	},
};

export default PaperCards;
