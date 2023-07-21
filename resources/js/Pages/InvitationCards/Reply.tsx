import * as React               from 'react';
import {
	ReactElement,
	useState,
	useEffect,
	useRef,
}                               from 'react';
import {AxiosResponse}          from 'axios';
import {
	ContactPhoneRounded,
	LocationOn,
}                               from '@mui/icons-material';
import {
	Card,
	CardMedia,
	ThemeProvider,
	CardContent,
	Button,
}                               from '@mui/material';
import Box                      from '@mui/material/Box';
import CssBaseline                               from '@mui/material/CssBaseline';
import {useLocation, useParams, useSearchParams} from 'react-router-dom';
import getInvitationCard                         from '../../API/InvitationCard';
import AppBar                   from '../../Components/AppBar';
import ApiHelper                from '../../Helpers/Api';
import theme, {
	M3,
	PaletteColors,
}                               from '../../Themes/M3';
import map                      from '../../statics/map.jpg';
import InvitationCardType       from '../../Types/InvitationCard';

const getRandomInteger = (max: number) => Math.floor(Math.random() * Math.floor(max));

export default function Reply(): ReactElement {
	/* Location */
	const {id}     = useParams();
	const location = useLocation();
	const [search_params, setSearchParams] = useSearchParams();
	
	/* States */
	const [invitation_card, setInvitationCard] = useState<InvitationCardType>(
		location.state?.invitation_card ? location.state.invitation_card : {
			id      : 0,
			logo    : '',
			pictures: [],
			title   : '',
			slogan  : '',
			hall    : 0,
			booth   : 0,
		},
	);
	
	const [placeholder, setPlaceholder] = useState(false);
	
	const ref = useRef<HTMLDivElement>(null);
	
	const {
		      logo,
		      title,
		      slogan,
		      exhibition,
	      } = invitation_card;
	
	const [palette, setPalette] = useState<PaletteColors>(location.state?.palette);
	
	useEffect(() => {
		(ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
		
		setPlaceholder(true);
		
		(async () => {
			await getInvitationCard(Number(id), search_params).then((result): void => {
				setPlaceholder(false);
				
				setInvitationCard(result.item);
			});
		})();
	}, [setInvitationCard]);
	
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
					<Card className={placeholder ? 'placeholder' : ''}>
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
					
					{/*
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
					 */}
					{/*<NavigationBar />*/}
				</Box>
			</Box>
		</ThemeProvider>
	);
}
