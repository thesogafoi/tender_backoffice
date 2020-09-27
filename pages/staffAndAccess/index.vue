<template>
  <div>
    {{ editedItem.image }}
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>کارمندان و دسترسی ها</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
                >اضافه کردن</v-btn
              >
            </template>
            <v-card>
              <v-card-title class="primary">
                <span>{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fullName"
                        label="نام و نام خانوادگی"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.phoneNumber"
                        label="موبایل "
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.password"
                        label="رمز عبور"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6">
                      <v-select
                        :items="items"
                        v-model="editedItem.levelAccess"
                        label="سطح دسترسی"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex align-items-center justify-center">
          <v-icon small color="primary" class="mr-2" @click="editItem(item)"
            >mdi-pencil</v-icon
          >
          <deleteConfirmationDialog @delete="deleteItem(item)" />
        </div>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
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
    dialog: false,
    items: ["سوپرادمین", "ادمین", "کارمند"],
    headers: [
      {
        text: " نام و نام‌خانوادگی",
        align: "start",
        sortable: false,
        value: "fullName"
      },

      { text: "موبایل", value: "phoneNumber" },
      { text: "شناسه", value: "id" },
      { text: "سطح دسترسی", value: "levelAccess" },
      { text: "ابزار", value: "actions", sortable: false, align: 'center' }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      fullName: "",
      phoneNumber: 0,
      password: 0,
      levelAccess: ""
    },
    defaultItem: {
      fullName: "",
      phoneNumber: 0,
      password: 0,
      levelAccess: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "اضافه کردن کاربر" : "ویرایش اطلاعات کاربر";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          fullName: "حسین",
          phoneNumber: 0,
          password: 0,
          levelAccess: ""
        }
      ];
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
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
      // this.showSnackbar("Save", "green");
    }
  }
};
</script>
