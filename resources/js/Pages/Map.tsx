import Typography               from '@mui/material/Typography';
import {AxiosResponse}          from 'axios';
import {Fragment, ReactElement} from 'react';
import * as React               from 'react';
import {
	CheckRounded, CircleRounded,
}                               from '@mui/icons-material';
import {
	Badge as BadgeBase,
	Card,
	CardMedia,
	Chip,
	Unstable_Grid2 as Grid,
	ThemeProvider, Divider,
}                               from '@mui/material';
import {styled}                 from '@mui/material/styles';
import Box                      from '@mui/material/Box';
import CssBaseline              from '@mui/material/CssBaseline';
import AppBar                   from '../Components/AppBar';
import NavigationBar            from '../Components/NavigationBar';
import Helper                   from '../Helpers/Helper';
import theme                    from '../Themes/M3';
import map                      from '../statics/map.jpg';
import InvitationCardType       from '../Types/InvitationCard';

const getRandomInteger = (max: number) => Math.floor(Math.random() * Math.floor(max));

function fetchInvitationCards(): InvitationCardType[] {
	const resource = async () => await Helper.getFetcher()
	                                         .get('/post')
	                                         .then((response: AxiosResponse<InvitationCardType, object>) => response.data)
	                                         .then((response) => response);
	
	//resource.constructor.name; // 'Object', means `res` is a POJO
	
	// `res.data` contains the parsed response body
	// resource.data; // { args: { answer: 42 }, ... }
	// resource.data instanceof Object; // true
	
	return Array.from(new Array(10)).map(
		() => invitation_card_examples[getRandomInteger(invitation_card_examples.length)],
	);
}

const invitation_card_examples: readonly InvitationCardType[] = [
	{
		title      : 'لبنیات میهن',
		description: 'شعار شرکت',
		image      : 'https://images.unsplash.com/photo-1557683316-973673baf926?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=64&ixid=MnwxfDB8MXxyYW5kb218MHx8d2FsbHBhcGVyfHx8fHx8MTY4NTg5MDY2OA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=64',
		hall       : 1,
		booth      : 1,
	},
];

// Badge
const Badge = styled(BadgeBase)(({theme}) => ({
	'& .MuiBadge-badge': {
		backgroundColor: theme.palette.success.main,
		color          : theme.palette.success.main,
		boxShadow      : `0 0 0 1px ${theme.palette.background.paper}`,
		width          : 12,
		height         : 12,
		borderRadius   : 12,
		top            : 0,
		left           : 0,
	},
}));

export default function Map(): ReactElement {
	const [invitation_cards, setInvitationCards] = React.useState(() => fetchInvitationCards());
	const [invitation_card, setInvitationCard]   = React.useState(0);
	const [chip, setChip]                        = React.useState(-1);
	const [chip_sub, setChipSub]                 = React.useState(-1);
	const [anchorElement, setAnchorElement]      = React.useState<null | HTMLElement>(null);
	const ref                                    = React.useRef<HTMLDivElement>(null);
	
	const open       = Boolean(anchorElement);
	const toggleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElement(event.currentTarget);
	};
	
	const handleClose = () => {
		setAnchorElement(null);
	};
	
	React.useEffect(() => {
		(ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
		
		setInvitationCards(() => fetchInvitationCards());
		
	}, [invitation_card, setInvitationCards]);
	
	function getFilters() {
		let filters = [
			{
				title: '31 A',
			},
			{
				title: '31 B',
			},
			{
				title: '40 A',
			},
			{
				title: '41 B',
			},
			{
				title: '44 B',
			},
		];
		
		return (
			<Box sx={{
				display      : 'flex',
				flexDirection: 'column',
				gap          : 2,
				padding      : (theme) => theme.spacing(2),
			}}>
				<Typography variant="subtitle1" sx={{
					display      : 'flex',
					flexDirection: 'row',
					alignItems   : 'center',
					gap          : 2,
				}}>
					<CircleRounded sx={{
						color: (theme) => theme.palette.success.main
					}} />
					سالن‌های فعال، موقعیت و مسیریابی
				</Typography>
				<Divider />
				<Grid container spacing={2}>
					<Grid xs={6} sx={{
						display      : 'flex',
						flexDirection: 'column',
						gap          : 2,
					}}>
						{filters.map((filter, index) => {
							const active = index === chip;
							
							return <Chip key={index}
							             label={filter.title}
							             component="a"
							             icon={<CheckRounded />}
							             clickable
							             onClick={(event) => {
								             setChip(index);
							             }}
							             variant={active ? 'filled' : 'outlined'} />
						})}
					</Grid>
					<Grid xs={6} sx={{
						display      : 'flex',
						flexDirection: 'column',
						gap          : 2,
					}}>
						{filters.map((filter, index) => {
							const active = index === chip_sub;
							
							return <Chip key={index}
							             label={filter.title}
							             component="a"
							             icon={<CheckRounded />}
							             clickable
							             onClick={(event) => {
								             setChipSub(index);
							             }}
							             variant={active ? 'filled' : 'outlined'} />
						})}
					</Grid>
				</Grid>
			</Box>
		);
	}
	
	const star_colors = [
		'#ee8800',
		'#aaaaaa',
		'#eebb33',
	];
	
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{display: 'flex', flexDirection: 'column'}} ref={ref}>
				<CssBaseline />
				<AppBar label="نقشه" />
				<Box component="main" sx={{paddingTop: '70px', paddingBottom: '70px', paddingX: theme.spacing(3)}}>
					<Card sx={{marginBottom: 0}}>
						<CardMedia image={map} sx={{width: '100%', height: '400px'}} />
					</Card>
					
					{getFilters()}
					
					<NavigationBar />
				</Box>
			</Box>
		</ThemeProvider>
	);
}
