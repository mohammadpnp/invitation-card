import Response       from '../Response';
import Fair           from '../Item/Fair';
import InvitationCard from '../Item/InvitationCard';
import Poem           from '../Item/Poem';

/* InvitationCards */
type InvitationCards = Response & {
	data: {
		fair: Fair,
		invitation_cards: {
			data: InvitationCard[],
		},
		poem: Poem
	},
};

export default InvitationCards;
