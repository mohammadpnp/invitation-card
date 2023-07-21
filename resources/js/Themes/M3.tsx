import * as React          from 'react';
import {
	ColorObject,
	decomposeColor, recomposeColor,
	useMediaQuery,
}                          from '@mui/material';
import {grey as grey_base} from '@mui/material/colors';
import {
	createTheme,
	darken,
	lighten,
}                          from '@mui/material/styles';
import {ThemeOptions}      from '@mui/material/styles/createTheme';
import shadows             from '@mui/material/styles/shadows';
import {
	ColorPartial,
	PaletteColor as PaletteColorBase,
}                          from '@mui/material/styles/createPalette';

// declare module
declare module '@mui/material/Paper' {
	interface PaperPropsVariantOverrides {
		lighter: true;
	}
}

/*
 declare module '@mui/material/styles' {
 interface Palette {
 lighter: Palette['primary'];
 }
 
 interface PaletteOptions {
 lighter: PaletteOptions['primary'];
 }
 
 interface PaletteColorBase {
 lighter?: string;
 }
 
 interface SimplePaletteColorOptions {
 lighter?: string;
 }
 }
 */

// declare module
/*
 declare module '@mui/material/BottomNavigation' {
 interface BottomNavigationTypeMap<P> {
 props: P & {
 variant?: OverridableStringUnion<'lighter'>
 };
 }
 }
 */

export interface PaletteColor extends Omit<PaletteColorBase, 'contrastText'> {
}

export interface PaletteColors {
	primary: PaletteColor,
	secondary: PaletteColor,
}

// Primary
const getPrimary = (primary: PaletteColor | null = null): PaletteColor => {
	const default_primary = {
		// light : '#e0f7fa',
		light: '#c0eff5',
		main : '#26c6da',
		dark : '#21393c',
	};
	
	if (primary) {
		Object.assign(default_primary, primary);
	}
	
	return default_primary;
};

const getSecondary = (secondary: PaletteColor | null = null): PaletteColor => {
	const default_secondary = {
		light: '#b2ebf2',
		main : '#b2ebf2',
		dark : '#b2ebf2',
	};
	
	if (secondary) {
		Object.assign(default_secondary, secondary);
	}
	
	return default_secondary;
};

export const M3 = (palette?: PaletteColors) => {
	// Shadows
	for (let i = 1; i <= 25; i++) {
		shadows[i] = `0 1px ${i * 1.75}px rgba(0, 0, 0, 0.15)`;
	}
	
	const primary: PaletteColor   = getPrimary(palette ? palette.primary : null);
	const secondary: PaletteColor = getSecondary(palette ? palette.secondary : null);
	
	// Grey
	const grey: ColorPartial = {...grey_base};
	
	Object.entries(grey).forEach(([key, value]) => {
		const parsed_primary = decomposeColor(primary.main);
		const parsed_grey    = decomposeColor(value);
		
		for (let i = 0; i < 3; i++) {
			const factor      = 1 - (parsed_grey.values[i] * 0.85) / 255;
			const new_primary = parsed_primary.values[i] * factor * 1.2;
			const new_grey    = parsed_grey.values[i] * (2.08 - factor);
			
			parsed_grey.values[i] = Math.min(Math.round(new_grey + new_primary) / 2, 255);
		}
		
		grey[key as keyof ColorPartial] = `rgb(${parsed_grey.values[0]}, ${parsed_grey.values[1]}, ${parsed_grey.values[2]})`;
	});
	
	// Dark Mode
	let prefers_dark_mode = false;
	/*
	 try {
	 prefers_dark_mode = useMediaQuery('(prefers-color-scheme: dark)');
	 } catch (error) {
	 }
	 */
	
	const isDark = (color: string): boolean => decomposeColor(color).values.reduce((prev, current) => prev + current, 0) < 400;
	
	const options_m3: ThemeOptions = {
		direction : 'rtl',
		typography: {
			fontFamily: [
				'IRANSans',
				'Tahoma',
				'Arial',
			].join(','),
		},
		palette   : {
			mode     : prefers_dark_mode ? 'dark' : 'light',
			primary  : Object.assign(
				{
					contrastText: isDark(secondary.main) ? grey[50] : darken(grey[900] as string, 0.4),
				},
				primary,
			),
			secondary: Object.assign(
				{
					contrastText: isDark(secondary.main) ? grey[50] : darken(grey[900] as string, 0.4),
				},
				secondary,
			),
			/*
			 lighter   : {
			 main        : '#666666',
			 contrastText: '#666666',
			 },
			 */
			success   : {
				main: '#44b700',
			},
			background: {
				default: darken(lighten(primary[prefers_dark_mode ? 'dark' : 'light'], 0.4), 0.02),
			},
			grey,
		},
		spacing   : [0, 4, 8, 16, 32, 64, 120],
		shadows,
		components: {
			MuiPaper                 : {
				defaultProps  : {
					elevation: 0,
				},
				styleOverrides: {
					root: ({theme}) => ({
						backgroundColor: theme.palette.primary.light,
					}),
				},
			},
			MuiButtonBase            : {
				defaultProps  : {
					centerRipple: true,
				},
				styleOverrides: {
					root: ({theme}) => ({
						//color   : theme.palette.primary.contrastText,
						position: 'relative', // For M3 Ripple
					}),
				},
			},
			MuiButton                : {
				variants      : [
					{
						props: {
							variant: 'contained',
							color  : 'primary',
						},
						style: ({theme}) => ({
							color: theme.palette.grey[50],
							
							'&:hover, &:hover:active': {
								backgroundColor: lighten(theme.palette.primary.main, 0.3),
							},
							'&:active, &:focus'      : {
								backgroundColor: theme.palette.primary.main,
							},
						}),
					},
					{
						props: {
							variant: 'contained',
							color  : 'secondary',
						},
						style: {
							boxShadow: shadows[1],
						},
					},
					{
						props: {
							variant: 'text',
						},
						style: ({theme}) => ({
							padding: theme.spacing(1, 3),
						}),
					},
				],
				styleOverrides: {
					root     : ({theme}) => ({
						borderRadius: theme.spacing(4),
					}),
					startIcon: ({theme}) => ({
						marginRight: `-${theme.spacing(1)}`,
						marginLeft : theme.spacing(2),
					}),
				},
			},
			MuiAppBar                : {
				defaultProps  : {
					elevation: 0,
				},
				variants      : [
					{
						props: {
							variant: 'lighter',
						},
						style: {
							backgroundColor: grey[50],
						},
					},
				],
				styleOverrides: {
					root: ({theme}) => ({
						backgroundColor: theme.palette.primary.light,
						//boxShadow      : 'none',
					}),
				},
			},
			MuiToolbar               : {
				styleOverrides: {
					root: ({theme}) => ({
						[theme.breakpoints.up('xs')]: {
							'@media (orientation: landscape)': {
								minHeight: 64,
							},
						},
					}),
				},
			},
			MuiIconButton            : { // App Bar Menu
				styleOverrides: {
					root: {
						marginRight: 0,
					},
				},
			},
			MuiInput                 : {
				styleOverrides: {
					root: {
						borderRadius: 20,
					},
				},
			},
			MuiDrawer                : {
				styleOverrides: {
					root           : ({theme}) => ({
						'.MuiButtonBase-root': {
							'&::before': { // M3 Ripple
								content        : '""',
								backgroundColor: 'transparent',
								//opacity        : 0,
								position    : 'absolute',
								top         : 0,
								right       : '50%',
								transform   : 'translateX(50%)',
								width       : 45,
								height      : 45,
								transition  : theme.transitions.create(['background', 'color', 'width', 'opacity']),
								borderRadius: theme.spacing(5),
								zIndex      : 1,
							},
							
							'&:active, &:focus': {
								'&::before': {
									backgroundColor: `${theme.palette.primary.main} !important`,
									//opacity        : 1,
									width: '100%',
								},
								
								'.MuiListItemIcon-root, .MuiListItemText-root': {
									color: theme.palette.grey[50],
								},
							},
						},
					}),
					paper          : ({theme}) => ({
						width       : 300,
						paddingLeft : theme.spacing(2),
						paddingRight: theme.spacing(2),
					}),
					paperAnchorLeft: {
						left : 'auto !important',
						right: '0 !important',
					},
				},
			},
			MuiMenu                  : {
				defaultProps: {
					elevation: 3,
				},
			},
			MuiMenuItem              : {
				styleOverrides: {
					root   : {
						fontSize            : '0.813rem',
						'& .MuiSvgIcon-root': {
							fontSize: '1.25rem',
						},
					},
					gutters: ({theme}) => ({
						gap: theme.spacing(2),
					}),
				},
			},
			MuiSvgIcon               : {
				styleOverrides: {
					root: {
						zIndex: 2, // For M3 Ripple
					},
				},
			},
			MuiCard                  : {
				defaultProps  : {},
				variants      : [
					{
						props: {
							variant: 'lighter',
						},
						style: {
							backgroundColor: grey[300],
							boxShadow      : shadows[3],
						},
					},
				],
				styleOverrides: {
					root: ({theme}) => ({
						backgroundColor: theme.palette.grey[50],
						borderWidth    : 1,
						borderStyle    : 'solid',
						borderColor    : theme.palette.grey[400],
						borderRadius   : 16,
						marginBottom   : theme.spacing(3),
						
						'&:has(a):hover': {
							boxShadow: shadows[2],
						},
						
						'&.placeholder': {
							background: `linear-gradient(45deg, ${theme.palette.grey[300]}, ${theme.palette.grey[400]}, ${theme.palette.grey[300]})`,
						},
					}),
				},
			},
			MuiCardMedia             : {
				styleOverrides: {
					root: {
						borderRadius: 8,
					},
				},
			},
			MuiCardContent           : {
				styleOverrides: {
					root: {
						'& .muiChip': {
							borderRadius: 12,
						},
					},
				},
			},
			MuiCardActions           : {
				defaultProps  : {
					disableSpacing: true,
				},
				styleOverrides: {
					root: ({theme}) => ({
						margin : 0,
						padding: theme.spacing(3),
						color  : theme.palette.grey[900],
						
						'& .MuiChip-root'      : {
							backgroundColor: darken(theme.palette.primary.light, 0.03),
							color          : theme.palette.primary.contrastText,
							borderRadius   : 7,
						},
						'& .MuiButtonBase-root': {
							backgroundColor: darken(theme.palette.primary.light, 0.03),
						},
					}),
				},
			},
			MuiList                  : {
				styleOverrides: {
					root: ({theme}) => ({
						width: '100%',
					}),
				},
			},
			MuiListItemButton        : {
				styleOverrides: {
					root: ({theme}) => ({
						borderRadius: theme.spacing(5),
					}),
				},
			},
			MuiListItemText          : {
				styleOverrides: {
					root: {
						textAlign: 'right',
						zIndex   : 2, // For M3 Ripple
						
						'& .MuiTypography-root': {
							fontSize: '0.875rem',
						},
					},
				},
			},
			MuiListItemIcon          : {
				styleOverrides: {
					root: {
						zIndex  : 2, // For M3 Ripple
						minWidth: 32,
					},
				},
			},
			MuiDivider               : {
				styleOverrides: {
					root: ({theme}) => ({
						borderColor: theme.palette.grey[700],
					}),
				},
			},
			MuiAvatar                : {
				styleOverrides: {
					rounded: {
						borderRadius: 8,
					},
				},
			},
			MuiBottomNavigation      : {
				defaultProps  : {
					showLabels: true,
				},
				variants      : [
					{
						props: {
							// @ts-ignore Temp
							variant: 'lighter',
						},
						style: {
							backgroundColor: grey[50],
						},
					},
				],
				styleOverrides: {
					root: ({theme}) => ({
						backgroundColor: theme.palette.primary.light,
						position       : 'fixed',
						top            : 'auto',
						right          : 0,
						bottom         : 0,
						left           : 0,
						zIndex         : 20,
						height         : 'auto',
						minHeight      : 70,
						alignItems     : 'baseline',
						
						[theme.breakpoints.down('sm')]: {
							overflowX     : 'auto',
							justifyContent: 'start',
						},
					}),
				},
			},
			MuiBottomNavigationAction: {
				defaultProps  : {
					disableRipple: true,
				},
				styleOverrides: {
					root : ({theme}) => ({
						padding : theme.spacing(2, 0),
						position: 'relative',
						
						'&:hover': {
							'&::before': {
								background: 'rgba(0, 0, 0, 0.1)',
							},
						},
						
						'&:active': {
							'&::before': {
								background: 'rgba(0, 0, 0, 0.3) !important',
							},
						},
						
						'&.Mui-selected': {
							color: `${theme.palette.primary.contrastText} !important`,
							
							'&::before': {
								background: 'rgba(0, 0, 0, 0.4)',
							},
							
							'.MuiSvgIcon-root': {
								backgroundColor: darken(theme.palette.primary.main, 0.1),
								width          : 50,
								color          : theme.palette.grey[100],
								transition     : theme.transitions.create(
									['background', 'color', 'width', 'padding'],
									{
										delay: 100,
									},
								),
								
								[theme.breakpoints.up('sm')]: {
									width: 65,
								},
							},
						},
						
						'&::before': {
							content        : '""',
							backgroundColor: 'transparent',
							transition     : theme.transitions.create(['background', 'width', 'padding']),
							width          : 50,
							height         : 30,
							padding        : theme.spacing(0),
							borderRadius   : 16,
							position       : 'absolute',
							top            : theme.spacing(2), // Parent's Padding Top
							right          : '50%',
							transform      : 'translate(50%)',
							
							[theme.breakpoints.up('sm')]: {
								width       : 65 - 1, // Fix protrusion
								height      : 34,
								borderRadius: 18,
							},
						},
						
						'.MuiSvgIcon-root': {
							backgroundColor: 'transparent',
							transition     : theme.transitions.create(
								['all'],
								{
									delay: 0,
								},
							),
							display        : 'block',
							width          : 32,
							height         : 30,
							padding        : theme.spacing(1, 0),
							borderRadius   : 16,
							
							'&::before': {
								backgroundColor: 'transparent',
								zIndex         : 1,
							},
							
							[theme.breakpoints.up('sm')]: {
								width       : 36,
								height      : 34,
								borderRadius: 18,
							},
						},
					}),
					label: ({theme}) => ({
						marginTop: theme.spacing(1),
						fontSize : '0.75rem !important',
					}),
				},
			},
			MuiChip                  : {
				variants      : [
					{
						props: {
							variant: 'outlined',
							// @ts-ignore Temp
							color: 'lighter',
						},
						style: {
							backgroundColor: grey[300],
						},
					},
				],
				styleOverrides: {
					root    : ({theme}) => ({
						transition: theme.transitions.create(['background', 'borderRadius']),
						
						'&.placeholder': {
							background: `linear-gradient(45deg, ${theme.palette.grey[300]}, ${theme.palette.grey[400]}, ${theme.palette.grey[300]})`,
						},
					}),
					filled  : ({theme}) => ({
						backgroundColor: theme.palette.primary.main,
						color          : theme.palette.grey[50],
						borderRadius   : 20,
						
						'&:hover': {
							backgroundColor: theme.palette.primary.main,
							color          : theme.palette.grey[50],
						},
					}),
					outlined: ({theme}) => ({
						backgroundColor: theme.palette.grey[50],
						borderColor    : theme.palette.grey[400],
						color          : theme.palette.grey[900],
						borderRadius   : 12,
						
						'.MuiSvgIcon-root': {
							width : 0,
							margin: 0,
						},
					}),
					label   : ({theme}) => ({
						padding: theme.spacing(0, 3),
					}),
					icon    : ({theme}) => ({
						color     : theme.palette.grey[50],
						margin    : `0 ${theme.spacing(2)} 0 -${theme.spacing(2)}`,
						fontSize  : '1.125rem',
						overflow  : 'hidden',
						transition: theme.transitions.create('width'),
					}),
				},
			},
		},
	};
	
	return createTheme(options_m3);
};

export const M3Lighter = (palette: PaletteColors) => {
	const options = M3(palette);
	
	// Light
	const options_m3_light: ThemeOptions = {
		palette: {
			/*
			 lighter   : {
			 main        : '#666666',
			 contrastText: '#666666',
			 },
			 */
			background: {
				default: options.palette.grey[50],
			},
		},
	};
	
	return createTheme(options, options_m3_light);
};

// Palette From Image
interface RGBs {
	[key: string]: ColorObject['values']
}

export function getPaletteFromImage(image_element: HTMLImageElement): PaletteColors {
	const block_size: number = 5; // only visit every 5 pixels
	
	const default_rgbs: PaletteColors = {
		primary  : getPrimary(),
		secondary: getSecondary(),
	}; // for non-supporting envs
	
	const canvas: HTMLCanvasElement                = document.createElement('canvas');
	const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
	
	const counts: { [key: keyof RGBs]: number } = {};
	
	if (!context) {
		return default_rgbs;
	}
	
	let image_data;
	
	try {
		image_element.setAttribute('crossOrigin', '');
		
		canvas.width  = image_element.naturalWidth || image_element.offsetWidth || image_element.width;
		canvas.height = image_element.naturalHeight || image_element.offsetHeight || image_element.height || 1;
		
		context.drawImage(image_element, 0, 0);
		
		image_data = context.getImageData(0, 0, canvas.width, canvas.height);
	} catch (error) {
		console.error(error);
		
		/* security error, img on diff domain */
		return default_rgbs;
	}
	
	const rgbs: RGBs = {};
	
	let i = -4;
	
	while ((i += block_size * 4) < image_data.data.length) {
		const red: number   = image_data.data[i];
		const green: number = image_data.data[i + 1];
		const blue: number  = image_data.data[i + 2];
		
		const average: number = 100;
		
		const key = `${Math.floor(red / average)}+${Math.floor(green / average)}+${Math.floor(blue / average)}`;
		
		if (!rgbs[key]) {
			// Set default
			rgbs[key] = [
				0,
				0,
				0,
			];
		}
		
		rgbs[key] = [
			rgbs[key][0] + red,
			rgbs[key][1] + green,
			rgbs[key][2] + blue,
		];
		
		counts[key] = counts[key] ? counts[key] + 1 : 1;
	}
	
	// ~~ used to floor values
	for (const [key, rgb] of Object.entries(rgbs)) {
		rgb[0] = Math.floor(rgb[0] / counts[key]);
		rgb[1] = Math.floor(rgb[1] / counts[key]);
		rgb[2] = Math.floor(rgb[2] / counts[key]);
	}
	
	const rgbs_entries = Object.entries(rgbs).sort(([prev_key, prev_value], [next_key, next_value]) => {
		if (counts[prev_key] > counts[next_key]) {
			return -1;
		}
		
		if (counts[prev_key] < counts[next_key]) {
			return 1;
		}
		
		return 0;
	});
	
	let image_primary: ColorObject = decomposeColor(getPrimary().main);
	
	for (const [key, rgb] of rgbs_entries) {
		image_primary.values = rgb;
		
		if (eval(key)) { // skip dark
			break;
		}
	}
	
	// secondary
	const image_palettes: { [key: string]: ColorObject['values'][] } = {};
	rgbs_entries.pop();
	
	for (const [rgb_key, rgb] of rgbs_entries) {
		let key = 'secondary';
		
		if (
			rgb[0] <= image_primary.values[0] + 50 && rgb[1] <= image_primary.values[1] + 50 && rgb[2] <= image_primary.values[2] + 50 ||
			rgb[0] >= image_primary.values[0] - 50 && rgb[1] >= image_primary.values[1] - 50 && rgb[2] >= image_primary.values[2] - 50
		) {
			key = 'similar';
		}
		
		grey:
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					if (rgb[i] > rgb[j] + 25 || rgb[i] < rgb[j] - 25) {
						break grey;
					}
				}
				
				key = 'grey';
			}
		
		if (rgb[0] < 50 && rgb[1] < 50 && rgb[2] < 50) {
			key = 'dark';
		}
		
		if (rgb[0] > 200 && rgb[1] > 200 && rgb[2] > 200) {
			key = 'light';
		}
		
		if (!image_palettes[key]) {
			image_palettes[key] = [rgb];
		} else {
			image_palettes[key].push(rgb);
		}
	}
	
	let image_secondary: ColorObject = decomposeColor(getPrimary().main);
	
	if (image_palettes.secondary && image_palettes.secondary.length) {
		image_secondary.values = image_palettes.secondary[0];
	} else if (image_palettes.dark && image_palettes.dark.length) {
		image_secondary.values = image_palettes.dark[0];
		image_secondary        = decomposeColor(lighten(recomposeColor(image_secondary), 0.1));
	} else if (image_palettes.light && image_palettes.light.length) {
		image_secondary.values = image_palettes.light[0];
		image_secondary        = decomposeColor(darken(recomposeColor(image_secondary), 0.01));
	} else if (image_palettes.grey && image_palettes.grey.length) {
		image_secondary.values = image_palettes.grey[0];
		image_secondary        = decomposeColor(darken(recomposeColor(image_secondary), 0.01));
	} else if (image_palettes.similar && image_palettes.similar.length) {
		image_secondary.values = image_palettes.similar[0];
		
		image_secondary = decomposeColor(lighten(darken(recomposeColor(image_secondary), 0.1), 0.1));
	}
	
	return {
		primary  : {
			light: lighten(recomposeColor(image_primary), 0.1),
			main : recomposeColor(image_primary),
			dark : darken(recomposeColor(image_primary), 0.1),
		},
		secondary: {
			light: lighten(recomposeColor(image_secondary), 0.1),
			main : recomposeColor(image_secondary),
			dark : darken(recomposeColor(image_secondary), 0.1),
		},
	};
}

export default M3();
