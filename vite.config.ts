// import path           from 'path';
import {defineConfig} from 'vite';
import laravel        from 'laravel-vite-plugin';
import react          from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(
	{
		//root: this.options.rootDirPath,
		base   : './',
		server : {
			port: 3000,
		},
		plugins: [
			laravel(
				{
					input  : [
						'resources/js/react.tsx',
						//'resources/js/app.js',
						'resources/sass/react.scss',
					],
					refresh: true,
					//publicDirectory: '../public',
				},
			),
			react(),
		],
		esbuild: {
			minifySyntax     : true,
			minifyIdentifiers: true,
		},
		build  : {
			minify       : 'terser',
			terserOptions: {
				compress: {
					defaults    : false,
					drop_console: true,
				},
				mangle  : {
					eval      : true,
					module    : true,
					toplevel  : true,
					safari10  : true,
					properties: false,
				},
				format  : {
					comments: false,
				},
			},
			emptyOutDir  : true,
		},
	},
);
