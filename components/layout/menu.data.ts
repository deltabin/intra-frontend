export interface IMenuItem {
	name: string,
	url: string,
	icon: string
}

export const MENU_DATA: IMenuItem[] = [
	{
		icon: 'line-md:home',
		name: 'Главная',
		url: '/'
	},
	{
		icon: 'line-md:computer',
		name: 'Список ОС',
		url: '/os'
	},
	{
		icon: 'line-md:cloud-outline-loop',
		name: 'Склад',
		url: '/warehouse'
	},
	{
		icon: 'line-md:map-marker',
		name: 'Отпуск',
		url: '/vacation'
	}
]