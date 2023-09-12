import React                from 'react';
import ReactDOM             from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
}                           from 'react-router-dom';
import Places               from './Pages/Places';
import Exhibitions          from './Pages/Exhibitions';
import ExhibitionItem       from './Pages/Exhibitions/Item';
//import Calendars            from './Pages/Exhibitions/Calendars';
//import Internationals       from './Pages/Exhibitions/Internationals';
import InvitationCards      from './Pages/InvitationCards';
import InvitationCardItem   from './Pages/InvitationCards/Item';
import InvitationCardsIntro from './Pages/InvitationCards/Intro';
import InvitationCardsReply from './Pages/InvitationCards/Reply';
import InvitationCardsMap   from './Pages/InvitationCards/Map';
import SaleItem             from './Pages/Sales/Item';
import SaleReply            from './Pages/Sales/Reply';
import UnderConstruction    from './Pages/UnderConstruction';
import Video                from './Pages/InvitationCards/Video';
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

const router = createBrowserRouter(
	[
		{
			path   : '/',
			element: (
				<Places />
			),
		},
		/*
		 {
		 path   : 'places',
		 element: (
		 <Places />
		 ),
		 },
		 */
		{
			path   : 'exhibitions',
			element: (
				<Exhibitions />
			),
		},
		{
			path   : 'exhibitions/:id',
			element: (
				<ExhibitionItem />
			),
		},
		/*
		 {
		 path   : 'exhibitions/:id/calendars',
		 element: (
		 <Calendars />
		 ),
		 },
		 {
		 path   : 'exhibitions/:id/internationals',
		 element: (
		 <Internationals />
		 ),
		 },
		 */
		{
			path   : 'fair-card-list',
			element: (
				<InvitationCards />
			),
		},
		{
			path   : 'fair-card-list/:id/intro',
			element: (
				<InvitationCardsIntro />
			),
		},
		{
			path   : 'fair-card-list/:id',
			element: (
				<InvitationCardItem />
			),
		},
		{
			path   : 'fair-card-list/:id/reply',
			element: (
				<InvitationCardsReply />
			),
		},
		{
			path   : 'fair-card-list/:id/map',
			element: (
				<InvitationCardsMap />
			),
		},
		{
			path   : 'video',
			element: (
				<Video />
			),
		},
		{
			path   : 'sales/:id',
			element: (
				<SaleItem />
			),
		},
		{
			path   : 'sales/:id/reply',
			element: (
				<SaleReply />
			),
		},
		{
			path   : '*',
			element: (
				<UnderConstruction />
			),
		},
	],
);

root.render(
	<RouterProvider router={router} />,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
