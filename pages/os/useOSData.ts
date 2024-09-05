import {ref} from 'vue'
import {useState} from '#app'

interface OSData {
	name: string
	inventory_num: string
	serial_num: string
	os_group: string
	mol: string
	location: string
	photo: string
}

export function useOSData() {
	const osData = useState<OSData[]>('osData', () => [])
	const loading = ref(false)
	const error = ref<string | null>(null)
	
	const fetchOSData = async (iinNum: string, forceRefresh = false) => {
		if (osData.value.length > 0 && !forceRefresh) {
			return
		}
		
		loading.value = true
		error.value = null
		
		try {
			const response = await $fetch<OSData[]>(`http://${useRuntimeConfig().public.API_NLS_URL}/HttpService/hs/Web1C/V7`, {
				params: { iin_num: iinNum }
			})
			
			osData.value = await Promise.all(
				response.map(async (item) => {
					const photoResponse = await $fetch<{
						photo: string
					}[]>(`http://${useRuntimeConfig().public.API_NLS_URL}/HttpService/hs/Web1C/V8`, {
						params: {inv_num: item.inventory_num}
					})
					return {...item, photo: photoResponse[0]?.photo || ''}
				})
			)
		} catch (err) {
			console.error('Error fetching OS data', err)
			error.value = 'Failed to fetch OS data'
		} finally {
			loading.value = false
		}
	}
	
	return {
		osData,
		loading,
		error,
		fetchOSData
	}
}