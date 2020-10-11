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
        :headers="headers"
        :items="customerDetail"
        :options.sync="options"
        :server-items-length="customerDetail"
        class="elevation-1"
        :loading="loading"
      >
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
  data() {
    return {
      emoji: "U+1F600",
      customerDetail: [],
      totalDesserts: 0,
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
      console.log(item);
      this.$router.push("customerSingle/" + item.client_code);
    },
    getCustomer(search = "") {
      this.loading = true;
      this.$axios
        .$get("client-detail/index?searchTerm=" + this.search)
        .then((res) => {
          this.loading = false;
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
    },
  },
};
</script>