import {
	CheckRounded,
	Instagram,
	Telegram,
	WhatsApp,
}                    from '@mui/icons-material';
import {
	Badge as BadgeBase,
	Card,
	CardContent,
	CardMedia,
	Chip,
	ThemeProvider,
}                    from '@mui/material';
import MenuItem      from '@mui/material/MenuItem';
import {styled}      from '@mui/material/styles';
import Typography    from '@mui/material/Typography';
import {ReactElement} from 'react';
import * as React    from 'react';
import Box           from '@mui/material/Box';
import CssBaseline   from '@mui/material/CssBaseline';
import {Link}        from 'react-router-dom';
import AppBar        from '../Components/AppBar';
import NavigationBar from '../Components/NavigationBar';
import Menu          from '@mui/material/Menu';
import Grid          from '@mui/material/Unstable_Grid2'; // Grid version 2
import theme,
{
	M3,
	M3Lighter,
}                    from '../Themes/M3';
import slide_1       from '../statics/agrofood.jpg';
import image_1       from '../statics/exhibition_1.jpg';
import image_2       from '../statics/exhibition_2.jpg';
import image_3       from '../statics/exhibition_3.jpg';
import image_4       from '../statics/exhibition_4.jpg';
import image_5       from '../statics/exhibition_5.jpg';
import image_6       from '../statics/exhibition_6.jpg';

interface Companies {
	title: string,
	description: string,
	image: string,
}

const getRandomInteger = (max: number) => Math.floor(Math.random() * Math.floor(max));

function refreshCompanies(): Companies[] {
	return companyExamples;
}

const companyExamples: Companies[] = [
	{
		title      : 'نمایشگاه بین المللی تهران',
		description: 'تهران، بزرگراه چمران',
		image      : image_1,
	},
	{
		title      : 'نمایشگاه بین المللی شهر آفتاب',
		description: 'تهران، بزرگراه خلیج فارس',
		image      : image_2,
	},
	{
		title      : 'نمایشگاه ایران مال',
		description: 'تهران، اتوبان شهید همت',
		image      : image_3,
	},
	{
		title      : 'نمایشگاه بین المللی مشهد',
		description: 'مشهد، انتهای بلوار وكیل آباد',
		image      : image_4,
	},
	{
		title      : 'نمایشگاه بین المللی اصفهان',
		description: 'اصفهان، ب. کمربندی شرقی اصفهان',
		image      : image_5,
	},
	{
		title      : 'نمایشگاه بین المللی کیش',
		description: 'جزیره کیش، بلوار ساحل',
		image      : image_6,
	},
	{
		title      : 'سایر مراکز',
		description: 'اهواز، شیراز و ...',
		image      : image_6,
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

export default function Exhibition(): ReactElement {
	const [exhibitions, setExhibitions]     = React.useState(() => refreshCompanies());
	const [exhibition, setExhibition]       = React.useState(0);
	const [chip, setChip]                   = React.useState(0);
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
		const filters = [
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
					marginBottom : theme.spacing(1),
				}}>
					{filters.map((filter, index) => {
						const active = index === chip;
						
						return <Chip
							key={index}
							label={filter.title}
							component="a"
							icon={<CheckRounded />}
							clickable
							onClick={(event) => {
								setChip(index);
							}}
							variant={active ? 'filled' : 'outlined'}
							
							// @ts-ignore Temp
							// color="lighter"
						/>
					})}
				</Box>
			</Box>
		);
	}
	
	return (
		<ThemeProvider
			theme={M3()}
			// theme={M3Lighter}
		>
			<Box sx={{display: 'flex', flexDirection: 'column'}} ref={ref}>
				<CssBaseline />
				<AppBar
					//variant="lighter"
					label="نمایشگاه‌ها"
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
					
					<Grid container spacing={3}>
						{exhibitions.map(({title, description, image}, index) => (
							<Grid xs={12} sm={6} md={4} lg={3} key={index} sx={{paddingBottom: 0}}>
								<Card
									//variant="lighter"
								>
									<Link to="/exhibition-subs">
										<CardMedia image={image} sx={{
											width       : '100%',
											height      : 150,
											borderRadius: 4,
										}} />
										<CardContent sx={{display: 'flex', paddingBottom: 0}}>
											<Box>
												<Typography gutterBottom variant="h6" component="h6" color="primary.contrastText">
													{title}
												</Typography>
												<Typography gutterBottom variant="body2" color="primary.contrastText">
													{description}
												</Typography>
											</Box>
										</CardContent>
									</Link>
								</Card>
							</Grid>
						))}
					</Grid>
					
					<NavigationBar
						// variant="lighter"
					/>
				</Box>
			</Box>
		</ThemeProvider>
	);
}
