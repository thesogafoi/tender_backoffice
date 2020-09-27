<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
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
                        v-model="editedItem.fullName"
                        label="نام و نام خانوادگی"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        :items="items"
                        v-model="editedItem.levelAccess"
                        item-text="value"
                        item-value="id"
                        label="سطح دسترسی"
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="editedItem.phoneNumber"
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
                <v-btn class="success" @click="save">ذخیره</v-btn>
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
    items: [{
      id: '0',
      value: 'سوپر‌ادمین'
    },
    {
      id: '1',
      value: 'ادمین'
    },
    {
      id: '2',
      value: 'کارمند'
    }],
    headers: [
      {
        text: " نام و نام‌خانوادگی",
        align: "start",
        sortable: false,
        value: "fullName"
      },

      { text: "موبایل", value: "phoneNumber" },
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
