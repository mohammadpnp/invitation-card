import BottomNavigation   from '@mui/material/BottomNavigation';
import Grid               from '@mui/material/Unstable_Grid2';
import {AxiosResponse}          from 'axios';
import {ReactElement, useState} from 'react';
import * as React               from 'react';
import {
	ContactPhoneRounded,
	LocationOn,
}                               from '@mui/icons-material';
import {
	Card,
	CardMedia,
	ThemeProvider, CardContent, Button, Container,
}                               from '@mui/material';
import Box                      from '@mui/material/Box';
import CssBaseline              from '@mui/material/CssBaseline';
import {useLocation}            from 'react-router-dom';
import AppBar                   from '../Components/AppBar';
import NavigationBar            from '../Components/NavigationBar';
import Helper                     from '../Helpers/Helper';
import theme, {M3, PaletteColors} from '../Themes/M3';
import map                        from '../statics/map.jpg';
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

export default function InvitationCardReply(): ReactElement {
	const [invitation_cards, setInvitationCards] = React.useState(() => fetchInvitationCards());
	const [invitation_card, setInvitationCard]   = React.useState(0);
	const [navigation_bar, setNavigationBar]     = React.useState(true);
	const [chip, setChip]                        = React.useState(-1);
	const [chip_sub, setChipSub]                 = React.useState(-1);
	const [anchor_element, setAnchorElement]      = React.useState<null | HTMLElement>(null);
	const ref                                    = React.useRef<HTMLDivElement>(null);
	
	const location = useLocation();
	const [palette, setPalette]                  = useState<PaletteColors>(location.state?.palette);
	
	const open       = Boolean(anchor_element);
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
	
	const star_colors = [
		'#ee8800',
		'#aaaaaa',
		'#eebb33',
	];
	
	return (
		<ThemeProvider theme={M3(palette)}>
			<Box sx={{display: 'flex', flexDirection: 'column'}} ref={ref}>
				<CssBaseline />
				<AppBar label="نقشه" search={false} back={true} />
				<Box component="main" sx={{
					display      : 'flex',
					flexDirection: 'column',
					gap          : 2,
					paddingTop   : 'calc(60px + 1rem)',
					paddingBottom: 'calc(70px + 1rem)',
					paddingX     : theme.spacing(3),
				}}>
					<Card sx={{marginBottom: 0}}>
						<CardMedia image={map} sx={{width: '100%', height: '400px'}} />
						<CardContent sx={{
							display   : 'flex',
							gap       : 2,
							alignItems: 'center',
						}}>
							<LocationOn />
							نقشه، موقعیت و مسیریابی دفتر مرکزی
						</CardContent>
					</Card>
					
					<Box sx={{display: 'flex'}}>
						<Box sx={{
							display : 'flex',
							gap     : 2,
							flexGrow: 1,
						}}>
							<Button startIcon={<ContactPhoneRounded />} variant="contained" color="primary">
								کارت ویزیت
							</Button>
						</Box>
					</Box>
					
					<BottomNavigation sx={{
						backgroundColor: (theme) => theme.palette.grey[50],
						borderTop      : (theme) => `1px solid ${theme.palette.grey[400]}`,
						
						transition: (theme) => theme.transitions.create(['bottom']),
						bottom    : navigation_bar ? 0 : -70,
					}}>
						<Container maxWidth="md">
							<Grid
								container
								justifyContent="space-between"
								alignItems="center"
								sx={{height: 70}}>
								<Grid sx={{flexGrow: 1}}>
									حضور می‌یابید؟
								</Grid>
								<Grid onClick={() => {
									setNavigationBar(false);
								}}>
									<Button variant="text">
										بله
									</Button>
									<Button variant="text">
										خیر
									</Button>
									<Button variant="text">
										شاید
									</Button>
								</Grid>
							</Grid>
						</Container>
					</BottomNavigation>
					
					{/*<NavigationBar />*/}
				</Box>
			</Box>
		</ThemeProvider>
	);
}
