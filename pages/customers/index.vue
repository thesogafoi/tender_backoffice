<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="font-16"> مشتریان </span>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="جستجوی مشتری"
          @keyup="getDataFromApi"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :options.sync="options"
        :server-items-length="totalDesserts"
        :loading="loading"
        class="elevation-1"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalDesserts: 0,
      search: "",
      desserts: [],
      loading: true,
      options: {},
      headers: [
        {
          text: 'کد مشتری',
          align: "start",
          sortable: false,
          value: "clientCode",
        },
        { text: "نام مشتری", value: "clientName" },
        { text: "نام شرکت", value: "companyName" },
        { text: "شماره موبایل", value: "mobileNumber" },
        { text: "تاریخ ثبت‌ نام", value: "registerDate" },
        { text: "نوع کاربر", value: "userType" },
        { text: "تلفن", value: "tel" },
        { text: "گزینه‌ها", value: "options" },
      ],
    };
  },
  methods: {},
};
</script>