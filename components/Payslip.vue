<script setup lang="ts">
import moment from 'moment/min/moment-with-locales'
import {toast} from 'vue-sonner'

const {data} = useAuth()

const loglist = ref([]);
const user = ref({
  id_num: data.value.user.id_num
});

interface Payslip {
  period: string;
  data64: string;
  index?: number;
}

const header = [
  { text: '#', value: 'index' },
  { text: 'Дата', value: 'period' },
  { text: 'Расчётный листок', value: 'base64' }
];

const initialize = async () => {
  try {
    const data = await $fetch<Payslip[]>(`http://${useRuntimeConfig().public.API_BASE_URL}/api/v1/payslip/?iin=${user.value.id_num}`);
    data.forEach((item: any) => {
      let formattedDate = moment(item.period).locale('ru').format('MMMM yyyy');
      item.period = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    });
    loglist.value = data.map((item: any, index: number) => ({ ...item, index: index + 1 }));
  } catch (error) {
    console.error('Error fetching payslip data:', error);
    toast.error('Произошла ошибка при загрузке данных.');
  }
};

const convertAndDownloadPDF = (basedat: any) => {
  try {
    const binaryData = atob(basedat.data64);
    const byteNumbers = Array.from(binaryData, char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Расчётный лист за ${basedat.period}`;
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    alert('Произошла ошибка при скачивании PDF файла.');
  }
};

onMounted(() => {
  initialize();
});
</script>

<template >
  <UiTable class="border rounded-lg">
    <UiTableHeader>
      <UiTableRow>
        <UiTableHead class="w-[100px]">#</UiTableHead>
        <UiTableHead>Дата</UiTableHead>
        <UiTableHead class="text-right">Расчётный листок</UiTableHead>
      </UiTableRow>
    </UiTableHeader>
    <UiTableBody v-if="loglist.length > 0">
      <UiTableRow v-for="item in loglist" :key="item.index">
        <UiTableCell class="font-medium">{{ item.index }}</UiTableCell>
        <UiTableCell>{{ item.period }}</UiTableCell>
        <UiTableCell class="text-right">
          <a class="underline cursor-pointer" @click="convertAndDownloadPDF(item)" download="document.pdf">Скачать Расчётный Листок</a>
        </UiTableCell>
      </UiTableRow>
    </UiTableBody>
    <UiTableBody v-else>
      <UiTableRow>
        <UiTableCell :colspan="header.length" class="text-center">У Вас еще нет расчётных листков.</UiTableCell>
      </UiTableRow>
    </UiTableBody>
  </UiTable>
</template>