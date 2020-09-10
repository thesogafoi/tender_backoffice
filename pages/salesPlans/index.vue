<template>
  <div>
    <v-data-table
      :items="subscriptions"
      sort-by="calories"
      class="elevation-1"
      disable-sort
      :headers="headers"
      :server-items-length="meta.total"
      :loading="loading"
      :options.sync="options"
      show-select
      :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50]
        }"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>پلن‌های فروش</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="editDialog" max-width="500px">
            <v-card>
              <v-card-title class="c-header">
                <span class="headline">تغییر طرح اشتراکی</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.title" label="نام پلن"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        v-model="editedItem.status"
                        :items="statusList"
                        item-value="id"
                        item-text="value"
                        label="وضعیت آگهی"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="5">
                      <v-text-field
                        v-model="editedItem.allowed_selection"
                        label="تعداد گروه‌های کاری"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.cost" label="ارزش پلن"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field v-model="editedItem.priorty" label="اولویت"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <custom-date-picker label="تاریخ انقضا" v-model="editedItem.period"></custom-date-picker>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="closeEditDialog">انصراف</v-btn>
                <v-btn color="green" text @click="updateItem">ذخیره</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">اضافه کردن</v-btn>
            </template>
            <v-card>
              <v-card-title class="c-header">
                <span class="headline">اضافه کردن طرح اشتراکی</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.title" label="نام پلن"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        v-model="editedItem.status"
                        :items="statusList"
                        item-value="id"
                        item-text="value"
                        :rules="[v => !!v || 'Item is required']"
                        label="وضعیت آگهی"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="5">
                      <v-text-field
                        v-model="editedItem.allowed_selection"
                        label="تعداد گروه‌های کاری"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.cost" label="ارزش پلن"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field v-model="editedItem.priorty" label="اولویت"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <custom-date-picker label="تاریخ انقضا" v-model="editedItem.period"></custom-date-picker>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="closeAddItem">انصراف</v-btn>
                <v-btn color="green" text @click="save">ذخیره</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    statusList: [
      {
        id: 0,
        value: "در حال بررسی",
      },
      {
        id: 1,
        value: "انتشار یافته",
      },
    ],
    dialog: false,
    editDialog: false,
    items: ["1", "2", "3", "4"],
    options: {},

    headers: [
      {
        text: "نام پلن",
        align: "start",
        sortable: false,
        value: "title",
      },

      { text: "تعداد گروه‌های کاری", value: "allowed_selection" },
      { text: "ارزش پلن", value: "cost" },
      { text: "تاریخ انقضا", value: "period" },
      { text: "اولویت", value: "priorty" },
      { text: "عملیات", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      id: "",
      title: "",
      allowed_selection: 0,
      cost: 0,
      period: 0,
      priorty: "",
      status: 0,
    },
    meta: [],
    loading: false,
    subscriptions: [],
  }),
  watch: {
    options: {
      handler() {
        this.getDataFromApi().then((data) => {
          this.desserts = data.items;
          this.totalDesserts = data.total;
        });
      },
      deep: true,
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  created() {
    this.getDataFromApi();
  },

  methods: {
    resetSubscription() {
      this.editedItem = {
        id: "",
        title: "",
        allowed_selection: 0,
        cost: 0,
        period: 0,
        priorty: "",
        status: 0,
      };
    },
    getDataFromApi() {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      return new Promise((resolve, reject) => {
        this.$axios
          .$get(
            `subscription?page=${
              this.options.page === undefined ? 1 : this.options.page
            }&items_per_page=${
              this.options.itemsPerPage === undefined
                ? 10
                : this.options.itemsPerPage
            }`
          )
          .then((response) => {
            this.meta = response.meta;
            this.subscriptions = response.data;
            // this.desserts = response.data;
            this.loading = false;
          });
      });
    },
    editItem(item) {
      this.resetSubscription();
      Object.assign(this.editedItem, item);
      this.editDialog = true;
    },

    deleteItem(item) {
      const index = this.subscriptions.indexOf(item);
      confirm("آیا میخواهید پاک شود؟") && this.subscriptions.splice(index, 1);
      return new Promise((resolve, reject) => {
        this.$axios
          .$delete("subscription/" + item.id)
          .then((response) => {
            this.showSnackbar("طرح اشتراکی مورد نظر پاک شد", "green");
          })
          .catch((error) => {
            Object.values(this.$store.getters["errorHandling/errors"]).map(
              (error) => {
                this.showSnackbar(error[0], "red");
              }
            );
          });
      });
    },

    closeEditDialog() {
      this.editDialog = false;
      this.$nextTick(() => {
        this.resetSubscription();
        this.editedIndex = -1;
      });
    },
    closeAddItem() {
      this.dialog = false;
      this.$nextTick(() => {
        this.resetSubscription();
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.subscriptions[this.editedIndex], this.editedItem);
      } else {
        // this.desserts.push(this.editedItem);
        return new Promise((resolve, reject) => {
          this.$axios
            .$post("subscription", this.editedItem)
            .then((response) => {
              this.showSnackbar("طرح اشتراکی با موفقیت اضافه شد", "green");
              this.getDataFromApi();
              this.closeAddItem();
            })
            .catch((error) => {
              Object.values(this.$store.getters["errorHandling/errors"]).map(
                (error) => {
                  this.showSnackbar(error[0], "red");
                }
              );
            });
        });
      }
    },

    updateItem() {
      if (this.editedIndex > -1) {
        Object.assign(this.subscriptions[this.editedIndex], this.editedItem);
      } else {
        // this.desserts.push(this.editedItem);
        return new Promise((resolve, reject) => {
          this.$axios
            .$put("subscription/" + this.editedItem.id, this.editedItem)
            .then((response) => {
              this.showSnackbar("طرح اشتراکی با موفقیت تغییر یافت", "green");
              this.getDataFromApi();
              this.closeEditDialog();
            })
            .catch((error) => {
              Object.values(this.$store.getters["errorHandling/errors"]).map(
                (error) => {
                  this.showSnackbar(error[0], "red");
                }
              );
            });
        });
      }
    },
  },
};
</script>