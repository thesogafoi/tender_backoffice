<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-select
        v-model="formData.adKind"
        :items="kindList"
        :rules="[v => !!v || 'Item is required']"
        label="نوع آگهی"
        required
      ></v-select>

      <v-select
        v-model="formData.adStatus"
        :items="statusList"
        :rules="[v => !!v || 'Item is required']"
        label="وضعیت آگهی"
        required
      ></v-select>
      <v-text-field
        v-model="formData.name"
        :rules="[v => !!v || 'Item is required']"
        label="عنوان آگهی"
        required
      ></v-text-field>
      <v-select
        :items="$store.state.cityList"
        v-model="formData.city"
        item-text="name"
        item-value="id"
        multiple
        chips
        :rules="[v => !!v || 'Item is required']"
        label="استان"
        required
      ></v-select>
      <v-text-field
        v-model="formData.callingCode"
        :rules="[v => !!v || 'Item is required']"
        label="کد فراخوان"
        required
      ></v-text-field>
      <v-text-field
        v-model="formData.source"
        :rules="[v => !!v || 'Item is required']"
        label="منبع"
        required
      ></v-text-field>
      <v-text-field
        v-model="formData.adTitleTransition"
        :rules="[v => !!v || 'Item is required']"
        label="عنوان آگهی گذار "
        required
      ></v-text-field>
      <v-select
        :items="staffStatusList"
        v-model="formData.staffStatus"
        item-text="name"
        item-value="id"
        :rules="[v => !!v || 'Item is required']"
        label="وضعیت ستاد"
        required
      ></v-select>

      <custom-date-picker label="تاریخ فراخوان" v-model="formData.date"></custom-date-picker>
      <custom-date-picker label="تاریخ ارسال" v-model="formData.date"></custom-date-picker>
      <custom-date-picker label="تاریخ دریافت" v-model="formData.date"></custom-date-picker>
      <custom-date-picker label="تاریخخ بازگشایی" v-model="formData.date"></custom-date-picker>
      <custom-date-picker label="رایگان از تاریخ" v-model="formData.date"></custom-date-picker>

      <v-combobox v-model="select" :items="items" label="گروه های کاری" multiple chips></v-combobox>
      <v-textarea
        name="input-7-1"
        label="توضیحات"
        value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
      ></v-textarea>
      <v-file-input prepend-icon="mdi-camera" chips multiple label="آپلود عکس"></v-file-input>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Validate</v-btn>

      <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

      <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
    </v-form>
    <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1"></v-data-table>
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
    kindList: ["مزایده", "مناقصه", "استعلام"],
    statusList: ["در حال بررسی", "انتشار یافته"],
    staffStatusList: ["غیر ستاد", "ستاد"],

    checkbox: false,
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "کد آگهی" },
      { text: "کد فراخوان" },
      { text: "عنوان آگهی" },
      { text: "تاریخ انتشار" },
      { text: "آگهی گذار" },
      { text: "تاریخ فراخوان" },
      { text: "گروه های کاری" },
    ],
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1%",
      },
    ],
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
  },
};
</script>