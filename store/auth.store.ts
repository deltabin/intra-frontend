import {defineStore} from 'pinia'

export interface IAuth {
	id: string,
	username: string,
	third_name: string | null,
	status: string,
	profile_image: string | null,
	phone: string | null,
	last_name: string,
	is_staff: boolean,
	id_num: string,
	full_name: string | null,
	first_name: string,
	email_corp: string | null,
	email: string
}
const defaultValue: { user: IAuth } = {
	user: {
		email: '',
		email_corp: '',
		first_name: '',
		full_name: null,
		id: '',
		id_num: '',
		is_staff: false,
		last_name: '',
		phone: '',
		profile_image: '',
		status: '',
		third_name: null,
		username: ''
	}
}

export const useAuthStore = defineStore('auth', {
	state: () => defaultValue,
	getters: {
		isAuth: state => state.user.status
	},
	actions: {
		clear(){
			this.$patch(defaultValue)
		},
		set(input: IAuth){
			this.$patch({user: input})
		}
	}
})

export const useIsLoadingStore = defineStore('isLoading', {
	state: () => ({
		isLoading: true
	}),
	actions: {
		set(data: boolean) {
			this.$patch({isLoading: data})
		}
	}
})