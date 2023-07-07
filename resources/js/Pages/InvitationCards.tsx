import {AxiosResponse}    from 'axios';
import {ReactElement}     from 'react';
import * as React         from 'react';
import {
	BookmarkBorderRounded,
	CardGiftcardRounded, CheckRounded, Image,
	MoreHorizRounded,
	ShareRounded,
	StarRounded,
}                         from '@mui/icons-material';
import {
	Badge as BadgeBase,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	ThemeProvider,
}                         from '@mui/material';
import IconButton         from '@mui/material/IconButton';
import MenuItem           from '@mui/material/MenuItem';
import {styled}           from '@mui/material/styles';
import Typography         from '@mui/material/Typography';
import Box                from '@mui/material/Box';
import CssBaseline        from '@mui/material/CssBaseline';
import {Link}             from 'react-router-dom';
import AppBar             from '../Components/AppBar';
import NavigationBar      from '../Components/NavigationBar';
import Menu               from '@mui/material/Menu';
import Helper             from '../Helpers/Helper';
import theme, {M3}              from '../Themes/M3';
import slide_1            from '../statics/agrofood.jpg';
import InvitationCardType from '../Types/InvitationCard';

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

export default function InvitationCards(): ReactElement {
	const [invitation_cards, setInvitationCards] = React.useState(() => fetchInvitationCards());
	const [invitation_card, setInvitationCard]   = React.useState(0);
	const [chip, setChip]                        = React.useState(0);
	const [chip_sub, setChipSub]                 = React.useState(0);
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
				title: 'کارت دعوت آنلاین',
			},
			{
				title: 'آگهی فروش ویژه',
			},
			{
				title: 'آگهی فروش ویژه',
			},
			{
				title: 'آگهی اعطای نمایندگی',
			},
			{
				title: 'سالن‌های فعال',
			},
		];
		
		return (
			<Box sx={{marginBottom: theme.spacing(1), paddingTop: theme.spacing(3), paddingBottom: theme.spacing(1)}}>
				<Box sx={{
					display      : 'flex',
					gap          : theme.spacing(2),
					overflowX    : 'auto',
					paddingBottom: theme.spacing(2),
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
				</Box>
				<Box sx={{display: 'flex', gap: theme.spacing(2), overflowX: 'auto', paddingBottom: theme.spacing(2)}}>
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
				</Box>
			</Box>
		);
	}
	
	const star_colors = [
		'#cc8833',
		'#aaaaaa',
		'#eebb33',
	];
	
	return (
		<ThemeProvider theme={M3()}>
			<Box sx={{display: 'flex', flexDirection: 'column'}} ref={ref}>
				<CssBaseline />
				<AppBar label="دعوتنامه‌ها" back={true} />
				<Box component="main" sx={{
					padding: theme.spacing('calc(60px + 1rem)', 3),
				}}>
					<Card sx={{marginBottom: 0}}>
						<CardMedia image={slide_1} sx={{width: '100%', height: '300px'}} />
					</Card>
					
					{getFilters()}
					
					<Menu
						id="demo-customized-menu"
						MenuListProps={{
							'aria-labelledby': 'demo-customized-button',
						}}
						anchorOrigin={{
							vertical  : 'bottom',
							horizontal: 'left',
						}}
						transformOrigin={{
							vertical  : 'top',
							horizontal: 'left',
						}}
						anchorEl={anchorElement}
						open={open}
						onClose={handleClose}
					>
						<MenuItem onClick={handleClose} disableRipple>
							<BookmarkBorderRounded />
							نشانه گذاری
						</MenuItem>
						<MenuItem onClick={handleClose} disableRipple>
							<ShareRounded />
							اشتراک‌ گذاری
						</MenuItem>
						<MenuItem onClick={handleClose} disableRipple>
							<CardGiftcardRounded />
							شانس جایزه
						</MenuItem>
					</Menu>
					{invitation_cards.map(({title, description, image, hall, booth}, index) => (
						<Card key={index}>
							<CardContent sx={{display: 'flex', paddingBottom: 0}}>
								<Box>
									<Link to="/invitation-card-intro">
										<Typography gutterBottom variant="h6" component="h6" color="primary.contrastText">
											{title}
										</Typography>
										<Typography variant="body2" color="primary.contrastText">
											{description}
										</Typography>
									</Link>
								</Box>
								<Box sx={{marginRight: 'auto'}}>
									<Badge
										overlap="circular"
										anchorOrigin={{vertical: 'top', horizontal: 'left'}}
										variant="dot"
									>
										<Link to="/map">
											<CardMedia image={image} sx={{width: 76, height: 76}} />
										</Link>
									</Badge>
								</Box>
							</CardContent>
							<CardActions>
								<Box sx={{display: 'flex', gap: theme.spacing(2), margin: 0}}>
									<Chip label={`گروه لبنیات`} component="a" clickable />
									<Chip label={`سالن ${hall} - غرفه ${booth}`} component="a" clickable />
								</Box>
								<Box sx={{display: 'flex', gap: theme.spacing(2), margin: theme.spacing(0, 'auto', 0, 0)}}>
									{
										Array(index % 3 + 1).fill('').map(
											(item, i) => (
												<IconButton
													size="small"
													edge="end"
													aria-controls={undefined}
													aria-haspopup="true"
													aria-expanded={undefined}
													aria-label="account of current user"
													color="inherit"
													sx={{
														color: star_colors[index % 3],
													}}
													key={i}
												>
													<StarRounded />
												</IconButton>
											),
										)
									}
									
									<IconButton
										size="small"
										edge="end"
										aria-controls={open ? 'demo-customized-menu' : undefined}
										aria-haspopup="true"
										aria-expanded={open ? 'true' : undefined}
										aria-label="account of current user"
										onClick={toggleMenu}
										color="inherit"
									>
										<MoreHorizRounded />
									</IconButton>
								</Box>
							</CardActions>
						</Card>
					))}
					<NavigationBar />
				</Box>
			</Box>
		</ThemeProvider>
	);
}
