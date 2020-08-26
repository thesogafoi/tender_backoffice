<template>
  <div>
    <v-card>
      <v-row class="c-header c-rtl">
        <v-col cols="2">
          <v-card-title>آگهی</v-card-title>
        </v-col>
        <v-col cols="5">
          <input type="file" @change="onFileChange" class="button-uploader ml-5" />
        </v-col>
      </v-row>
      <v-form class="c-form" ref="form" v-model="valid" lazy-validation>
        <v-row class="c-rtl">
          <v-col class="c-rtl" cols="4">
            <v-select
              v-model="formData.type"
              item-value="id"
              item-text="value"
              :items="listType"
              :rules="[v => !!v || 'Item is required']"
              label="نوع آگهی"
              required
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="formData.status"
              :items="statusList"
              item-value="id"
              item-text="value"
              :rules="[v => !!v || 'Item is required']"
              label="وضعیت آگهی"
              required
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="formData.title"
              :rules="[v => !!v || 'Item is required']"
              label="عنوان آگهی"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-select
              :items="$store.state.cityList"
              v-model="formData.provinces"
              item-text="name"
              item-value="id"
              label="استان"
              multiple
              :rules="[v => !!v || 'Item is required']"
              required
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="formData.invitation_code"
              :rules="[v => !!v || 'Item is required']"
              label="کد فراخوان"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="formData.resource"
              :rules="[v => !!v || 'Item is required']"
              label="منبع"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="formData.adinviter_title"
              :rules="[v => !!v || 'Item is required']"
              label="عنوان آگهی گذار "
              required
            ></v-text-field>
          </v-col>

          <v-col cols="4">
            <custom-date-picker label="تاریخ فراخوان" v-model="formData.invitation_date"></custom-date-picker>
          </v-col>
          <v-col cols="4">
            <custom-date-picker label="تاریخ ارسال" v-model="formData.submit_date"></custom-date-picker>
          </v-col>
          <v-col cols="4">
            <custom-date-picker label="تاریخ دریافت" v-model="formData.receipt_date"></custom-date-picker>
          </v-col>
          <v-col cols="4">
            <custom-date-picker label="تاریخ بازگشایی" v-model="formData.start_date"></custom-date-picker>
          </v-col>
          <v-col cols="4">
            <custom-date-picker label="رایگان از تاریخ" v-model="formData.free_date"></custom-date-picker>
          </v-col>

          <v-col cols="4">
            <ChooseWorkGroup
              :work_groups="this.$store.getters.workGroups"
              @selected_work_group_changed="fillSelected"
            />
            <!-- <v-combobox v-model="work_groups" :items="items" label="گروه های کاری" multiple></v-combobox> -->
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
              :rules="[v => !!v || 'Item is required']"
              label="وضعیت ستاد"
              required
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-textarea
              name="input-7-1"
              :rules="[v => !!v || 'Item is required']"
              label="توضیحات"
              v-model="formData.description"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions>
        <div v-if="editMode">
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            type="button"
            @click.prevent="editItem"
          >به روز رسانی اطلاعت</v-btn>
          <v-btn color="warning" class="mr-4" @click.prevent="backToShowMode" type="button">انصراف</v-btn>
        </div>
        <div v-else>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            type="button"
            @click.prevent="sendData"
          >ذخیره</v-btn>

          <v-btn color="primary" class="mr-4" @click.prevent="search" type="button">جستجو</v-btn>
        </div>
      </v-card-actions>
    </v-card>
    <v-card class="table">
      <v-menu bottom origin="center center" transition="scale-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mt-5 ml-5"
            color="primary "
            v-model="menu"
            dark
            v-bind="attrs"
            v-on="on"
          >Scale Transition</v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i" @click="buttonActions(item.title)">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-data-table
        class="mt-5"
        v-model="selected"
        :headers="headers"
        :items="advertises"
        :server-items-length="meta.total"
        :loading="loading"
        :options.sync="options"
        show-select
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="showAsEditFile(item)">mdi-pencil</v-icon>
          <v-icon small @click="showItem(item)">mdi-eye</v-icon>
        </template>
        <template v-slot:no-data>
          <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
        </template>
      </v-data-table>
    </v-card>
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
                >{{workGroup.name}}</div>
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
    <!-- change work group dialog -->

    <v-dialog v-model="wgDialog" width="800">
      <v-row justify="center">
        <v-card class="wg-dialog">
          <v-card-title>
            <span class="headline">تعین گروه کاری</span>
          </v-card-title>
          <v-col cols="12">
            <!-- <v-combobox v-model="select" :items="items" label="گروه کاری" multiple></v-combobox> -->
          </v-col>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text>بستن</v-btn>
            <v-btn color="blue darken-1" text>ذخیره</v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-dialog>
  </div>
</template>

<script>
export default {
  created() {},
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
  data: () => ({
    excel_file: "",
    options: {},
    meta: [],
    pagination: [],
    loading: true,
    menu: false,
    wgDialog: false,
    valid: true,
    formData: {
      description: "",
      type: "",
      status: "",
      provinces: [],
      title: "",
      invitation_code: "",
      resource: "",
      adinviter_title: "",
      is_nerve_center: "",
      invitation_date: "",
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
    items: [
      { title: "انتشار آگهی" },
      { title: "تغییر به حالت بررسی" },
      { title: "تغییر گروه‌کاری" },
      { title: "حذف" },
    ],

    advertiseId: "",
    editMode: false,
  }),

  methods: {
    editItem() {
      //send data to database
      this.$axios.$put("advertise/update/" + this.advertiseId, this.formData);
      this.backToShowMode();
      // this.$refs.form.resetValidation();
      // this.editMode = false;
      // this.advertiseId = ''
    },
    backToShowMode() {
      this.formData = [];
      this.$refs.form.resetValidation();
      this.editMode = false;
      this.advertiseId = "";
      this.getDataFromApi();
    },
    showAsEditFile(item) {
      this.editMode = true;
      this.advertiseId = item.id;
      this.$axios.$get("advertise/show/" + item.id).then((response) => {
        this.formData = response.data;
      });
    },
    async onFileChange(e) {
      let formData = new FormData();
      const file = e.target.files[0];
      formData.append("excel_file", file);
      e.target.value = "";
      await this.$axios
        .post("advertise/excel/create", formData)
        .then((response) => {});
    },

    fillSelected(data) {
      this.formData.work_groups = data;
    },
    getDataFromApi() {
      this.loading = true;
      this.$refs.form.resetValidation();
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
    sendData() {
      this.$refs.form.validate();
      this.$axios.$post("advertise/create", this.formData).then((response) => {
        // do something here for show result
        this.getDataFromApi();
      });
      // this.$refs.form.reset();
      // this.$refs.form.resetValidation();
      // send axios to backend and add refresh data
    },
    search() {
      let newFormData = this.removeEmptyObjects(this.formData);
      this.getDataFromApi();
    },
    removeEmptyObjects(obj) {
      Object.keys(obj).map((key) => {
        if (obj[key] == "" || obj[key] == undefined || obj[key] == null) {
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
    deleteItem() {
      this.advertises.splice(selected, 1);
    },
    buttonActions(title) {
      if (title === "حذف") {
        confirm("آیا میخواهید پاک شود؟") && this.deleteItem();
      } else if (title === "انتشار آگهی") {
        confirm("آیا میخواهید آگهی انتشار یابد؟");
      } else if (title === "تغییر به حالت بررسی") {
        confirm("آیا مطمئن هستید؟");
      } else if (title === "تغییر گروه‌کاری") {
        this.wgDialog = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wg-dialog {
  padding: 50px;
  width: 800px;
}
</style>