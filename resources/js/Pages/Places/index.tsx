import * as React                           from 'react';
import {
	ReactElement,
	useState,
	useEffect,
	useRef,
}                                           from 'react';
import {
	CheckRounded,
	Instagram,
	Telegram,
	WhatsApp,
}                                           from '@mui/icons-material';
import {
	Card,
	CardContent,
	CardMedia,
	Chip,
	ThemeProvider,
}                                           from '@mui/material';
import Box                                  from '@mui/material/Box';
import CssBaseline                          from '@mui/material/CssBaseline';
import Menu                                 from '@mui/material/Menu';
import MenuItem                             from '@mui/material/MenuItem';
import Typography                           from '@mui/material/Typography';
import Grid                                 from '@mui/material/Unstable_Grid2';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import getPlaces                            from '../../API/Places';
import AppBar                               from '../../Components/AppBar';
import NavigationBar                        from '../../Components/NavigationBar';
import slide_1                              from '../../statics/agrofood.jpg';
import theme, {M3}                          from '../../Themes/M3';
import Place, {Filters}                     from '../../Types/Place';

export default function Index(): ReactElement {
	/* Location */
	const [search_params, setSearchParams] = useSearchParams();
	
	/* States */
	const [places, setPlaces]   = useState<Place[]>([]);
	const [filters, setFilters] = useState<Filters>({});
	
	const [placeholder, setPlaceholder] = useState(false);
	
	const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
	const ref                               = useRef<HTMLDivElement>(null);
	
	const open = Boolean(anchorElement);
	
	const handleClose = () => {
		setAnchorElement(null);
	};
	
	useEffect(() => {
		(ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
		
		setPlaceholder(true);
		
		(async () => {
			await getPlaces(search_params).then((result): void => {
				setPlaceholder(false);
				
				setPlaces(result.items);
				setFilters(result.filters);
			});
		})();
	}, [setPlaces]);
	
	// placeholder
	if (placeholder) {
		if (!places.length) {
			for (let i = 0; i < 4; i++) {
				places.push(
					{
						id         : 0,
						image      : '',
						name       : 'placeholder',
						description: '',
						is_internal: false,
						slider     : false,
					},
				);
			}
		}
		
		if (!Object.values(filters).length) {
			Object.assign(filters, {placeholders: []});
			
			// filters
			for (let i = 0; i < 6; i++) {
				filters.placeholders.push(
					{
						id  : 0,
						name: 'placeholder',
					},
				);
			}
		}
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
					<Card className={placeholder ? 'placeholder' : ''}>
						<CardMedia image={slide_1} sx={{width: '100%', height: '300px'}} />
					</Card>
					
					{
						Object.entries(filters).map((filter, index) => {
							const [key, items] = filter;
							
							return items.length ?
								(
									<Box key={index}>
										<Box sx={{
											display      : 'flex',
											gap          : theme.spacing(2),
											overflowX    : 'auto',
											paddingBottom: theme.spacing(2),
											marginBottom : theme.spacing(1),
										}}>
											{
												items.map(({id, name}, index) => {
													const search_param_key    = `filter[${key}][]`;
													const search_param_values = search_params.getAll(search_param_key);
													const active              = search_param_values ? search_param_values.includes(String(id)) : null;
													
													return <Chip
														key={index}
														label={name}
														component="a"
														icon={<CheckRounded />}
														clickable
														onClick={(event) => {
															setSearchParams(id ? {[search_param_key]: `${id}`} : '');
														}}
														variant={active ? 'filled' : 'outlined'}
														className={placeholder ? 'placeholder' : ''}
														// @ts-ignore Temp
														// color="lighter"
													/>
												})
											}
										</Box>
									</Box>
								)
								:
								null
						})
					}
					
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
						onClose={handleClose}>
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
						{
							places.map(
								({id, image, name, description}, index) => (
									<Grid xs={12} sm={6} md={4} lg={3} key={index} sx={{paddingBottom: 0}}>
										<Card
											className={placeholder ? 'placeholder' : ''}
										>
											<Link to={id ? `/exhibitions?filter[places][]=${id}` : ''}>
												{
													image ?
														<CardMedia image={image} sx={{
															width       : '100%',
															height      : 150,
															borderRadius: 4,
														}} />
														:
														<Box sx={{
															height: 150,
														}} />
												}
												
												<CardContent sx={{display: 'flex', paddingBottom: 0}}>
													<Box>
														<Typography gutterBottom
														            variant="h6"
														            component="h6"
														            color="primary.contrastText">
															{name}
														</Typography>
														{
															description ?
																<Typography gutterBottom variant="body2" color="primary.contrastText">
																	{description}
																</Typography>
																:
																null
														}
													</Box>
												</CardContent>
											</Link>
										</Card>
									</Grid>
								),
							)
						}
					</Grid>
					
					<NavigationBar
						// variant="lighter"
					/>
				</Box>
			</Box>
		</ThemeProvider>
	)
		;
}
