<template>
  <div>
    <v-card class="c-pa-20">
      <v-toolbar flat>
        <v-toolbar-title>جستجوی آگهی</v-toolbar-title>
      </v-toolbar>

      <!-- <v-form class="c-form" ref="form" v-model="valid" lazy-validation> -->
      <v-form class="c-form" ref="form" lazy-validation>
        <v-row>
          <v-col cols="2">
            <v-select
              v-model="formData.type"
              item-value="id"
              item-text="value"
              :items="listType"
              label="نوع آگهی"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="formData.title" label="عنوان آگهی"></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-select
              v-model="formData.status"
              :items="statusList"
              item-value="id"
              item-text="value"
              label="وضعیت آگهی"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-combobox
              :items="$store.state.cityList"
              v-model="formData.provinces"
              item-text="name"
              item-value="id"
              label="استان"
              multiple
              required
            ></v-combobox>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="formData.tender_code" label="کد آسان تندر"></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="formData.invitation_code" label="کد فراخوان" required></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="formData.adinviter_title" label="عنوان آگهی گذار "></v-text-field>
          </v-col>
          <v-col cols="4" class="d-flex flex-row justify-center">
            <div class="c-ml-5">
              <v-text-field
                id="start-free-date"
                prepend-inner-icon="mdi-calendar"
                label="شروع رایگان"
                v-model="formData.range_free_date['first']"
                :clearable="true"
              ></v-text-field>
              <custom-date-picker
                v-model="formData.range_free_date['first']"
                element="start-free-date"
              ></custom-date-picker>
            </div>
            <div class="c-mr-5">
              <v-text-field
                id="end-free-date"
                prepend-inner-icon="mdi-calendar"
                label="پایان رایگان"
                v-model="formData.range_free_date['second']"
                :clearable="true"
              ></v-text-field>
              <custom-date-picker
                v-model="formData.range_free_date['second']"
                element="end-free-date"
              ></custom-date-picker>
            </div>
          </v-col>

          <v-col cols="4" class="d-flex flex-row justify-center">
            <div class="c-ml-5">
              <v-text-field
                id="created-at-first"
                prepend-inner-icon="mdi-calendar"
                label="تاریخ انتشار از"
                v-model="formData.range_created_at['first']"
                :clearable="true"
              ></v-text-field>
              <custom-date-picker
                v-model="formData.range_created_at['first']"
                element="created-at-first"
              ></custom-date-picker>
            </div>
            <div class="c-mr-5">
              <v-text-field
                id="created-at-second"
                prepend-inner-icon="mdi-calendar"
                label="تاریخ انتشار تا"
                v-model="formData.range_created_at['second']"
                :clearable="true"
              ></v-text-field>
              <custom-date-picker
                v-model="formData.range_created_at['second']"
                element="created-at-second"
              ></custom-date-picker>
            </div>
          </v-col>
          <v-col cols="3">
            <ChooseWorkGroup
              :work_groups="this.$store.getters.workGroups"
              @selected_work_group_changed="fillSelected"
              ref="workGroups"
              :multiple="true"
            />
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="formData.description" label="شرح"></v-text-field>
          </v-col>
          <v-col cols="2">
             <v-select
              v-model="formData.is_nerve_center"
              :items="isNerveCenterList"
              item-value="id"
              item-text="value"
              :rules="[v => !!v || 'Item is required']"
              label="وضعیت ستاد"
              required
            ></v-select>
          </v-col>
          <!-- <v-col cols="12">
            <v-textarea name="input-7-1" label="توضیحات" v-model="formData.description" outlined></v-textarea>
          </v-col>-->
          <v-card-actions class="mr-auto">
            <v-btn color="primary" @click="search" width="120" class="mx-2">جستجو</v-btn>
            <v-btn color="warning" @click="resetFormData" width="120">پاک کردن فیلد ها</v-btn>
          </v-card-actions>
        </v-row>
      </v-form>
    </v-card>
    <v-card class="c-mt-20">
      <v-data-table
        class="mt-5 c-table clickable-table"
        @click:row="handleClick"
        disable-sort
        v-model="selected"
        :headers="headers"
        :items="advertises"
        :server-items-length="meta.total"
        :loading="loading"
        :options.sync="options"
        show-select
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50]
        }"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="showItem(item)">mdi-eye</v-icon>
        </template>
        <template v-slot:item.created_at="{ item }">{{ item.created_at }}</template>
        <template v-slot:no-data>
          <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
        </template>
      </v-data-table>
    </v-card>
    <!-- dialog for show item in table -->
    <v-dialog v-model="showItemDialog" max-width="95%">
      <v-card class="c-pa-20">
        <v-toolbar flat color="white">
          <v-btn icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>اطلاعات آگهی</v-toolbar-title>
        </v-toolbar>

        <v-row>
          <v-col cols="2">
            <v-card>
              <v-card-title>ID</v-card-title>
              <v-card-text>{{singleAdvertise.id}}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card>
              <v-card-title>عنوان</v-card-title>
              <v-card-text>{{singleAdvertise.title}}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card>
              <v-card-title>کد آسان‌تندر</v-card-title>
              <v-card-text>{{singleAdvertise.tender_code}}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card>
              <v-card-title>وضعیت</v-card-title>
              <v-card-text>{{singleAdvertise.status}}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card>
              <v-card-title>عنوان آگهی گذار</v-card-title>
              <v-card-text>{{singleAdvertise.adinviter_title}}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card>
              <v-card-title>منبع</v-card-title>
              <v-card-text>{{singleAdvertise.resource}}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="2">
            <v-card>
              <v-card-title>تاریخ انتشار</v-card-title>
              <v-card-text>{{singleAdvertise.created_at}}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="2">
            <v-card>
              <v-card-title>تاریخ بازگشایی</v-card-title>
              <v-card-text>{{singleAdvertise.free_date}}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="2">
            <v-card>
              <v-card-title>تاریخ دریافت</v-card-title>
              <v-card-text>{{singleAdvertise.receipt_date}}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="2">
            <v-card>
              <v-card-title>تاریخ فراخوان</v-card-title>
              <v-card-text>{{singleAdvertise.invitation_date}}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="2">
            <v-card>
              <v-card-title>تاریخ شروع</v-card-title>
              <v-card-text>{{singleAdvertise.start_date}}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="2">
            <v-card>
              <v-card-title>تاریخ ارسال</v-card-title>
              <v-card-text>{{singleAdvertise.submit_date}}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="9">
            <v-card>
              <v-card-title>شرح</v-card-title>
              <v-card-text>{{singleAdvertise.description}}</v-card-text>
            </v-card>
            <v-card class="c-mt-20">
              <v-card-title>لینک</v-card-title>
              <v-card-text>{{singleAdvertise.link}}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">بستن</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import WorkGroupMixin from "~/mixins.js/chooseWorkGroupMixins.js";
export default {
  mixins: [WorkGroupMixin],
  data: () => ({
    meta: [],
    options: {},
    loading: true,
    valid: true,
    formData: {
      range_created_at: {
        first: "",
        second: "",
      },
      range_free_date: {
        first: "",
        second: "",
      },
      description: "",
      type: "",
      status: "",
      provinces: [],
      title: "",
      tender_code: "",
      invitation_code: "",
      resource: "",
      adinviter_title: "",
      is_nerve_center: false,
      work_groups: [],
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
    selected: [],
    listType: [
      {
        id: "AUCTION",
        value: "مزایده",
      },
      {
        id: "TENDER",
        value: "مناقصه",
      },
      {
        id: "INQUIRY",
        value: "استعلام",
      },
    ],
    statusList: [
      {
        id: "0",
        value: "در حال بررسی",
      },
      {
        id: "1",
        value: "انتشار یافته",
      },
    ],
    staffStatusList: [
      {
        value: "ستاد",
        id: "1",
      },
      {
        value: "غیر ستاد",
        id: "0",
      },
    ],

       isNerveCenterList: [
      {
        id: 1,
        value: "ستادی",
      },
      {
        id: 0,
        value: "غیر ستادی",
      },
    ],

    isLoading: false,

    checkbox: false,
    singleSelect: false,
    headers: [
      { text: "کد آسان تندر", value: "tender_code" },
      { text: "کد فراخوان", value: "invitation_code" },
      { text: "عنوان آگهی", value: "title" },
      { text: "تاریخ انتشار", value: "created_at" },
      { text: "آگهی گذار", value: "adinviter_title" },
      { text: " تاریخ فراخوان", value: "invitation_date" },
    ],
    advertises: [],
    editedIndex: -1,
    showItemDialog: false,
    singleAdvertise: {},
  }),
  created() {
    this.getDataFromApi();
  },
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
  methods: {
    fillSelected(data) {
      this.formData.work_groups = data;
    },
    getDataFromApi() {
      this.loading = true;
      // this.$refs.form.resetValidation();
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      let newFormData = this.removeEmptyObjects(this.formData);
      return new Promise((resolve, reject) => {
        this.$axios
          .$post(
            "advertise/page/get/searchable/advertises?page=" +
              this.options.page +
              "&items_per_page=" +
              this.options.itemsPerPage,
            {
              ...this.formData,
            }
          )
          .then((response) => {
            this.meta = response.meta;
            this.advertises = response.data;

            this.loading = false;
            this.advertises.length == 0
              ? this.showSnackbar("آگهی یافت نشد", "yellow")
              : "";
          });
      });
    },

    // this.$refs.form.reset();
    // this.$refs.form.resetValidation();
    // send axios to backend and add refresh data
    search() {
      let newFormData = this.removeEmptyObjects(this.formData);
      this.getDataFromApi();
    },
    resetFormData() {
      this.clearSelectedWorkGroups("workGroups");
      this.formData = {
        range_created_at: {
          first: "",
          second: "",
        },
        range_free_date: {
          first: "",
          second: "",
        },
        description: "",
        type: "",
        status: "",
        provinces: [],
        title: "",
        invitation_code: "",
        resource: "",
        adinviter_title: "",
        is_nerve_center: false,
        work_groups: [],
      };
    },
    removeEmptyObjects(obj) {
      Object.keys(obj).map((key) => {
        if (key.includes("range")) {
          Object.keys(obj[key]).map((firstOrSecond) => {
            if (
              obj[key][firstOrSecond] == "" ||
              obj[key][firstOrSecond] == null
            ) {
              obj[key][firstOrSecond] = undefined;
            }
          });
        } else if (
          obj[key] == "" ||
          obj[key] == undefined ||
          obj[key] == null
        ) {
          delete obj[key];
        }
      });
      return obj;
    },
    showItem(item) {
      this.showItemDialog = true;
      this.$axios.$get("advertise/show/" + item.id).then((response) => {
        this.singleAdvertise = response.data;
      });
    },
    close() {
      this.singleAdvertise = "";
      this.showItemDialog = false;
    },

    handleClick(e) {
      this.showItem(e);
    },
  },
};
</script>