import * as React                from 'react';
import {
	ReactElement,
	useState,
	useEffect,
	useRef,
	MouseEvent,
}                                from 'react';
import {
	BookmarkBorderRounded,
	BookmarkRounded,
	CheckRounded,
	Instagram,
	ShareRounded,
	Telegram,
	WhatsApp,
}                                from '@mui/icons-material';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	ThemeProvider,
}                                from '@mui/material';
import Box                       from '@mui/material/Box';
import CssBaseline
                                 from '@mui/material/CssBaseline';
import IconButton                from '@mui/material/IconButton';
import Menu                      from '@mui/material/Menu';
import MenuItem                  from '@mui/material/MenuItem';
import Typography                from '@mui/material/Typography';
import {
	Link, useNavigate,
	useParams, useSearchParams,
}                                from 'react-router-dom';
import getExhibitions            from '../../API/Exhibitions';
import AppBar                    from '../../Components/AppBar';
import NavigationBar
                                 from '../../Components/NavigationBar';
import Date                      from '../../Helpers/Date';
import slide_1                   from '../../statics/agrofood.jpg';
import theme, {M3}               from '../../Themes/M3';
import ExhibitionType, {Filters} from '../../Types/Exhibition';

export default function Index(): ReactElement {
	/* Location */
	const [search_params, setSearchParams] = useSearchParams();
	
	/* States */
	const [exhibitions, setExhibitions] = useState<ExhibitionType[]>([]);
	const [filters, setFilters]         = useState<Filters>({});
	
	const [placeholder, setPlaceholder] = useState(false);
	
	const [bookmark, setBookmark]           = useState(false);
	const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
	
	// Ref
	const ref = useRef<HTMLDivElement>(null);
	
	const open = Boolean(anchorElement);
	
	const toggleMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElement(event.currentTarget);
	};
	
	const handleClose = () => {
		setAnchorElement(null);
	};
	
	useEffect(() => {
		(ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
		
		setPlaceholder(true);
		
		(async () => {
			await getExhibitions(search_params).then((result): void => {
				setPlaceholder(false);
				
				setExhibitions(result.items);
				setFilters(result.filters);
			});
		})();
	}, [setExhibitions]);
	
	// placeholder
	if (placeholder) {
		if (!exhibitions.length) {
			for (let i = 0; i < 2; i++) {
				exhibitions.push(
					{
						id         : 0,
						image      : '',
						title      : 'placeholder',
						description: '',
						presenter  : null,
						start_at   : '',
						end_at     : '',
						place      : null,
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
					
					{
						exhibitions.map(({id, title, description, image, start_at, end_at}, index) => (
							<Card
								key={index}
								className={placeholder ? 'placeholder' : ''}
								//variant="lighter"
							>
								{
									image ?
										<Link to={id ? `/exhibitions/${id}` : ''}>
											<CardMedia image={image} sx={{
												width       : '100%',
												height      : 150,
												borderRadius: 4,
											}} />
										</Link>
										:
										<Box sx={{
											height: 150,
										}} />
								}
								<CardContent sx={{display: 'flex', paddingBottom: 0}}>
									<Link to={id ? `/exhibitions/${id}` : ''}>
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
										
										'.dash': {
											display: {
												xs: 'none',
												sm: 'inline-block',
											},
										},
									}}>
										<Typography>
											تاریخ شروع: {Date.formatDate(start_at)}
										</Typography>
										<span className="dash">-</span>
										<Typography>
											تاریخ پایان: {Date.formatDate(end_at)}
										</Typography>
										<Chip label={!Date.isPast(start_at) ? Date.dateForHumans(start_at) : Date.dateForHumans(end_at)}
										      component="span"
										      clickable />
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
						))
					}
					<NavigationBar
						//variant="lighter"
					/>
				</Box>
			</Box>
		</ThemeProvider>
	);
}
