import {DownloadRounded, LocationCityRounded, LocationOn, LocationOnRounded, ReplyRounded} from '@mui/icons-material';
import CssBaseline                                                                         from '@mui/material/CssBaseline';
import Grid                                                                                from '@mui/material/Unstable_Grid2';
import {ReactElement}                                                                      from 'react';
import * as React                                                                          from 'react';
import {
	Button,
	ThemeProvider,
}                                                                                          from '@mui/material';
import Typography                                                                          from '@mui/material/Typography';
import Box                                                                                 from '@mui/material/Box';
import {Link}                                                                              from 'react-router-dom';
import AppBar                                                                              from '../Components/AppBar';
import NavigationBar                                                                       from '../Components/NavigationBar';
import theme                                                                               from '../Themes/M3';
import logo                                                                                from '../statics/bosch.png';

export default function InvitationCard(): ReactElement {
	const [invitation_cards, setInvitationCards] = React.useState(() => []);
	const [invitation_card, setInvitationCard]   = React.useState(0);
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
		
	}, [invitation_card, setInvitationCards]);
	
	const name      = 'اسم و فامیل';
	const direction = 'ltr';
	
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{display: 'flex', flexDirection: 'column'}} ref={ref}>
				<CssBaseline />
				<AppBar label="دعوت‌نامه رسمی" />
				<Box component="main" sx={{
					paddingTop   : '70px',
					paddingBottom: '80px',
					paddingX     : theme.spacing(3),
					display      : 'flex',
					flexDirection: 'column',
					gap          : 2,
					marginX      : 'auto',
					maxWidth     : 980,
				}}>
					<Box sx={{
						backgroundColor: (theme) => theme.palette.grey[50],
						borderRadius   : (theme) => theme.spacing(3),
						padding        : (theme) => theme.spacing(2),
						display        : 'flex',
						flexDirection  : 'column',
						gap            : 2,
					}}>
						<Box sx={{
							textAlign: 'center',
						}}>
							<Typography variant="h4" sx={{
								borderBottom : (theme) => `1px solid ${theme.palette.primary.dark}`,
								display      : 'inline-block',
								paddingBottom: (theme) => theme.spacing(2),
								marginX      : 'auto',
							}}>دعوت‌نامه رسمی</Typography>
						</Box>
						<Box sx={{
							display       : 'flex',
							justifyContent: 'space-between',
							alignItems    : 'center',
							direction,
						}}>
							<Box>
								<img src={logo} alt="" />
								<Typography variant="h6" sx={{textAlign: direction === 'ltr' ? 'left' : 'right'}}>
									invented for Life
								</Typography>
							</Box>
							<Typography sx={{direction: 'rtl'}}>
								تاریخ دعوت:
								۱۴۰۲/۰۳/۲۶
							</Typography>
						</Box>
						<Box sx={{
							display       : 'flex',
							justifyContent: 'space-between',
						}}>
							<Typography variant="h6">
								بیست وسومین نمایشگاه بین المللی<br />
								لوازم خانگی - تهران
							</Typography>
							<Typography variant="h2" component="h2" sx={{fontWeight: 500}}>۱۴۰۲</Typography>
						</Box>
						
						<Box sx={{
							display       : 'flex',
							justifyContent: 'space-between',
						}}>
							<Typography variant="subtitle2">محل دائمی نمایشگاه های بین المللی تهران</Typography>
							<Typography>۲۶ الی ۳۰ خرداد</Typography>
						</Box>
						<Box sx={{
							backgroundColor: (theme) => theme.palette.grey[200],
							borderRadius   : (theme) => theme.spacing(2),
							padding        : (theme) => theme.spacing(3),
							marginY        : (theme) => theme.spacing(4),
							textAlign      : 'center',
						}}>
							<Typography>به نام حضرت دوست</Typography>
							<Box sx={{
								marginRight: 'auto',
								marginLeft : 'auto',
								width      : '600px',
								lineHeight : 2,
							}}>
								<Box
									sx={{
										display       : 'flex',
										justifyContent: 'space-between',
									}}>
									<span>
										مژده ای دل که مسیحا نفسی می آید
									</span>
									<span>
										که از انفاس خوشش بوی کسی می آید
									</span>
								</Box>
								<Box sx={{
									display       : 'flex',
									justifyContent: 'space-between',
								}}>
									<span>
										ز غم هجر مکن ناله و فریاد که دوش
									</span>
									<span>
										زده‌ام فالی و فریادرسی می‌آید
									</span>
								</Box>
							</Box>
							ادامه شعر
						</Box>
						<Box>
							<Typography variant="subtitle2" lineHeight={2}>سرور ارجمند {name}</Typography>
							<Typography variant="body1" lineHeight={2}>
								در بیست و سومین نمایشگاه بین المللی لوازم خانگی که از تاریخ 29 آذر الی 2 دی ماه سال ۱۴۰۲ در محل دائمی نمایشگاه بین المللی تهران برگزار می شود<br />
							</Typography>
							<Typography variant="body2" sx={{textAlign: 'center'}}>
								پذیرای حضور گرم شما باشیم
							</Typography>
						</Box>
						<Grid sx={{
							border      : (theme) => `1px solid ${theme.palette.grey[400]}`,
							borderRadius: (theme) => theme.spacing(2),
							minWidth    : '300px',
							maxWidth    : '30%',
							marginRight : 'auto',
							padding     : (theme) => theme.spacing(2),
						}} container>
							<Grid xs={7}>
								<Typography variant="body2" lineHeight="2">
									علیرضا سلیمانی<br />
									مدیر عامل<br />
									شرکت کاسپین<br />
									نمایندگی بوش ایران
								</Typography>
							</Grid>
							<Grid xs={5} sx={{
								border      : (theme) => `1px solid ${theme.palette.grey[400]}`,
								borderRadius: (theme) => theme.spacing(2),
							}}></Grid>
						</Grid>
					</Box>
					<Box sx={{display: 'flex'}}>
						<Box sx={{
							display : 'flex',
							gap     : 2,
							flexGrow: 1,
						}}>
							<Link to="/map">
								<Button startIcon={<LocationOn />} variant="contained" color="primary">
									مسیریابی غرفه
								</Button>
							</Link>
						</Box>
						<Box sx={{
							display: 'flex',
							gap    : 2,
						}}>
							<Button startIcon={<DownloadRounded />} variant="contained" color="secondary">
								دانلود
							</Button>
							<Button startIcon={<ReplyRounded />} variant="contained" color="secondary">
								پاسخ شما
							</Button>
						</Box>
					</Box>
				</Box>
				<NavigationBar />
			</Box>
		</ThemeProvider>
	);
}
