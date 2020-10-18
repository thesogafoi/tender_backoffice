<template>
  <div>
    <v-data-table
      :items="bannersData"
      sort-by="calories"
      class="elevation-1"
      disable-sort
      :headers="headers"
      :loading="loading"
      :options.sync="options"
      :server-items-length="meta.total"
      :footer-props="{
        'items-per-page-options': [5, 10, 20, 30, 40],
      }"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="font-16">تبلیغات </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="success" dark class="mb-2" @click="openAddModal"
            >افزودن تبلیغ</v-btn
          >
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title
                class="justify-center primary font-16 white--text c-py-10"
              >
                اضافه کردن بنر
              </v-card-title>

              <v-card-text class="c-pb-0">
                <v-container>
                  <v-row>
                    <v-col cols="6" class="c-py-0">
                      <v-text-field
                        v-model="bannerData.title"
                        label="عنوان بنر"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="c-py-0">
                      <v-text-field
                        v-model="bannerData.link"
                        type="text"
                        label="لینک"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="c-py-0">
                      <custom-date-picker
                        label="تاریخ شروع"
                        v-model="bannerData.start_date"
                        element="startDate"
                      ></custom-date-picker>
                      <v-text-field
                        v-model="bannerData.start_date"
                        id="startDate"
                        type="text"
                        label="تاریخ شروع"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="c-py-0">
                      <custom-date-picker
                        label="تاریخ انقضا"
                        v-model="bannerData.expire_date"
                        element="expireData"
                      ></custom-date-picker>
                      <v-text-field
                        v-model="bannerData.expire_date"
                        id="expireData"
                        type="text"
                        label="تاریخ انقضا"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="c-py-0">
                      <v-checkbox
                        class="c-mt-0"
                        :false-value="0"
                        :true-value="1"
                        v-model="bannerData.hasButton"
                        label="دکمه دارد"
                      >
                      </v-checkbox>
                    </v-col>
                    <v-col cols="6" class="c-py-0">
                      <input
                        accept="image/x-png,image/gif,image/jpeg"
                        ref="fileInput"
                        type="file"
                        class="c-uploader-input"
                        @input="pickFile"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red white--text" @click="closeAddItem"
                  >انصراف</v-btn
                >
                <v-btn color="success" @click="createBanner">ذخیره</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="viewDialog" max-width="700px">
            <v-card>
              <v-card-title
                class="justify-center primary font-16 white--text c-py-10"
              >
                اطلاعات بنر
              </v-card-title>

              <div class="c-pa-20">
                <v-row>
                  <div class="w-50 c-px-5 c-my-5 child-col">
                    <v-card>
                      <v-card-text class="d-flex c-py-10 flex-wrap">
                        <h4 class="rtl c-ml-5">عنوان تبلیغ:</h4>
                        <p class="c-mb-0">{{ bannerData.title }}</p>
                      </v-card-text>
                    </v-card>
                  </div>
                  <div class="w-50 c-px-5 c-my-5 child-col">
                    <v-card>
                      <v-card-text class="d-flex c-py-10 flex-wrap">
                        <h4 class="rtl c-ml-5">شروع از:</h4>
                        <p class="c-mb-0">{{ bannerData.start_date }}</p>
                      </v-card-text>
                    </v-card>
                  </div>
                  <div class="w-50 c-px-5 c-my-5 child-col">
                    <v-card>
                      <v-card-text class="d-flex c-py-10 flex-wrap">
                        <h4 class="rtl c-ml-5">پایان:</h4>
                        <p class="c-mb-0">{{ bannerData.expire_date }}</p>
                      </v-card-text>
                    </v-card>
                  </div>
                  <div class="w-50 c-px-5 c-my-5 child-col">
                    <v-card>
                      <v-card-text class="d-flex c-py-10 flex-wrap">
                        <h4 class="rtl c-ml-5">دکمه:</h4>
                        <p class="c-mb-0" v-if="bannerData.hasButton == 1">
                          دارد
                        </p>
                        <p class="c-mb-0" v-if="bannerData.hasButton == 0">
                          ندارد
                        </p>
                      </v-card-text>
                    </v-card>
                  </div>
                  <div class="w-100 c-px-5 c-my-5 child-col">
                    <v-card>
                      <v-card-text class="d-flex c-py-10 flex-wrap">
                        <h4 class="rtl c-ml-5">عکس:</h4>
                        <img :src="previewImage" class="w-100 c-mt-10" />
                      </v-card-text>
                    </v-card>
                  </div>
                  <div class="w-100 c-px-5 c-my-5 child-col">
                    <v-card>
                      <v-card-text class="d-flex c-py-10 flex-wrap">
                        <h4 class="rtl c-ml-5">عکس:</h4>
                        <a :href="bannerData.link" class="w-100">{{
                          bannerData.link
                        }}</a>
                      </v-card-text>
                    </v-card>
                  </div>
                </v-row>
              </div>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red white--text" @click="closeAddItem"
                  >انصراف</v-btn
                >
                <v-btn color="success" @click="createBanner">ذخیره</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="editDialog" max-width="500px">
            <v-card>
              <v-card-title
                class="justify-center primary font-16 white--text c-py-10"
              >
                تغییر بنر
              </v-card-title>

              <v-card-text class="c-pb-0">
                <v-container>
                  <v-row>
                    <v-col cols="6" class="c-py-0">
                      <v-text-field
                        v-model="bannerData.title"
                        label="عنوان بنر"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="c-py-0">
                      <v-text-field
                        v-model="bannerData.link"
                        type="text"
                        label="لینک"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="c-py-0">
                      <custom-date-picker
                        label="تاریخ شروع"
                        v-model="bannerData.start_date"
                        element="startDate"
                      ></custom-date-picker>
                      <v-text-field
                        v-model="bannerData.start_date"
                        id="startDate"
                        type="text"
                        label="تاریخ شروع"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="c-py-0">
                      <custom-date-picker
                        label="تاریخ انقضا"
                        v-model="bannerData.expire_date"
                        element="expireData"
                      ></custom-date-picker>
                      <v-text-field
                        v-model="bannerData.expire_date"
                        id="expireData"
                        type="text"
                        label="تاریخ انقضا"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="c-py-0">
                      <v-checkbox
                        class="c-mt-0"
                        :false-value="0"
                        :true-value="1"
                        v-model="bannerData.hasButton"
                        label="دکمه دارد"
                      >
                      </v-checkbox>
                    </v-col>
                    <v-col cols="6" class="c-py-0">
                      <input
                        accept="image/x-png,image/gif,image/jpeg"
                        ref="fileInput"
                        type="file"
                        class="c-uploader-input"
                        @input="pickFile"
                      />
                      <br />
                      <img :src="bannerData.image_file" alt="" width="150" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red white--text" @click="closeAddItem"
                  >انصراف</v-btn
                >
                <v-btn color="success" @click="editBanner()">ذخیره</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="buttons-container">
          <v-icon small @click="showBanner(item)">mdi-eye</v-icon>
          <v-icon
            small
            color="primary"
            class="mr-2"
            @click="openEditModal(item)"
            >mdi-pencil</v-icon
          >
        </div>
      </template>
      <template v-slot:item.isExpire="{ item }">
        <v-icon small class="mr-1" color="success" v-if="item.isExpire == 0"
          >mdi-check</v-icon
        >
        <v-icon
          small
          class="mr-1"
          color="red darken-4"
          v-if="item.isExpire == 1"
          >mdi-close</v-icon
        >
      </template>
    </v-data-table>
  </div>
</template>

<script>
import snackBar from "~/mixins.js/snackbarMixin";
export default {
  mixins: {
    snackBar,
  },
  data() {
    return {
      previewImage: "",
      viewDialog: false,
      editDialog: false,
      banner_id: null,
      loading: true,
      meta: {},
      options: {},
      bannersData: [],
      dialog: false,
      bannerData: {
        title: "",
        link: "",
        start_date: "",
        expire_date: "",
        hasButton: null,
      },
      headers: [
        {
          text: "کد آگهی",
          value: "id",
          align: "right",
        },
        {
          text: "عنوان تبلیغات",
          value: "title",
          align: "center",
        },
        {
          text: "تاریخ شروع",
          value: "start_date",
          align: "center",
        },
        {
          text: "تاریخ پایان",
          value: "expire_date",
          align: "center",
        },
        {
          text: "تعداد کلیک های انجام شده",
          value: "click_count",
          align: "center",
        },
        {
          text: "ابزارها",
          value: "actions",
          align: "center",
        },
        {
          text: "وضعیت",
          value: "isExpire",
          align: "center",
        },
      ],
    };
  },

  watch: {
    dialog() {
      if (this.dialog == true) {
        if (this.$refs.fileInput != undefined) {
          this.$refs.fileInput.value = "";
        }
      }
    },
    editDialog() {
      if (this.editDialog == true) {
        if (this.$refs.fileInput != undefined) {
          this.$refs.fileInput.value = "";
        }
      }
    },
    viewDialog() {
      if (this.viewDialog == true) {
        if (this.$refs.fileInput != undefined) {
          this.$refs.fileInput.value = "";
        }
      }
    },
    options: {
      handler() {
        this.getBanners().then((data) => {
          this.desserts = data.items;
          this.totalDesserts = data.total;
        });
      },
      deep: true,
    },
  },
  mounted() {
    this.getBanners();
  },
  methods: {
    openAddModal() {
      this.dialog = true;
      this.clearBannerData();
    },
    clearBannerData() {
      this.bannerData.title = "";
      this.bannerData.link = "";
      this.bannerData.start_date = "";
      this.bannerData.expire_date = "";
      this.bannerData.hasButton = null;
      this.previewImage = "";
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
    showBanner(item) {
      this.viewDialog = true;
      this.bannerData.title = item.title;
      this.bannerData.link = item.link;
      this.bannerData.start_date = item.start_date;
      this.bannerData.expire_date = item.expire_date;
      this.bannerData.hasButton = item.hasButton;
      this.bannerData.id = item.id;
      this.previewImage = item.image_file;
    },
    closeAddItem() {
      this.clearBannerData();
      this.dialog = false;
      this.editDialog = false;
      this.viewDialog = false;
    },
    openEditModal(item) {
      this.$nuxt.$loading.start();
      this.clearBannerData();
      this.$axios
        .$get("banner/" + item.id)
        .then((data) => {
          Object.assign(this.bannerData, data[0]);
          this.$nuxt.$loading.finish();
          this.editDialog = true;
        })
        .catch((errors) => {
          this.$nuxt.$loading.finish();
        });
    },
    editBanner() {
      this.$axios
        .$put(`banner/update/${this.bannerData.id}`, this.bannerData)
        .then((response) => {
          this.editDialog = false;
          let input = this.$refs.fileInput;
          let imageFile = input.files[0];
          if (typeof imageFile == "object") {
            this.saveImage(this.bannerData.id);
          }
          this.$nuxt.$loading.finish();
          this.getBanners();
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.status == 422) {
            this.showSnackbar("اطلاعات را کامل کنید.", "red");
          }
        });
    },
    createBanner() {
      this.$nuxt.$loading.start();
      return this.$axios
        .$post("banner/create", this.bannerData)
        .then((response) => {
          this.dialog = false;
          this.$nuxt.$loading.finish();
          this.clearBannerData();
          let input = this.$refs.fileInput;
          let imageFile = input.files[0];
          if (typeof imageFile == "object") {
            this.saveImage(response.banner_id);
          }
          this.$nuxt.$loading.finish();
          this.getBanners();
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.$nuxt.$loading.finish();
            this.showSnackbar("لطفا تمامی فیلد ها را به درستی پر کنید", "red");
          }
        });
    },
    getBanners() {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      return new Promise((resolve, reject) => {
        this.$axios
          .$get(
            "banner/index-back-office?page=" +
              this.options.page +
              "&items_per_page=" +
              this.options.itemsPerPage
          )
          .then((response) => {
            this.loading = false;
            if (response.message == "There is no banner") {
            } else {
              this.bannersData = response.data;
              this.meta = response;
            }
          })
          .catch((e) => {
            this.loading = false;
          });
      });
    },
    saveImage(id) {
      this.$nuxt.$loading.start();
      this.isLoading = true;
      let input = this.$refs.fileInput;
      let imageFile = input.files[0];
      let formData = new FormData();
      formData.append("image_file", imageFile);
      this.$axios
        .$post("banner/save/image/" + id, formData)
        .then((response) => {
          this.isLoading = false;
          this.showSnackbar("تبلیغ مورد نظر به روز رسانی شد", "green");
          this.$nuxt.$loading.finish();
        })
        .catch((error) => {
          this.$nuxt.$loading.finish();
          this.isLoading = false;
          Object.values(this.$store.getters["errorHandling/errors"]).map(
            (error) => {
              this.showSnackbar(error[0], "red");
            }
          );
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>