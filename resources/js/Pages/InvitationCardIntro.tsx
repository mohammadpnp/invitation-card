import CssBaseline                         from '@mui/material/CssBaseline';
import {keyframes, styled}                 from '@mui/material/styles';
import Typography                          from '@mui/material/Typography';
import Grid                                from '@mui/material/Unstable_Grid2';
import {SxProps}                           from '@mui/system';
import {ReactElement, useEffect, useState} from 'react';
import * as React                          from 'react';
import {
	ThemeProvider,
}                                          from '@mui/material';
import Box                                 from '@mui/material/Box';
import {Link, useNavigate}                 from 'react-router-dom';
import theme, {
	PaletteColors,
	getPaletteFromImage,
	M3,
}                                          from '../Themes/M3';

import bosch from '../statics/bosch.png';
import kaleh from '../statics/kaleh.png';
import mihan from '../statics/mihan.png';

// Demo's random logo
const logo = [bosch, kaleh, mihan][Math.floor(Math.random() * 3)];

import intro_1 from '../statics/intro_1.jpg';
import intro_2 from '../statics/intro_2.jpg';
import intro_3 from '../statics/intro_3.jpg';
import intro_4 from '../statics/intro_4.jpg';

// keyframes
const getTrapeziumAnimation = ({innerWidth, innerHeight}) => keyframes`
  0%, 100% {
    border-top: 0 solid transparent;
    border-right-width: ${innerWidth}px;
    border-right-style: solid;
    border-bottom: 0 solid transparent;
  }
  25%, 75% {
    //border-top-width: 0;
    //border-right-width: 0;
    border-bottom-width: 0;
    bottom: 50%;
  }
  100% {
    //border-top-width: 0;
    //border-right-width: 0;
    border-bottom-width: ${innerHeight * 0.9}px;
    bottom: 5%;
  }
`;

//
const logo_fade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Trapezium = styled(Box)(({theme}) => ({
	borderRightColor: theme.palette.grey[900],
	position        : 'fixed',
	bottom          : '100%',
	right           : '0',
	width           : '100%',
	height          : '100%',
}));

const LogoWrapper = styled(Box)(() => ({
	position : 'fixed',
	minWidth : '20%',
	maxWidth : '30%',
	bottom   : '10%',
	left     : '10%',
	opacity  : 0,
	animation: `0.5s ${logo_fade} 0.75s linear forwards`,
}));

const Logo = styled('img')(() => ({
	width: '100%',
}));

//
const images_fade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

interface Template {
	images_wrapper: SxProps,
	item: SxProps,
	items: SxProps[],
	image: SxProps,
	images: SxProps[],
};

interface Templates {
	[key: string]: Template
}

// Images
const templates: Templates = {
	default   : {
		images_wrapper: {
			position : 'absolute',
			opacity  : 0,
			top      : '15%',
			right    : '25%',
			width    : '50%',
			height   : '50%',
			animation: `0.5s ${images_fade} 1s linear forwards`,
		},
		item          : {
			position: 'absolute',
			overflow: 'hidden',
			top     : 0,
			right   : 0,
		},
		items         : [
			// Top
			{
				transform: 'translate(0, 0)',
			},
			// Right
			{
				transform: 'translate(50%, 50%)',
			},
			// Bottom
			{
				transform: 'translate(-50%, 50%)',
			},
			// Left
			{
				transform: 'translate(0, 100%)',
			},
		],
		image         : {
			position: 'absolute',
		},
		images        : [
			{},
			{},
			{},
			{},
		],
	},
	rectangle : {
		images_wrapper: {},
		item          : {
			width     : 'max(50vw, 70vh)',
			height    : '50vh',
			display   : 'flex',
			alignItems: 'center',
		},
		items         : [
			{
				transform: 'translate(40%, -10%)',
			},
		],
		image         : {
			width : '100%',
			height: 'auto',
		},
		images        : [
			{},
		],
	},
	rectangles: {
		images_wrapper: {},
		item          : {
			width     : 'max(20vw, 35vh)',
			height    : '25vh',
			display   : 'flex',
			alignItems: 'center',
		},
		items         : [
			// Top
			{
				transform: 'translate(-70%, -20%)',
			},
			// Right
			{
				transform: 'translate(50%, -10%)',
			},
			// Bottom
			{
				transform: 'translate(-60%, 100%)',
			},
			// Left
			{
				transform: 'translate(60%, 110%)',
			},
		],
		image         : {
			width : '100%',
			height: 'auto',
		},
		images        : [
			{},
			{},
			{},
			{},
		],
	},
	circle    : {
		images_wrapper: {},
		item          : {
			width       : 'max(28vw, 60vh)',
			height      : 'max(28vw, 60vh)',
			borderRadius: '50%',
		},
		items         : [
			{
				transform: 'translate(0, 0) scale(1.3)',
			},
		],
		image         : {
			width : '100%',
			height: '100%',
		},
		images        : [
			{},
		],
	},
	circles   : {
		images_wrapper: {},
		item          : {
			width       : 'max(14vw, 30vh)',
			height      : 'max(14vw, 30vh)',
			borderRadius: '50%',
		},
		items         : [
			// Top
			{
				transform: 'translate(0, 0) scale(1.3)',
			},
			// Right
			{
				transform: 'translate(80%, 90%)',
			},
			// Left
			{
				transform: 'translate(-80%, 90%)',
			},
			// Bottom
			{
				transform: 'translate(0, 150%) scale(0.9)',
			},
		],
		image         : {
			width : '100%',
			height: '100%',
		},
		images        : [
			{},
			{},
			{},
			{},
		],
	},
	diamond   : {
		images_wrapper: {},
		item          : {
			width : '500px',
			height: '500px',
			
			[theme.breakpoints.up('sm')]: {
				width : '600px',
				height: '600px',
			},
		},
		items         : [
			{
				transform: 'translate(25%, -10%) rotate(45deg) scale(0.7)',
			},
		],
		image         : {
			width    : '100%',
			height   : '100%',
			maxWidth : '100%',
			transform: 'rotate(-45deg) scale(1.42)',
		},
		images        : [
			{},
		],
	},
	diamonds  : {
		images_wrapper: {},
		item          : {
			width : '250px',
			height: '250px',
			
			[theme.breakpoints.up('sm')]: {
				width : '300px',
				height: '300px',
			},
		},
		items         : [
			{
				transform: 'translate(25%, -10%) rotate(45deg) scale(0.7)',
			},
			{
				transform: 'translate(75%, 40%) rotate(45deg) scale(0.7)',
			},
			{
				transform: 'translate(-25%, 40%) rotate(45deg) scale(0.7)',
			},
			{
				transform: 'translate(25%, 90%) rotate(45deg) scale(0.7)',
			},
		],
		image         : {
			width   : '100%',
			height  : '100%',
			maxWidth: '100%',
		},
		images        : [
			{
				transform: 'rotate(-45deg) scale(1.42)',
			},
			{
				transform: 'rotate(-45deg) scale(1.42)',
			},
			{
				transform: 'rotate(-45deg) scale(1.42)',
			},
			{
				transform: 'rotate(-45deg) scale(1.42)',
			},
		],
	},
	triangles : {
		images_wrapper: {},
		item          : {
			width   : '250px',
			height  : '250px',
			clipPath: 'url("#triangle")',
		},
		items         : [
			// Top
			{
				transform: 'translate(0, 0) rotate(270deg)',
			},
			// Right
			{
				transform: 'translate(50%, 50%) rotate(0deg)',
			},
			// Bottom
			{
				transform: 'translate(-50%, 50%) rotate(180deg)',
			},
			// Left
			{
				transform: 'translate(0, 100%) rotate(90deg)',
			},
		],
		image         : {
			width   : '100%',
			height  : '100%',
			maxWidth: '100%',
		},
		images        : [
			{
				transform: 'rotate(-270deg)',
			},
			{
				transform: 'rotate(0deg)',
			},
			{
				transform: 'rotate(180deg)',
			},
			{
				transform: 'rotate(-90deg)',
			},
		],
	},
};

// Demo random template
const keys: (keyof Templates)[] = Object.keys(templates);

const template: keyof Templates = keys[Math.ceil(Math.random() * keys.length)]; // ceil for skip first (default)

function getSxProperties(key: string): SxProps {
	const keys: string[] = key.split('.');
	
	let templates_default: SxProps | SxProps[]  = templates.default[keys[0] as keyof Template];
	let templates_template: SxProps | SxProps[] = templates[template][keys[0] as keyof Template];
	
	if (keys.length > 1) {
		templates_default  = templates_default[keys[1] as number];
		templates_template = templates_template[keys[1] as number];
	}
	
	return Object.assign(templates_default, templates_template) as SxProps;
}

// @ts-ignore
const ImagesWrapper = styled(Box)(() => getSxProperties('images_wrapper'));

const Item = styled(Box)(() => getSxProperties('item'));

const Image = styled('img')(() => getSxProperties('image'));

export default function InvitationCardIntro(): ReactElement {
	const [invitation_cards, setInvitationCards] = useState(() => []);
	const [invitation_card, setInvitationCard]   = useState(0);
	const [palette, setPalette]                  = useState<PaletteColors>();
	const [dimensions, setDimensions]            = useState(
		{
			innerWidth : window.innerWidth,
			innerHeight: window.innerHeight,
		},
	)
	
	useEffect(() => {
		let timeout: NodeJS.Timeout;
		
		window.addEventListener(
			'resize',
			function () {
				clearTimeout(timeout);
				
				timeout = setTimeout(() => {
					setDimensions(
						{
							innerWidth : window.innerWidth,
							innerHeight: window.innerHeight,
						},
					);
				}, 100);
			},
		);
	});
	
	
	const ref = React.useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		(ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
		
	}, [invitation_card, setInvitationCards]);
	
	// navigate
	const navigate = useNavigate();
	
	// Demo data
	const description: string = 'invented for Life';
	
	const direction: 'ltr' | 'rtl' = 'ltr';
	
	const images: string[] = [
		intro_1,
		intro_2,
		intro_3,
		intro_4,
	];
	
	return (
		<ThemeProvider theme={M3(palette)}>
			<Grid ref={ref}>
				<CssBaseline />
				<Trapezium sx={{
					animation: `1s ${getTrapeziumAnimation(dimensions)} linear forwards`,
				}} />
				
				{
					template === 'triangles'
						?
						<svg height="0" width="0" className="svg-clip">
							<defs>
								<clipPath id="triangle" clipPathUnits="objectBoundingBox">
									<path d="M1,.21 Q1,0 .81,.09L.187,.4 Q0,.5 .187,.59L.81,.90 Q1,1 1,.79Z" />
								</clipPath>
							</defs>
						</svg>
						:
						null
				}
				
				<ImagesWrapper>
					{
						images.map(
							(image, key) => (
								typeof templates[template].items[key] !== 'undefined' ?
									<Item key={key} sx={getSxProperties(`items.${key}`)}>
										<Image
											src={image}
											alt=""
											sx={getSxProperties(`images.${key}`)}
										/>
									</Item>
									:
									null
							),
						)
					}
				</ImagesWrapper>
				
				<LogoWrapper sx={{
					textAlign: direction === 'ltr' ? 'right' : 'left',
				}}>
					<Link to="/invitation-card" state={{palette}}>
						<Logo
							src={logo}
							alt=""
							onLoad={(event) => {
								const logo_palette = getPaletteFromImage(event.currentTarget);
								
								setPalette(logo_palette);
							}} />
					</Link>
					
					<Typography fontWeight={500} sx={{
						fontSize: {
							xs: 12,
							sm: 24,
							md: 37,
							lg: 49,
						},
					}}>{description}</Typography>
				</LogoWrapper>
			</Grid>
		</ThemeProvider>
	);
}
