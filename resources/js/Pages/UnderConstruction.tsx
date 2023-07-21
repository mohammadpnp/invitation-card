import * as React    from 'react';
import {
	ReactElement,
}                    from 'react';
import {
	ThemeProvider,
}                    from '@mui/material';
import Box           from '@mui/material/Box';
import CssBaseline   from '@mui/material/CssBaseline';
import AppBar        from '../Components/AppBar';
import NavigationBar from '../Components/NavigationBar';
import theme         from '../Themes/M3';

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
