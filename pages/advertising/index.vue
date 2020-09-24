<template>
  <div>
    <v-card class="c-px-20 c-pb-5 c-pt-5">
      <v-form class="c-form c-pb-0" ref="form" v-model="valid" lazy-validation>
        <v-row class="rtl">
          <div class="w-15 c-px-10">
            <v-select
              v-model="formData.status"
              :items="statusList"
              item-value="id"
              item-text="value"
              :rules="[v => !!v || 'Item is required']"
              label="وضعیت آگهی"
              required
            ></v-select>
          </div>
          <div class="w-10 c-px-10">
            <v-select
              v-model="formData.type"
              item-value="id"
              item-text="value"
              :items="listType"
              :rules="[v => !!v || 'Item is required']"
              label="نوع آگهی"
              required
            ></v-select>
          </div>
          <div class="w-40 c-px-10">
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
          </div>
          <div class="w-20 c-px-10">
            <v-text-field
              v-model="formData.invitation_code"
              :rules="[v => !!v || 'Item is required']"
              label="کد فراخوان"
              required
            ></v-text-field>
          </div>
          <div class="w-15 c-px-10">
            <v-text-field v-model="formData.resource" label="منبع" required></v-text-field>
          </div>
          <div class="w-35 c-px-10">
            <v-text-field
              v-model="formData.title"
              :rules="[v => !!v || 'Item is required']"
              label="عنوان آگهی"
              required
            ></v-text-field>
          </div>

          <div class="w-30 c-px-10">
            <v-text-field
              v-model="formData.adinviter_title"
              label="عنوان آگهی گذار "
              :rules="[v => !!v || 'Item is required']"
              required
            ></v-text-field>
          </div>
          <div class="w-20 c-px-10">
            <v-text-field label="دستگاه مرکزی " disabled></v-text-field>
          </div>
          <div class="w-15 c-px-10">
            <v-select
              v-model="formData.is_nerve_center"
              :items="isNerveCenterList"
              item-value="id"
              item-text="value"
              :rules="[v => !!v || 'Item is required']"
              label="وضعیت ستاد"
              required
            ></v-select>
          </div>
          <div class="w-20 c-px-10">
            <v-text-field
              id="call-date"
              v-model="formData.invitation_date"
              prepend-inner-icon="mdi-calendar"
              label="تاریخ فراخوان"
            ></v-text-field>
            <custom-date-picker v-model="formData.invitation_date" element="call-date"></custom-date-picker>
          </div>
          <div class="w-20 c-px-10">
            <v-text-field
              id="receive-date"
              v-model="formData.receipt_date"
              prepend-inner-icon="mdi-calendar"
              label="تاریخ دریافت"
            ></v-text-field>
            <custom-date-picker v-model="formData.receipt_date" element="receive-date"></custom-date-picker>
          </div>
          <div class="w-20 c-px-10">
            <v-text-field
              id="send-date"
              v-model="formData.submit_date"
              prepend-inner-icon="mdi-calendar"
              label="تاریخ ارسال"
            ></v-text-field>
            <custom-date-picker v-model="formData.submit_date" element="send-date"></custom-date-picker>
          </div>

          <div class="w-20 c-px-10">
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
          </div>

          <div class="w-20 c-px-10">
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
          </div>
          <div class="w-40 c-px-10 d-flex align-center">
            <!-- <ChooseWorkGroup
              :dis="formData.type == undefined"
              :work_groups="workGroups"
              ref="workGroups"
              @selected_work_group_changed="selectedWorkGroupChanged"
              :multiple="true"
            />-->
            <!-- <v-combobox v-model="work_groups" :items="items" label="گروه های کاری" multiple></v-combobox> -->
            <!-- <v-text-field
              label="گروه‌های کاری"
              @click=""
            ></v-text-field>-->
            <v-btn
              @click="workGroupModal=true"
              :disabled="formData.type == undefined ||
              formData.type == ''"
              class="w-48 c-ml-10"
            >انتخاب دسته های کاری</v-btn>
            <v-btn class="w-50" disabled>

            <span v-if="formData.work_groups">
              <span v-if="formData.work_groups.length === 0">دسته کاری انتخاب نشده</span>
              <span
                v-if="formData.work_groups.length >0"
              >{{formData.work_groups.length}} دسته کاری انتخاب شده</span>
            </span>
            </v-btn>
            <workingGroupsModal
              v-if="workGroupModal"
              :modal="workGroupModal"
              :props_selected.sync="formData.work_groups"
              :type="formData.type"
              @close_modal="workGroupModal= false"
              @add_selected="childSeleted"
            />

            <workingGroupsModal
              v-if="workGroupModalAction"
              :modal="workGroupModalAction"
              :props_selected.sync="work_groups_action"
              type="action"
              @close_modal="workGroupModalAction= false"
              @add_selected="actionChildSeleted"
            />
          </div>
          <div class="w-40 c-px-10">
            <v-text-field v-model="formData.link" label="لینک"></v-text-field>
          </div>
          <div class="w-20 c-px-10">
            <v-file-input
              prepend-inner-icon="mdi-camera"
              prepend-icon
              chips
              multiple
              label="آپلود عکس"
            ></v-file-input>
          </div>
          <div class="w-100 c-px-10">
            <v-textarea
              name="input-7-1"
              outlined
              :rules="[v => !!v || 'Item is required']"
              label="شرح آگهی"
              v-model="formData.description"
            ></v-textarea>
          </div>
        </v-row>
      </v-form>
      <v-card-actions class="justify-end c-pt-0">
        <div class="w-25 c-mr-20 d-flex align-center">
            <v-select
              :items="activityDrop"
              v-model="choosed_action"
              item-text="name"
              item-value="id"
              label="عملیات"
            ></v-select>
            <v-btn
              color="primary "
              type="button"
              class="c-mr-10"
              width="120"
              @click.prevent="sendAction"
            >اعمال تغییرات</v-btn>
          </div>
        <v-spacer></v-spacer>
        <div v-if="editMode">
          <v-btn color="red darken-4" dark @click.prevent="backToShowMode" type="button">انصراف</v-btn>
          <v-btn
            :disabled="!valid || isLoading"
            color="success"
            class="c-mr-10"
            type="button"
            @click.prevent="editItem"
          >به روز رسانی اطلاعت</v-btn>
        </div>
        <div v-else class="d-flex align-center justify-end">
          <v-btn width="120" color="red darken-4" dark @click="resetFormData">پاک کردن فیلد ها</v-btn>
          <v-btn
            color="primary"
            class="c-mx-10"
            @click.prevent="search"
            type="button"
            width="120"
          >جستجو</v-btn>

          <v-btn
            :disabled="!valid || isLoading"
            color="success"
            type="button"
            class="c-ml-10"
            width="120"
            @click.prevent="sendData"
          >ذخیره</v-btn>
          <div>
            <input
              type="file"
              name="uploadfile"
              id="img"
              @change="onFileChange"
              style="display:none;"
            />
            <label for="img" class="uploader-button">ورود اطلاعات با اکسل</label>
          </div>
          
        </div>
      </v-card-actions>
    </v-card>
    <v-card class="c-px-20 c-pb-5 c-pt-5 c-mt-20">
      <!-- <v-toolbar flat>
        <v-toolbar-title>لیست آگهی‌ها</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>-->

      <v-menu bottom origin="center center" transition="scale-transition">
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i" @click="buttonActions(item.title)">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-data-table
        class="mt-5 rtl c-table"
        v-model="advertises_action"
        disable-sort
        :headers="headers"
        :items="advertises"
        :single-select="false"
        :server-items-length="meta.total"
        :loading="loading"
        :options.sync="options"
        show-select
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50]
        }"
      >
        <template v-slot:item.created_at="{ item }">
          {{
          item.created_at
          }}
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="buttons-container">
            <v-icon
              small
              class="mr-1"
              color="blue lighten-2"
              @click="turnToEditMode(item)"
            >mdi-pencil</v-icon>
            <deleteConfirmationDialog @delete="deleteItem(item)" />

            <v-icon small class="mr-1" @click="showItem(item)">mdi-eye</v-icon>
          </div>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">آگهی وجود ندارد</v-btn>
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
                  singleAdvertise.status == 0 ? "انتشار یافته" : "در حال بررسی"
                  }}
                </p>
              </v-card-text>
            </v-card>
          </div>
          <div class="w-15 c-px-5 c-my-5 child-col">
            <v-card>
              <v-card-text class="d-flex c-py-10 flex-wrap">
                <h4 class="rtl c-ml-5">نوع آگهی:</h4>
                <p class="c-mb-0" v-if="singleAdvertise.type === 'AUCTION'">مزایده</p>
                <p class="c-mb-0" v-if="singleAdvertise.type === 'TENDER'">مناقصه</p>
                <p class="c-mb-0" v-if="singleAdvertise.type === 'INQUIRY'">استعلام</p>
              </v-card-text>
            </v-card>
          </div>
          <div class="w-50 c-px-5 c-my-5 child-col">
            <v-card>
              <v-card-text class="d-flex c-py-10 flex-wrap">
                <h4 class="rtl c-ml-5">استان:</h4>
                <div class="city" v-for="(city,i) in $store.state.cityList" :key="i">
                  <p
                    class="c-mb-0"
                    v-for="(province,index) in singleAdvertise.provinces"
                    :key="index"
                  >
                    <span v-if="province == city.id">{{city.name}}</span>
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
                <p class="c-mb-0" v-if="singleAdvertise.is_nerve_center">ستادی</p>
                <p class="c-mb-0" v-if="!singleAdvertise.is_nerve_center">غیر ستادی</p>
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
                  v-for="(workingGroup,index) in singleAdvertise.work_groups"
                  :key="index"
                >{{ workingGroup.title }} /</p>
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

            <div class="w-20 c-px-5 child-col">
              <v-card>
                <v-card-text class="c-py-10">
                  <h4 class="rtl c-mb-10">عکس ضمیمه:</h4>
                  <img class="thumbnaail-image" src="https://placehold.co/300x300" alt />
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
import workingGroupsModal from "~/components/workGroupModal";

export default {
  mixins: [searchOnWorkGroupsMixins, WorkGroupMixin],
  components: {
    deleteConfirmationDialog,
    workingGroupsModal,
  },
  computed: {
    formDataType() {
      return this.formData.type;
    },
  },
  watch: {
    choosed_action() {
      if (this.choosed_action == 0) {
        this.workGroupModalAction = true;
      }
    },
    formDataType() {
      this.filters.type = this.formData.type;
      this.workGroupSearch();
    },
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
    workGroupModalAction: false,
    work_groups_action: [],
    choosed_action: [],
    advertises_action: [],
    workGroupsTitle: [],
    workGroupModal: false,
    activityDrop: [
      {
        name: "تعریف و تغییر گروه‌کاری",
        id: 0,
      },
      {
        name: "انتقال وضعیت به در حال بررسی",
        id: 1,
      },
      {
        name: "انتقال وضعیت به انتشار یافته",
        id: 2,
      },
      {
        name: "حذف",
        id: 3,
      },
    ],
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
      free_date: "",
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
    advertises_action: [],
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
    isNerveCenterList: [
      {
        id: "1",
        value: "ستادی",
      },
      {
        id: "0",
        value: "غیر ستادی",
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

    isLoading: false,

    checkbox: false,
    singleSelect: false,
    headers: [
      { text: "کد آسان تندر", value: "tender_code" },
      { text: "کد فراخوان", value: "invitation_code" },
      { text: "عنوان آگهی", value: "title" },
      { text: "تاریخ انتشار", value: "created_at" },
      { text: "آگهی گذار", value: "adinviter_title" },
      { text: "وضعیت انتشار", value: "status" },
      { text: "ابزار", value: "actions", sortable: false, align: "center" },
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
    sendAction() {
      let advertiseId = [];
      if (
        this.advertises_action.length == 0 ||
        this.choosed_action.length == 0
      ) {
        this.showSnackbar(
          "لطفا آگهی ها یا عملیات مورد نظر را انتخاب کنید",
          "red"
        );
        return;
      }
      this.advertises_action.forEach((advertise) => {
        advertiseId.push(advertise.id);
      });
      // we need axio here
      let requestData = {};

      if (this.choosed_action == 0) {
        if (this.work_groups_action.length == 0) {
          this.showSnackbar(
            "لطفا دسته ی کاری مورد نظر را انتخاب نمایید",
            "red"
          );
          return;
        }
        requestData = {
          action: this.choosed_action,
          advertises_action: advertiseId,
          work_groups_action: this.work_groups_action,
        };
      } else {
        requestData = {
          action: this.choosed_action,
          advertises_action: advertiseId,
        };
      }
      if (this.choosed_action == 3) {
        confirm("برای پاک کردن آگهی هااطمینان دارید ؟");
      }
      this.$axios
        .$post("advertises/action", requestData)
        .then((response) => {
          this.advertises_action = [];
          this.work_groups_action = [];
          this.action = "";
          this.getDataFromApi();
          this.showSnackbar("تغییرات انجام شد", "green");
        })
        .catch((error) => {
          Object.values(this.$store.getters["errorHandling/errors"]).map(
            (error) => {
              this.showSnackbar(error[0], "red");
            }
          );
        });
    },
    actionChildSeleted(e) {
      this.work_groups_action = [];
      if (e != undefined) {
        e.forEach((element) => {
          this.work_groups_action.push(element);
        });
      }
    },
    childSeleted(e) {
      this.formData.work_groups = [];
      this.workGroupsTitle = [];
      if (e != undefined) {
        e.forEach((element) => {
          this.formData.work_groups.push(element);
        });
      }
    },
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
                (error) => {
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
      this.workGroupsTitle = [];
      this.advertiseId = "";
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
        free_date: "",
      };
    },
    resetFormData() {
      this.workGroupsTitle = [];
      this.advertiseId = "";
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
        free_date: "",
      };
    },
    turnToEditMode(item) {
      this.resetFormData();
      this.editMode = true;
      this.advertiseId = item.id;
      this.$axios.$get("advertise/show/" + item.id).then(({ data }) => {
        this.formData = JSON.parse(JSON.stringify(data));
        this.formData.is_nerve_center = this.formData.is_nerve_center.toString();
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
          .then((response) => {
            setTimeout(() => {
              this.resetFormData();
              this.search();
            }, 1500);
            this.showSnackbar("آگهی با موفقیت حذف شد", "success");
          })
          .catch((error) => {
            Object.values(this.$store.getters["errorHandling/errors"]).map(
              (error) => {
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
          .then((response) => {
            setTimeout(() => {
              this.resetFormData();
              this.search();
            }, 1500);
            this.showSnackbar("آگهی های اکسل با موفقیت اضافه شدند", "green");
          });
      } catch (error) {
        Object.values(this.$store.getters["errorHandling/errors"]).map(
          (error) => {
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
      this.isLoading = true;
      if (
        this.formData.status == 1
        // !this.isWorkGruopsSelected("workGroups")
      ) {
        this.showSnackbar(
          "آگهی انتشار یافته نمیتواند فاقد دسته ی کاری باشد",
          "red"
        );
      } else {
        try {
          this.$axios
            .$post("advertise/create", this.formData)
            .then((response) => {
              this.isLoading = false;
              this.showSnackbar("آگهی با موفقیت اضافه شد", "green");
              setTimeout(() => {
                this.resetFormDataWithoutType();
                this.search();
              }, 1500);
            })
            .catch((error) => {
              this.isLoading = false;
              Object.values(this.$store.getters["errorHandling/errors"]).map(
                (error) => {
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
      Object.keys(obj).map((key) => {
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
