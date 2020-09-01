<template>
  <div>
    <v-data-table
      :headers="headers"
      :options.sync="options"
      :loading="loading"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>پلن‌های فروش</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">اضافه کردن</v-btn>
            </template>
            <v-card>
              <v-card-title class="c-header">
                <span class="headline">{{formTitle}}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.title" label="نام پلن"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.allowed_selection"
                        label="تعداد گروه‌های کاری"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.cost" label="ارزش پلن"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <custom-date-picker label="تاریخ انقضا" v-model="editedItem.period"></custom-date-picker>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select v-model="editedItem.priorty" :items="items" label="اولویت"></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="close">انصراف</v-btn>
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
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
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
    desserts: [],
    editedIndex: -1,
    editedItem: {
      title: "",
      allowed_selection: 0,
      cost: 0,
      period: 0,
      priorty: "",
    },
    loading: false,
    defaultItem: {
      title: "",
      allowed_selection: 0,
      cost: 0,
      period: 0,
      priorty: "",
    },
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
    getDataFromApi() {
      console.log(this.options.page != undefined ? this.options.page : 1);
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
            this.desserts = response.data;
            this.loading = false;
          });
      });
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("آیا میخواهید پاک شود؟") && this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        console.log("test");
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        // this.desserts.push(this.editedItem);
        return new Promise((resolve, reject) => {
          this.$axios
            .$post("subscription", this.editedItem)
            .then((response) => {
              console.log(response);
            });
        });
      }
      this.close();
    },
  },
};
</script>