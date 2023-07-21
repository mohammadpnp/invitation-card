import Response           from '../Response';
import Poem               from '../Item/Poem';
import InvitationCardType from '../Item/InvitationCard';

/* InvitationCard */
type InvitationCard = Response & {
	data: {
		invitation_card: InvitationCardType,
		poem: Poem
	},
};

export default InvitationCard;
