<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-tabs
        v-model="tab"
        background-color="primary accent-4"
        class="elevation-2"
        dark
        :centered="centered"
        :grow="grow"
        :vertical="vertical"
        :right="right"
        :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
        :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
        :icons-and-text="icons"
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab v-for="i in tabs" :key="i" :href="`#tab-${i}`">
          <div v-if="i == 1" @click="primarySelected">اصلی</div>
          <div v-if="i == 2" @click="secondarySelected">زیرگروه</div>
        </v-tab>
        <v-tab-item v-for="i in tabs" :key="i" :value="'tab-' + i">
          <!-- main work form -->
          <v-container fluid v-if="i == 1">
            <v-form ref="form4" v-model="valid1">
              <v-row>
                <v-col cols="12" md="12" class="c-py-0">
                  <v-text-field
                    v-model="editedItem.title"
                    label="نام"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6" class="c-py-0">
                  <v-select
                    v-model="editedItem.type"
                    item-value="id"
                    item-text="value"
                    :items="listType"
                    :rules="[(v) => !!v || 'Item is required']"
                    label="نوع گروه"
                    required
                  ></v-select>
                </v-col>
                <v-col class="rtl c-py-0" cols="6">
                  <v-select
                    v-model="editedItem.status"
                    :items="statusList"
                    item-value="id"
                    item-text="value"
                    label="وضعیت گروه"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" md="12" class="c-py-0">
                  <v-text-field
                    v-model="editedItem.priorty"
                    label="اولویت"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" class="c-py-0">
                  <input
                    accept="image/x-png,image/gif,image/jpeg"
                    ref="fileInputCreate"
                    type="file"
                    class="c-uploader-input"
                  />
                </v-col>
              </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="success"
                  :disabled="!valid1 || isLoading"
                  @click="save('parent')"
                  >ذخیره</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-container>
          <!-- sub works form -->
          <v-container fluid v-if="i == 2">
            <v-form ref="form1" v-model="valid2">
              <v-row>
                <v-col cols="12" class="c-py-0">
                  <v-combobox
                    v-model="editedItem.parent_id"
                    :items="workGroups"
                    chips
                    item-text="title"
                    item-value="id"
                    label="انتخاب سر گروه"
                  >
                    <template v-slot:item="{ parent, item }">
                      <!--Highlight output item.name-->
                      {{ item.title }} - (
                      <span v-if="item.type == 'AUCTION'">مزایده</span>
                      <span v-if="item.type == 'TENDER'">مناقصه</span>
                      <span v-if="item.type == 'INQUIRY'">استعلام</span>
                      <span v-if="item.parent_id == null">دسته ی اصلی</span>)
                    </template>
                  </v-combobox>
                </v-col>
                <v-col cols="12" md="12" class="c-py-0">
                  <v-text-field
                    v-model="editedItem.title"
                    label="نام"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6" class="c-py-0">
                  <v-select
                    v-model="editedItem.type"
                    item-value="id"
                    item-text="value"
                    :items="listType"
                    :rules="[(v) => !!v || 'Item is required']"
                    required
                    label="نوع گروه"
                  ></v-select>
                </v-col>
                <v-col class="rtl c-py-0" cols="6">
                  <v-select
                    v-model="editedItem.status"
                    :items="statusList"
                    item-value="id"
                    item-text="value"
                    label="وضعیت گروه"
                    required
                  ></v-select>
                </v-col>
                <!--....... -->

                <v-col cols="12" md="12" class="c-py-0">
                  <v-text-field
                    v-model="editedItem.priorty"
                    label="اولویت"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="success"
                  :disabled="!valid2 || isLoading"
                  @click="save('child')"
                  >ذخیره</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-dialog>
    <v-dialog v-model="dialogEdit" max-width="500px">
      <v-card>
        <!-- main work form -->
        <div v-if="editedItem.parent_id === null">
          <input type="hidden" name="parent" value="false" />

          <v-card-title
            class="primary justify-center c-py-10 white--text font-18"
            >اصلی</v-card-title
          >

          <v-container fluid>
            <v-form ref="form2" v-model="valid1">
              <v-row>
                <v-col cols="12" md="12" class="c-py-0">
                  <v-text-field
                    v-model="editedItem.title"
                    label="نام"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6" class="c-py-0">
                  <v-select
                    v-model="editedItem.type"
                    item-value="id"
                    item-text="value"
                    :items="listType"
                    :rules="[(v) => !!v || 'Item is required']"
                    label="نوع گروه"
                    required
                  ></v-select>
                </v-col>
                <v-col class="rtl c-py-0" cols="6">
                  <v-select
                    v-model="editedItem.status"
                    :items="statusList"
                    item-value="id"
                    item-text="value"
                    label="وضعیت گروه"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" md="12" class="c-py-0">
                  <v-text-field
                    v-model="editedItem.priorty"
                    label="اولویت"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" class="c-py-0">
                  <input
                    accept="image/x-png,image/gif,image/jpeg"
                    ref="fileInputEdit"
                    type="file"
                    class="c-uploader-input"
                  />
                  <img :src="editedItem.image" alt="" width="150" />
                </v-col>
              </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="success"
                  :disabled="!valid1 || isLoading"
                  @click="update('parent')"
                  >به روز رسانی اطلاعات</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-container>
        </div>
        <div v-else>
          <input type="hidden" name="parent" value="false" />

          <v-card-title
            class="primary white--text justify-center font-18 c-py-10"
            >زیر گروه</v-card-title
          >

          <v-container fluid>
            <v-form ref="form3" v-model="valid2">
              <v-row>
                <v-col cols="12" md="12" class="c-py-0">
                  <v-text-field
                    v-model="editedItem.title"
                    label="نام"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="6" class="c-py-0">
                  <v-select
                    v-model="editedItem.type"
                    item-value="id"
                    item-text="value"
                    :items="listType"
                    :rules="[(v) => !!v || 'Item is required']"
                    label="نوع گروه"
                    required
                  ></v-select>
                </v-col>
                <v-col class="rtl c-py-0" cols="6">
                  <v-select
                    v-model="editedItem.status"
                    :items="statusList"
                    item-value="id"
                    item-text="value"
                    label="وضعیت گروه"
                    required
                  ></v-select>
                </v-col>
                <!--....... -->
                <v-col cols="12" class="c-py-0">
                  <v-select
                    v-model="editedItem.parent_id"
                    :items="workGroups"
                    label="دسته کاری اصلی"
                    item-text="title"
                    item-value="id"
                    menu-props="auto"
                  ></v-select>
                </v-col>

                <v-col cols="12" md="12" class="c-py-0">
                  <v-text-field
                    v-model="editedItem.priorty"
                    label="اولویت"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="success"
                  :disabled="!valid2 || isLoading"
                  @click="update('child')"
                  >به روز رسانی اطلاعات</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-container>
        </div>
        <!-- sub works form -->
      </v-card>
    </v-dialog>
    <!-- table -->
    <v-card class="c-pa-20">
      <v-row>
        <div class="rtl w-55 c-px-10">
          <v-text-field v-model="filters.title" label="نام دسته"></v-text-field>
        </div>
        <div class="rtl w-15 c-px-10">
          <v-text-field v-model="filters.priorty" label="اولویت"></v-text-field>
        </div>
        <div class="rtl w-15 c-px-10">
          <v-select
            v-model="filters.status"
            :items="statusList"
            item-value="id"
            item-text="value"
            label="وضعیت دسته"
            required
          ></v-select>
        </div>
        <div class="rtl w-15 c-px-10">
          <v-select
            v-model="filters.type"
            item-value="id"
            item-text="value"
            :items="listType"
            label="نوع دسته کاری"
            required
          ></v-select>
        </div>
      </v-row>
      <v-card-actions class="justify-end c-pt-0 align-center">
        <v-btn color="success" width="120" dark @click="openAdd"
          >افزودن گروه کاری</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-4"
          dark
          width="120"
          @click="resetWorkGroupSearchForm"
          >پاک کردن فیلد ها</v-btn
        >

        <v-btn color="primary c-ml-10" dark @click="workGroupSearch" width="120"
          >جستجو</v-btn
        >
        <div>
          <input
            type="file"
            name="uploadfile"
            id="import_excel"
            @change="onExcelFileChange"
            style="display: none"
          />
          <label for="import_excel" class="uploader-button c-ml-10"
            >ورود اطلاعت با اکسل</label
          >
        </div>
      </v-card-actions>
      <br />
      <v-card-actions class="justify-end c-pt-0 align-center">
        <div class="c-mr-10">
          <label
            for="export_excel"
            @click.prevent="getExcel"
            class="uploader-button"
            >دریافت اطلاعات دسته های اصلی
          </label>
        </div>

        <div class="c-mr-10">
          <label
            for="export_excel"
            @click.prevent="getAllExcel"
            class="uploader-button"
            >دریافت تمامی اطلاعت دسته ها</label
          >
        </div>
      </v-card-actions>
    </v-card>
    <v-card class="c-mt-20">
      <!-- start table -->
      <v-data-table
        :headers="headers"
        disable-sort
        :items="workGroups"
        class="c-table"
        show-expand
        :single-expand="true"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50],
        }"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title class="font-16"
              >لیست گروه های کاری</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:item.image="{ item }">
          <v-avatar size="36px">
            <img
              v-if="item.image == null"
              src="https://placehold.co/30x30"
              alt="John"
            />
            <img v-else :src="item.image" alt="John" />
          </v-avatar>
        </template>
        <template v-slot:item.type="{ item }">
          <span v-if="item.type == 'AUCTION'">مزایده</span>
          <span v-if="item.type == 'TENDER'">مناقصه</span>
          <span v-if="item.type == 'INQUIRY'">استعلام</span>
        </template>

        <template v-slot:item.status="{ item }">
          <span v-if="item.status == 0">در دست بررسی</span>
          <span v-if="item.status == 1">انتشار یافته</span>
        </template>
        <template v-slot:item.parent_id="{ item }">
          <span v-if="item.parent_id == null">اصلی</span>
          <span v-else>زیر گروه</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="buttons-container">
            <v-btn small icon color="primary" @click="openDialog(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <deleteConfirmationDialog @delete="deleteItem(item)" />
          </div>
        </template>
        <!-- <template v-slot:expanded-item="{ headers, item }">
        <td style="    padding: 0;" :colspan="headers.length">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-right">Name</th>
                  <th class="text-center">Calories</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(subWork,index) in item.subWorks" :key="index">
                  <td>{{subWork.title}}</td>
                  <td class="text-center">
                    <v-icon small class="mr-2" @click="openDialogSubWork(item,index)">mdi-pencil</v-icon>
                    <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </td>
        </template>-->
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-simple-table
              style="margin: 2% 5% 5% 2%; box-shadow: none; background: #ccc"
            >
              <template v-slot:default>
                <thead>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </thead>

                <tbody>
                  <tr v-for="(child, index) in item.children" :key="child.id">
                    <td class="w-4">{{ index + 1 }}</td>
                    <td class="w-32">{{ child.title }}</td>
                    <td class="w-9">{{ child.priorty }}</td>
                    <td class="w-14">
                      <span v-if="child.status == 0">در دست بررسی</span>
                      <span v-if="child.status == 1">انتشار یافته</span>
                    </td>
                    <td class="w-14">
                      <span v-if="child.parent_id == null">اصلی</span>
                      <span v-if="child.parent_id != null">زیرگروه</span>
                    </td>
                    <td class="w-14">
                      <span v-if="child.type == 'AUCTION'">مزایده</span>
                      <span v-if="child.type == 'TENDER'">مناقصه</span>
                      <span v-if="child.type == 'INQUIRY'">استعلام</span>
                    </td>
                    <td class="">
                      <v-btn
                        small
                        icon
                        color="primary"
                        @click="openDialog(child)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <deleteConfirmationDialog
                        style="display: inline"
                        @delete="deleteChildItem(child, item)"
                      />
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </td>
        </template>
      </v-data-table>
    </v-card>
    <!-- edit main dialog -->
  </div>

  <!-- edit main dialog end -->
</template>

<script>
import searchOnWorkGroupsMixins from "~/mixins.js/searchOnWorkGroupsMixins.js";
import WorkGroupMixin from "~/mixins.js/chooseWorkGroupMixins.js";
import deleteConfirmationDialog from "~/components/general/deleteConfirmationDialog";

export default {
  mounted() {},
  mixins: [searchOnWorkGroupsMixins, WorkGroupMixin],
  components: {
    deleteConfirmationDialog,
  },
  computed: {
    editedItemType() {
      return this.editedItem.type;
    },
  },
  watch: {
    editedItemType() {
      this.filters.type = this.editedItem.type;
      this.workGroupSearch();
    },
  },
  methods: {
    async getAllExcel() {
      this.$nuxt.$loading.start();
      return this.$axios
        .$get("workgroups/as/excel")
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.url]));
          var fileLink = document.createElement("a");
          fileLink.href = response.url;
          fileLink.setAttribute("download", "AsanTenderWorkGroups.xlsx");
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          this.$nuxt.$loading.finish();
          fileLink.click();
        })
        .catch((error) => {
          this.$nuxt.$loading.finish();
          console.log(error);
        });
    },
    async getExcel() {
      this.$nuxt.$loading.start();
      return this.$axios
        .$get("parent/workgroups/as/excel")
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.url]));
          var fileLink = document.createElement("a");
          fileLink.href = response.url;
          fileLink.setAttribute("download", "AsanTenderWorkGroups.xlsx");
          fileLink.setAttribute("target", "_blank");
          document.body.appendChild(fileLink);
          this.$nuxt.$loading.finish();
          fileLink.click();
        })
        .catch((error) => {
          this.$nuxt.$loading.finish();
          console.log(error);
        });
    },
    getParentTitleWithId(id) {
      let data = Object.values(this.workGroups).find((workGroup) => {
        return workGroup.id == id;
      });
      return data;
    },
    removeSelected(item) {
      // const index = this.selected.indexOf(item);
      // this.selected = this.selected.filter((workGroup) => {
      //   return workGroup != item.id;
      // });
    },
    chooseParentsWithType() {
      // this.filters.allParents = true;
      // this.filters.type = this.editedItem.type;
      // this.workGroupSearch();
    },
    deleteItem(item) {
      try {
        this.$nuxt.$loading.start();
        this.$axios
          .$delete("workgroup/delete/" + item.id)
          .then((res) => {
            this.$nuxt.$loading.finish();
            this.$store.getters.workGroups.splice(
              this.$store.getters.workGroups.indexOf(item),
              1
            );
            this.showSnackbar("دسته ی کاری با موفقیت حذف شد", "green");
          })
          .catch((e) => {
            this.$nuxt.$loading.finish();

            if (e.response.status == 422) {
              this.showSnackbar(e.response.data.message, "red");
            }
            Object.values(this.$store.getters["errorHandling/errors"]).map(
              (error) => {
                this.showSnackbar(error[0], "red");
              }
            );
          });
      } catch (error) {
        this.$nuxt.$loading.finish();
        this.showSnackbar("مشکلی پیش آمده دوباره تلاش کنید ", "red");
      }
    },
    deleteChildItem(child, parent) {
      this.$nuxt.$loading.start();
      try {
        this.$axios
          .$delete("workgroup/delete/" + child.id)
          .then((res) => {
            this.$nuxt.$loading.finish();
            parent.children.splice(parent.children.indexOf(child), 1);
            this.showSnackbar("دسته ی کاری با موفقیت حذف شد", "green");
          })
          .catch((e) => {
            if (e.response.status == 422) {
              this.showSnackbar(e.response.data.message, "red");
            }
            this.$nuxt.$loading.finish();
            Object.values(this.$store.getters["errorHandling/errors"]).map(
              (error) => {
                this.showSnackbar(error[0], "red");
              }
            );
          });
      } catch (error) {
        this.$nuxt.$loading.finish();
        console.log(error);
        this.showSnackbar("مشکلی پیش آمده دوباره تلاش کنید ", "red");
      }
    },
    primarySelected() {
      this.resetFormData();
    },
    secondarySelected() {
      this.resetFormData();
      this.chooseParentsWithType();
    },
    openAdd() {
      this.dialog = true;
      this.resetFormData();
      this.editMode = false;
    },
    openDialog(item) {
      this.dialogEdit = true;
      this.resetFormData();
      this.chooseParentsWithType();
      this.editedItem = item;
    },
    resetFormData() {
      this.editedItem = {
        title: "",
        imageUrl: "",
        image: null,
        type: "",
        discription: "",
        priorty: 1,
        parent_id: "",
        status: 0,
      };
    },
    onFileChange(e) {
      const url = e;
      // this.editedItem.image = URL.createObjectURL(url);
      // console.log(this.editedItem.image);
    },
    reloadPage() {
      window.location.reload();
    },
    saveImage(id, file) {
      this.$nuxt.$loading.start();
      this.isLoading = true;
      let formData = new FormData();
      formData.append("image", file);
      this.$axios
        .$post("workgroup/save/image/" + id, formData)
        .then((response) => {
          this.isLoading = false;
          this.showSnackbar(
            "دسته های کاری با موفقیت به روز رسانی شده اند",
            "green"
          );
          this.$nuxt.$loading.finish();
        })
        .catch((errors) => {
          console.log(errors);
          this.$nuxt.$loading.finish();
          this.isLoading = false;
          Object.values(this.$store.getters["errorHandling/errors"]).map(
            (error) => {
              this.showSnackbar(error[0], "red");
            }
          );
        });
    },
    save(type) {
      this.$nuxt.$loading.start();
      this.isLoading = true;
      if (type == "child") {
        if (
          this.editedItem.parent_id == "" ||
          this.editedItem.parent_id == null ||
          this.editedItem.parent_id.length == 0
        ) {
          this.showSnackbar("لطفا سرگروه را انتخاب کنید", "red");
          return;
        } else {
          this.editedItem.parent_id = this.editedItem.parent_id.id;
        }
      }
      this.$axios
        .$post("workgroup/create", this.editedItem)
        .then((res) => {
          this.$nuxt.$loading.finish();
          this.isLoading = false;
          let input = this.$refs.fileInputCreate[0];

          let imageFile = input.files[0];

          if (typeof imageFile == "object") {
            this.saveImage(res[0], imageFile);
          }
          this.showSnackbar("گروه کاری با موفقیت اضافه شد", "green");
          this.resetFormData();
          this.refreshWorkGroup();
          this.dialog = false;
          this.dialogEdit = false;
          setTimeout(() => {
            this.workGroupSearch();
          }, 1500);
        })
        .catch((errors) => {
          this.$nuxt.$loading.finish();
          this.isLoading = false;
          Object.values(this.$store.getters["errorHandling/errors"]).map(
            (error) => {
              this.showSnackbar(error[0], "red");
            }
          );
        });

      // this.$refs.form.resetValidation();
    },
    async update(type) {
      this.$nuxt.$loading.start();
      this.isLoading = true;
      if (type == "child") {
        if (
          this.editedItem.parent_id == "" ||
          this.editedItem.parent_id == null ||
          this.editedItem.parent_id.length == 0
        ) {
          this.showSnackbar("لطفا سرگروه را انتخاب کنید", "red");
          return;
        }
      }
      try {
        this.dialog = false;
        this.dialogEdit = false;
        this.$axios
          .$put("workgroup/" + this.editedItem.id, this.editedItem)
          .then((res) => {
            this.$nuxt.$loading.finish();
            this.isLoading = false;
            let input = this.$refs.fileInputEdit;
            let imageFile = input.files[0];
            if (typeof imageFile == "object" && type == "parent") {
              this.saveImage(this.editedItem.id, imageFile);
            }
            this.showSnackbar("گروه کاری با موفقیت تغییر یافت", "green");
            this.resetFormData();
            this.refreshWorkGroup();
            setTimeout(() => {
              this.workGroupSearch();
            }, 1500);
          })
          .catch((errors) => {
            this.$nuxt.$loading.finish();
            this.isLoading = false;
            this.showSnackbar(errors.response.data.message, "red");
          });
      } catch (error) {
        this.$nuxt.$loading.finish();
        // console.log(error);
      }
    },
    async onExcelFileChange(e) {
      let formData = new FormData();
      const file = e.target.files[0];
      formData.append("excel_file", file);
      this.$nuxt.$loading.start();
      e.target.value = "";
      try {
        await this.$axios
          .$post("workgroup/excel/create", formData)
          .then((response) => {
            this.$nuxt.$loading.finish();
            this.showSnackbar(
              "دسته های کاری اکسل با موفقیت اضافه شدند",
              "green"
            );
            this.resetFormData();
            this.refreshWorkGroup();
            setTimeout(() => {
              this.workGroupSearch();
            }, 1500);
          })
          .catch((errors) => {
            this.$nuxt.$loading.finish();
            Object.values(this.$store.getters["errorHandling/errors"]).map(
              (error) => {
                this.showSnackbar(error[0], "red");
              }
            );
          });
      } catch (error) {
        this.$nuxt.$loading.finish();
        this.showSnackbar("مشکلی پیش آمده دوباره تلاش کنید ", "red");
      }
    },
  },
  data() {
    return {
      export_excel_url: "",
      isLoading: false,
      dialogEdit: false,
      statusList: [
        {
          id: 0,
          value: "در حال بررسی",
        },
        {
          id: 1,
          value: "انتشار یافته",
        },
      ],
      editMainDialog: false,
      editMode: true,
      excel_file: "",
      selected: [],
      valid1: false,
      valid2: false,
      expanded: [],
      dialog: false,
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
      items: [
        {
          id: 1,
          title: "تست",
        },
        {
          id: 2,
          title: "تستس۱",
        },
        {
          id: 3,
          title: "تستستس",
        },
      ],
      values: ["ظطزر"],
      singleExpand: true,
      editedItem: {
        title: "",
        imageUrl: "",
        image: null,
        type: "",
        discription: "",
        priorty: 1,
        parent_id: "",
        status: 0,
      },
      headers: [
        { text: "عکس", value: "image", sortable: false },
        { text: "نام", value: "title", sortable: false, width: "30%" },
        { text: "اولویت", value: "priorty", sortable: false },
        { text: "وضعیت", value: "status", sortable: false },
        { text: "دسته اصلی", value: "parent_id" },
        { text: "نوع دسته", value: "type", sortable: true },
        { text: "ابزار", value: "actions", sortable: false, align: "center" },
        { text: "", value: "data-table-expand", sortable: false },
      ],

      works: [
        {
          title: "test main",
          id: 2,
          imageUrl: "https://randomuser.me/api/portraits/men/85.jpg",
        },
      ],
      // tab data
      tab: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      icons: false,
      centered: true,
      grow: false,
      vertical: false,
      prevIcon: false,
      nextIcon: false,
      right: false,
      tabs: 2,
    };
  },
};
</script>

<style lang="scss">
.buttons-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.upLoader {
  border: #fff solid 1px;
  padding: 9px;
  transition: background-color 500ms ease;
  transition: color 500ms ease;

  &:hover {
    background-color: #fff;
    color: #000;
  }
}
</style>
