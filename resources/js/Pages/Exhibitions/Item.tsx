import * as React from 'react';
import {
    ReactElement,
    useState,
    useEffect,
    useRef,
} from 'react';
import {
    CheckRounded,
    Instagram,
    Telegram,
    WhatsApp,
} from '@mui/icons-material';
import {
    Card,
    CardContent,
    CardMedia,
    Chip,
    ThemeProvider,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {Link, useNavigate, useParams, useSearchParams} from 'react-router-dom';
import AppBar from '../../Components/AppBar';
import NavigationBar from '../../Components/NavigationBar';
import Menu from '@mui/material/Menu';
import Grid from '@mui/material/Unstable_Grid2';
import theme,
{
    M3,

} from '../../Themes/M3';
import slide_1 from '../../statics/agrofood.jpg';
import getExhibition from '../../API/Exhibition';
import ExhibitionType, {Filters} from '../../Types/Exhibition';


import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../../css/app.css';


// import required modules
import {Autoplay, Pagination, Navigation} from 'swiper/modules';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

export default function Item(): ReactElement {
    /* Location */
    const [search_params, setSearchParams] = useSearchParams();
    const {id} = useParams();

    /* States */
    const [exhibitions, setExhibitions] = useState<ExhibitionType[]>([]);
    const [filters, setFilters] = useState<Filters>({});
    const [banners, setBanners] = useState<any>([]);
    const [allData, setAllData] = useState<any>({})
    const [bottomNavVal, setBottomNavVal] = React.useState(0);

    const [placeholder, setPlaceholder] = useState(false);

    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

    // Ref
    const ref = useRef<HTMLDivElement>(null);

    const open = Boolean(anchorElement);

    const handleClose = () => {
        setAnchorElement(null);
    };

    const callApi = async () => {
        await getExhibition(Number(id), search_params).then((result): void => {
            setExhibitions(result.items);
            setAllData(result.all)
            setBanners(allData?.data.banners.items.data)
            setFilters(allData.data.filters);

        })
    }


    // useEffect(() => {
    //     (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
    //
    //     // setPlaceholder(true);
    //     callApi()
    //     // (async () => {
    //     // 	await getExhibition(Number(id), search_params).then((result): void => {
    //     // 		setPlaceholder(false);
    //     //
    //     // 		setExhibitions(result.items);
    //     //
    //     //         setBanners(result.all?.data.banners.items.data)
    //     //         setAllData(result.all)
    //     // 	});
    //     // })();
    // }, []);

    useEffect(() => {
        (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;

        // setPlaceholder(true);
        callApi()
        // (async () => {
        // 	await getExhibition(Number(id), search_params).then((result): void => {
        // 		setPlaceholder(false);
        //
        // 		setExhibitions(result.items);
        //
        //         setBanners(result.all?.data.banners.items.data)
        //         setAllData(result.all)
        // 	});
        // })();
    }, [search_params]);


    useEffect(() => {
        if (Object.keys(allData).length) {
            setFilters(allData.data.filters);
            setPlaceholder(false);
            setBanners(allData?.data.banners.items.data)
        }
    }, [allData])


    // placeholder
    if (placeholder) {
        if (!exhibitions.length) {
            for (let i = 0; i < 4; i++) {
                exhibitions.push(
                    {
                        id: 0,
                        image: '',
                        title: 'placeholder',
                        description: '',
                        presenter: null,
                        start_at: '',
                        end_at: '',
                        place: null,
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
                        id: 0,
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
                <CssBaseline/>
                <AppBar
                    //variant="lighter"
                    label="نمایشگاه‌ها"
                    back={true}
                />

                <Box component="main" sx={{
                    paddingTop: 'calc(60px + 1rem)',
                    paddingBottom: 'calc(70px + 1rem)',
                    paddingX: theme.spacing(3),
                }}>
                    {/*<Card className={placeholder ? 'placeholder' : ''}>*/}
                    {/*	<CardMedia image={slide_1} sx={{width: '100%', height: '300px'}} />*/}
                    {/*</Card>*/}

                    <Box
                        sx={{
                            width: '100%',
                            height: '350px',
                            borderRadius: '10px',
                            mb: '20px',
                            overflow: 'hidden'
                        }}
                    >
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {
                                !!banners?.length && banners?.map((banner: any) =>
                                    <SwiperSlide>
                                        <Box
                                            component={'img'}
                                            src={banner?.image}
                                            alt={banner?.title}
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                        />
                                    </SwiperSlide>
                                )
                            }
                        </Swiper>
                    </Box>


                    {
                       Object.keys(allData).length > 0 && Object.entries(filters).map((filter, index) => {
                            const [key, items] = filter;
                            return items?.data.length > 0 &&
                                (
                                    <Box key={index}>
                                        <Box sx={{
                                            display: 'flex',
                                            gap: theme.spacing(2),
                                            overflowX: 'auto',
                                            paddingBottom: theme.spacing(2),
                                            marginBottom: theme.spacing(1),
                                        }}>
                                            {
                                                items?.data.map(({id, name}, index) => {
                                                    const search_param_key = `filter[${key}][]`;
                                                    const search_param_values = search_params.getAll(search_param_key);
                                                    const active = search_param_values ? search_param_values.includes(String(id)) : null;

                                                    return <Chip
                                                        key={index}
                                                        label={name}
                                                        component="a"
                                                        icon={<CheckRounded/>}
                                                        clickable
                                                        onClick={(event) => {
                                                            setSearchParams(`${search_param_key}=${id}`);
                                                        }}
                                                        variant={active ? 'filled' : 'outlined'}
                                                        // className={placeholder ? 'placeholder' : ''}
                                                        // @ts-ignore Temp
                                                        // color="lighter"
                                                    />
                                                })
                                            }
                                        </Box>
                                    </Box>
                                )
                        })
                    }

                    <Menu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        anchorEl={anchorElement}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} disableRipple>
                            <Telegram/>
                            تلگرام
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <WhatsApp/>
                            واتساپ
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <Instagram/>
                            اینستاگرام
                        </MenuItem>
                    </Menu>

                    <Grid container spacing={3}>
                        {
                            exhibitions.map(({id, title, description, image}, index) => (
                                <Grid xs={12} sm={6} md={4} lg={3} key={index} sx={{paddingBottom: 0}}>
                                    <Card
                                        //variant="lighter"
                                        className={placeholder ? 'placeholder' : ''}
                                    >
                                        <Link to={id ? `/fair-card-list?filter[exhibitions][]=${id}` : ''}>
                                            <CardMedia image={image} sx={{
                                                width: '100%',
                                                height: 150,
                                                borderRadius: 4,
                                            }}/>
                                            <CardContent sx={{display: 'flex', paddingBottom: 0}}>
                                                <Box>
                                                    <Typography gutterBottom variant="h6" component="h6"
                                                                color="primary.contrastText">
                                                        {title}
                                                    </Typography>
                                                    <Typography gutterBottom variant="body2"
                                                                color="primary.contrastText">
                                                        {description}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Link>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>

                    <NavigationBar data={allData}/>

                </Box>
            </Box>
        </ThemeProvider>
    );
}
