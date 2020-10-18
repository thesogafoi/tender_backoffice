<template>
  <div>
    <workingGroupsModal
      v-if="workGroupModal"
      :modal="workGroupModal"
      @close_modal="workGroupModal = false"
      :props_selected.sync="customerData.work_groups"
      @add_selected="childSeleted"
      type="action"
      :subscription_count="customerData.subscription_count"
    />
    <v-card class="c-pa-15 c-mb-20">
      <div class="row w-100 align-center">
        <div class="w-25 c-px-15 c-py-5">
          <div class="font-14">کد مشتری : {{ customerData.client_code }}</div>
        </div>
        <div class="w-25 c-px-15 c-py-5">
          <div class="font-14">نام : {{ customerData.client_name }}</div>
        </div>
        <div class="w-25 c-px-15 c-py-5">
          <div class="font-14">نام شرکت : {{ customerData.company_name }}</div>
        </div>
        <div class="w-25 c-px-15 c-py-5">
          <div class="font-14">موبایل : {{ customerData.mobile }}</div>
        </div>
        <div class="w-25 c-px-15 c-py-5">
          <div class="font-14">
            تاریخ ثبت نام : {{ customerData.register_date }}
          </div>
        </div>
        <div class="w-25 c-px-15 c-py-5">
          <div class="font-14">
            نوع کاربر :
            <span v-if="customerData.user_type == 'NATURAL'">حقیقی</span>
            <span v-if="customerData.user_type == 'LEGAL'">حقوقی</span>
            <span v-if="customerData.user_type == 'COMPANY'">شرکتی</span>
          </div>
        </div>
        <div class="w-25 c-px-15 c-py-5">
          <div class="font-14">تلفن : {{ customerData.tel }}</div>
        </div>

        <div class="w-25 c-px-15 c-py-5">
          <v-select
            v-model="customerData.status"
            :items="statusList"
            item-value="id"
            item-text="value"
            label="وضعیت کاربر"
          ></v-select>
        </div>

        <div
          class="w-75 d-flex flex-wrap c-px-15 font-14"
          v-if="customerData.has_plne"
        >
          <div>
            تعداد بارهایی که گروه کاری تغییر داده شده است :
            <span v-if="customerData.work_groups_changes == null">{{ 0 }}</span>
            <span v-else>{{ customerData.work_groups_changes }}</span>
          </div>
          <div>
            تعداد گروه های کاری قابل انتخاب :
            <span v-if="customerData.subscription_count == null">{{ 0 }}</span>
            <span v-else>{{
              customerData.subscription_count - customerData.work_groups.length
            }}</span>
          </div>
          <div>
            نام طرح اشتراکی :
            <span> {{ customerData.subscription_title }}</span>
          </div>
        </div>

        <div class="w-25 c-px-15 c-py-5 d-flex align-center justify-end">
          <v-btn
            v-if="customerData.has_plne"
            color="info"
            dark
            @click="workGroupModal = true"
            class="c-ml-10"
            >مشاهده گروه های کاری</v-btn
          >
          <v-btn color="success" dark @click="updateClientDatas"
            >ذخیره اطلاعات</v-btn
          >
        </div>
      </div>
    </v-card>
    <v-card>
      <v-card-title>
        <span class="font-16"> پلن ها </span>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :single-select="false"
        :options.sync="planeOptions"
        :headers="planesHeader"
        :items="clientPlanes"
        :server-items-length="planeMeta.total"
        :loading="planeLoader"
        disable-sort
        class="elevation-1"
      >
        <template v-slot:item.isExpire="{ item }">
          <span v-if="item.isExpire == 1">
            فعال
            <v-icon small class="mr-1" color="success">mdi-check</v-icon>
          </span>
          <span v-if="item.isExpire == 0">
            منقضی شده
            <v-icon small class="mr-1" color="red darken-4">mdi-close</v-icon>
          </span>
        </template>
      </v-data-table>
    </v-card>
    <v-card class="c-mt-20">
      <v-card-title>
        <span class="font-16"> پرداخت ها </span>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        disable-sort
        :headers="paymentsHeader"
        :items="paymentItems"
        :options.sync="options"
        :server-items-length="totalDesserts"
        :loading="loading"
        class="elevation-1"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import workingGroupsModal from "~/components/workGroupModal";
import deleteConfirmationDialog from "~/components/general/deleteConfirmationDialog";
export default {
  components: {
    workingGroupsModal,
    deleteConfirmationDialog,
  },
  mounted() {
    this.getCustomerData();
    this.getPlanes();
  },
  watch: {
    planeOptions: {
      handler() {
        this.getPlanes().then((data) => {
          console.log(data);
          this.desserts = data.items;
          this.totalDesserts = data.total;
        });
      },
      deep: true,
    },
  },
  methods: {
    getPlanes() {
      this.planeLoader = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.planeOptions;

      return new Promise((resolve, reject) => {
        this.$axios
          .$get(
            "client-detail/planes/" +
              this.$route.params.customerSingle +
              "?page=" +
              this.planeOptions.page +
              "&items_per_page=" +
              this.planeOptions.itemsPerPage
          )
          .then((res) => {
            this.clientPlanes = res.data;
            this.planeMeta = res;
            this.planeLoader = false;
          })
          .catch((e) => {
            this.planeLoader = false;
          });
      });
    },
    childSeleted(e) {
      this.customerData.work_groups = [];
      this.workGroupsTitle = [];
      if (e != undefined) {
        e.forEach((element) => {
          this.customerData.work_groups.push(element);
        });
      }
    },
    resetCustomerData() {
      this.customerData = {
        client_code: "",
        client_name: "",
        company_name: "",
        mobile: "",
        register_date: "",
        status: "",
        tel: "",
        user_type: "",
        work_groups: [],
      };
    },
    updateClientDatas() {
      this.$nuxt.$loading.start();
      this.$axios
        .$put(
          "client-detail/update/" + this.customerData.client_code,
          this.customerData
        )
        .then((response) => {
          this.showSnackbar("تغییرات با موفقیت انجام شد", "green");
          this.$nuxt.$loading.finish();
          this.getCustomerData();
        })
        .catch((error) => {
          if (error.response.status == 403) {
            this.showSnackbar(error.response.data.message, "red");
          }
          this.$nuxt.$loading.finish();
        });
    },
    getCustomerData() {
      this.resetCustomerData();
      this.$nuxt.$loading.start();
      this.$axios
        .$get("client-detail/show/" + this.$route.params.customerSingle)
        .then((res) => {
          Object.assign(this.customerData, res);
          this.$nuxt.$loading.finish();
        })
        .catch((e) => {
          this.$nuxt.$loading.finish();
        });
    },
  },
  data() {
    return {
      planeMeta: {},
      planeOptions: {},
      planeLoader: true,
      clientPlanes: [],
      statusList: [
        {
          id: "0",
          value: "غیر فعال",
        },
        {
          id: "1",
          value: "فعال",
        },
      ],

      workGroupModal: false,
      work_groups_action: [],
      customerData: {
        client_code: "",
        client_name: "",
        company_name: "",
        mobile: "",
        register_date: "",
        status: "",
        tel: "",
        user_type: "",
        work_groups: [],
      },
      loading: false,
      paymentsHeader: [
        {
          text: "مبلغ",
          value: "amount",
        },
        {
          text: "تاریخ پرداخت",
          value: "paymentDate",
        },
        {
          text: "شماره پیگیری",
          value: "token",
        },
        {
          text: "پذیرنده",
          value: "acceptor",
        },
        {
          text: "وضعیت  پرداخت",
          value: "status",
        },
        {
          text: "نام پلن خریداری شده",
          value: "planName",
        },
      ],
      planesHeader: [
        {
          text: "نام پلن",
          value: "plane_title",
        },
        {
          text: "تاریخ فعال‌سازی",
          value: "plane_submited",
        },
        {
          text: "تاریخ انقضا",
          value: "plane_expired",
        },
        {
          text: "ارزش پلن",
          value: "plane_cost",
        },
        {
          text: "وضعیت طرح اشتراکی",
          value: "isExpire",
          align: "center",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>