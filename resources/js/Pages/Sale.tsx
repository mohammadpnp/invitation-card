import {
	AddBusinessRounded,
	AssignmentInd, AssignmentIndRounded, ContactPhoneRounded,
} from '@mui/icons-material';
import CssBaseline    from '@mui/material/CssBaseline';
import Grid           from '@mui/material/Unstable_Grid2';
import {ReactElement} from 'react';
import * as React     from 'react';
import {
	Button,
	ThemeProvider,
}                     from '@mui/material';
import Typography     from '@mui/material/Typography';
import Box            from '@mui/material/Box';
import AppBar         from '../Components/AppBar';
import NavigationBar  from '../Components/NavigationBar';
import theme          from '../Themes/M3';
import logo           from '../statics/bosch.png';
import sale           from '../statics/sale.jpg';

export default function Sale(): ReactElement {
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
				<AppBar label="فروش ویژه نمایشگاهی" />
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
								display      : 'inline-block',
								paddingBottom: (theme) => theme.spacing(2),
								marginX      : 'auto',
							}}>فروش ویژه نمایشگاهی</Typography>
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
						</Box>
						
						<Box>
							<Typography variant="body1" lineHeight={2} sx={{ marginBottom: (theme) => theme.spacing(3) }}>
								به مناسبت برگزاری بیست و سومین نمایشگاه بین المللی اگروفوود ایران که در تاریخ 25 خرداد الی 28 خرداد 1402 در محل دائمی نمایشگاههای بین المللی تهران برگزار می شود محصوالت زیر به طور ویژه با قیمت استثنایی به فروش می رود.<br />
								مشتریان محترم میتوانند با مراجعه به سایت فروش اینترنتی com.bazarvision.ap.www و یا .............. اقدام به خرید یا ثبت سفارش نمایند
							</Typography>
							<img src={sale} alt="" style={{ width: '100%' }} />
						</Box>
					</Box>
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
						<Box sx={{
							display: 'flex',
							gap    : 2,
						}}>
							<Button startIcon={<AddBusinessRounded />} variant="contained" color="secondary">
								فرم تقاضای نمایندگی
							</Button>
						</Box>
					</Box>
				</Box>
				<NavigationBar />
			</Box>
		</ThemeProvider>
	);
}
