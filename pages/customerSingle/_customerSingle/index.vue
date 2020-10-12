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
        <button @click="changeCustomerData">save</button>
        <button @click="workGroupModal = true">مشاهده گروه های کاری</button>
        <div>
          تعداد بارهایی که گروه کاری تغییر داده شده است :
          <span v-if="customerData.work_groups_changes == null">{{ 0 }}</span>
          <span v-else>{{ customerData.work_groups_changes }}</span>
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
export default {
  components: {
    workingGroupsModal,
  },
  mounted() {
    this.getCustomerData();
  },
  methods: {
    changeCustomerData() {
      this.$axios.$post("client-detail/takeworkgroups");
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
    getCustomerData() {
      this.customerData = {};
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
      workGroupModal: false,
      work_groups_action: [],
      customerData: [],
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