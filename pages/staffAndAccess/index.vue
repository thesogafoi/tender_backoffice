<template>
  <div>
    <v-data-table
      :items="users"
      sort-by="calories"
      class="elevation-1"
      disable-sort
      :headers="headers"
      :loading="loading"
      :options.sync="options"
      :server-items-length="meta.total"
      :footer-props="{
        'items-per-page-options': [5, 10, 20, 30, 40],
      }"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="font-16"
            >کارمندان و دسترسی ها</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="success" dark class="mb-2" v-bind="attrs" v-on="on"
                >اضافه کردن کاربر</v-btn
              >
            </template>
            <v-card>
              <v-card-title class="primary text-center c-py-10">
                <span class="white--text font-16 ma-auto">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text class="c-pb-0">
                <v-container class="c-pb-0">
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="editedItem.name"
                        label="نام و نام خانوادگی"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        :items="items"
                        v-model="editedItem.type"
                        item-text="value"
                        item-value="id"
                        label="سطح دسترسی"
                        :disabled="$auth.user.mobile == '09120751179'"
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        :disabled="editedItem.id != ''"
                        v-model="editedItem.mobile"
                        label="موبایل "
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="editedItem.password"
                        label="رمز عبور"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="red white--text" @click="close">لغو</v-btn>
                <v-btn class="success" @click="createUser">ذخیره</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex align-items-center justify-center">
          <v-icon small color="primary" class="mr-2" @click="updateuser(item)"
            >mdi-pencil</v-icon
          >
          <deleteConfirmationDialog
            v-if="$auth.user.mobile != item.mobile"
            @delete="deleteUser(item)"
          />
        </div>
      </template>

      <template v-slot:item.type="{ item }">
        <div class="d-flex align-items-center justify-center">
          <p v-if="item.type == 'SUPERADMIN'">ادمین اصلی</p>
          <p v-if="item.type == 'STAFF'">کارمند</p>
          <p v-if="item.type == 'ADMIN'">ادمین</p>
        </div>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary">Reset</v-btn>
      </template>
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
    meta: {},
    options: {},
    loading: true,
    dialog: false,
    items: [
      {
        id: "SUPERADMIN",
        value: "سوپر‌ادمین",
      },
      {
        id: "ADMIN",
        value: "ادمین",
      },
      {
        id: "STAFF",
        value: "کارمند",
      },
    ],
    headers: [
      {
        text: " نام و نام‌خانوادگی",
        align: "center",
        value: "name",
      },

      {
        text: " موبایل",
        align: "center",
        value: "mobile",
      },

      {
        text: "سطح دسترسی",
        align: "center",
        value: "type",
      },

      { text: "ابزار", value: "actions", sortable: false, align: "center" },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      mobile: "",
      password: "",
      type: "STAFF",
    },
    defaultItem: {
      id: "",
      name: "",
      mobile: "",
      password: "",
      type: "STAFF",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "اضافه کردن کاربر"
        : "ویرایش اطلاعات کاربر";
    },
  },

  watch: {
    options: {
      handler() {
        this.getUsers().then((data) => {
          this.desserts = data.items;
          this.totalDesserts = data.total;
        });
      },
      deep: true,
    },
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.getUsers();
  },

  methods: {
    updateUser() {
      this.$nuxt.$loading.start();
      this.$axios
        .$put("user/update/" + this.editedItem.id, this.editedItem)
        .then((res) => {
          this.$nuxt.$loading.finish();
          this.showSnackbar("اطلاعت کاربر با موفقیت تغییر یافت", "green");
          this.getUsers();
          this.dialog = false;
        })
        .catch((errors) => {
          console.log(errors);
          this.$nuxt.$loading.finish();
          if (errors.response.status == 422) {
            if (
              errors.response.data.errors.mobile[0].indexOf(
                "اطلاعات وارد شده صحیح نیست."
              ) > -1
            ) {
              this.showSnackbar("شماره وارد شده در سیستم موجود است", "red");
            } else {
              this.showSnackbar("لطفا تمامی فیلد ها را کامل کنید", "red");
            }
          }
        });
    },
    createUser() {
      this.$nuxt.$loading.start();
      if (this.editedItem.id != "") {
        this.updateUser();
      } else {
        this.$axios
          .$post("user/create", this.editedItem)
          .then((res) => {
            this.$nuxt.$loading.finish();
            this.showSnackbar("کاربر جدید اضافه گردید", "green");
            this.getUsers();
            this.dialog = false;
          })
          .catch((errors) => {
            console.log(errors);
            this.$nuxt.$loading.finish();
            if (errors.response.status == 422) {
              if (
                errors.response.data.errors.mobile[0].indexOf(
                  "اطلاعات وارد شده صحیح نیست."
                ) > -1
              ) {
                this.showSnackbar("شماره وارد شده در سیستم موجود است", "red");
              } else {
                this.showSnackbar("لطفا تمامی فیلد ها را کامل کنید", "red");
              }
            }
          });
      }
    },
    getUsers() {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      return new Promise((resolve, reject) => {
        this.$axios
          .$get(
            "user/index?page=" +
              this.options.page +
              "&items_per_page=" +
              this.options.itemsPerPage
          )
          .then((res) => {
            this.loading = false;
            this.users = res.data;
            this.meta = res.meta;
          })
          .catch((errors) => {
            console.log(errors);
          });
      });
    },

    updateuser(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteUser(item) {
      const index = this.users.indexOf(item);
      this.users.splice(index, 1);
      this.$nuxt.$loading.start();
      if (item.id != "") {
        this.$axios
          .$delete("user/delete/" + item.id)
          .then((res) => {
            this.$nuxt.$loading.finish();
            this.showSnackbar("کاربر با موفقیت حذف شد", "green");
            this.getUsers();
            this.dialog = false;
          })
          .catch((errors) => {
            this.$nuxt.$loading.finish();
            console.log(errors);
          });
      }
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
        Object.assign(this.users[this.editedIndex], this.editedItem);
      } else {
        this.users.push(this.editedItem);
      }
      this.close();
      // this.showSnackbar("Save", "green");
    },
  },
};
</script>
