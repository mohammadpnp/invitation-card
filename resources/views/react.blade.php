<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<link rel="icon" href="{{ asset('favicon.ico') }}" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#26c6da" />
	<!--<meta
	  name="description"
	  content="Expo Start"
	/>-->
	<link rel="apple-touch-icon" href="{{ asset('logo192.png') }}" />
	<link rel="manifest" href="{{ asset('manifest.json') }}" />
	<title>Expo Start</title>
	
	@viteReactRefresh
	@vite(['resources/js/react.tsx', 'resources/sass/react.scss'])
</head>
<body>
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>
</body>
</html>
