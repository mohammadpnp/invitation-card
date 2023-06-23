import {Divider}                    from '@mui/material';
import {Fragment, ReactElement}     from 'react';
import * as React                   from 'react';
import {PaperPropsVariantOverrides} from '@mui/material/Paper/Paper';
import {OverridableStringUnion}     from '@mui/types';
import {
	CalendarMonthRounded,
	CampaignRounded,
	InfoRounded, ListAltRounded,
	ListRounded,
	LiveHelpRounded,
	MoreVertRounded,
}                                   from '@mui/icons-material';
import List                         from '@mui/material/List';
import ListItem                     from '@mui/material/ListItem';
import ListItemText                 from '@mui/material/ListItemText';
import {styled}                     from '@mui/material/styles';
import AppBarBase                   from '@mui/material/AppBar';
import Box                          from '@mui/material/Box';
import Toolbar                      from '@mui/material/Toolbar';
import IconButton                   from '@mui/material/IconButton';
import Typography                   from '@mui/material/Typography';
import InputBase                    from '@mui/material/InputBase';
import Badge                        from '@mui/material/Badge';
import MenuItem                     from '@mui/material/MenuItem';
import Menu                         from '@mui/material/Menu';
import MenuIcon                     from '@mui/icons-material/MenuRounded';
import SearchIcon                   from '@mui/icons-material/SearchRounded';
import AccountCircle                from '@mui/icons-material/AccountCircleRounded';
import MailIcon                     from '@mui/icons-material/MailRounded';
import NotificationsIcon            from '@mui/icons-material/NotificationsRounded';
import MoreIcon                     from '@mui/icons-material/MoreVertRounded';
import ListItemButton               from '@mui/material/ListItemButton';
import ListItemIcon                 from '@mui/material/ListItemIcon';
import Drawer                       from '@mui/material/Drawer';
import ReactDOM                     from 'react-dom/client';
import {Link as LinkBase}           from 'react-router-dom';

const Link = styled(LinkBase)(({theme}) => ({
	color         : theme.palette.grey[900],
	textDecoration: 'none',
	width         : '100%',
}));

interface Properties {
	variant?: OverridableStringUnion<'elevation' | 'outlined', PaperPropsVariantOverrides>,
	label?: string
}

type Item = {
	icon: ReactElement,
	text: string,
	link: string,
};

type Block = {
	title: string,
	items: Item[]
};

export default function AppBar(properties: Properties) {
	const [anchorElement, setAnchorElement]                     = React.useState<null | HTMLElement>(null);
	const [mobileMoreAnchorElement, setMobileMoreAnchorElement] =
		      React.useState<null | HTMLElement>(null);
	
	const isMenuOpen       = Boolean(anchorElement);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorElement);
	
	// Search
	const Search = styled('div')(({theme}) => ({
		backgroundColor: properties.variant === 'lighter' ? theme.palette.grey[300] : theme.palette.common.white,
		position       : 'relative',
		borderRadius   : '1.5rem',
		marginRight    : 0,
		marginLeft     : theme.spacing(3),
		width          : '100%',
		height         : '2.8rem',
		
		'&:hover': {
			backgroundColor: properties.variant === 'lighter' ? theme.palette.grey[400] : theme.palette.grey[50],
		},
		
		[theme.breakpoints.up('sm')]: {
			marginRight: theme.spacing(3),
			width      : 'auto',
		},
	}));
	
	const SearchIconWrapper = styled('div')(({theme}) => ({
		padding       : theme.spacing(0, 3),
		height        : '100%',
		position      : 'absolute',
		pointerEvents : 'none',
		display       : 'flex',
		alignItems    : 'center',
		justifyContent: 'center',
		transform     : 'scaleX(-1)',
	}));
	
	const SearchInput = styled(InputBase)(({theme}) => ({
		color: 'inherit',
		width: '100%',
		
		'& .MuiInputBase-input': {
			padding: theme.spacing(2, 0, 2, 2),
			// vertical padding + font size from searchIcon
			paddingRight: `calc(1em + ${theme.spacing(4)})`,
			transition  : theme.transitions.create('width'),
			width       : '100%',
			height      : '1.6rem',
			
			[theme.breakpoints.up('md')]: {
				width: '30ch',
			},
		},
	}));
	
	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElement(event.currentTarget);
	};
	
	const handleMobileMenuClose = () => {
		setMobileMoreAnchorElement(null);
	};
	
	const handleMenuClose = () => {
		setAnchorElement(null);
		
		handleMobileMenuClose();
	};
	
	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorElement(event.currentTarget);
	};
	
	const menuId     = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorElement}
			id={menuId}
			keepMounted
			anchorOrigin={{
				vertical  : 'bottom',
				horizontal: 'left',
			}}
			transformOrigin={{
				vertical  : 'top',
				horizontal: 'left',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
			sx={{
				'.MuiPaper-root': {
					backgroundColor: (theme) => properties.variant === 'lighter' ? undefined : theme.palette.grey[50],
				},
			}}
		>
			<MenuItem onClick={handleMenuClose}>پروفایل</MenuItem>
			<MenuItem onClick={handleMenuClose}>اکانت من</MenuItem>
		</Menu>
	);
	
	const [state, setState] = React.useState(
		{
			drawer: false,
		},
	);
	
	const mobileMenuId     = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorElement}
			anchorOrigin={{
				vertical  : 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical  : 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton size="large" aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="error">
						<MailIcon />
					</Badge>
				</IconButton>
				<p>پیام‌ها</p>
			</MenuItem>
			<MenuItem>
				<IconButton
					size="large"
					aria-label="show 17 new notifications"
					color="inherit"
				>
					<Badge badgeContent={17} color="error">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>نوتیفیکیشن</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>پروفایل</p>
			</MenuItem>
		</Menu>
	);
	
	const toggleDrawer = (open: boolean) =>
		(event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}
			
			setState({...state, ['drawer']: open});
		};
	
	const getList = () => {
		let blocks: Block[] = [
			{
				title: 'موارد اضافی',
				items: [
					{
						icon: <CampaignRounded />,
						text: 'فرصت‌های تجاری تبلیغاتی',
						link: '/advertisement',
					},
					{
						icon: <LiveHelpRounded />,
						text: 'راهنمای آنلاین',
						link: '/live-help',
					},
					{
						text: 'تقویم نمایشگاهی',
						icon: <CalendarMonthRounded />,
						link: '/calendar',
					},
					{
						icon: <ListAltRounded />,
						text: 'لیست مراکز نمایشگاهی',
						link: '/list',
					},
				],
			},
			{
				title: 'لینک‌ها',
				items: [
					{
						icon: <InfoRounded />,
						text: 'درباره ما',
						link: '/about',
					},
				],
			},
		];
		return (
			<Box
				role="presentation"
				onClick={toggleDrawer(false)}
				onKeyDown={toggleDrawer(false)}
			>
				{
					blocks.map(({title, items}, index) => (
						<Fragment key={index}>
							<Typography variant="subtitle1" sx={{padding: (theme) => theme.spacing(3, 3, 0)}}>{title}</Typography>
							<List>
								{
									items.map(({text, icon, link}, index) => (
										<Fragment key={index}>
											<ListItem disablePadding>
												<Link to={link}>
													<ListItemButton disableRipple>
														<ListItemIcon>
															{icon}
														</ListItemIcon>
														<ListItemText primary={text} />
													</ListItemButton>
												</Link>
											</ListItem>
										</Fragment>
									))
								}
							</List>
							{
								blocks.length - 1 > index
									?
									<Divider sx={{marginX: (theme) => theme.spacing(2)}} />
									:
									null
							}
						</Fragment>
					))
				}
			</Box>
		);
	};
	
	return (
		<>
			<AppBarBase
				position="fixed"
				component="nav"
				variant={properties.variant}
			>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						sx={{ml: 2}}
						onClick={toggleDrawer(true)}
					>
						<MenuIcon />
					</IconButton>
					<Drawer
						anchor={'left'}
						open={state.drawer}
						onClose={toggleDrawer(false)}
					>
						{getList()}
					</Drawer>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{display: {xs: 'none', sm: 'block'}}}
					>
						{properties.label ? properties.label : 'Expo Start'}
					</Typography>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<SearchInput
							placeholder={properties.label ? `جستجو در ${properties.label}` : 'جستجو...'}
							inputProps={{'aria-label': 'search'}}
						/>
					</Search>
					<Box sx={{flexGrow: 1}} />
					<Box sx={{display: {xs: 'none', md: 'flex'}}}>
						<IconButton
							size="large"
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<MoreVertRounded />
						</IconButton>
					</Box>
					<Box sx={{display: {xs: 'flex', md: 'none'}}}>
						<IconButton
							size="large"
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBarBase>
			{renderMobileMenu}
			{renderMenu}
		</>
	);
}

function setState(arg0: any) {
	throw new Error('Function not implemented.');
}

