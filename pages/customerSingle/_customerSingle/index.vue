<template>
  <div>
    <workingGroupsModal
      v-if="workGroupModal"
      :modal="workGroupModal"
      @close_modal="workGroupModal = false"
      :props_selected.sync="customerData['work_groups']"
      @add_selected="childSeleted"
      type="action"
    />
    <v-card>
      <div>کد مشتری : {{ customerData.client_code }}</div>

      <div>نام : {{ customerData.client_name }}</div>

      <div>نام شرکت : {{ customerData.company_name }}</div>

      <div>موبایل : {{ customerData.mobile }}</div>

      <div>تاریخ ثبت نام : {{ customerData.register_date }}</div>

      <div>نوع کاربر : {{ customerData.user_type }}</div>

      <div>تلفن : {{ customerData.tel }}</div>
      <div>
        <button @click="workGroupModal = true">مشاهده گروه های کاری</button>
        <div class="w-15 c-px-10">
          <v-select
            v-model="customerData.status"
            :items="statusList"
            item-value="id"
            item-text="value"
            label="وضعیت کاربر"
          ></v-select>
        </div>
        <div>
          تعداد بارهایی که گروه کاری تغییر داده شده است :
          <span v-if="customerData.work_groups_changes == null">{{ 0 }}</span>
          <span v-else>{{ customerData.work_groups_changes }}</span>
          <button @click="updateClientDatas">save</button>
        </div>
      </div>
    </v-card>
    <v-card>
      <v-card-title>
        <span class="font-16"> پلن ها </span>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="plansHeader"
        :server-items-length="totalDesserts"
        :items="planItems"
        :loading="loading"
        disable-sort
        class="elevation-1"
      ></v-data-table>
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
  },
  methods: {
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
          this.$nuxt.$loading.finish();
        })
        .catch((error) => {
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
      plansHeader: [
        {
          text: "نام پلن",
          value: "planName",
        },
        {
          text: "تاریخ فعال‌سازی",
          value: "activaionDate",
        },
        {
          text: "تاریخ انقضا",
          value: "expiryDate",
        },
        {
          text: "ارزش پلن",
          value: "planValue",
        },
        {
          text: "تعداد تغییرات باقی‌مانده",
          value: "changesLeft",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>