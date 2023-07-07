import {
	BookmarkBorderRounded, BookmarkRounded,
	CheckRounded,
	Instagram,
	ShareRounded,
	Telegram,
	WhatsApp,
}                             from '@mui/icons-material';
import {
	Badge as BadgeBase,
	Card, CardActions, CardContent, CardMedia,
	Chip,
	ThemeProvider,
}                             from '@mui/material';
import IconButton             from '@mui/material/IconButton';
import MenuItem               from '@mui/material/MenuItem';
import {styled}               from '@mui/material/styles';
import Typography             from '@mui/material/Typography';
import {ReactElement}         from 'react';
import * as React             from 'react';
import Box                    from '@mui/material/Box';
import CssBaseline            from '@mui/material/CssBaseline';
import {Link}                 from 'react-router-dom';
import AppBar                 from '../Components/AppBar';
import NavigationBar          from '../Components/NavigationBar';
import Menu                   from '@mui/material/Menu';
import Helper                 from '../Helpers/Helper';
import theme, {M3, M3Lighter} from '../Themes/M3';
import slide_1                from '../statics/agrofood.jpg';

interface Companies {
	title: string,
	description: string,
	image: string,
	start_at: string,
	end_at: string,
}

const getRandomInteger = (max: number) => Math.floor(Math.random() * Math.floor(max));

function refreshCompanies(): Companies[] {
	return Array.from(new Array(10)).map(
		() => exhibition_examples[getRandomInteger(exhibition_examples.length)],
	);
}

const exhibition_examples: readonly Companies[] = [
	{
		title      : 'سی امین نمایشگاه بین المللی صنایع کشاورزی،مواد غذایی،ماشین آلات و صنایع وابسته',
		description: 'مجری نمایشگاه:',
		image      : slide_1,
		start_at   : new Date().toLocaleDateString(),
		end_at     : '2023-07-01',
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

export default function ExhibitionSub(): ReactElement {
	const [exhibitions, setExhibitions]     = React.useState(() => refreshCompanies());
	const [exhibition, setExhibition]       = React.useState(0);
	const [chip, setChip]                   = React.useState(0);
	const [chip_sub, setChipSub]            = React.useState(0);
	const [bookmark, setBookmark]           = React.useState(false);
	const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);
	const ref                               = React.useRef<HTMLDivElement>(null);
	
	const open       = Boolean(anchorElement);
	const toggleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElement(event.currentTarget);
	};
	
	const handleClose = () => {
		setAnchorElement(null);
	};
	
	React.useEffect(() => {
		(ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
		
		setExhibitions(refreshCompanies());
	}, [exhibition, setExhibitions]);
	
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
			<Box sx={{
				paddingTop   : theme.spacing(3),
				paddingBottom: theme.spacing(1),
			}}>
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
						             variant={active ? 'filled' : 'outlined'}
							// @ts-ignore Temp
							//color="lighter"
						/>
					})}
				</Box>
				<Box sx={{
					display      : 'flex',
					gap          : theme.spacing(2),
					overflowX    : 'auto',
					paddingBottom: theme.spacing(2),
					marginBottom : theme.spacing(1),
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
						             variant={active ? 'filled' : 'outlined'}
							// @ts-ignore Temp
							//color="lighter"
						/>
					})}
				</Box>
			</Box>
		);
	}
	
	return (
		<ThemeProvider
			theme={M3()}
			//theme={M3Lighter}
		>
			<Box sx={{display: 'flex', flexDirection: 'column'}} ref={ref}>
				<CssBaseline />
				<AppBar
					label="نمایشگاه‌ها"
					// variant="lighter"
					back={true}
				/>
				<Box component="main" sx={{
					paddingTop   : 'calc(60px + 1rem)',
					paddingBottom: 'calc(70px + 1rem)',
					paddingX     : theme.spacing(3),
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
							<Telegram />
							تلگرام
						</MenuItem>
						<MenuItem onClick={handleClose} disableRipple>
							<WhatsApp />
							واتساپ
						</MenuItem>
						<MenuItem onClick={handleClose} disableRipple>
							<Instagram />
							اینستاگرام
						</MenuItem>
					</Menu>
					
					{exhibitions.map(({title, description, image, start_at, end_at}, index) => (
						<Card
							key={index}
							//variant="lighter"
						>
							<Link to="/exhibition-info">
								<CardMedia image={image} sx={{
									width       : '100%',
									height      : 150,
									borderRadius: 4,
								}} />
							</Link>
							<CardContent sx={{display: 'flex', paddingBottom: 0}}>
								<Link to="/exhibition-info">
									<Box>
										<Typography gutterBottom variant="h6" component="h6" color="primary.contrastText">
											{title}
										</Typography>
										{
											description ?
												<Typography variant="body2" color="primary.contrastText">
													{description}
												</Typography>
												:
												null
										}
									</Box>
								</Link>
							</CardContent>
							<CardActions sx={{
								padding: theme.spacing(3),
							}}>
								<Box sx={{
									display      : 'flex',
									flexDirection: {
										xs: 'column',
										sm: 'row',
									},
									alignItems   : {
										xs: 'right',
										sm: 'center',
									},
									gap          : theme.spacing(2),
									margin       : 0,
									
									'.dash' : {
										display: {
											xs: 'none',
											sm: 'inline-block'
										}
									}
								}}>
									<Typography>
										تاریخ شروع: {Helper.formatDate(start_at)}
									</Typography>
									<span className="dash">-</span>
									<Typography>
										تاریخ پایان: {Helper.formatDate(end_at)}
									</Typography>
									<Chip label={`۲۵ روز مانده`} component="span" clickable />
								</Box>
								<Box sx={{display: 'flex', gap: theme.spacing(2), margin: theme.spacing(0, 'auto', 0, 0)}}>
									<IconButton
										size="small"
										edge="end"
										aria-controls={undefined}
										aria-haspopup="true"
										aria-expanded={undefined}
										aria-label="account of current user"
										onClick={() => {
											setBookmark(!bookmark);
										}}
										color="inherit"
									>
										{bookmark ? <BookmarkRounded /> : <BookmarkBorderRounded />}
									</IconButton>
									
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
										<ShareRounded />
									</IconButton>
								</Box>
							</CardActions>
						</Card>
					))}
					<NavigationBar
						//variant="lighter"
					/>
				</Box>
			</Box>
		</ThemeProvider>
	);
}
