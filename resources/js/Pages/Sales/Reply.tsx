import * as React         from 'react';
import {
	ReactElement,
	useState,
	useEffect,
	useRef,
}                         from 'react';
import {
	ContactPhoneRounded,
	LocationOn,
}                         from '@mui/icons-material';
import {
	Card,
	CardMedia,
	ThemeProvider,
	CardContent,
	Button,
}                         from '@mui/material';
import Box                from '@mui/material/Box';
import CssBaseline                  from '@mui/material/CssBaseline';
import {useParams, useSearchParams} from 'react-router-dom';
import getInvitationCard            from '../../API/InvitationCard';
import AppBar             from '../../Components/AppBar';
import NavigationBar      from '../../Components/NavigationBar';
import theme              from '../../Themes/M3';
import map                from '../../statics/map.jpg';
import {Filters}          from '../../Types/Exhibition';
import InvitationCardType from '../../Types/InvitationCard';

export default function Reply(): ReactElement {
	/* Location */
	const {id} = useParams();
	const [search_params, setSearchParams] = useSearchParams();
	
	/* States */
	const [invitation_card, setInvitationCard] = useState<InvitationCardType>(
		{
			id           : 0,
			logo         : '',
			pictures     : [],
			title        : '',
			slogan       : '',
			hall         : 0,
			booth        : 0,
			template_type: 1,
		},
	);
	const [filters, setFilters]         = useState<Filters>({});
	
	const [placeholder, setPlaceholder] = useState(false);
	
	const ref                                    = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		(ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
		
		setPlaceholder(true);
		
		(async () => {
			await getInvitationCard(Number(id), search_params).then((result): void => {
				setPlaceholder(false);
				
				setInvitationCard(result.item);
				//setFilters(result.filters);
			});
		})();
	}, [setInvitationCard]);
	
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{display: 'flex', flexDirection: 'column'}} ref={ref}>
				<CssBaseline />
				<AppBar label="نقشه" back={true} />
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
					
					<NavigationBar />
				</Box>
			</Box>
		</ThemeProvider>
	);
}
