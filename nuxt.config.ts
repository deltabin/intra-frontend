// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: false },
	modules: [
		'@nuxt/image',
		'@nuxt/icon',
		'@nuxtjs/color-mode',
		'@nuxtjs/tailwindcss',
		'shadcn-nuxt',
		['@nuxtjs/google-fonts', { families: { Inter: true } }],
		'@pinia/nuxt',
		'@sidebase/nuxt-auth',
	],
	shadcn: {
		prefix: 'Ui',
		componentDir: './components/ui',
	},
	colorMode: {
		classSuffix: '',
	},
	pinia: {
		storesDirs: ['./store/**'],
	},
	auth: {
		globalAppMiddleware: {
			isEnabled: true,
		},
		baseURL: `${process.env.API_BASE_URL}/api/`,

		provider: {
			type: 'local',
			endpoints: {
				signIn: { path: 'token/', method: 'post' },
				signOut: { path: 'v1/user_logout/', method: 'post' },
				signUp: false,
				getSession: { path: 'v1/user/', method: 'get' },
			},
			pages: {
				login: '/login',
			},
			token: {
				maxAgeInSeconds: 60 * 60 * 24,
				signInResponseTokenPointer: '/access',
			},
			refresh: {
				isEnabled: true,
				refreshOnlyToken: false,
				endpoint: {
					path: 'token/refresh/',
					method: 'post',
				},
				token: {
					signInResponseRefreshTokenPointer: '/refresh',
					refreshRequestTokenPointer: '/refresh',
				},
			},
		},
		session: {
			enableRefreshPeriodically: 1000 * 60 * 60, // Refetch user session data every 1h
			enableRefreshOnWindowFocus: false,
		},
	},
})
