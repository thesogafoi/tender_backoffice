<template>
  <div>
    <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>تبلیغات</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">اضافه کردن</v-btn>
            </template>
            <v-card>
              <v-card-title class="c-header">
                <span class="headline">اضافه کردن تبلیغات</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.title" label="عنوان"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.link" label="لینک "></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <custom-date-picker label="تاریخ " v-model="editedItem.date"></custom-date-picker>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-file-input
                        @change="onFileChange"
                        class="ml-5"
                        v-model="editedItem.image"
                        prepend-icon="mdi-camera"
                        :label="editedItem.urlImage"
                      ></v-file-input>
                      <img
                        v-if="editedItem.urlImage != null"
                        class="image-table"
                        :src="editedItem.urlImage"
                        alt
                      />
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
      <template v-slot:item.urlImage="{ item }">
        <img class="image-table" :src="item.urlImage" />
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

    headers: [
      {
        text: " عنوان",
        align: "start",
        sortable: false,
        value: "title",
      },
      { text: "عکس", value: "urlImage" },
      { text: "تاریخ", value: "date" },
      { text: "لینک", value: "link" },
      { text: "شناسه", value: "id" },
      { text: "عملیات", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      title: "",
      link: "",
      date: 0,
      image: null,
      urlImage: null,
    },
    defaultItem: {
      title: "",
      link: "",
      date: 0,
      image: null,
      urlImage: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          title: "Frozen Yogurt",
          link: 159,
          date: 24,
        },
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
    },
    onFileChange(e) {
      var temp = URL.createObjectURL(this.editedItem.image);
      this.editedItem.urlImage = temp;
      console.log("fw", this.editedItem.image, this.editedItem.urlImage);
      // const file = image;
      // this.editedItem.image = URL.createObjectURL(file);
    },
  },
};
</script>

<style lang="scss" scoped>
.image-table {
  border-radius: 50%;
  width: 50px;
  margin: 5px;
}
</style>