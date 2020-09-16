<template>
  <div>
    <v-card class="c-pa-20">
      <v-toolbar flat>
        <v-toolbar-title>آگهی</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-col cols="5" style="    text-align: left;">
          <input
            type="file"
            name="uploadfile"
            id="img"
            @change="onFileChange"
            style="display:none;"
          />
          <label for="img" class="uploader-button">ورود اطلاعت با اکسل</label>
        </v-col>
      </v-toolbar>

      <v-form class="c-form" ref="form" v-model="valid" lazy-validation>
        <v-row class="rtl">
          <v-col class="rtl" cols="2">
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
            <v-text-field
              v-model="formData.title"
              :rules="[v => !!v || 'Item is required']"
              label="عنوان آگهی"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="2">
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
              v-model="formData.adinviter_title"
              label="عنوان آگهی گذار "
              :rules="[v => !!v || 'Item is required']"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="formData.resource"
              label="منبع"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="2">
            <v-text-field
              id="call-date"
              v-model="formData.invitation_date"
              prepend-inner-icon="mdi-calendar"
              label="تاریخ فراخوان"
            ></v-text-field>
            <custom-date-picker
              v-model="formData.invitation_date"
              element="call-date"
            ></custom-date-picker>
          </v-col>
          <v-col cols="2">
            <v-text-field
              id="send-date"
              v-model="formData.submit_date"
              prepend-inner-icon="mdi-calendar"
              label="تاریخ ارسال"
            ></v-text-field>
            <custom-date-picker
              v-model="formData.submit_date"
              element="send-date"
            ></custom-date-picker>
          </v-col>
          <v-col cols="2">
            <v-text-field
              id="receive-date"
              v-model="formData.receipt_date"
              prepend-inner-icon="mdi-calendar"
              label="تاریخ دریافت"
            ></v-text-field>
            <custom-date-picker
              v-model="formData.receipt_date"
              element="receive-date"
            ></custom-date-picker>
          </v-col>
          <v-col cols="2">
            <v-text-field
              id="open-date"
              v-model="formData.start_date"
              prepend-inner-icon="mdi-calendar"
              label="تاریخ بازگشایی"
            ></v-text-field>
            <custom-date-picker
              placeholder="تاریخ بازگشایی"
              v-model="formData.start_date"
              element="open-date"
            ></custom-date-picker>
          </v-col>
          <v-col cols="2">
            <v-text-field
              id="free-date"
              v-model="formData.free_date"
              prepend-inner-icon="mdi-calendar"
              :clearable="true"
              label="رایگان از تاریخ"
            ></v-text-field>
            <custom-date-picker
              placeholder="رایگان از تاریخ"
              v-model="formData.free_date"
              element="free-date"
            ></custom-date-picker>
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
          <v-col cols="8">
            <ChooseWorkGroup
              :dis="formData.type == undefined"
              :work_groups="workGroups"
              ref="workGroups"
              @selected_work_group_changed="selectedWorkGroupChanged"
              :multiple="true"
            />
            <!-- <v-combobox v-model="work_groups" :items="items" label="گروه های کاری" multiple></v-combobox> -->
          </v-col>

          <v-col cols="4">
            <v-file-input
              prepend-inner-icon="mdi-camera"
              prepend-icon
              chips
              multiple
              label="آپلود عکس"
            ></v-file-input>
          </v-col>
          <v-col cols="12">
            <v-textarea
              name="input-7-1"
              outlined
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
            :disabled="!valid || isLoading"
            color="success"
            class="mr-4"
            type="button"
            @click.prevent="editItem"
            >به روز رسانی اطلاعت</v-btn
          >
          <v-btn
            color="warning"
            class="mr-4"
            @click.prevent="backToShowMode"
            type="button"
            >انصراف</v-btn
          >
        </div>
        <div v-else>
          <v-btn
            :disabled="!valid || isLoading"
            color="success"
            class="mx-4"
            type="button"
            width="120"
            @click.prevent="sendData"
            >ذخیره</v-btn
          >

          <v-btn
            color="primary"
            class="mx-4"
            @click.prevent="search"
            type="button"
            width="120"
            >جستجو</v-btn
          >
          <v-btn width="120" class="mx-4" color="warning" @click="resetFormData"
            >پاک کردن فیلد ها</v-btn
          >
        </div>
      </v-card-actions>
    </v-card>
    <v-card class="c-pa-20 c-mt-20">
      <v-toolbar flat>
        <v-toolbar-title>لیست آگهی‌ها</v-toolbar-title>
      </v-toolbar>

      <v-menu bottom origin="center center" transition="scale-transition">
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            @click="buttonActions(item.title)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-data-table
        class="mt-5 rtl c-table"
        v-model="selected"
        disable-sort
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
        <template v-slot:item.created_at="{ item }">{{
          item.created_at
        }}</template>
        <template v-slot:item.actions="{ item }">
          <div class="buttons-container">
            <v-icon
              small
              class="mr-1"
              color="blue lighten-2"
              @click="turnToEditMode(item)"
              >mdi-pencil</v-icon
            >
            <deleteConfirmationDialog @delete="deleteItem(item)" />

            <v-icon small class="mr-1" @click="showItem(item)">mdi-eye</v-icon>
          </div>
        </template>
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
              <v-card-text>{{ singleAdvertise.id }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card>
              <v-card-title>عنوان</v-card-title>
              <v-card-text>{{ singleAdvertise.title }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card>
              <v-card-title>کد آسان‌تندر</v-card-title>
              <v-card-text>{{ singleAdvertise.tender_code }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card>
              <v-card-title>وضعیت</v-card-title>
              <v-card-text>{{
                singleAdvertise.status == 0 ? "انتشار یافته" : "در حال بررسی"
              }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card>
              <v-card-title>عنوان آگهی گذار</v-card-title>
              <v-card-text>{{ singleAdvertise.adinviter_title }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card>
              <v-card-title>منبع</v-card-title>
              <v-card-text>{{ singleAdvertise.resource }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="2">
            <v-card>
              <v-card-title>تاریخ انتشار</v-card-title>
              <v-card-text>{{ singleAdvertise.created_at }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="2">
            <v-card>
              <v-card-title>تاریخ بازگشایی</v-card-title>
              <v-card-text>{{ singleAdvertise.free_date }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="2">
            <v-card>
              <v-card-title>تاریخ دریافت</v-card-title>
              <v-card-text>{{ singleAdvertise.receipt_date }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="2">
            <v-card>
              <v-card-title>تاریخ فراخوان</v-card-title>
              <v-card-text>{{ singleAdvertise.invitation_date }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="2">
            <v-card>
              <v-card-title>تاریخ شروع</v-card-title>
              <v-card-text>{{ singleAdvertise.start_date }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="2">
            <v-card>
              <v-card-title>تاریخ ارسال</v-card-title>
              <v-card-text>{{ singleAdvertise.submit_date }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="9">
            <v-card>
              <v-card-title>شرح</v-card-title>
              <v-card-text>{{ singleAdvertise.description }}</v-card-text>
            </v-card>
            <v-card class="c-mt-20">
              <v-card-title>لینک</v-card-title>
              <v-card-text>{{ singleAdvertise.link }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card>
              <v-card-title>عکس ضمیمه</v-card-title>
              <v-card-text>
                <img
                  class="thumbnaail-image"
                  src="https://placehold.co/300x300"
                  alt
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">بستن</v-btn>
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
import searchOnWorkGroupsMixins from "~/mixins.js/searchOnWorkGroupsMixins.js";
import WorkGroupMixin from "~/mixins.js/chooseWorkGroupMixins.js";
import deleteConfirmationDialog from "~/components/general/deleteConfirmationDialog";

export default {
  mixins: [searchOnWorkGroupsMixins, WorkGroupMixin],
  components: {
    deleteConfirmationDialog
  },
  computed: {
    formDataType() {
      return this.formData.type;
    }
  },
  watch: {
    formDataType() {
      this.filters.type = this.formData.type;
      this.workGroupSearch();
    },
    options: {
      handler() {
        this.getDataFromApi().then(data => {
          this.desserts = data.items;
          this.totalDesserts = data.total;
        });
      },
      deep: true
    }
  },
  data: () => ({
    excel_file: "",
    options: {},
    meta: [],
    loading: true,
    menu: false,
    wgDialog: false,
    valid: true,
    formData: {
      description: "",
      type: "",
      status: "",
      provinces: [],
      work_groups: [],
      title: "",
      invitation_code: "",
      resource: "",
      adinviter_title: "",
      is_nerve_center: "",
      invitation_date: "",
      submit_date: "",
      receipt_date: "",
      start_date: "",
      free_date: ""
    },
    items: ["Programming", "Design", "Vue", "Vuetify"],

    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    selected: [],
    listType: [
      {
        id: "AUCTION",
        value: "مزایده"
      },
      {
        id: "TENDER",
        value: "مناقصه"
      },
      {
        id: "INQUIRY",
        value: "استعلام"
      }
    ],
    statusList: [
      {
        id: "0",
        value: "در حال بررسی"
      },
      {
        id: "1",
        value: "انتشار یافته"
      }
    ],
    isNerveCenterList: [
      {
        id: "1",
        value: "ستادی"
      },
      {
        id: "0",
        value: "غیر ستادی"
      }
    ],
    staffStatusList: [
      {
        value: "ستاد",
        id: "1"
      },
      {
        value: "غیر ستاد",
        id: "0"
      }
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
      { text: "ابزار", value: "actions", sortable: false, align: "left" }
    ],
    advertises: [],
    editedIndex: -1,
    showItemDialog: false,
    singleAdvertise: {},
    items: [
      { title: "انتشار آگهی" },
      { title: "تغییر به حالت بررسی" },
      { title: "تغییر گروه‌کاری" },
      { title: "حذف" }
    ],

    advertiseId: "",
    editMode: false
  }),

  methods: {
    async editItem() {
      this.isLoading = true;
      if (
        false
        // this.formData.status == 1
        // !this.isWorkGruopsSelected("workGroups")
      ) {
        this.showSnackbar(
          "آگهی انتشار یافته نمیتواند فاقد دسته ی کاری باشد",
          "red"
        );
      } else {
        try {
          await this.$axios
            .$put("advertise/update/" + this.advertiseId, this.formData)
            .then(() => {
              this.isLoading = false;
              this.showSnackbar("آگهی به روز رسانی شد", "green");
              this.backToShowMode();
              this.editMode = false;
              setTimeout(() => {
                this.resetFormData();
                this.search();
              }, 1500);
            })
            .catch(() => {
              this.isLoading = false;
              Object.values(this.$store.getters["errorHandling/errors"]).map(
                error => {
                  this.showSnackbar(error[0], "red");
                }
              );
            });
        } catch (error) {}
      }
    },
    backToShowMode() {
      this.resetFormData();
      this.editMode = false;
      this.advertiseId = "";
      this.getDataFromApi();
    },
    resetFormDataWithoutType() {
      this.advertiseId = "";
      this.clearSelectedWorkGroups("workGroups");
      this.formData = {
        work_groups: [],
        description: "",
        type: this.formData.type,
        status: "",
        provinces: [],
        title: "",
        invitation_code: "",
        resource: "",
        adinviter_title: "",
        is_nerve_center: "",
        invitation_date: "",
        submit_date: "",
        receipt_date: "",
        start_date: "",
        free_date: ""
      };
    },
    resetFormData() {
      this.advertiseId = "";
      this.clearSelectedWorkGroups("workGroups");
      this.formData = {
        work_groups: [],
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
        submit_date: "",
        receipt_date: "",
        start_date: "",
        free_date: ""
      };
    },
    turnToEditMode(item) {
      this.resetFormData();
      this.editMode = true;
      this.advertiseId = item.id;
      this.$axios.$get("advertise/show/" + item.id).then(({ data }) => {
        this.formData = JSON.parse(JSON.stringify(data));
        this.formData.is_nerve_center = this.formData.is_nerve_center.toString();

        this.fillSelected("formData", "workGroups");
      });
    },
    showItem(item) {
      this.showItemDialog = true;
      this.callShowAdvertise("singleAdvertise", item);
    },
    deleteItem(item) {
      try {
        this.advertises.splice(this.advertises.indexOf(item), 1);
        this.$axios
          .$delete("advertise/" + item.id)
          .then(response => {
            setTimeout(() => {
              this.resetFormData();
              this.search();
            }, 1500);
            this.showSnackbar("آگهی با موفقیت حذف شد", "success");
          })
          .catch(error => {
            Object.values(this.$store.getters["errorHandling/errors"]).map(
              error => {
                this.showSnackbar(error[0], "red");
              }
            );
          });
      } catch (error) {
        console.log(error);
      }
    },
    async callShowAdvertise(fillableValue, item) {
      try {
        let something = await this.$axios.$get("advertise/show/" + item.id);
        this[fillableValue] = something.data;
      } catch (error) {
        console.log(error);
      }
    },
    async onFileChange(e) {
      let formData = new FormData();
      const file = e.target.files[0];
      formData.append("excel_file", file);
      e.target.value = "";
      try {
        await this.$axios
          .$post("advertise/excel/create", formData)
          .then(response => {
            setTimeout(() => {
              this.resetFormData();
              this.search();
            }, 1500);
            this.showSnackbar("آگهی های اکسل با موفقیت اضافه شدند", "green");
          });
      } catch (error) {
        Object.values(this.$store.getters["errorHandling/errors"]).map(
          error => {
            this.showSnackbar(error[0], "red");
          }
        );
      }
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
              ...this.formData
            }
          )
          .then(response => {
            this.meta = response.meta;
            this.advertises = response.data;
            this.loading = false;
          });
      });
    },
    sendData() {
      this.$refs.form.validate();
      this.isLoading = true;
      if (
        this.formData.status == 1 &&
        !this.isWorkGruopsSelected("workGroups")
      ) {
        this.showSnackbar(
          "آگهی انتشار یافته نمیتواند فاقد دسته ی کاری باشد",
          "red"
        );
      } else {
        try {
          this.$axios
            .$post("advertise/create", this.formData)
            .then(response => {
              this.isLoading = false;
              this.showSnackbar("آگهی با موفقیت اضافه شد", "green");
              setTimeout(() => {
                this.resetFormDataWithoutType();
                this.search();
              }, 1500);
            })
            .catch(error => {
              this.isLoading = false;
              Object.values(this.$store.getters["errorHandling/errors"]).map(
                error => {
                  this.showSnackbar(error[0], "red");
                }
              );
            });
        } catch (error) {
          this.showSnackbar("فیلد ها را به درستی کامل کنید", "red");
        }
      }
      // this.$refs.form.resetValidation();
      // send axios to backend and add refresh data
    },
    search() {
      let newFormData = this.removeEmptyObjects(this.formData);
      this.getDataFromApi();
    },
    removeEmptyObjects(obj) {
      Object.keys(obj).map(key => {
        if (obj[key] == "" || obj[key] == undefined || obj[key] == null) {
          delete obj[key];
        }
      });
      return obj;
    },
    close() {
      this.singleAdvertise = "";
      this.showItemDialog = false;
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
    }
  }
};
</script>

<style lang="scss" scoped>
.wg-dialog {
  padding: 50px;
  width: 800px;
}
</style>
