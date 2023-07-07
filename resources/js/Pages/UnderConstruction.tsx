import {AxiosResponse}    from 'axios';
import {ReactElement}     from 'react';
import * as React         from 'react';
import {
	BookmarkBorderRounded,
	CardGiftcardRounded, CheckRounded, Image,
	MoreHorizRounded,
	ShareRounded,
	StarRounded,
}                         from '@mui/icons-material';
import {
	Badge as BadgeBase,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	ThemeProvider,
}                         from '@mui/material';
import IconButton         from '@mui/material/IconButton';
import MenuItem           from '@mui/material/MenuItem';
import {styled}           from '@mui/material/styles';
import Typography         from '@mui/material/Typography';
import Box                from '@mui/material/Box';
import CssBaseline        from '@mui/material/CssBaseline';
import {Link}             from 'react-router-dom';
import AppBar             from '../Components/AppBar';
import NavigationBar      from '../Components/NavigationBar';
import Menu               from '@mui/material/Menu';
import Helper             from '../Helpers/Helper';
import theme              from '../Themes/M3';
import map                from '../statics/map.jpg';
import InvitationCardType from '../Types/InvitationCard';

export default function UnderConstruction(): ReactElement {
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{
				display      : 'flex',
				flexDirection: 'column',
			}}>
				<CssBaseline />
				<Box component="main" sx={{
					display: 'flex',
					padding: theme.spacing('calc(60px + 1rem)', 3),
				}}>
					<AppBar back={true} />
					<Box sx={{
						position : 'absolute',
						top      : '50%',
						right    : '50%',
						transform: 'translate(50%)',
					}}>
						خطای ۴۰۴ - صفحه در دست ساخت
					</Box>
					<NavigationBar />
				</Box>
			</Box>
		</ThemeProvider>
	);
}
