import * as React                      from 'react';
import {decomposeColor, useMediaQuery} from '@mui/material';
import {grey as grey_base}             from '@mui/material/colors';
import {createTheme, darken, lighten}  from '@mui/material/styles';
import {ThemeOptions}                  from '@mui/material/styles/createTheme';
import shadows                         from '@mui/material/styles/shadows';
import {ColorPartial, PaletteColor}    from '@mui/material/styles/createPalette';

// declare module
declare module '@mui/material/Paper' {
	interface PaperPropsVariantOverrides {
		lighter: true;
	}
}

declare module '@mui/material/styles' {
	interface Palette {
		lighter: Palette['primary'];
	}
	
	interface PaletteOptions {
		lighter: PaletteOptions['primary'];
	}
	
	interface PaletteColor {
		lighter?: string;
	}
	
	interface SimplePaletteColorOptions {
		lighter?: string;
	}
}

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

// Shadows
for (let i = 1; i <= 25; i++) {
	shadows[i] = `0 1px ${i * 1.75}px rgba(0, 0, 0, 0.15)`;
}

// Primary
const primary: PaletteColor = {
	//light       : '#e0f7fa',
	light       : '#c0eff5',
	main        : '#26c6da',
	dark        : '#21393c',
	contrastText: '',
};

// Grey
const grey: ColorPartial = grey_base;

Object.entries(grey).forEach(([key, value]) => {
	const parsed_primary = decomposeColor(primary.main);
	const parsed_grey    = decomposeColor(value);
	
	for (let i = 0; i < 3; i++) {
		const factor  = 1 - (parsed_grey.values[i] * 0.85) / 255;
		const primary = parsed_primary.values[i] * factor * 1.2;
		const grey    = parsed_grey.values[i] * (2.08 - factor);
		
		parsed_grey.values[i] = Math.min(Math.round(grey + primary) / 2, 255);
	}
	
	grey[key as keyof ColorPartial] = `rgb(${parsed_grey.values[0]}, ${parsed_grey.values[1]}, ${parsed_grey.values[2]})`;
});

// Set primary contrastText
primary.contrastText = darken(grey[900] as string, 0.4);

// Dark Mode
let prefers_dark_mode = false;
try {
	prefers_dark_mode = useMediaQuery('(prefers-color-scheme: dark)');
} catch (error) {
}

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
		mode      : prefers_dark_mode ? 'dark' : 'light',
		primary,
		secondary : {
			light       : '#b2ebf2',
			main        : '#b2ebf2',
			dark        : '#b2ebf2',
			contrastText: grey[900],
		},
		lighter   : {
			main        : '#666666',
			contrastText: '#666666',
		},
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
				root: {
					backgroundColor: primary.light,
				},
			},
		},
		MuiButtonBase            : {
			defaultProps  : {
				centerRipple: true,
			},
			styleOverrides: {
				root: ({theme}) => ({
					color   : primary.contrastText,
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
					style: {
						color: grey[50],
						
						'&:hover, &:hover:active': {
							backgroundColor: lighten(primary.main, 0.3),
						},
						'&:active, &:focus'      : {
							backgroundColor: primary.main,
						},
					},
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
			],
			styleOverrides: {
				root     : ({theme}) => ({
					borderRadius: theme.spacing(4),
					// padding     : theme.spacing(2, 3),
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
				root: () => ({
					backgroundColor: primary.light,
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
								backgroundColor: `${primary.main} !important`,
								//opacity        : 1,
								width: '100%',
							},
							
							'.MuiListItemIcon-root, .MuiListItemText-root': {
								color: grey[50],
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
				root   : () => ({
					fontSize            : '0.813rem',
					'& .MuiSvgIcon-root': {
						fontSize: '1.25rem',
					},
				}),
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
					background  : grey[50],
					borderWidth : 1,
					borderStyle : 'solid',
					borderColor : grey[400],
					borderRadius: 16,
					marginBottom: theme.spacing(3),
					
					'&:has(a):hover': {
						boxShadow: shadows[2],
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
					color  : grey[900],
					
					'& .MuiChip-root'      : {
						backgroundColor: darken(primary.light, 0.03),
						borderRadius   : 7,
					},
					'& .MuiButtonBase-root': {
						backgroundColor: darken(primary.light, 0.03),
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
				root: {
					borderColor: grey[700],
				},
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
					backgroundColor: primary.light,
					position       : 'fixed',
					top            : 'auto',
					right          : 0,
					bottom         : 0,
					left           : 0,
					zIndex         : 2,
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
						color: `${primary.contrastText} !important`,
						
						'&::before': {
							background: 'rgba(0, 0, 0, 0.3)',
						},
						
						'.MuiSvgIcon-root': {
							backgroundColor: primary.main,
							width          : 50,
							color          : grey[100],
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
				}),
				filled  : () => ({
					backgroundColor: primary.main,
					color          : primary.contrastText,
					borderRadius   : 20,
					
					'&:hover': {
						backgroundColor: primary.main,
					},
				}),
				outlined: () => ({
					backgroundColor: grey[50],
					borderColor    : grey[400],
					color          : grey[900],
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
					color     : primary.contrastText,
					margin    : `0 ${theme.spacing(2)} 0 -${theme.spacing(2)}`,
					fontSize  : '1.125rem',
					overflow  : 'hidden',
					transition: theme.transitions.create('width'),
				}),
			},
		},
	},
};

export const M3 = createTheme(options_m3);

// Light
const options_m3_light: ThemeOptions = {
	palette: {
		lighter   : {
			main        : '#666666',
			contrastText: '#666666',
		},
		background: {
			default: grey[50],
		},
	},
};

export const M3Lighter = createTheme(M3, options_m3_light);

export default M3;
