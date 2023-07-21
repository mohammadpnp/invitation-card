import Response   from '../Response';
import SurveyType from '../Item/Survey';

/* Survey */
type Survey = Response & {
	data: {
		survey: {
			data: SurveyType
		},
	},
};

export default Survey;
