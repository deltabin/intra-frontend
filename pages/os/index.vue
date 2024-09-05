<template>
  <div class="w-full p-10">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Основные средства</h2>
      <UiButton @click="refreshData" :disabled="loading">
        <Icon name="lucide:refresh-ccw" v-if="!loading" class="mr-2 h-4 w-4"/>
        <Icon name="lucide:loader-circle" v-else
              class="mr-2 h-4 w-4 animate-spin"/>
        Обновить данные
      </UiButton>
    </div>
    <div v-if="loading" class="text-center py-4">
      Загрузка...
    </div>
    <div v-else-if="error" class="text-center py-4 text-red-500">
      {{ error }}
    </div>
    <UiTable v-else>
      <UiTableHeader>
        <UiTableRow>
          <UiTableHead class="w-[50px]"></UiTableHead>
          <UiTableHead>Основное средство</UiTableHead>
          <UiTableHead>Инвентарный номер</UiTableHead>
          <UiTableHead>Серийный номер</UiTableHead>
          <UiTableHead>Группа ОС</UiTableHead>
          <UiTableHead>МОЛ</UiTableHead>
          <UiTableHead>Местонахождение</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <template v-for="item in osData" :key="item.inventory_num">
          <UiTableRow>
            <UiTableCell>
              <UiButton variant="ghost" size="sm"
                        @click="toggleRow(item.inventory_num)">
                <Icon name="lucide:chevron-down"
                      v-if="expandedRows.includes(item.inventory_num)"
                      class="h-4 w-4"/>
                <Icon name="lucide:chevron-right" v-else class="h-4 w-4"/>
              </UiButton>
            </UiTableCell>
            <UiTableCell>{{ item.name }}</UiTableCell>
            <UiTableCell>{{ item.inventory_num }}</UiTableCell>
            <UiTableCell>{{ item.serial_num }}</UiTableCell>
            <UiTableCell>{{ item.os_group }}</UiTableCell>
            <UiTableCell>{{ item.mol }}</UiTableCell>
            <UiTableCell>{{ item.location }}</UiTableCell>
          </UiTableRow>
          <UiTableRow v-if="expandedRows.includes(item.inventory_num)">
            <UiTableCell :colspan="7">
              <div class="p-4">
                <CustomLazyImage :photo="item.photo" :name="item.name"/>
              </div>
            </UiTableCell>
          </UiTableRow>
        </template>
      </UiTableBody>
    </UiTable>
  </div>
</template>

<script setup lang="ts">
import {useOSData} from './useOSData'

const {data: userData} = useAuth()

const expandedRows = ref<string[]>([])
const {osData, loading, error, fetchOSData} = useOSData()

const toggleRow = (id: string) => {
  if (expandedRows.value.includes(id)) {
    expandedRows.value = expandedRows.value.filter(rowId => rowId !== id)
  } else {
    expandedRows.value.push(id)
  }
}

const refreshData = () => {
  fetchOSData(userData.value.user.id_num)
}

onMounted(async () => {

  await fetchOSData(userData.value.user.id_num)

})
</script>