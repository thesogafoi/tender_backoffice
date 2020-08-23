<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="4">
          <v-select
            v-model="formData.adKind"
            :items="kindList"
            :rules="[v => !!v || 'Item is required']"
            label="نوع آگهی"
            required
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            v-model="formData.adStatus"
            :items="statusList"
            :rules="[v => !!v || 'Item is required']"
            label="وضعیت آگهی"
            required
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="formData.name"
            :rules="[v => !!v || 'Item is required']"
            label="عنوان آگهی"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-select
            :items="$store.state.cityList"
            v-model="formData.city"
            item-text="name"
            item-value="id"
            multiple
            :rules="[v => !!v || 'Item is required']"
            label="استان"
            required
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="formData.callingCode"
            :rules="[v => !!v || 'Item is required']"
            label="کد فراخوان"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="formData.source"
            :rules="[v => !!v || 'Item is required']"
            label="منبع"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="formData.adTitleTransition"
            :rules="[v => !!v || 'Item is required']"
            label="عنوان آگهی گذار "
            required
          ></v-text-field>
        </v-col>

        <v-col cols="4">
          <custom-date-picker label="تاریخ فراخوان " v-model="formData.date"></custom-date-picker>
          <custom-date-picker label="تاریخ فراخوان" v-model="formData.date"></custom-date-picker>
        </v-col>
        <v-col cols="4">
          <custom-date-picker label="تاریخ ارسال" v-model="formData.date"></custom-date-picker>
          <custom-date-picker label="تاریخ ارسال" v-model="formData.date"></custom-date-picker>
        </v-col>
        <v-col cols="4">
          <custom-date-picker label="تاریخ دریافت" v-model="formData.date"></custom-date-picker>
          <custom-date-picker label="تاریخ دریافت" v-model="formData.date"></custom-date-picker>
        </v-col>
        <v-col cols="4">
          <custom-date-picker label="تاریخ بازگشایی" v-model="formData.date"></custom-date-picker>
          <custom-date-picker label="تاریخ بازگشایی" v-model="formData.date"></custom-date-picker>
        </v-col>
        <v-col cols="4">
          <custom-date-picker label="رایگان از تاریخ" v-model="formData.date"></custom-date-picker>
          <custom-date-picker label="رایگان تا تاریخ" v-model="formData.date"></custom-date-picker>
        </v-col>

        <v-col cols="4">
          <v-combobox v-model="select" :items="items" label="گروه های کاری" multiple></v-combobox>
        </v-col>

        <v-col cols="4">
          <v-file-input prepend-icon="mdi-camera" chips multiple label="آپلود عکس"></v-file-input>
        </v-col>
        <v-col cols="4">
          <v-select
            :items="staffStatusList"
            v-model="formData.staffStatus"
            item-text="name"
            item-value="id"
            :rules="[v => !!v || 'Item is required']"
            label="وضعیت ستاد"
            required
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-textarea
            name="input-7-1"
            label="توضیحات"
            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          ></v-textarea>
        </v-col>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Validate</v-btn>

        <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

        <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
      </v-row>
    </v-form>

    <v-data-table
      class="mt-5"
      v-model="selected"
      :headers="headers"
      :items="desserts"
      item-key="name"
      show-select
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2">mdi-pencil</v-icon>
        <v-icon small @click="showItem(item)">mdi-eye</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    <!-- dialog for show item in table -->
    <v-dialog v-model="showItemDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline"></span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <ul>
              <li>name: {{showItemIndex.name}}</li>
              <li>name: {{showItemIndex.name}}</li>
              <li>name: {{showItemIndex.name}}</li>
              <li>name: {{showItemIndex.name}}</li>
            </ul>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    formData: {
      adKind: "",
      adStatus: "",
      city: "",
      name: "",
      callingCode: "",
      source: "",
      adTitleTransition: "",
      staffStatus: "",
      date: "",
    },
    items: ["Programming", "Design", "Vue", "Vuetify"],

    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    selected: [],
    kindList: ["مزایده", "مناقصه", "استعلام"],
    statusList: ["در حال بررسی", "انتشار یافته"],
    staffStatusList: ["غیر ستاد", "ستاد"],

    checkbox: false,
    singleSelect: false,
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "کد آگهی", value: "calories" },
      { text: "کد فراخوان", value: "fat" },
      { text: "عنوان آگهی", value: "carbs" },
      { text: "تاریخ انتشار", value: "protein" },
      { text: "آگهی گذار", value: "iron" },
      { text: "تاریخ فراخوان", value: "calories" },
      { text: "گروه های کاری", value: "calories" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 234,
        fat: 8.0,
        carbs: 44,
        protein: 4.4,
        iron: "1%",
      },
      {
        name: "Ice cream sandwich",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1%",
      },
      {
        name: "Eclair",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1%",
      },
    ],
    editedIndex: -1,
    showItemDialog: false,
    showItemIndex: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    showItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.showItemIndex = item;
      this.showItemDialog = true;
    },
    close() {
      this.showItemDialog = false;
    },
  },
};
</script>