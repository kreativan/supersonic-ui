// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';

const isDev = process.env.NODE_ENV !== 'production';

const headScripts = [
	{
		tag: 'script',
		attrs: {
			src: isDev ? '/src/js/init.js' : '/js/supersonic.umd.js',
			type: 'module',
			defer: false,
		},
	}
];

if (!isDev) {
	headScripts.push({
		tag: 'script',
		attrs: {
			src: '/init.js',
			type: 'module',
			defer: false,
		},
	});
}

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Supersonic UI',
			favicon: '/favicon.png',
			logo: {
				light: './src/assets/supersonic-logo-color.png',
				dark: './src/assets/supersonic-logo-color-light.png',
				replacesTitle: true,
			},
			customCss: [
				'./src/css/_main.css',
				'./src/css/_starlight.css',
				"./src/assets/fonts/inter.css",
				"./src/assets/fonts/bricolage-grotesque.css"
			],
			head: headScripts,
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/kreativan/supersonic-ui' }],
			sidebar: [
				{
					label: 'Introduction',
					items: [
						{ label: 'About', link: '/intro/about/' },
						{ label: 'How To Use', link: '/intro/how-to/' },
						{ label: 'Playground', link: '/playground/', attrs: { target: '_blank' } },
					]
				},
				{
					"label": "Components",
					items: [{ autogenerate: { directory: 'components' } }],
				}, {
					"label": "Features",
					items: [{ autogenerate: { directory: 'features' } }],
				},
				{
					label: 'Integrations',
					items: [{ autogenerate: { directory: 'integrations' } }],
				},
				{
					label: 'Utility',
					items: [{ autogenerate: { directory: 'utility' } }],
				}
			],
		}),
	],
	vite: {
		plugins: [tailwindcss()]
	}
});
