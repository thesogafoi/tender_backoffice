<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
    >
    </v-data-table>
  </div>
</template>

<script>
import deleteConfirmationDialog from "~/components/general/deleteConfirmationDialog";

export default {
  components: {
    deleteConfirmationDialog,
  },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: " پرداخت کننده",
        align: "start",
        sortable: false,
        value: "user"
      },

      { text: "مبلغ", value: "amount" },
      { text: "تاریخ پرداخت", value: "paymentDate" },
      { text: "شماره پیگیری", value: "issueTraking" },
      { text: "پذیرنده", value: "receiver", sortable: false },
      { text: "وضعیت پرداخت", value: "status", sortable: false },
      { text: "نام پلن", value: "planName", sortable: false },
    ],
  }),
};
</script>
