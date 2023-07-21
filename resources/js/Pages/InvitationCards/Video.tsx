import * as React     from 'react';
import {
	ReactElement,
	useState,
	useRef,
	useEffect,
}                     from 'react';
import IconButton     from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon   from '@mui/material/ListItemIcon';
import ListItemText   from '@mui/material/ListItemText';
import {
	AddBusinessRounded,
	AutoStoriesRounded,
	CampaignRounded,
	CardGiftcard,
	CardMembershipRounded,
	Instagram,
	LanguageRounded,
	ManageSearchRounded,
	PlayArrowRounded,
	Telegram,
	TrackChangesRounded,
	WhatsApp,
	YouTube,
}                     from '@mui/icons-material';
import CssBaseline    from '@mui/material/CssBaseline';
import List           from '@mui/material/List';
import ListItem       from '@mui/material/ListItem';
import Typography     from '@mui/material/Typography';
import {
	ThemeProvider,
}                     from '@mui/material';
import Box            from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import AppBar        from '../../Components/AppBar';
import NavigationBar from '../../Components/NavigationBar';
import theme         from '../../Themes/M3';
import logo          from '../../statics/bosch.png';

export default function Video(): ReactElement {
	/* Location */
	const navigate = useNavigate();
	
	/* States */
	const [videos, setVideos]               = useState(() => []);
	const [video, setVideo]                 = useState(0);
	
	const [anchor_element, setAnchorElement] = useState<null | HTMLElement>(null);
	
	const ref                               = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		(ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
		
	}, [video, setVideos]);
	
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{display: 'flex', flexDirection: 'column'}} ref={ref}>
				<CssBaseline />
				<AppBar label="ویدئو" back={true} />
				<Box component="main" sx={{
					paddingTop   : 'calc(60px + 1rem)',
					paddingBottom: 'calc(70px + 1rem)',
					paddingX     : theme.spacing(3),
					display      : 'flex',
					flexDirection: 'column',
					gap          : 2,
					marginX      : 'auto',
					maxWidth     : 980,
					
					[theme.breakpoints.up('lg')]: {
						minWidth: 980,
					},
				}}>
					<Box textAlign="left">
						<img src={logo} alt="" />
						<Typography variant="h6">
							invented for Life
						</Typography>
					</Box>
					<Box sx={{
						backgroundColor: (theme) => theme.palette.grey[50],
						display        : 'flex',
						alignItems     : 'center',
						justifyContent : 'center',
						width          : '100%',
						height         : '300px',
						border         : (theme) => `1px solid ${theme.palette.grey[900]}`,
					}}>
						<PlayArrowRounded sx={{width: 60, height: 60}} />
					</Box>
					<Box sx={{
						display       : 'flex',
						gap           : 1,
						justifyContent: 'left',
						direction     : 'ltr',
					}}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="primary-search-account-menu"
							aria-haspopup="true"
							color="inherit">
							<LanguageRounded />
						</IconButton>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="primary-search-account-menu"
							aria-haspopup="true"
							color="inherit">
							<Instagram />
						</IconButton>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="primary-search-account-menu"
							aria-haspopup="true"
							color="inherit">
							<YouTube />
						</IconButton>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="primary-search-account-menu"
							aria-haspopup="true"
							color="inherit">
							<Telegram />
						</IconButton>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="primary-search-account-menu"
							aria-haspopup="true"
							color="inherit">
							<WhatsApp />
						</IconButton>
					</Box>
					<List>
						{
							[
								{
									text: 'لوح سپاس ما',
									icon: <CardMembershipRounded />,
									link: '/',
								},
								{
									text: 'آگهی‌های فروش ویژه ما',
									icon: <CampaignRounded />,
									link: '/',
								},
								{
									text: 'آگهی‌های اعطای نمایندگی',
									icon: <AddBusinessRounded />,
									link: '/',
								},
								{
									text: 'کاتالوگ هوشمند ما',
									icon: <AutoStoriesRounded />,
									link: '/',
								},
								{
									text: 'نیازمندی‌ها و استعلام',
									icon: <ManageSearchRounded />,
									link: '/',
								},
								{
									text: 'قرعه‌کشی ما',
									icon: <TrackChangesRounded />,
									link: '/',
								},
								{
									text: 'مسابقات جایزه‌دار',
									icon: <CardGiftcard />,
									link: '/',
								},
							].map(
								({text, icon, link}, index) => (
									<ListItem key={index} disablePadding>
										<ListItemButton
											disableRipple
											onClick={() => {
												navigate(link);
											}}>
											<ListItemIcon>
												{icon}
											</ListItemIcon>
											<ListItemText primary={text} />
										</ListItemButton>
									</ListItem>
								),
							)
						}
					</List>
				</Box>
				<NavigationBar />
			</Box>
		</ThemeProvider>
	);
}
