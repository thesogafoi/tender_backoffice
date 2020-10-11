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
      :footer-props="{
        'items-per-page-options': [10, 20, 30, 40, 50],
      }"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="font-16">تبلیغات </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="success" dark class="mb-2" v-bind="attrs" v-on="on"
                >افزودن تبلیغ</v-btn
              >
            </template>
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
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="buttons-container">
          <v-icon small color="primary" class="mr-2">mdi-pencil</v-icon>
          <deleteConfirmationDialog />
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner_id: null,
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
      ],
    };
  },
  created() {
    this.getBanners();
  },
  methods: {
    clearBannerData() {
      (this.bannerData.title = ""),
        (this.bannerData.link = ""),
        (this.bannerData.start_date = ""),
        (this.bannerData.expire_date = ""),
        (this.bannerData.hasButton = null),
        (this.previewImage = "");
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
    closeAddItem() {
      this.clearBannerData();
      this.dialog = false;
    },

    createBanner() {
      this.$nuxt.$loading.start();
      this.dialog = false;
      return this.$axios
        .$post("banner/create", this.bannerData)
        .then((response) => {
          this.$nuxt.$loading.finish();
          this.clearBannerData();
          let input = this.$refs.fileInput;
          let imageFile = input.files[0];
          if (typeof imageFile == "object") {
            this.saveImage(response.banner_id);
          }
          this.$nuxt.$loading.finish();
          this.getBanners();
        });
    },
    getBanners() {
      return this.$axios
        .$get("banner/index-back-office")
        .then((response) => {
          if (response.message == "There is no banner") {
          } else {
            this.bannersData = response;
          }
        })
        .catch((e) => {});
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