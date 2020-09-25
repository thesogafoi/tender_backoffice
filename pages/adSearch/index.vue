<template>
  <div>
    <v-card class="c-px-20 c-py-5">
      <!-- <v-toolbar flat>
        <v-toolbar-title>جستجوی آگهی</v-toolbar-title>
      </v-toolbar>-->

      <!-- <v-form class="c-form" ref="form" v-model="valid" lazy-validation> -->
      <v-form class="c-form" ref="form" lazy-validation>
        <v-row>
          <div class="w-15 c-px-10">
            <v-select
              v-model="formData.status"
              :items="statusList"
              item-value="id"
              item-text="value"
              label="وضعیت آگهی"
            ></v-select>
          </div>
          <div class="w-10 c-px-10">
            <v-select
              v-model="formData.type"
              item-value="id"
              item-text="value"
              :items="listType"
              label="نوع آگهی"
            ></v-select>
          </div>
          <div class="w-40 c-px-10">
            <v-combobox
              :items="$store.state.cityList"
              v-model="formData.provinces"
              item-text="name"
              item-value="id"
              label="استان"
              multiple
              required
            ></v-combobox>
          </div>
          <div class="w-20 c-px-10">
            <v-text-field
              v-model="formData.tender_code"
              label="کد آسان تندر"
            ></v-text-field>
          </div>
          <div class="w-15 c-px-10">
            <v-text-field
              v-model="formData.invitation_code"
              label="کد فراخوان"
              required
            ></v-text-field>
          </div>
          <div class="w-30 c-px-10">
            <v-text-field
              v-model="formData.title"
              label="عنوان آگهی"
            ></v-text-field>
          </div>
          <div class="w-30 c-px-10">
            <v-text-field
              v-model="formData.adinviter_title"
              label="عنوان آگهی گذار "
            ></v-text-field>
          </div>
          <div class="w-25 c-px-10">
            <ChooseWorkGroup
              :work_groups="this.$store.getters.workGroups"
              @selected_work_group_changed="fillSelected"
              ref="workGroups"
              :multiple="true"
            />
          </div>
          <div class="w-15 c-px-10">
            <v-select
              v-model="formData.is_nerve_center"
              :items="isNerveCenterList"
              item-value="id"
              item-text="value"
              label="وضعیت ستاد"
              required
            ></v-select>
          </div>
          <!-- <div class="w-25 c-px-10">
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
          <div class="w-25 c-px-10">
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
          </div>-->
          <div class="w-20 c-px-10">
            <v-text-field
              id="created-at-first"
              prepend-inner-icon="mdi-calendar"
              label="انتشار یافته از تاریخ"
              v-model="formData.range_created_at['first']"
              :clearable="true"
            ></v-text-field>
            <custom-date-picker
              v-model="formData.range_created_at['first']"
              element="created-at-first"
            ></custom-date-picker>
          </div>
          <div class="w-20 c-px-10">
            <v-text-field
              id="created-at-second"
              prepend-inner-icon="mdi-calendar"
              label="انتشار یافته تا تاریخ"
              v-model="formData.range_created_at['second']"
              :clearable="true"
            ></v-text-field>
            <custom-date-picker
              v-model="formData.range_created_at['second']"
              element="created-at-second"
            ></custom-date-picker>
          </div>
          <div class="w-60 c-px-10">
            <v-text-field
              v-model="formData.description"
              label="شرح"
            ></v-text-field>
          </div>
          <!-- <v-col cols="12">
            <v-textarea name="input-7-1" label="توضیحات" v-model="formData.description" outlined></v-textarea>
          </v-col>-->
          <v-card-actions class="mr-auto">
            <v-btn color="red darken-4" dark @click="resetFormData" width="120"
              >پاک کردن فیلد ها</v-btn
            >
            <v-btn color="primary" @click="search" width="120" class="mx-2"
              >جستجو</v-btn
            >
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
          'items-per-page-options': [10, 20, 30, 40, 50],
        }"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="showItem(item)">mdi-eye</v-icon>
        </template>
        <template v-slot:item.created_at="{ item }">{{
          item.created_at
        }}</template>
        <template v-slot:no-data>
          <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
        </template>
        <template v-slot:item.status="{ item }">
          <v-icon small class="mr-1" color="success" v-if="item.status == 1"
            >mdi-check</v-icon
          >
          <v-icon
            small
            class="mr-1"
            color="red darken-4"
            v-if="item.status == 0"
            >mdi-close</v-icon
          >
        </template>
      </v-data-table>
    </v-card>
    <!-- dialog for show item in table -->
    <v-dialog v-model="showItemDialog" max-width="95%">
      <v-card class="c-pa-20">
        <v-row>
          <div class="w-20 c-px-5 c-my-5 child-col">
            <v-card>
              <v-card-text class="d-flex c-py-10 flex-wrap">
                <h4 class="rtl c-ml-5">کد آسان‌تندر:</h4>
                <p class="c-mb-0">{{ singleAdvertise.tender_code }}</p>
              </v-card-text>
            </v-card>
          </div>

          <div class="w-15 c-px-5 c-my-5 child-col">
            <v-card>
              <v-card-text class="d-flex c-py-10 flex-wrap">
                <h4 class="rtl c-ml-5">وضعیت:</h4>
                <p class="c-mb-0">
                  {{
                    singleAdvertise.status == 0
                      ? "انتشار یافته"
                      : "در حال بررسی"
                  }}
                </p>
              </v-card-text>
            </v-card>
          </div>
          <div class="w-15 c-px-5 c-my-5 child-col">
            <v-card>
              <v-card-text class="d-flex c-py-10 flex-wrap">
                <h4 class="rtl c-ml-5">نوع آگهی:</h4>
                <p class="c-mb-0" v-if="singleAdvertise.type === 'AUCTION'">
                  مزایده
                </p>
                <p class="c-mb-0" v-if="singleAdvertise.type === 'TENDER'">
                  مناقصه
                </p>
                <p class="c-mb-0" v-if="singleAdvertise.type === 'INQUIRY'">
                  استعلام
                </p>
              </v-card-text>
            </v-card>
          </div>
          <div class="w-50 c-px-5 c-my-5 child-col">
            <v-card>
              <v-card-text class="d-flex c-py-10 flex-wrap">
                <h4 class="rtl c-ml-5">استان:</h4>
                <div
                  class="city"
                  v-for="(city, i) in $store.state.cityList"
                  :key="i"
                >
                  <p
                    class="c-mb-0"
                    v-for="(province, index) in singleAdvertise.provinces"
                    :key="index"
                  >
                    <span v-if="province == city.id">{{ city.name }}</span>
                  </p>
                </div>
              </v-card-text>
            </v-card>
          </div>
          <div class="w-45 c-px-5 c-my-5 child-col">
            <v-card>
              <v-card-text class="d-flex c-py-10 flex-wrap">
                <h4 class="rtl c-ml-5">عنوان:</h4>
                <p class="c-mb-0">{{ singleAdvertise.title }}</p>
              </v-card-text>
            </v-card>
          </div>
          <div class="w-35 c-px-5 c-my-5 child-col">
            <v-card>
              <v-card-text class="d-flex c-py-10 flex-wrap">
                <h4 class="rtl c-ml-5">عنوان آگهی گذار:</h4>
                <p class="c-mb-0">{{ singleAdvertise.adinviter_title }}</p>
              </v-card-text>
            </v-card>
          </div>
          <div class="w-20 c-px-5 c-my-5 child-col">
            <v-card>
              <v-card-text class="d-flex c-py-10 flex-wrap">
                <h4 class="rtl c-ml-5">منبع:</h4>
                <p class="c-mb-0">{{ singleAdvertise.resource }}</p>
              </v-card-text>
            </v-card>
          </div>
          <div class="w-20 c-px-5 c-my-5 child-col">
            <v-card>
              <v-card-text class="d-flex c-py-10 flex-wrap">
                <h4 class="rtl c-ml-5">تاریخ فراخوان:</h4>
                <p class="c-mb-0">{{ singleAdvertise.invitation_date }}</p>
              </v-card-text>
            </v-card>
          </div>
          <div class="w-20 c-px-5 c-my-5 child-col">
            <v-card>
              <v-card-text class="d-flex c-py-10 flex-wrap">
                <h4 class="rtl c-ml-5">تاریخ دریافت:</h4>
                <p class="c-mb-0">{{ singleAdvertise.receipt_date }}</p>
              </v-card-text>
            </v-card>
          </div>
          <div class="w-20 c-px-5 c-my-5 child-col">
            <v-card>
              <v-card-text class="d-flex c-py-10 flex-wrap">
                <h4 class="rtl c-ml-5">تاریخ ارسال:</h4>
                <p class="c-mb-0">{{ singleAdvertise.submit_date }}</p>
              </v-card-text>
            </v-card>
          </div>

          <div class="w-20 c-px-5 c-my-5 child-col">
            <v-card>
              <v-card-text class="d-flex c-py-10 flex-wrap">
                <h4 class="rtl c-ml-5">تاریخ بازگشایی:</h4>
                <p class="c-mb-0">{{ singleAdvertise.free_date }}</p>
              </v-card-text>
            </v-card>
          </div>
          <div class="w-20 c-px-5 c-my-5 child-col">
            <v-card>
              <v-card-text class="d-flex c-py-10 flex-wrap">
                <h4 class="rtl c-ml-5">تاریخ انتشار:</h4>
                <p class="c-mb-0">{{ singleAdvertise.created_at }}</p>
              </v-card-text>
            </v-card>
          </div>
          <div class="w-20 c-px-5 c-my-5 child-col">
            <v-card>
              <v-card-text class="d-flex c-py-10 flex-wrap">
                <h4 class="rtl c-ml-5">رایگان از تاریخ:</h4>
                <p class="c-mb-0">{{ singleAdvertise.start_date }}</p>
              </v-card-text>
            </v-card>
          </div>

          <div class="w-20 c-px-5 c-my-5 child-col">
            <v-card>
              <v-card-text class="d-flex c-py-10 flex-wrap">
                <h4 class="rtl c-ml-5">وضعیت ستاد:</h4>
                <p class="c-mb-0" v-if="singleAdvertise.is_nerve_center">
                  ستادی
                </p>
                <p class="c-mb-0" v-if="!singleAdvertise.is_nerve_center">
                  غیر ستادی
                </p>
              </v-card-text>
            </v-card>
          </div>
          <div class="w-60 c-px-5 c-my-5 child-col">
            <v-card>
              <v-card-text class="d-flex c-py-10 flex-wrap">
                <h4 class="rtl c-ml-5">لینک:</h4>
                <p class="c-mb-0">{{ singleAdvertise.link }}</p>
              </v-card-text>
            </v-card>
          </div>
          <div class="w-100 c-px-5 c-my-5 child-col">
            <v-card>
              <v-card-text class="d-flex c-py-10 flex-wrap flex-wrap">
                <h4 class="rtl c-ml-5">گروه‌های کاری:</h4>
                <p
                  class="c-mb-10 c-ml-20"
                  v-for="(workGroupId, index) in singleAdvertise.work_groups"
                  :key="index"
                >
                  {{ findTitle(workGroupId) }} /
                </p>
              </v-card-text>
            </v-card>
          </div>
          <div class="c-table-row w-100 c-my-5">
            <div class="w-80 c-px-5 child-col">
              <v-card>
                <v-card-text class="d-flex c-py-10 flex-wrap">
                  <h4 class="rtl c-ml-5">شرح:</h4>
                  <p class="c-mb-0">{{ singleAdvertise.description }}</p>
                </v-card-text>
              </v-card>
            </div>
            <div
              class="w-20 c-px-5 child-col"
              v-if="singleAdvertise.image != null"
            >
              <v-card>
                <v-card-text class="c-py-10">
                  <h4 class="rtl c-mb-10">عکس ضمیمه:</h4>
                  <img
                    class="thumbnaail-image"
                    :src="singleAdvertise.image"
                    alt
                  />
                </v-card-text>
              </v-card>
            </div>
          </div>
        </v-row>
        <v-row class="c-px-5 c-mt-10 justify-end">
          <v-btn color="red darken-4" dark @click="close">بستن</v-btn>
        </v-row>
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
      { text: "وضعیت انتشار", value: "status", align: "center" },
      { text: "ابزار", value: "actions", sortable: false, align: "center" },
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
    findTitle(id) {
      if (!id) return "";
      let title = "";
      this.$store.getters["workGroups"].forEach((element) => {
        if (element.children.find((child) => child.id == id) != undefined) {
          title = element.children.find((child) => child.id == id).title;
        }
      });
      return title;
    },
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