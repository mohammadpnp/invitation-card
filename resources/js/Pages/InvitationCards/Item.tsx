import * as React                                             from 'react';
import {
	ReactElement,
	useEffect,
	useRef,
	useState,
}                                                             from 'react';
import {
	DownloadRounded,
	LocationOn,
	ReplyRounded,
}                                                             from '@mui/icons-material';
import BottomNavigation                                       from '@mui/material/BottomNavigation';
import CssBaseline                                            from '@mui/material/CssBaseline';
import {keyframes, styled}                                    from '@mui/material/styles';
import Grid                                                   from '@mui/material/Unstable_Grid2';
import {SystemCssProperties}                                  from '@mui/system/styleFunctionSx/styleFunctionSx';
import {
	Button,
	Container,
	ThemeProvider,
}                                                             from '@mui/material';
import Typography                                             from '@mui/material/Typography';
import Box                                                    from '@mui/material/Box';
import {useLocation, useNavigate, useParams, useSearchParams} from 'react-router-dom';
import getInvitationCard                                      from '../../API/InvitationCard';
import Helper                                                 from '../../Helpers/Helper';
import InvitationCardType                                     from '../../Types/InvitationCard';
import AppBar                                                 from '../../Components/AppBar';
import theme, {
	PaletteColors,
	getPaletteFromImage,
	M3,
}                                                             from '../../Themes/M3';

const Image = styled('img')(() => ({
	width    : '100%',
	maxHeight: '100px',
}));

const getSlideAnimation = ({maxHeight, opacity, gap}: SystemCssProperties) => keyframes`
  0% {
    ${maxHeight ? 'max-height: 0;' : ''}
    ${opacity ? 'opacity: 0;' : ''}
    ${gap ? 'gap: 0;' : ''}
  }
  100% {
    ${maxHeight ? `max-height: ${maxHeight}px;` : ''}
    ${opacity ? `opacity: ${opacity};` : ''}
    ${gap ? `gap: ${gap};` : ''}
  }
`;

const getFadeAnimation = () => keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export default function InvitationCard(): ReactElement {
	/* Location */
	const location                         = useLocation();
	const {id}                             = useParams();
	const navigate                         = useNavigate();
	const [search_params, setSearchParams] = useSearchParams();

	/* States */
	const [invitation_card, setInvitationCard] = useState<InvitationCardType>(
		{
			id           : 0,
			logo         : '',
			pictures     : [],
			title        : '',
			slogan       : '',
			hall         : 0,
			booth        : 0,
			template_type: 1,

			description: {
				header: '',
				body  : '',
				footer: '',
			},
			poem       : {
				verses: [],
				voice : null,
			},
		},
	);

	const [placeholder, setPlaceholder] = useState(false);

	const [navigation_bar, setNavigationBar] = useState(true);

	const [poem_mode, setPoemMode] = useState(false);

	const [palette, setPalette] = useState<PaletteColors>(location.state?.palette);

	// Ref
	const ref = useRef<HTMLDivElement>(null);

	const {
		      logo,
		      title,
		      slogan,
		      exhibition,
		      description,
		      poem,
		      manager,
	      } = invitation_card;

	useEffect(() => {
		(ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;

		setPlaceholder(true);

		(async () => {
			await getInvitationCard(Number(id), search_params).then((result): void => {
				setPlaceholder(false);

				setInvitationCard(result.item);
			});
		})();
	}, [setInvitationCard]);

	// Demo data
	const direction: 'ltr' | 'rtl' = Helper.isRtl(slogan) ? 'rtl' : 'ltr';

	const pdf_link: string = 'https://expo-start.ir/api/pdf/har-kossheri.pdf';

	// placeholder
	if (placeholder) {
		if (!Object.values(invitation_card).length) {
			invitation_card.title = 'placeholder';
		}
	}

	let start_at_object;
	let end_at_object;

	if (exhibition) {
		start_at_object = new Date(exhibition.start_at);
		end_at_object   = new Date(exhibition.end_at);
	}

    function isTooLightYIQ(color: string){
        const rgb = `${color}`.match(/\d+/g)!;
        // @ts-ignore
        const yiq = ((rgb[0]*299)+(rgb[1]*587)+(rgb[2]*114))/1000;
        return yiq >= 128;

    }

	return (
		<ThemeProvider theme={M3(palette)}>
			<Grid sx={{display: 'flex', flexDirection: 'column'}} ref={ref}>
				<CssBaseline />
				<AppBar label="دعوت‌نامه رسمی" search={false} back={true} />
				<Container
					maxWidth="md"
					component="main"
					sx={{
						padding      : theme.spacing('calc(60px + 1rem)', 3, navigation_bar ? 'calc(70px + 1rem)' : '1rem', 3),
						display      : 'flex',
						flexDirection: 'column',
						gap          : 2,
						marginX      : 'auto',
						transition   : theme.transitions.create(['padding-bottom']),
					}}
				>
					<Box sx={{
						backgroundColor: (theme) => theme.palette.grey[50],
						borderRadius   : (theme) => theme.spacing(3),
						padding        : (theme) => theme.spacing(2),
						display        : 'flex',
						flexDirection  : 'column',
						transition     : (theme) => theme.transitions.create(['gap']),
						overflow       : 'hidden',// for animation
						gap            : 0, // Sets after animation
						animation      : `0.5s ${getSlideAnimation({gap: !poem_mode ? theme.spacing(4) : 0})} 2.5s linear forwards`,
					}}>
						<Box sx={{
							overflow     : 'hidden',
							transition   : (theme) => theme.transitions.create(['max-height']),
							display      : 'flex',
							gap          : 2,
							flexDirection: 'column',
							position     : 'relative',
							maxHeight    : 0,// shows after animation
							opacity      : 0, // shows after animation
							animation    : `0.5s ${getSlideAnimation({maxHeight: !poem_mode ? 400 : 0, opacity: 1})} 2.5s linear forwards`,

							[theme.breakpoints.up('sm')]: {
								gap      : 0,
								maxHeight: 0, // shows after animation
								animation: `0.5s ${getSlideAnimation({maxHeight: !poem_mode ? 300 : 0, opacity: 1})} 2.5s linear forwards`,
							},
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
								display      : 'flex',
								alignItems   : 'center',
								direction,
								flexDirection: 'column',

								[theme.breakpoints.up('sm')]: {
									flexDirection : 'row',
									justifyContent: 'space-between',
								},
							}}>
								<Box sx={{
									maxWidth: '50%',
									overflow: 'hidden',
								}}>
									<Image
										src={logo}
										alt=""
										onLoad={(event) => {
											if (palette) {
												return;
											}

											const logo_palette = getPaletteFromImage(event.currentTarget);

											setPalette(logo_palette);
										}} />
									<Typography variant="h6" sx={{textAlign: direction === 'ltr' ? 'left' : 'right'}}>
										{slogan}
									</Typography>
								</Box>
								<Typography sx={{direction: 'rtl'}}>
									تاریخ دعوت:&nbsp;
									{
										start_at_object ?
											start_at_object.toLocaleDateString('fa', {
												year : 'numeric',
												month: 'short',
												day  : 'numeric',
											})
											:
											null
									}
								</Typography>
							</Box>
							<Box sx={{
								display      : 'flex',
								flexDirection: 'column',

								[theme.breakpoints.up('sm')]: {
									flexDirection : 'row',
									justifyContent: 'space-between',
								},
							}}>
								<Typography variant="h6">
									{title}
								</Typography>
								<Typography variant="h2" component="h2" sx={{
									fontWeight: 500,
									textAlign : 'left',
								}}>
									{
										start_at_object ?
											start_at_object.toLocaleDateString('fa', {
												year: 'numeric',
											})
											:
											null
									}
								</Typography>
							</Box>

							<Box sx={{
								display      : 'flex',
								flexDirection: 'column',

								[theme.breakpoints.up('sm')]: {
									flexDirection : 'row',
									justifyContent: 'space-between',
								},
							}}>
								<Typography variant="subtitle2">{exhibition ? exhibition.title : null}</Typography>
								<Typography>
									{
										start_at_object ?
											start_at_object.toLocaleDateString('fa', {
												day: 'numeric',
											})
											:
											null
									}
									{
										start_at_object && end_at_object ?
											(
												start_at_object.toLocaleDateString(
													'fa',
													{
														month: 'short',
													},
												) !== end_at_object.toLocaleDateString(
													'fa',
													{
														month: 'short',
													},
												)
													?
													start_at_object.toLocaleDateString(
														'fa',
														{
															month: 'short',
														},
													)
													:
													null
											)
											:
											null
									}
									&nbsp;الی&nbsp;
									{
										end_at_object ?
											end_at_object.toLocaleDateString('fa', {
												month: 'short',
												day  : 'numeric',
											})
											:
											null
									}
								</Typography>
							</Box>
						</Box>
						<Box sx={{
							backgroundColor: (theme) => theme.palette.grey[200],
							borderRadius   : (theme) => theme.spacing(2),
							padding        : (theme) => theme.spacing(3),
							transition     : (theme) => theme.transitions.create(['margin-top', 'margin-bottom']),
							textAlign      : 'center',
							display        : 'flex',
							flexDirection  : 'column',
							gap            : 3,
							maxHeight      : 0, // shows after animation
							opacity        : 0, // shows after animation
							overflow       : 'hidden',
							animation      : `0.5s ${getSlideAnimation({maxHeight: 450, opacity: 1})} 0s linear forwards`,
						}}>
							<Typography variant="h6" sx={{
								display  : {
									xs: 'none',
									sm: 'block',
								},
								opacity  : 0, // shows after animation
								animation: `0.5s ${getFadeAnimation()} 0s linear forwards`,
							}}>به نام حضرت دوست</Typography>
							<Box sx={{
								maxHeight    : poem_mode ? 800 : 75,
								lineHeight   : 2,
								overflow     : 'hidden',
								transition   : (theme) => theme.transitions.create(['max-height']),
								display      : 'flex',
								flexDirection: 'column',
								gap          : 2,

								[theme.breakpoints.up('sm')]: {
									width    : 500,
									marginX  : 'auto',
									gap      : 0,
									maxHeight: poem_mode ? 450 : 60,
								},

								[theme.breakpoints.up('md')]: {
									width: 600,
								},
							}}>
								{
									poem ?
										poem.verses.map(
											(stanzas, index) => <Box
												key={index}
												sx={{
													display      : 'flex',
													flexDirection: 'column',
													lineHeight   : '2rem',
													gap          : 2,

													[theme.breakpoints.up('sm')]: {
														justifyContent: 'space-between',
														gap           : 3,
														flexDirection : 'row',
													},

													[theme.breakpoints.up('md')]: {
														gap   : 5,
														height: '2rem',
													},
												}}>
												<Typography
													sx={{
														width     : '100%',
														lineHeight: '2rem',
														opacity   : index < 2 ? 0 : undefined,
														animation : index < 2 ? `0.5s ${getFadeAnimation()} ${index}.5s linear forwards` : undefined,

														[theme.breakpoints.up('sm')]: {
															width    : 300,
															textAlign: 'left',
														},
													}}
													variant="body2">
													{stanzas[0]}
												</Typography>
												<Typography
													sx={{
														width     : '100%',
														lineHeight: '2rem',
														opacity   : index < 2 ? 0 : undefined,
														animation : index < 2 ? `0.5s ${getFadeAnimation()} ${index + 1}s linear forwards` : undefined,

														[theme.breakpoints.up('sm')]: {
															width    : 300,
															textAlign: 'right',
														},
													}}
													variant="body2"
												>
													{stanzas[1]}
												</Typography>
											</Box>,
										)
										:
										null
								}
							</Box>
							<Box>
								<Button variant="text" onClick={(event) => {
									event.preventDefault();

									setPoemMode(!poem_mode);
								}}>
									《{!poem_mode ? 'ادامه شعر' : 'بازگشت'}》
								</Button>
							</Box>
						</Box>
						<Box sx={{
							overflow     : 'hidden',
							transition   : (theme) => theme.transitions.create(['max-height']),
							display      : 'flex',
							flexDirection: 'column',
							gap          : 2,
							maxHeight    : 0, // show after animation
							opacity      : 0, // show after animation
							animation    : `0.5s ${getSlideAnimation({maxHeight: !poem_mode ? 400 : 0, opacity: 1})} 2.5s linear forwards`,

							[theme.breakpoints.up('md')]: {
								gap: 0,
							},
						}}>
							<Box sx={{
								display      : 'flex',
								flexDirection: 'column',
								gap          : 2,
							}}>
								<Typography variant="subtitle2" lineHeight={2}>{description ? description.header : null}</Typography>
								<Typography variant="body1" lineHeight={2}>{description ? description.body : null}</Typography>
								<Typography variant="body2"
								            sx={{textAlign: 'center'}}>{description ? description.footer : null}</Typography>
							</Box>
							{
								manager ?
									<Grid sx={{
										border      : (theme) => `1px solid ${theme.palette.grey[400]}`,
										borderRadius: (theme) => theme.spacing(2),
										padding     : (theme) => theme.spacing(2),
										width       : '100%',

										[theme.breakpoints.up('sm')]: {
											marginRight: 'auto',
											minWidth   : '300px',
											maxWidth   : '30%',
										},
									}} container>
										<Grid xs={7}>
											<Typography variant="body2" lineHeight="2">
												{manager.name}<br />
												{manager.position}<br />
												{manager.title}<br />
												{manager.description}
											</Typography>
										</Grid>
										<Grid xs={5} sx={{
											border      : (theme) => `1px solid ${theme.palette.grey[400]}`,
											borderRadius: (theme) => theme.spacing(2),
											overflow    : 'hidden',
											display     : 'flex',
											alignItems  : 'center',
										}}>
											<Image src={manager.picture} alt="" sx={{
												maxWidth : 150,
												maxHeight: 150,
											}} />
										</Grid>
									</Grid>
									:
									null
							}
						</Box>
					</Box>
					<Grid
						justifyContent="space-between"
						sx={{
							display      : 'flex',
							flexDirection: 'column',
							gap          : 2,

							[theme.breakpoints.up('sm')]: {
								flexDirection: 'row',
							},
						}}>
						<Box sx={{
							display: 'flex',
							gap    : 2,
						}}>
							<Button
								startIcon={<LocationOn />}
								variant="contained"
								color="primary"
								onClick={() => {
									navigate(id ? `/fair-card-list/${id}/map` : '', {
										state: {
											invitation_card,
											palette,
										},
									});
								}}>
								مسیریابی غرفه
							</Button>
						</Box>
						<Box sx={{
							display: 'flex',
							gap    : 2,
						}}>
							<Button
								startIcon={<DownloadRounded />}
								variant="contained"
								color="secondary"
								onClick={() => {
									window.location.href = pdf_link;
								}}
							>
								دانلود
							</Button>
							<Button
								startIcon={<ReplyRounded />}
								variant="contained"
								color="secondary"
								onClick={() => {
									navigate(id ? `/fair-card-list/${id}/reply` : '', {
										state: {palette},
									});
								}}
							>
								پاسخ شما
							</Button>
						</Box>
					</Grid>
				</Container>
				<BottomNavigation sx={{
					backgroundColor: (theme) => theme.palette.grey[50],
					borderTop      : (theme) => `1px solid ${theme.palette.grey[400]}`,

					transition: (theme) => theme.transitions.create(['bottom']),
					bottom    : navigation_bar ? 0 : -70,
				}}>
					<Container maxWidth="md">
						<Grid
							container
							justifyContent="space-between"
							alignItems="center"
							sx={{height: 70}}
						>
							<Grid>
								حضور می‌یابید؟
							</Grid>
							<Grid onClick={() => {
								setNavigationBar(false);
							}}>
								<Button variant="text"
                                        sx={{
                                            color: isTooLightYIQ(palette.primary.main) ? 'black' : palette.primary.main
                                        }}
                                        onClick={() => {
									navigate(id ? `/fair-card-list/${id}/reply` : '', {
										state: {
											invitation_card,
											palette,
										},
									});
								}}>
									بله
								</Button>
								<Button variant="text"
                                        sx={{
                                            color: isTooLightYIQ(palette.primary.main) ? 'black' : palette.primary.main
                                        }}

                                >
									خیر
								</Button>
								<Button variant="text"
                                        sx={{
                                            color: isTooLightYIQ(palette.primary.main) ? 'black' : palette.primary.main
                                        }}
                                >
									شاید
								</Button>
							</Grid>
						</Grid>
					</Container>
				</BottomNavigation>
				{/*<NavigationBar />*/}
			</Grid>
		</ThemeProvider>
	);
}
