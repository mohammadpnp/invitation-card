import {ReactElement, ReactNode} from 'react';
import * as React                from 'react';
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
	icon: ReactNode,
}

interface Properties {
	variant?: OverridableStringUnion<'lighter'>,
	actions?: Action[]
}

export default function NavigationBar(properties: Properties): ReactElement {
	const [value, setValue]     = React.useState(2);
	const [actions, setActions] = React.useState(
		typeof properties.actions !== 'undefined'
			?
			properties.actions
			:
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
				actions ?
					actions.map((action_properties, index) => {
						return <BottomNavigationAction key={index} {...action_properties} />
					})
					:
					null
			}
		</BottomNavigation>
	);
}
