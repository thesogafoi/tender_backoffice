<template>
  <div>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="جستجوی مشتری"
          single-line
          hide-details
          class="search-text"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        class="mt-5 rtl c-table"
        disable-sort
        show-select
        :headers="headers"
        :items="customerDetail"
        :options.sync="options"
        :server-items-length="meta.total"
        :loading="loading"
        :footer-props="{
          'items-per-page-options': [5, 10, 20, 30, 40],
        }"
      >
        class="elevation-1"
        <template v-slot:item.options="{ item }">
          <div class="" style="cursor: pointer" @click="singleAdvertise(item)">
            <v-icon small color="primary" class="mr-2">mdi-pencil</v-icon>
            <deleteConfirmationDialog />
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import workingGroupsModal from "~/components/workGroupModal";
export default {
  components: {
    workingGroupsModal,
  },
  watch: {
    options: {
      handler() {
        this.getCustomer().then((data) => {
          this.desserts = data.items;
          this.totalDesserts = data.total;
        });
      },
      deep: true,
    },
  },
  data() {
    return {
      emoji: "U+1F600",
      customerDetail: [],
      meta: 0,
      search: "",
      loading: true,
      options: {},
      headers: [
        {
          text: "کد مشتری",
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
        { text: "ابزارها", value: "options" },
      ],
    };
  },
  mounted() {
    const thisClass = this;
    document
      .getElementsByClassName("search-text")[0]
      .addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
          thisClass.getCustomer(this.search);
        }
      });
  },
  created() {
    this.getCustomer();
  },
  methods: {
    singleAdvertise(item) {
      this.$router.push("customerSingle/" + item.client_code);
    },
    getCustomer(search = "") {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      return new Promise((resolve, reject) => {
        this.$axios
          .$get(
            "client-detail/index?searchTerm=" +
              this.search +
              "&page=" +
              this.options.page +
              "&items_per_page=" +
              this.options.itemsPerPage
          )
          .then((res) => {
            this.loading = false;
            this.meta = res.meta;
            res = res.data;
            this.customerDetail = res;
            res.forEach((element) => {
              if (element.user_type == "NATURAL") {
                element.user_type = "حقیقی";
              }
              if (element.user_type == "LEGAL") {
                element.user_type = "حقوقی";
              }
            });
          })
          .catch((errors) => {
            this.loading = false;
          });
      });
    },
  },
};
</script>