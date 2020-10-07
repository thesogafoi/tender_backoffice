<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="font-16"> &#127481; &#127479; </span>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="جستجوی مشتری"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="customerDetail"
        :options.sync="options"
        :server-items-length="customerDetail"
        class="elevation-1"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emoji: '\U+1F600',
      customerDetail: [],
      totalDesserts: 0,
      search: "",
      loading: true,
      options: {},
      headers: [
        {
          text: 'کد مشتری',
          align: "start",
          sortable: false,
          value: "client_code",
        },
        { text: "نام مشتری", value: "client_name" },
        { text: "نام شرکت", value: "company_name" },
        { text: "شماره موبایل", value: "mobile" },
        { text: "تاریخ ثبت‌ نام", value: "register_date" },
        { text: "نوع کاربر", value: "user_type" },
        { text: "تلفن", value: "tel" },
        { text: "گزینه‌ها", value: "options" },
      ],
    };
  },
  created() {
    this.getCustomer()
  },
  methods: {
    getCustomer() {
      return this.$axios
        .$get("client-detail/index")
        .then((res) => {
          this.customerDetail = res;
          res.forEach(element => {
            if (element.user_type == 'NATURAL') {
              element.user_type = 'حقیقی'
            }
            if (element.user_type == 'LEGAL') {
              element.user_type = 'حقوقی'
            }
          });
        })
        .catch((errors) => {
        });
    }
  },
};
</script>