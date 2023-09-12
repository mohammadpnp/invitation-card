import * as React                         from 'react';
import {
	ReactElement,
	useEffect,
	useState,
	useRef,
}                                         from 'react';
import CssBaseline                        from '@mui/material/CssBaseline';
import {
	keyframes,
	styled,
}                                         from '@mui/material/styles';
import Typography                         from '@mui/material/Typography';
import Grid                               from '@mui/material/Unstable_Grid2';
import {
	Chip,
	CSSInterpolation, SxProps,
	ThemeProvider,
}                                         from '@mui/material';
import Box                                             from '@mui/material/Box';
import {Link, useLocation, useParams, useSearchParams} from 'react-router-dom';
import Helper                                          from '../../Helpers/Helper';
import theme, {
	PaletteColors,
	getPaletteFromImage,
	M3,
}                                         from '../../Themes/M3';
import getInvitationCard                  from '../../API/InvitationCard';
import InvitationCard                     from '../../Types/InvitationCard';
import invitation_card_icon               from '../../statics/invitation-card-icon.png';

// keyframes
const getTrapeziumAnimation = ({innerWidth, innerHeight}: typeof window) => keyframes`
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
const fade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Trapezium = styled(Box)(
	({theme}) => ({
		borderRightColor: theme.palette.grey[900],
		position        : 'fixed',
		bottom          : '100%',
		right           : '0',
		width           : '100%',
		height          : '100%',
	}),
);

const LogoWrapper = styled(Box)(
	{
		position : 'fixed',
		minWidth : '20%',
		maxWidth : '30%',
		bottom   : '10%',
		left     : '10%',
		opacity  : 0,
		animation: `0.5s ${fade} 0.75s linear forwards`,
	},
);

const Logo = styled('img')(
	{
		width: '100%',
	},
);

const IconWrapper = styled(Box)(
	({theme}) => ({
		position     : 'fixed',
		minWidth     : '10%',
		maxWidth     : '20%',
		bottom       : '10%',
		right        : '10%',
		opacity      : 0,
		animation    : `0.5s ${fade} 0.75s linear forwards`,
		display      : 'flex',
		flexDirection: 'column',
		gap          : theme.spacing(3),
	}),
);

const Icon = styled('img')(
	{
		maxWidth: '100%',
	},
);

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
	images_wrapper: CSSInterpolation,
	images_inner: CSSInterpolation,
	item: CSSInterpolation,
	items: CSSInterpolation[],
	image: CSSInterpolation,
	images: CSSInterpolation[],
}

interface Templates {
	[key: string]: Template
}

// Images
const templates: Templates = {
	default   : {
		images_wrapper: {
			position : 'absolute',
			opacity  : 0,
			top      : 0,
			right    : 0,
			width    : '100%',
			height   : '100%',
			overflow : 'hidden',
			animation: `0.5s ${images_fade} 1s linear forwards`,
		},
		images_inner  : {
			position: 'absolute',
			top     : '5%',
			right   : '25%',
			width   : '50%',
			maxWidth: '100%',
			height  : '50%',
		},
		item          : {
			position : 'absolute',
			overflow : 'hidden',
			top      : '50%',
			right    : '50%',
			transform: 'translate(50%, 50%)',
		},
		items         : [
			// Top
			{
				transform: 'translate(50%, -50%)',
			},
			// Right
			{
				transform: 'translate(50%, 50%)',
			},
			// Bottom
			{
				transform: 'translate(50%, 50%)',
			},
			// Left
			{
				transform: 'translate(50%, 100%)',
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
		images_inner  : {},
		item          : {
			width     : 'max(50vw, 70vh)',
			height    : '50vh',
			display   : 'flex',
			alignItems: 'center',
		},
		items         : [
			{
				transform: 'translate(50%, -50%)',
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
		images_inner  : {},
		item          : {
			width     : 'max(20vw, 35vh)',
			height    : '25vh',
			display   : 'flex',
			alignItems: 'center',
		},
		items         : [
			// Top Right
			{
				transform: 'translate(120%, -65%)',
			},
			// Top Left
			{
				transform: 'translate(15%, -90%)',
			},
			// Bottom Right
			{
				transform: 'translate(115%, 40%)',
			},
			// Bottom Left
			{
				transform: 'translate(10%, 15%)',
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
		images_inner  : {},
		item          : {
			width       : 'max(28vw, 60vh)',
			height      : 'max(28vw, 60vh)',
			borderRadius: '50%',
		},
		items         : [
			{
				transform: 'translate(50%, -35%) scale(1.3)',
				right    : '40%',
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
		images_inner  : {},
		item          : {
			width       : 'max(14vw, 30vh)',
			height      : 'max(14vw, 30vh)',
			borderRadius: '50%',
		},
		items         : [
			// Top
			{
				transform: 'translate(50%, -75%) scale(1.3)',
			},
			// Right
			{
				transform: 'translate(130%, 25%)',
			},
			// Bottom
			{
				transform: 'translate(50%, 90%) scale(0.9)',
			},
			// Left
			{
				transform: 'translate(-30%, 25%)',
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
		images_inner  : {},
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
				transform: 'translate(50%, -40%) rotate(45deg) scale(0.7)',
				right    : '30%',
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
		images_inner  : {},
		item          : {
			width : '250px',
			height: '250px',

			[theme.breakpoints.up('sm')]: {
				width : '300px',
				height: '300px',
			},
		},
		items         : [
			// Top
			{
				transform: 'translate(60%, -60%) rotate(45deg) scale(0.75)',
			},
			// Right
			{
				transform: 'translate(120%, -10%) rotate(45deg) scale(0.7)',
			},
			// Bottom
			{
				transform: 'translate(80%, 50%) rotate(45deg) scale(0.6)',
			},
			// Left
			{
				transform: 'translate(20%, 10%) rotate(45deg) scale(0.7)',
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
		images_inner  : {},
		item          : {
			width   : '250px',
			height  : '250px',
			clipPath: 'url("#triangle")',
		},
		items         : [
			// Top
			{
				transform: 'translate(60%, -70%) rotate(270deg)',
			},
			// Right
			{
				transform: 'translate(110%, -20%) rotate(0deg)',
			},
			// Bottom
			{
				transform: 'translate(60%, 30%) rotate(90deg)',
			},
			// Left
			{
				transform: 'translate(10%, -20%) rotate(180deg)',
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

const template_types = {
	1: 'rectangle',
	2: 'rectangles',
	3: 'circle',
	4: 'circles',
	5: 'diamond',
	6: 'diamonds',
	7: 'triangles',
};

function getSxProperties(template: string, key: string): CSSInterpolation {
	const keys: string[] = key.split('.');

	let templates_default: CSSInterpolation | CSSInterpolation[]  = templates.default[keys[0] as keyof Template];
	let templates_template: CSSInterpolation | CSSInterpolation[] = templates[template][keys[0] as keyof Template];

	if (Array.isArray(templates_default) && Array.isArray(templates_template)) {
		templates_default  = templates_default[Number(keys[1])] as CSSInterpolation;
		templates_template = templates_template[Number(keys[1])] as CSSInterpolation;
	}

	return Object.assign(templates_default as object, templates_template as object) as CSSInterpolation;
}

export default function Intro(): ReactElement {
	/* Location */
	const location              = useLocation();
	const {id} = useParams();
	const [search_params, setSearchParams] = useSearchParams();

	/* States */
	const [invitation_card, setInvitationCard] = useState<InvitationCard>(
		{
			id           : 0,
			logo         : '',
			pictures     : [],
			title        : '',
			slogan       : '',
			hall         : 0,
			booth        : 0,
			template_type: 1,
		},
	);

	const [placeholder, setPlaceholder] = useState(false);

	const [palette, setPalette] = useState<PaletteColors>(location.state?.palette);

	const [dimensions, setDimensions] = useState(window)

	const {
		      logo,
		      pictures,
		      title,
		      slogan,
		      template_type,
	      } = invitation_card;

	const template: keyof Templates = template_types[template_type]; // ceil for skip first (default)

	const ImagesWrapper = styled(Box)(getSxProperties(template, 'images_wrapper'));
	const ImagesInner   = styled(Box)(getSxProperties(template, 'images_inner'));

	const Item = styled(Box)(getSxProperties(template, 'item'));

	const Image = styled('img')(getSxProperties(template, 'image'));

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		(ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;

		setPlaceholder(true);

		(async () => {
			await getInvitationCard(Number(id), search_params).then((result): void => {
				setInvitationCard(result.item);
			});
		})();
	}, [search_params]);

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		window.addEventListener(
			'resize',
			function () {
				clearTimeout(timeout);

				timeout = setTimeout(() => {
					setDimensions(window);
				}, 100);
			},
		);
	});

	// Demo data
	const direction: 'ltr' | 'rtl' = Helper.isRtl(title) ? 'rtl' : 'ltr';

	// @ts-ignore
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
					<ImagesInner>
						{
							pictures.map(
								(picture, index) => (
									typeof templates[template].items[index] !== 'undefined' ?
										<Item key={index} sx={getSxProperties(template, `items.${index}`) as SxProps}>
											<Image
												src={picture.source}
												alt=""
												sx={getSxProperties(template, `images.${index}`) as SxProps}
											/>
										</Item>
										:
										null
								),
							)
						}
					</ImagesInner>
				</ImagesWrapper>

				<LogoWrapper sx={{
					textAlign: direction === 'ltr' ? 'right' : 'left',
				}}>
					<Link to={`/fair-card-list/${id}`} state={{palette}}>
						<Logo
							src={logo}
							alt=""
							onLoad={(event) => {
								if (palette) {
									return;
								}

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
					}}>{slogan}</Typography>
				</LogoWrapper>

				<IconWrapper component={Link}
					// @ts-ignore: attribute defined in Link component
					         to={`/fair-card-list/${id}`}
					         state={{palette}}>
					<Icon src={invitation_card_icon} alt="" />
					<Chip label="کارت دعوت شما" />
				</IconWrapper>
			</Grid>
		</ThemeProvider>
	);
}
