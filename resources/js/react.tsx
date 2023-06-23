import React          from 'react';
import ReactDOM       from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
}                     from 'react-router-dom';
import Exhibition     from './Pages/Exhibition';
import ExhibitionInfo from './Pages/ExhibitionInfo';
import ExhibitionSub  from './Pages/ExhibitionSub';
import InvitationCard from './Pages/InvitationCard';
import InvitationCards from './Pages/InvitationCards';
import Map            from './Pages/Map';
import Sale from './Pages/Sale';
import SaleReply from './Pages/SaleReply';
import UnderConstruction from './Pages/UnderConstruction';
import Video from './Pages/Video';
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

const router = createBrowserRouter(
	[
		{
			path   : '/',
			element: (
				<Exhibition />
			),
		},
		{
			path   : 'invitation-cards',
			element: (
				<InvitationCards />
			),
		},
		{
			path   : 'invitation-card',
			element: (
				<InvitationCard />
			),
		},
		{
			path   : 'video',
			element: (
				<Video />
			),
		},
		{
			path   : 'sale',
			element: (
				<Sale />
			),
		},
		{
			path   : 'sale-reply',
			element: (
				<SaleReply />
			),
		},
		{
			path   : 'exhibitions',
			element: (
				<Exhibition />
			),
		},
		{
			path   : 'exhibition-subs',
			element: (
				<ExhibitionSub />
			),
		},
		{
			path   : 'exhibition-info',
			element: (
				<ExhibitionInfo />
			),
		},
		{
			path   : 'map',
			element: (
				<Map />
			),
		},
		{
			path: '*',
			element: (
				<UnderConstruction/>
			)
		}
	],
);

root.render(
	<RouterProvider router={router} />,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
