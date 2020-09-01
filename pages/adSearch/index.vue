<template>
  <div>
    <v-card>
      <v-row class="c-header c-rtl">
        <v-col cols="2">
          <v-card-title>جستجوی آگهی</v-card-title>
        </v-col>
      </v-row>
      <!-- <v-form class="c-form" ref="form" v-model="valid" lazy-validation> -->
      <v-form class="c-form" ref="form" lazy-validation>
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="formData.type"
              item-value="id"
              item-text="value"
              :items="listType"
              label="نوع آگهی"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="formData.status"
              :items="statusList"
              item-value="id"
              item-text="value"
              label="وضعیت آگهی"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="formData.title" label="عنوان آگهی" required></v-text-field>
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
          <v-col cols="4">
            <v-text-field v-model="formData.invitation_code" label="کد فراخوان" required></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="formData.resource" label="منبع"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="formData.adinviter_title" label="عنوان آگهی گذار "></v-text-field>
          </v-col>

          <v-col cols="4">
            <custom-date-picker
              placeholder="شروع "
              label="تاریخ فراخوان "
              v-model="formData.range_invitation_date['first']"
            ></custom-date-picker>
            <custom-date-picker
              placeholder="پایان"
              label="تاریخ فراخوان"
              v-model="formData.range_invitation_date['second']"
            ></custom-date-picker>
          </v-col>
          <v-col cols="4">
            <custom-date-picker
              placeholder="شروع "
              label="تاریخ ارسال"
              v-model="formData.range_submit_date['first']"
            ></custom-date-picker>
            <custom-date-picker
              placeholder="پایان "
              label="تاریخ ارسال"
              v-model="formData.range_submit_date['second']"
            ></custom-date-picker>
          </v-col>
          <v-col cols="4">
            <custom-date-picker
              placeholder="شروع "
              label="تاریخ دریافت"
              v-model="formData.range_receipt_date['first']"
            ></custom-date-picker>
            <custom-date-picker
              placeholder="پایان "
              label="تاریخ دریافت"
              v-model="formData.range_receipt_date['second']"
            ></custom-date-picker>
          </v-col>
          <v-col cols="4">
            <custom-date-picker
              placeholder="شروع "
              label="تاریخ بازگشایی"
              v-model="formData.range_start_date['first']"
            ></custom-date-picker>
            <custom-date-picker
              placeholder="پایان "
              label="تاریخ بازگشایی"
              v-model="formData.range_start_date['second']"
            ></custom-date-picker>
          </v-col>
          <v-col cols="4">
            <custom-date-picker
              placeholder="شروع "
              label="رایگان از تاریخ"
              v-model="formData.range_free_date['first']"
            ></custom-date-picker>
            <custom-date-picker
              placeholder="پایان "
              label="رایگان تا تاریخ"
              v-model="formData.range_free_date['second']"
            ></custom-date-picker>
          </v-col>

          <v-col cols="4">
            <ChooseWorkGroup
              :work_groups="this.$store.getters.workGroups"
              @selected_work_group_changed="fillSelected"
              ref="workGroups"
            />
          </v-col>

          <v-col cols="4">
            <v-file-input prepend-icon="mdi-camera" chips multiple label="آپلود عکس"></v-file-input>
          </v-col>
          <v-col cols="4">
            <v-select
              :items="staffStatusList"
              v-model="formData.is_nerve_center"
              item-text="value"
              item-value="id"
              label="وضعیت ستاد"
              required
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-textarea name="input-7-1" label="توضیحات" v-model="formData.description"></v-textarea>
          </v-col>
          <v-card-actions>
            <v-btn color="primary" @click="search">جستجو</v-btn>
            <v-btn color="warning" @click="resetFormData">پاک کردن فیلد ها</v-btn>
          </v-card-actions>
        </v-row>
      </v-form>
    </v-card>

    <v-data-table
      class="mt-5"
      @click:row="handleClick"
      v-model="selected"
      :headers="headers"
      :items="advertises"
      :server-items-length="meta.total"
      :loading="loading"
      :options.sync="options"
      show-select
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="showItem(item)">mdi-eye</v-icon>
      </template>
      <template v-slot:no-data>
        <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
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
              <li>
                <div>
                  <span>عنوان آگهی گذار</span>
                  <span>{{singleAdvertise.adinviter_title}}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>تاریخ انتشار :</span>
                  <span>{{singleAdvertise.created_at}}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>شرح :</span>
                  <span>{{singleAdvertise.description}}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>تاریخ بازگشایی :</span>
                  <span>{{singleAdvertise.free_date}}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>آی دی :</span>
                  <span>{{singleAdvertise.id}}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>عکس :‌</span>
                  <span>{{singleAdvertise.image}}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>ستاد :</span>
                  <span>{{singleAdvertise.is_nerve_center}}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>لینک :</span>
                  <span>{{singleAdvertise.link}}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>تاریخ دریافت :</span>
                  <span>{{singleAdvertise.receipt_date}}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>تاریخ فراخوان :</span>
                  <span>{{singleAdvertise.invitation_date}}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>منبع :‌</span>
                  <span>{{singleAdvertise.resource}}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>تاریخ شروع :‌</span>
                  <span>{{singleAdvertise.start_date}}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>وضعیت :‌</span>
                  <span>{{singleAdvertise.status}}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>تاریخ ارسال :</span>
                  <span>{{singleAdvertise.submit_date}}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>کد آگهی :‌</span>
                  <span>{{singleAdvertise.tender_code}}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>عنوان :‌</span>
                  <span>{{singleAdvertise.title}}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>نوع آگهی :</span>
                  <span>{{singleAdvertise.type}}</span>
                </div>
              </li>
              <li>
                <div
                  v-for="workGroup in singleAdvertise.work_groups"
                  :key="workGroup.id"
                >{{workGroup.title}}</div>
              </li>
              <li>
                <div
                  v-for="province in singleAdvertise.provinces"
                  :key="province.id"
                >{{province.name}}</div>
              </li>
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
import WorkGroupMixin from "~/mixins.js/chooseWorkGroupMixins.js";
export default {
  mixins: [WorkGroupMixin],
  data: () => ({
    meta: [],
    options: {},
    loading: true,
    valid: true,
    formData: {
      range_submit_date: {
        first: "",
        second: "",
      },
      range_receipt_date: {
        first: "",
        second: "",
      },
      range_invitation_date: {
        first: "",
        second: "",
      },
      range_start_date: {
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
      is_nerve_center: "",
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

    checkbox: false,
    singleSelect: false,
    headers: [
      { text: "کد آگهی", value: "tender_code" },
      { text: "کد فراخوان", value: "invitation_code" },
      { text: "عنوان آگهی", value: "title" },
      { text: "تاریخ انتشار", value: "created_at" },
      { text: "آگهی گذار", value: "adinviter_title" },
      { text: " تاریخ فراخوان", value: "invitation_date" },
      // { text: "دسته های کاری", value: "work_groups" },
      { text: "Actions", value: "actions", sortable: false },
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
      this.clearSelectedWorkGroups();
      this.formData = {
        range_submit_date: {
          first: "",
          second: "",
        },
        range_receipt_date: {
          first: "",
          second: "",
        },
        range_invitation_date: {
          first: "",
          second: "",
        },
        range_start_date: {
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
        is_nerve_center: "",
        work_groups: [],
      };
    },
    removeEmptyObjects(obj) {
      Object.keys(obj).map((key) => {
        if (key.includes("range")) {
          Object.keys(obj[key]).map((firstOrSecond) => {
            if (obj[key][firstOrSecond] == "") {
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
        console.log();
      });
      console.log(item);
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