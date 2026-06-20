// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Supersonic UI',
			customCss: [
				'./src/css/_main.css',
				'./src/css/_starlight.css',
				"./src/assets/fonts/inter.css",
				"./src/assets/fonts/bricolage-grotesque.css"
			],
			head: [
				{
					tag: 'script',
					attrs: {
						src: '/src/js/init.js',
						type: 'module',
						defer: false,
					},
				},
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: 'Introduction',
					items: [
						{ label: 'About', link: '/intro/about/' },
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
