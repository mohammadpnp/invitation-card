import * as React      from 'react';
import {ThemeProvider} from '@mui/material';
import Box             from '@mui/material/Box';
import CssBaseline     from '@mui/material/CssBaseline';
import AppBar          from './Components/AppBar';
import NavigationBar   from './Components/NavigationBar';
import M3              from './Themes/M3';

function refreshCompanies(): Companies[] {
	const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));
	
	return Array.from(new Array(10)).map(
		() => companyExamples[getRandomInt(companyExamples.length)],
	);
}

interface Companies {
	title: string,
	description: string,
	image: string,
	hall: number,
	booth: number,
}

const companyExamples: readonly Companies[] = [
	{
		title      : 'لبنیات میهن',
		description: 'شعار شرکت',
		image      : 'https://source.unsplash.com/random/48x48?wallpaper',
		hall       : 1,
		booth      : 1,
	},
];

export default function App() {
	const ref = React.useRef<HTMLDivElement>(null);
	
	return (
		<ThemeProvider theme={M3}>
			<Box sx={{pb: 7}} ref={ref}>
				<AppBar />
				<CssBaseline />
				<NavigationBar />
			</Box>
		</ThemeProvider>
	);
}
