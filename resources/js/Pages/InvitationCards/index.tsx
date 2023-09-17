import * as React from 'react';
import {
    ReactElement,
    useState,
    useEffect,
    useRef,
    MouseEvent,
} from 'react';
import {
    BookmarkBorderRounded,
    CardGiftcardRounded,
    CheckRounded,
    MoreHorizRounded,
    ShareRounded,
    StarRounded,
} from '@mui/icons-material';
import {
    Badge as BadgeBase,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    ThemeProvider,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {
    Link, useNavigate,
    useParams,
    useSearchParams,
} from 'react-router-dom';
import getInvitationCards from '../../API/InvitationCards';
import AppBar from '../../Components/AppBar';
import NavigationBar from '../../Components/NavigationBar';
import Menu from '@mui/material/Menu';
import theme, {getPaletteFromImage, M3, PaletteColors} from '../../Themes/M3';
import slide_1 from '../../statics/agrofood.jpg';
import {Filters} from '../../Types/Place';
import InvitationCard from '../../Types/InvitationCard';
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
import getFairCardList from "../../API/FairCardList";

// Badge
const Badge = styled(BadgeBase)(({theme}) => ({
    '& .MuiBadge-badge': {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.success.main,
        boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
        width: 12,
        height: 12,
        borderRadius: 12,
        top: 0,
        left: 0,
    },
}));

export default function InvitationCards(): ReactElement {
    /* Location */
    const [search_params, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    /* States */
    const [invitation_cards, setInvitationCards] = useState<InvitationCard[]>([]);
    const [filters, setFilters] = useState<Filters>({});
    const [banners, setBanners] = useState<any>([]);
    const [allData, setAllData] = useState<any>({})

    const [bottomNavVal, setBottomNavVal] = React.useState(0);

    const [placeholder, setPlaceholder] = useState(false);

    const [anchor_element, setAnchorElement] = useState<null | HTMLElement>(null);

    // Ref
    const ref = useRef<HTMLDivElement>(null);

    const open = Boolean(anchor_element);

    const logo_palettes: { [key: number]: PaletteColors } = {};

    invitation_cards.forEach(({id, logo}) => {
        const image = new Image();

        image.onload = () => {
            logo_palettes[id] = getPaletteFromImage(image);
        };

        image.src = logo;
    });

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
            await getFairCardList(search_params).then((result): void => {
                setPlaceholder(false);

                setInvitationCards(result.all?.data.cards.data);
                setFilters(result.all?.data.filters);
                setBanners(result.all?.data.banners.items.data)
                setAllData(result.all)
            });
        })();
    }, [search_params, setInvitationCards]);

    useEffect(() => {
        (async () => {
            await getFairCardList(search_params).then((result): void => {
                setPlaceholder(false);

                setInvitationCards(result.all?.data.cards.data);
                setFilters(result.all?.data.filters);
                setBanners(result.all?.data.banners.items.data)
                setAllData(result.all)
            });
        })();
    }, [])


    const star_colors = [
        '#cc8833',
        '#aaaaaa',
        '#eebb33',
    ];

    // placeholder
    if (placeholder) {
        if (!invitation_cards.length) {
            for (let i = 0; i < 2; i++) {
                invitation_cards.push(
                    {
                        id: 0,
                        logo: '',
                        title: 'placeholder',
                        slogan: '',
                        pictures: [],
                        hall: 0,
                        booth: 0,
                        template_type: 1,
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
        <ThemeProvider theme={M3()}>
            <Box sx={{display: 'flex', flexDirection: 'column'}} ref={ref}>
                <CssBaseline/>
                <AppBar label="دعوتنامه‌ها" back={true}/>
                <Box component="main" sx={{
                    padding: theme.spacing('calc(60px + 1rem)', 3),
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
                                            src={banner.image}
                                            alt={banner.title}
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
                        Object.entries(filters).map((filter:any, index) => {
                            const [key, items] = filter;

                            return items?.data?.length ?
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
                                                items?.data?.map(({id, name}: any, index: number) => {
                                                    const search_param_key = `filter[${key}][]`;
                                                    const search_param_values = search_params.getAll(search_param_key);
                                                    const active = search_param_values ? search_param_values.includes(String(id)) : null;

                                                    return <Chip
                                                        key={index}
                                                        label={name}
                                                        component="a"
                                                        icon={<CheckRounded/>}
                                                        clickable
                                                        onClick={(event:any) => {
                                                            search_params.set(search_param_key, String(id));

                                                            setSearchParams(search_params);
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
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        anchorEl={anchor_element}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} disableRipple>
                            <BookmarkBorderRounded/>
                            نشانه گذاری
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <ShareRounded/>
                            اشتراک‌ گذاری
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <CardGiftcardRounded/>
                            شانس جایزه
                        </MenuItem>
                    </Menu>
                    {
                        invitation_cards.map(({id, title, slogan, logo, hall, booth}, index) => (
                            <Card
                                key={index}
                                className={placeholder ? 'placeholder' : ''}
                            >
                                <CardContent sx={{display: 'flex', paddingBottom: 0}}>
                                    <Box>
                                        <Link to={id ? `/fair-card-list/${id}/intro` : ''} onClick={(event) => {
                                            event.preventDefault();

                                            if (id) {
                                                navigate(
                                                    String(event.currentTarget.getAttribute('href')),
                                                    {
                                                        state: {
                                                            palette: logo_palettes[id]
                                                        }
                                                    }
                                                );
                                            }
                                        }}>
                                            <Typography gutterBottom variant="h6" component="h6"
                                                        color="primary.contrastText">
                                                {title}
                                            </Typography>
                                            <Typography variant="body2" color="primary.contrastText">
                                                {slogan}
                                            </Typography>
                                        </Link>
                                    </Box>
                                    <Box sx={{marginRight: 'auto'}}>
                                        <Badge
                                            overlap="circular"
                                            anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                                            variant="dot"
                                        >
                                            <Link to={id ? `/fair-card-list/${id}/intro` : ''} onClick={(event) => {
                                                event.preventDefault();

                                                if (id) {
                                                    navigate(
                                                        String(event.currentTarget.getAttribute('href')),
                                                        {
                                                            state: {
                                                                palette: logo_palettes[id]
                                                            }
                                                        }
                                                    );
                                                }
                                            }}>
                                                {
                                                    logo ?
                                                        <CardMedia
                                                            image={logo}
                                                            sx={{width: 76, height: 76}}/>
                                                        :
                                                        null
                                                }
                                            </Link>
                                        </Badge>
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <Box sx={{display: 'flex', gap: theme.spacing(2), margin: 0}}>
                                        <Chip label={`گروه لبنیات`} component="a" clickable/><Chip
                                        label={`سالن ${hall} - غرفه ${booth}`}
                                        component="a"
                                        clickable/>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        gap: theme.spacing(2),
                                        margin: theme.spacing(0, 'auto', 0, 0)
                                    }}>
                                        {
                                            Array(index % 3 + 1).fill('').map(
                                                (item, i) => (
                                                    <IconButton
                                                        size="small"
                                                        edge="end"
                                                        aria-controls={undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={undefined}
                                                        aria-label="account of current user"
                                                        color="inherit"
                                                        sx={{
                                                            color: star_colors[index % 3],
                                                        }}
                                                        key={i}
                                                    >
                                                        <StarRounded/>
                                                    </IconButton>
                                                ),
                                            )
                                        }

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
                                            <MoreHorizRounded/>
                                        </IconButton>
                                    </Box>
                                </CardActions>
                            </Card>
                        ))
                    }
                    <NavigationBar data={allData}/>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
