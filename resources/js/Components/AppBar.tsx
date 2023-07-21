import {Divider}                       from '@mui/material';
import {Fragment, ReactElement}        from 'react';
import * as React                      from 'react';
import {PaperPropsVariantOverrides}    from '@mui/material/Paper/Paper';
import {OverridableStringUnion}        from '@mui/types';
import {
	AccountCircle,
	ArrowBackRounded as ArrowBackRoundedBase,
	CalendarMonthRounded,
	CampaignRounded,
	InfoRounded, ListAltRounded,
	LiveHelpRounded, MailRounded, MenuRounded, MoreRounded,
	MoreVertRounded, NotificationsOutlined, NotificationsRounded, SearchRounded,
}                                      from '@mui/icons-material';
import List                            from '@mui/material/List';
import ListItem                        from '@mui/material/ListItem';
import ListItemText                    from '@mui/material/ListItemText';
import {styled}                        from '@mui/material/styles';
import AppBarBase                      from '@mui/material/AppBar';
import Box                             from '@mui/material/Box';
import Toolbar                         from '@mui/material/Toolbar';
import IconButton                      from '@mui/material/IconButton';
import Typography                      from '@mui/material/Typography';
import InputBase                       from '@mui/material/InputBase';
import Badge                           from '@mui/material/Badge';
import MenuItem                        from '@mui/material/MenuItem';
import Menu                            from '@mui/material/Menu';
import ListItemButton                  from '@mui/material/ListItemButton';
import ListItemIcon                    from '@mui/material/ListItemIcon';
import Drawer                          from '@mui/material/Drawer';
import {Link as LinkBase, useNavigate} from 'react-router-dom';

interface Properties {
	variant?: OverridableStringUnion<'elevation' | 'outlined', PaperPropsVariantOverrides>,
	label?: string,
	search?: boolean,
	back?: boolean
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

const Link = styled(LinkBase)(({theme}) => ({
	color         : theme.palette.grey[900],
	textDecoration: 'none',
	width         : '100%',
}));

const ArrowBackRounded = styled(ArrowBackRoundedBase)(({theme}) => ({
	transform: theme.direction === 'rtl' ? 'scaleX(-1)' : undefined,
}));

export default function AppBar(properties: Properties): ReactElement {
	const [anchor_element_account, setAnchorElementAccount]                = React.useState<null | HTMLElement>(null);
	const [anchor_element_account_md, setAnchorElementAccountMd]           = React.useState<null | HTMLElement>(null);
	const [anchor_element_notification, setAnchorElementNotification]      = React.useState<null | HTMLElement>(null);
	const [anchor_element_notification_md, setAnchorElementNotificationMd] = React.useState<null | HTMLElement>(null);
	
	const is_open_account: boolean         = Boolean(anchor_element_account);
	const is_open_account_md: boolean      = Boolean(anchor_element_account_md);
	const is_open_notification: boolean    = Boolean(anchor_element_notification);
	const is_open_notification_md: boolean = Boolean(anchor_element_notification_md);
	
	// Search
	const Search = styled('div')(({theme}) => ({
		backgroundColor: properties.variant === 'lighter' ? theme.palette.grey[300] : theme.palette.common.white,
		position       : 'relative',
		borderRadius   : '1.5rem',
		marginRight    : 0,
		marginLeft     : theme.spacing(3),
		transition     : theme.transitions.create('width'),
		overflow       : 'hidden',
		width          : typeof properties.search === 'undefined' || properties.search ? '100%' : 0,
		height         : '2.8rem',
		
		'&:hover': {
			backgroundColor: properties.variant === 'lighter' ? theme.palette.grey[400] : theme.palette.grey[50],
		},
		
		[theme.breakpoints.up('sm')]: {
			marginRight: theme.spacing(3),
			width      : typeof properties.search === 'undefined' || properties.search ? 'auto' : 0,
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
		transform     : theme.direction === 'rtl' ? 'scaleX(-1)' : undefined,
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
	
	const openAccount = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElementAccount(event.currentTarget);
	};
	
	const openAccountMd = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElementAccountMd(event.currentTarget);
	};
	
	const openNotification = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElementNotification(event.currentTarget);
	};
	
	const openNotificationMd = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElementNotificationMd(event.currentTarget);
	};
	
	const closeAccount = () => {
		setAnchorElementAccount(null);
	};
	
	const closeAccountMd = () => {
		setAnchorElementAccountMd(null);
		
		closeAccount();
	};
	
	const closeNotification = () => {
		setAnchorElementNotification(null);
	};
	
	const closeNotificationMd = () => {
		setAnchorElementNotificationMd(null);
		
		closeNotification();
	};
	
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
	
	const [state, setState] = React.useState(
		{
			drawer: false,
		},
	);
	
	const id_account: string = 'primary-menu-account';
	const Account            = () => (
		<Menu
			anchorEl={anchor_element_account}
			anchorOrigin={{
				vertical  : 'top',
				horizontal: 'right',
			}}
			id={id_account}
			keepMounted
			transformOrigin={{
				vertical  : 'top',
				horizontal: 'right',
			}}
			open={is_open_account}
			onClose={closeAccount}
		>
			<MenuItem>
				<IconButton size="large" aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="error">
						<MailRounded />
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
						<NotificationsRounded />
					</Badge>
				</IconButton>
				<p>نوتیفیکیشن</p>
			</MenuItem>
			<MenuItem onClick={openAccount}>
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
	
	const id_account_md: string = 'primary-menu-account-md';
	const AccountMd             = () => (
		<Menu
			anchorEl={anchor_element_account_md}
			id={id_account_md}
			keepMounted
			anchorOrigin={{
				vertical  : 'bottom',
				horizontal: 'left',
			}}
			transformOrigin={{
				vertical  : 'top',
				horizontal: 'left',
			}}
			open={is_open_account_md}
			onClose={closeAccountMd}
			sx={{
				'.MuiPaper-root': {
					backgroundColor: (theme) => properties.variant === 'lighter' ? undefined : theme.palette.grey[50],
				},
			}}
		>
			<MenuItem onClick={closeAccountMd}>پروفایل</MenuItem>
			<MenuItem onClick={closeAccountMd}>اکانت من</MenuItem>
		</Menu>
	);
	
	const id_notification: string = 'primary-menu-notification';
	const Notification            = () => (
		<Menu
			anchorEl={anchor_element_notification}
			anchorOrigin={{
				vertical  : 'top',
				horizontal: 'right',
			}}
			id={id_notification}
			keepMounted
			transformOrigin={{
				vertical  : 'top',
				horizontal: 'right',
			}}
			open={is_open_notification}
			onClose={closeNotification}
		>
			<MenuItem>
				<IconButton size="large" aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="error">
						<MailRounded />
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
						<NotificationsRounded />
					</Badge>
				</IconButton>
				<p>نوتیفیکیشن</p>
			</MenuItem>
			<MenuItem onClick={openAccount}>
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
	
	const id_notification_md: string = 'primary-menu-notification-md';
	const NotificationMd             = () => (
		<Menu
			anchorEl={anchor_element_notification_md}
			id={id_notification_md}
			keepMounted
			anchorOrigin={{
				vertical  : 'bottom',
				horizontal: 'left',
			}}
			transformOrigin={{
				vertical  : 'top',
				horizontal: 'left',
			}}
			open={is_open_notification_md}
			onClose={closeNotificationMd}
			sx={{
				'.MuiPaper-root': {
					backgroundColor: (theme) => properties.variant === 'lighter' ? undefined : theme.palette.grey[50],
				},
			}}
		>
			<MenuItem onClick={closeNotificationMd}>نوتیفیکیشن ۱</MenuItem>
			<MenuItem onClick={closeNotificationMd}>نوتیفیکیشن ۲</MenuItem>
		</Menu>
	);
	
	const getHamburgerMenuList = () => {
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
												<ListItemButton
													disableRipple
													onClick={() => {
														navigate(link);
													}}
												>
													<ListItemIcon>
														{icon}
													</ListItemIcon>
													<ListItemText primary={text} />
												</ListItemButton>
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
	
	// navigate
	const navigate = useNavigate();
	
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
						onClick={(event) => (
							properties.back
								?
								navigate(-1)
								:
								toggleDrawer(true)(event)
						)}>
						{
							properties.back
								?
								<ArrowBackRounded />
								:
								<MenuRounded />
						}
					</IconButton>
					<Drawer
						anchor={'left'}
						open={state.drawer}
						onClose={toggleDrawer(false)}>
						{getHamburgerMenuList()}
					</Drawer>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{
							display: {
								xs: typeof properties.search === 'undefined' || properties.search ? 'none' : 'block',
								sm: 'block',
							},
						}}>
						{properties.label ? properties.label : 'Expo Start'}
					</Typography>
					<Search>
						<SearchIconWrapper>
							<SearchRounded />
						</SearchIconWrapper>
						<SearchInput
							placeholder={properties.label ? `جستجو در ${properties.label}` : 'جستجو...'}
							inputProps={{'aria-label': 'search'}}
						/>
					</Search>
					<Box sx={{flexGrow: 1}} />
					<Box sx={{
						display: {
							xs: 'none',
							md: 'flex',
						},
					}}>
						<IconButton
							size="large"
							aria-label="show more"
							aria-controls={id_notification_md}
							aria-haspopup="true"
							onClick={openNotificationMd}
							color="inherit">
							<NotificationsOutlined />
						</IconButton>
						<IconButton
							size="large"
							edge="end"
							aria-label="account of current user"
							aria-controls={id_account_md}
							aria-haspopup="true"
							onClick={openAccountMd}
							color="inherit">
							<AccountCircle />
						</IconButton>
					</Box>
					<Box sx={{
						display: {
							xs: 'flex',
							md: 'none',
						},
					}}>
						<IconButton
							size="large"
							aria-label="show more"
							aria-controls={id_notification}
							aria-haspopup="true"
							onClick={openNotification}
							color="inherit">
							<NotificationsOutlined />
						</IconButton>
						<IconButton
							size="large"
							aria-label="show more"
							aria-controls={id_account}
							aria-haspopup="true"
							onClick={openAccount}
							color="inherit">
							<AccountCircle />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBarBase>
			<Account />
			<AccountMd />
			<Notification />
			<NotificationMd />
		</>
	);
}

function setState(arg0: any) {
	throw new Error('Function not implemented.');
}

