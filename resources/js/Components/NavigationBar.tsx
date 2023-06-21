import * as React               from 'react';
import {OverridableStringUnion} from '@mui/types';
import {
	ChecklistRtlRounded,
	HelpOutlineRounded,
	NewspaperRounded,
	RedeemRounded,
	TrackChangesRounded,
	VolunteerActivismRounded,
}                               from '@mui/icons-material';
import BottomNavigation         from '@mui/material/BottomNavigation';
import BottomNavigationAction   from '@mui/material/BottomNavigationAction';

interface Action {
	label: string,
	icon: Element,
}

interface Properties {
	variant?: OverridableStringUnion<'lighter'>,
	actions?: Action[]
}

export default function NavigationBar(properties: Properties) {
	const [value, setValue] = React.useState(2);
	const [actions, setActions] = React.useState(
		[
			{
				label: 'راهنمای آنلاین',
				icon : <HelpOutlineRounded />,
			},
			{
				label: 'اخبار ویژه',
				icon : <NewspaperRounded />,
			},
			{
				label: 'نیازمندی‌ها و استعلام',
				icon : <VolunteerActivismRounded />,
			},
			{
				label: 'درخواست از شما، پیگیری از ما',
				icon : <ChecklistRtlRounded />,
			},
			{
				label: 'قرعه‌کشی شرکت‌ها',
				icon : <TrackChangesRounded />,
			},
			{
				label: 'مسابقات جایزه‌دار',
				icon : <RedeemRounded />,
			},
		],
	);
	
	return (
		// @ts-ignore Temp
		<BottomNavigation
			variant={properties.variant}
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
			}}
		>
			{
				actions.map((properties, index) => {
					return <BottomNavigationAction key={index} {...properties} />
				})
			}
		</BottomNavigation>
	);
}