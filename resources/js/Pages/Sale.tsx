import {
	AddBusinessRounded,
	AssignmentInd, AssignmentIndRounded, ContactPhoneRounded,
}                                                      from '@mui/icons-material';
import CssBaseline                                     from '@mui/material/CssBaseline';
import List                                            from '@mui/material/List';
import ListItem                                        from '@mui/material/ListItem';
import {styled}                                        from '@mui/material/styles';
import Grid                                            from '@mui/material/Unstable_Grid2';
import {ReactElement, useState}                        from 'react';
import * as React                                      from 'react';
import {
	Button,
	ThemeProvider,
}                                                      from '@mui/material';
import Typography                                      from '@mui/material/Typography';
import Box                                             from '@mui/material/Box';
import AppBar                                          from '../Components/AppBar';
import NavigationBar                                   from '../Components/NavigationBar';
import theme, {getPaletteFromImage, M3, PaletteColors} from '../Themes/M3';

const Logo = styled('img')(({theme}) => ({
	width    : '100%',
	maxHeight: '100px',
}));

// Demo data
import bosch from '../statics/bosch.png';
import mihan from '../statics/mihan.png';
import kaleh from '../statics/kaleh.png';

const logo = [bosch, mihan, kaleh][Math.floor(Math.random() * 3)];

import shooshool from '../statics/shooshool.png';

export default function Sale(): ReactElement {
	const [invitation_cards, setInvitationCards] = React.useState(() => []);
	const [invitation_card, setInvitationCard]   = React.useState(0);
	const [anchorElement, setAnchorElement]      = React.useState<null | HTMLElement>(null);
	const ref                                    = React.useRef<HTMLDivElement>(null);
	const [palette, setPalette]                  = useState<PaletteColors>(location.state?.palette);
	
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
	
	// demo data
	const items = [];
	
	for (let i = 0; i < 8; i++) {
		items.push(
			{
				image   : shooshool,
				title   : [
					'SERIE | 8 WASHING',
					'MACHIN FRONT',
					'LOADER 9 KG 1400 RPM',
				],
				features: [
					'LOADER 9 KG 1400 RPM',
					'AllergyPlus',
					'Hygiene, Drain, Drum clean, jean, mixture, Prewash, rapid 30 min, Ready, Rinse plus, rinsing',
					'Delicates program, Easy-care program, Whites and colors program',
					'LOADER 9 KG 1400 RPM',
				],
			},
		);
	}
	
	return (
		<ThemeProvider theme={M3(palette)}>
			<Box sx={{display: 'flex', flexDirection: 'column'}} ref={ref}>
				<CssBaseline />
				<AppBar label="فروش ویژه نمایشگاهی" back={true} />
				<Box component="main" sx={{
					paddingTop   : 'calc(60px + 1rem)',
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
							<Typography
								variant="h4"
								sx={{
									display      : 'inline-block',
									paddingBottom: (theme) => theme.spacing(2),
									marginX      : 'auto',
								}}>
								فروش ویژه نمایشگاهی
							</Typography>
						</Box>
						<Box sx={{
							display       : 'flex',
							justifyContent: 'space-between',
							alignItems    : 'center',
							direction,
						}}>
							<Box sx={{
								textAlign: direction === 'ltr' ? 'left' : 'right',
							}}>
								<Logo
									src={logo}
									alt=""
									onLoad={(event) => {
										const logo_palette = getPaletteFromImage(event.currentTarget);
										
										setPalette(logo_palette);
									}}
								/>
								<Typography variant="h6">
									invented for Life
								</Typography>
							</Box>
						</Box>
						
						<Box>
							<Typography variant="body1" lineHeight={2} sx={{marginBottom: (theme) => theme.spacing(3)}}>
								به مناسبت برگزاری بیست و سومین نمایشگاه بین المللی اگروفوود ایران که در تاریخ 25 خرداد الی 28 خرداد 1402 در محل دائمی نمایشگاههای بین المللی تهران برگزار می شود محصوالت زیر به طور ویژه با قیمت استثنایی به فروش می رود.<br />
								مشتریان محترم میتوانند با مراجعه به سایت فروش اینترنتی com.bazarvision.ap.www و یا .............. اقدام به خرید یا ثبت سفارش نمایند
							</Typography>
							<Grid
								container
								spacing={2}
								sx={{
									backgroundImage: (theme) => `linear-gradient(135deg, ${theme.palette.grey[100]}, ${theme.palette.grey[300]})`,
									borderRadius   : '1rem',
									direction      : 'ltr',
									minHeight      : '500px',
								}}>
								{
									items.map(
										({image, title, features}, index) => (
											<Grid
												xs={12}
												sm={6}
												className={(index || index % 3 || index % 4) ? 'rtl' : 'ltr'}
												sx={{
													textAlign: 'left',
													position : 'relative',
													display  : 'flex',
													
													'&.rtl': {
														'.title': {
															marginRight: 'auto',
														},
													},
													'&.ltr': {
														'.title': {
															marginLeft: 'auto',
														},
													},
													
													'&:not(.popup)': {
														'.description': {
															transform: 'scale(0)',
															display  : 'none',
														},
													},
													
													'&.popup': {
														'.diamond': {
															'&::before': {
																boxShadow   : (theme) => `3px 5px 8px 6px ${theme.palette.grey[400]} inset`,
																borderRadius: '3rem',
																position    : 'absolute',
																transform   : 'rotate(0)',
															},
															transform  : 'scale(1)',
															position   : 'absolute',
															zIndex     : 2,
															width      : '100%',
															display    : 'flex',
															height     : {
																xs: 100,
																sm: 400,
															},
															
															'.image': {
																flex     : '0 0 auto',
																width    : '40%',
																maxHeight: {
																	xs: 100,
																	sm: 200,
																},
																transform: 'scale(0.7) translateY(20%) rotate(0)',
																left     : 0,
																top      : 0,
															},
															
															'.description': {
																transform: 'scale(1)',
																flex     : '0 0 auto',
																width    : '60%',
															},
														},
													},
													
													'.diamond': {
														'&::before': {
															content        : '""',
															backgroundColor: (theme) => theme.palette.grey[50],
															boxShadow      : (theme) => `-3px 5px 8px 6px ${theme.palette.grey[400]} inset`,
															borderRadius   : '1rem',
															position       : 'absolute',
															zIndex         : 0,
															top            : 0,
															left           : 0,
															width          : '100%',
															height         : '100%',
															transform      : 'rotate(-135deg)',
															transition     : (theme) => theme.transitions.create(
																[
																	'width',
																	'transform',
																	'border-radius',
																],
															),
														},
														transform  : 'scale(0.7)',
														width      : '20%',
														height     : 100,
														transition : (theme) => theme.transitions.create(
															[
																'width',
																'transform',
															],
														),
														
														'.image': {
															position  : 'relative',
															left      : '50%',
															width     : '80%',
															transform : 'translate(-50%, -40%)',
															transition: (theme) => theme.transitions.create(['width', 'transform']),
														},
														
														'.description': {
															paddingTop: (theme) => theme.spacing(4),
															transition: (theme) => theme.transitions.create(['transform']),
														},
														
														'.features': {
															margin      : 0,
															paddingLeft : (theme) => theme.spacing(3),
															paddingRight: (theme) => theme.spacing(2),
														},
													},
													'.title'  : {
														width  : '50%',
														padding: (theme) => theme.spacing(3),
													},
												}}
												onClick={(event) => {
													event.currentTarget.classList.toggle('popup');
												}}>
												<Box className="diamond">
													<img src={image} alt="" className="image" />
													
													<div className="description">
														<Typography
															dangerouslySetInnerHTML={{__html: title.join('<br/>')}}></Typography>
														
														<Typography variant="h6" fontWeight={600}>Features & Specifications</Typography>
														<ul className="features">
															{
																features.map(
																	(feature) => (
																		<Typography variant="body2" component="li">
																			{feature}
																		</Typography>
																	),
																)
															}
														</ul>
													</div>
												</Box>
												<Typography className="title"
												            dangerouslySetInnerHTML={{__html: title.join('<br/>')}}></Typography>
											</Grid>
										),
									)
								}
							</Grid>
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
