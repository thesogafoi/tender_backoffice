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
          <v-toolbar-title class="font-16">کد تخفیف</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="success" dark class="mb-2" v-bind="attrs" v-on="on"
                >اضافه کردن کد تخفیف</v-btn
              >
            </template>
            <v-card>
              <v-card-title class="primary c-py-10">
                <span class="ma-auto white--text font-16"
                  >اضافه کردن کد تخفیف</span
                >
              </v-card-title>

              <v-card-text class="c-pb-0">
                <v-container class="c-pb-0">
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="editedItem.planName"
                        label=" نام پلن فروش"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="editedItem.discountCount"
                        label="تعداد کد تخفیف "
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <custom-date-picker
                        label="تاریخ انقضا"
                        v-model="editedItem.expired"
                        element="date-picker"
                      ></custom-date-picker>
                      <v-text-field
                        v-model="editedItem.expired"
                        label="تاریخ انقضا "
                        id="date-picker"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="white--text red" @click="close">لغو</v-btn>
                <v-btn class="white--text success" @click="save">ذخیره</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex align-center justify-center">
          <v-icon small color="primary" class="mr-2" @click="editItem(item)"
            >mdi-pencil</v-icon
          >
          <deleteConfirmationDialog small @click="deleteItem(item)" />
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
    headers: [
      {
        text: " نام پلن فروش",
        align: "start",
        sortable: false,
        value: "planName"
      },

      { text: "تعداد کد تخفیف ", value: "discountCount" },
      { text: "تاریخ انقضا", value: "expired" },
      { text: "شناسه تخفیف", value: "discount" },
      { text: "ابزار", value: "actions", sortable: false, align: 'center' }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      planName: "",
      discountCount: 0,
      expired: 0
    },
    defaultItem: {
      planName: "",
      discountCount: 0,
      expired: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
          planName: "Frozen Yogurt",
          discountCount: 159,
          expired: 24
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
    }
  }
};
</script>
