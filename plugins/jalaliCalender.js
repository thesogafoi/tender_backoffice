import Vue from 'vue'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
Vue.use(VuePersianDatetimePicker, {
  name: 'custom-date-picker',
  props: {
    inputFormat: 'YYYY-MM-DD',
    format: 'jYYYY-jMM-jDD',
    editable: false,
    altFormat: 'YYYY-MM-DD',
    autoSubmit: false,
  }
});
