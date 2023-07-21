import * as React                                from 'react';
import {
	ReactElement,
	useState,
	useEffect,
	useRef,
	MouseEvent,
}                                                from 'react';
import Typography                                from '@mui/material/Typography';
import {
	CheckRounded, CircleRounded,
}                                                from '@mui/icons-material';
import {
	Badge as BadgeBase,
	Card,
	CardMedia,
	Chip,
	Unstable_Grid2 as Grid,
	ThemeProvider,
	Divider,
}                                                from '@mui/material';
import {styled}                                  from '@mui/material/styles';
import Box                                       from '@mui/material/Box';
import CssBaseline                               from '@mui/material/CssBaseline';
import {useLocation, useParams, useSearchParams} from 'react-router-dom';
import getInvitationCard                         from '../../API/InvitationCard';
import AppBar                                    from '../../Components/AppBar';
import NavigationBar                             from '../../Components/NavigationBar';
import theme, {
	M3,
	PaletteColors,
}                                                from '../../Themes/M3';
import map                                       from '../../statics/map.jpg';
import InvitationCard                            from '../../Types/InvitationCard';

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
	/* Location */
	const {id}                             = useParams();
	const location                         = useLocation();
	const [search_params, setSearchParams] = useSearchParams();
	
	/* States */
	const [invitation_card, setInvitationCard] = useState<InvitationCard>(
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
	
	const [placeholder, setPlaceholder] = useState(false);
	
	const ref = useRef<HTMLDivElement>(null);
	
	const [palette, setPalette] = useState<PaletteColors>(location.state?.palette);
	
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
	
	function getFilters() {
		let filters = [
			{
				id  : 0,
				name: '31 A',
			},
			{
				id  : 0,
				name: '31 B',
			},
			{
				id  : 0,
				name: '40 A',
			},
			{
				id  : 0,
				name: '41 B',
			},
			{
				id  : 0,
				name: '44 B',
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
						color: (theme) => theme.palette.success.main,
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
						{filters.map(({id, name}, index) => {
							const search_param_key    = `filter[0][]`;
							const search_param_values = search_params.getAll(search_param_key);
							const active              = search_param_values ? search_param_values.includes(String(id)) : null;
							
							return <Chip key={index}
							             label={name}
							             component="a"
							             icon={<CheckRounded />}
							             clickable
							             onClick={(event) => {
								             search_params.set(search_param_key, String(id));
								             
								             setSearchParams(search_params);
							             }}
							             variant={active ? 'filled' : 'outlined'} />
						})}
					</Grid>
					<Grid xs={6} sx={{
						display      : 'flex',
						flexDirection: 'column',
						gap          : 2,
					}}>
						{filters.map(({id, name}, index) => {
							const search_param_key    = `filter[1][]`;
							const search_param_values = search_params.getAll(search_param_key);
							const active              = search_param_values ? search_param_values.includes(String(id)) : null;
							
							return <Chip key={index}
							             label={name}
							             component="a"
							             icon={<CheckRounded />}
							             clickable
							             onClick={(event) => {
								             setSearchParams(id ? {[search_param_key]: `${id}`} : '');
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
		<ThemeProvider theme={M3(palette)}>
			<Box sx={{display: 'flex', flexDirection: 'column'}} ref={ref}>
				<CssBaseline />
				<AppBar label="نقشه" back={true} />
				<Box component="main" sx={{paddingTop: '70px', paddingBottom: '70px', paddingX: theme.spacing(3)}}>
					<Card className={placeholder ? 'placeholder' : ''}>
						<CardMedia image={map} sx={{width: '100%', height: '400px'}} />
					</Card>
					
					{getFilters()}
					
					<NavigationBar />
				</Box>
			</Box>
		</ThemeProvider>
	);
}
