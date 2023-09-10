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
import Box from "@mui/material/Box";

interface Action {
	label: string,
	icon: ReactNode,
}

interface Properties {
	variant?: OverridableStringUnion<'lighter'>,
	actions?: Action[]
}

export default function NavigationBar({data}: any): ReactElement {

	const [value, setValue]     = React.useState(0);
	// const [actions, setActions] = React.useState(
	// 	typeof properties.actions !== 'undefined'
	// 		?
	// 		properties.actions
	// 		:
	// 		[
	// 			{
	// 				label: 'راهنمای آنلاین',
	// 				icon : <HelpOutlineRounded />,
	// 			},
	// 			{
	// 				label: 'اخبار ویژه',
	// 				icon : <NewspaperRounded />,
	// 			},
	// 			{
	// 				label: 'نیازمندی‌ها و استعلام',
	// 				icon : <VolunteerActivismRounded />,
	// 			},
	// 			{
	// 				label: 'درخواست از شما، پیگیری از ما',
	// 				icon : <ChecklistRtlRounded />,
	// 			},
	// 			{
	// 				label: 'قرعه‌کشی شرکت‌ها',
	// 				icon : <TrackChangesRounded />,
	// 			},
	// 			{
	// 				label: 'مسابقات جایزه‌دار',
	// 				icon : <RedeemRounded />,
	// 			},
	// 		],
	// );

	return (

    <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
            setValue(newValue);
        }}
    >
        {
            !!Object.keys(data).length && data?.data.menus.items.data?.map((menu: any, index: number) =>
                <BottomNavigationAction key={index} label={ menu.title}
                                        icon={
                                            <Box
                                                component={'img'}
                                                src={menu.icon}
                                                alt={'icon'}
                                                sx={{
                                                    mt: '6px',
                                                    width: '20px',
                                                    height: '20px',
                                                }}
                                            />}
                                        sx={{
                                            '.MuiBottomNavigationAction-label': {
                                                mt: '15px'
                                            },
                                        }}
                />
            )
        }

    </BottomNavigation>
	);
}
