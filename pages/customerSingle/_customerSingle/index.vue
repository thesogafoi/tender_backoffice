<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="font-16"> پلن ها </span>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="plansHeader"
        :items="planItems"
        :server-items-length="totalDesserts"
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
export default {
  data() {
    return {
      paymentsHeader: [
        {
          text: 'مبلغ', value: 'amount'
        },
        {
          text: 'تاریخ پرداخت', value: 'paymentDate'
        },
        {
          text: 'شماره پیگیری', value: 'token'
        },
        {
          text: 'پذیرنده', value: 'acceptor'
        },
        {
          text: 'وضعیت  پرداخت', value: 'status'
        },
        {
          text: 'نام پلن خریداری شده', value: 'planName'
        },
      ],
      plansHeader: [
        {
          text: 'نام پلن', value: 'planName'
        },
        {
          text: 'تاریخ فعال‌سازی', value: 'activaionDate'
        },
        {
          text: 'تاریخ انقضا', value: 'expiryDate'
        },
        {
          text: 'ارزش پلن', value: 'planValue'
        },
        {
          text: 'تعداد تغییرات باقی‌مانده', value: 'changesLeft'
        },
        {
          text: 'مشاهده‌ گروه‌های کاری', value: 'options'
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>