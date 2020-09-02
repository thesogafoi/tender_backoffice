<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-tabs
        v-model="tab"
        background-color="deep-purple accent-4"
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
          <div v-if="i == 1">اصلی</div>
          <div v-if="i == 2">زیرگروه</div>
        </v-tab>
        <v-tab-item v-for="i in tabs" :key="i" :value="'tab-' + i">
          <v-card-title>
            <span v-if="i==1" class="headline">اصلی</span>
            <span v-if="i==2" class="headline">زیرگروه</span>
          </v-card-title>

          <!-- main work form -->
          <v-container fluid>
            <v-form v-if="i == 1" ref="form" v-model="valid1">
              <v-col cols="12" md="12">
                <v-text-field v-model="editedItem.title" label="نام" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="editedItem.type"
                  item-value="id"
                  item-text="value"
                  :items="listType"
                  :rules="[v => !!v || 'Item is required']"
                  label="نوع آگهی"
                  required
                ></v-select>
              </v-col>
              <v-col class="c-rtl" cols="12">
                <v-select
                  v-model="editedItem.status"
                  :items="statusList"
                  item-value="id"
                  item-text="value"
                  label="وضعیت آگهی"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="editedItem.children"
                  :items="$store.getters.workGroups"
                  item-text="title"
                  item-value="id"
                  label="نوع دسته"
                  multiple
                  chips
                >
                  <template v-slot:item="{ parent, item }">
                    <!--Highlight output item.name-->
                    {{item.title}} -
                    (
                    <span v-if="item.type=='AUCTION'">مزایده</span>
                    <span v-if="item.type=='TENDER'">مناقصه</span>
                    <span v-if="item.type=='INQUIRY'">استعلام</span>
                    <span v-if="item.parent_id!=null">دسته ی اصلی</span>)
                  </template>
                </v-autocomplete>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field v-model="editedItem.priorty" label="اولویت" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-file-input
                  @change="onFileChange"
                  v-model="editedItem.image"
                  accept="image/*"
                  label="File input"
                ></v-file-input>
              </v-col>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" :disabled="!valid1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-form>
          </v-container>
          <!-- sub works form -->
          <v-container fluid>
            <v-form v-if="i == 2" ref="form" v-model="valid2">
              <v-col cols="12" md="12">
                <v-text-field v-model="editedItem.title" label="نام" required></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="editedItem.type"
                  item-value="id"
                  item-text="value"
                  :items="listType"
                  :rules="[v => !!v || 'Item is required']"
                  label="نوع آگهی"
                  required
                ></v-select>
              </v-col>
              <v-col class="c-rtl" cols="12">
                <v-select
                  v-model="editedItem.status"
                  :items="statusList"
                  item-value="id"
                  item-text="value"
                  label="وضعیت آگهی"
                  required
                ></v-select>
              </v-col>
              <!--....... -->
              <v-col cols="12">
                <v-autocomplete
                  v-model="editedItem.parent_id"
                  :items="$store.getters.workGroups"
                  chips
                  item-text="title"
                  item-value="id"
                  label="نوع دسته"
                >
                  <template v-slot:item="{ parent, item }">
                    <!--Highlight output item.name-->
                    {{item.title}} -
                    (
                    <span v-if="item.type=='AUCTION'">مزایده</span>
                    <span v-if="item.type=='TENDER'">مناقصه</span>
                    <span v-if="item.type=='INQUIRY'">استعلام</span>
                    <span v-if="item.parent_id!=null">دسته ی اصلی</span>)
                  </template>
                </v-autocomplete>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field v-model="editedItem.priorty" label="اولویت" required></v-text-field>
              </v-col>

              <v-col cols="12" sm="12">
                <v-textarea v-model="editedItem.discription" label="توضیحات"></v-textarea>
              </v-col>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" :disabled="!valid2" text @click="save">Save</v-btn>
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
          <v-row class="c-header c-rtl">
            <v-col cols="12">
              <v-card-title>اصلی</v-card-title>
            </v-col>
          </v-row>
          <v-container fluid>
            <v-form ref="form" v-model="valid1">
              <v-col cols="12" md="12">
                <v-text-field v-model="editedItem.title" label="نام" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="editedItem.type"
                  item-value="id"
                  item-text="value"
                  :items="listType"
                  :rules="[v => !!v || 'Item is required']"
                  label="نوع آگهی"
                  required
                ></v-select>
              </v-col>
              <v-col class="c-rtl" cols="12">
                <v-select
                  v-model="editedItem.status"
                  :items="statusList"
                  item-value="id"
                  item-text="value"
                  label="وضعیت آگهی"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="editedItem.children"
                  :items="$store.getters.workGroups"
                  item-text="title"
                  item-value="id"
                  label="نوع دسته"
                  multiple
                  chips
                >
                  <template v-slot:item="{ parent, item }">
                    <!--Highlight output item.name-->
                    {{item.title}} -
                    (
                    <span v-if="item.type=='AUCTION'">مزایده</span>
                    <span v-if="item.type=='TENDER'">مناقصه</span>
                    <span v-if="item.type=='INQUIRY'">استعلام</span>
                    <span v-if="item.parent_id!=null">دسته ی اصلی</span>)
                  </template>
                </v-autocomplete>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field v-model="editedItem.priorty" label="اولویت" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-file-input
                  @change="onFileChange"
                  v-model="editedItem.image"
                  accept="image/*"
                  label="File input"
                ></v-file-input>
              </v-col>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" :disabled="!valid1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-form>
          </v-container>
        </div>
        <div v-else>
          <v-row class="c-header c-rtl">
            <v-col cols="12">
              <v-card-title>زیرگروه</v-card-title>
            </v-col>
          </v-row>
          <v-container fluid>
            <v-form ref="form" v-model="valid2">
              <v-col cols="12" md="12">
                <v-text-field v-model="editedItem.title" label="نام" required></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="editedItem.type"
                  item-value="id"
                  item-text="value"
                  :items="listType"
                  :rules="[v => !!v || 'Item is required']"
                  label="نوع آگهی"
                  required
                ></v-select>
              </v-col>
              <v-col class="c-rtl" cols="12">
                <v-select
                  v-model="editedItem.status"
                  :items="statusList"
                  item-value="id"
                  item-text="value"
                  label="وضعیت آگهی"
                  required
                ></v-select>
              </v-col>
              <!--....... -->
              <v-col cols="12">
                <v-autocomplete
                  v-model="editedItem.parent_id"
                  :items="$store.getters.workGroups"
                  chips
                  item-text="title"
                  item-value="id"
                  label="نوع دسته"
                >
                  <template v-slot:item="{ parent, item }">
                    <!--Highlight output item.name-->
                    {{item.title}} -
                    (
                    <span v-if="item.type=='AUCTION'">مزایده</span>
                    <span v-if="item.type=='TENDER'">مناقصه</span>
                    <span v-if="item.type=='INQUIRY'">استعلام</span>
                    <span v-if="item.parent_id!=null">دسته ی اصلی</span>)
                  </template>
                </v-autocomplete>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field v-model="editedItem.priorty" label="اولویت" required></v-text-field>
              </v-col>

              <v-col cols="12" sm="12">
                <v-textarea v-model="editedItem.discription" label="توضیحات"></v-textarea>
              </v-col>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" :disabled="!valid2" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-form>
          </v-container>
        </div>
        <!-- sub works form -->
      </v-card>
    </v-dialog>
    <!-- table -->
    <v-row>
      <v-row class="c-header c-rtl">
        <v-col cols="2">
          <v-card-title>آگهی</v-card-title>
        </v-col>
        <v-col cols="5">
          <input type="file" @change="onFileChange" class="button-uploader ml-5" />
        </v-col>
      </v-row>
      <v-container>
        <v-row>
          <v-col cols="6" class="c-rtl">
            <v-text-field v-model="filters.title" label="عنوان آگهی"></v-text-field>
          </v-col>

          <v-col cols="6" class="c-rtl">
            <v-text-field v-model="filters.priorty" label="اولویت"></v-text-field>
          </v-col>

          <v-col class="c-rtl" cols="6">
            <v-select
              v-model="filters.status"
              :items="statusList"
              item-value="id"
              item-text="value"
              label="وضعیت آگهی"
              required
            ></v-select>
          </v-col>
          <v-col class="c-rtl" cols="6">
            <v-select
              v-model="filters.type"
              item-value="id"
              item-text="value"
              :items="listType"
              label="نوع دسته ی کاری"
              required
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <!-- start table -->
    <v-data-table :headers="headers" :items="workGroups" item-key="name" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Expandable Table</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" @click="openAdd">New Item</v-btn>
          <v-btn color="primary" dark class="mb-2" @click="workGroupSearch">جستجو</v-btn>
          <v-btn
            color="warning"
            dark
            class="mb-2"
            @click="resetWorkGroupSearchForm"
          >پاک کردن فیلد ها</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.image="{ item }">
        <v-avatar size="36px">
          <img :src="item.image" alt="John" />
        </v-avatar>
      </template>
      <template v-slot:item.type="{ item }">
        <span v-if="item.type=='AUCTION'">مزایده</span>
        <span v-if="item.type=='TENDER'">مناقصه</span>
        <span v-if="item.type=='INQUIRY'">استعلام</span>
      </template>

      <template v-slot:item.status="{ item }">
        <span v-if="item.status==0">در دست بررسی</span>
        <span v-if="item.status==1">انتشار یافته</span>
      </template>
      <template v-slot:item.parent_id="{ item }">
        <span v-if="item.parent_id==null">اصلی</span>
        <span v-else>زیر گروه</span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="openDialog(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
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
    </v-data-table>

    <!-- edit main dialog -->

    <!-- edit main dialog end -->
  </div>
</template>

<script>
import searchOnWorkGroupsMixins from "~/mixins.js/searchOnWorkGroupsMixins.js";
import WorkGroupMixin from "~/mixins.js/chooseWorkGroupMixins.js";
export default {
  mixins: [searchOnWorkGroupsMixins, WorkGroupMixin],
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
    primarySelected() {},
    secondarySelected() {},
    openAdd() {
      this.dialog = true;
      this.editMode = false;
    },
    openDialog(item) {
      this.dialogEdit = true;
      this.editedItem = item;
      if (item.parent_id == null) {
        this.editedItem.children = this.$store.getters.workGroups.filter(
          (element) => {
            return element.parent_id == item.id;
          }
        );

        this.editedItem.children = this.editedItem.children.map((x) => x.id);
        console.log(this.editedItem);
      }
    },
    openDialogSubWork(item, index) {
      this.resetFormData();
      this.dialog = true;
      this.editedItem.subWorks = item.subWorks[index];
      this.editedItem.subWorks = item.subWorks[index];
    },
    onFileChange(e) {
      const url = e;
      // this.editedItem.image = URL.createObjectURL(url);
      console.log(this.editedItem.image);
    },
    reloadPage() {
      window.location.reload();
    },
    save() {
      this.$axios.$post("workgroup/create", this.editedItem).then((res) => {
        this.showSnackbar("success", "green");
      });
      this.$store.dispatch("refreshWorkGroups");
      this.dialog = false;
      this.dialogEdit = false;
      // this.workGroups = this.$store.getters.workGroups;
      // this.$refs.form.reset();
      // this.$refs.form.resetValidation();
    },
  },
  data() {
    return {
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
      workGroups: [],
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
        children: [],
        parent_id: Number,
        status: 0,
      },
      headers: [
        { text: "عکس", value: "image" },
        { text: "نام", value: "title" },
        { text: "اولویت", value: "priorty" },
        { text: "وضعیت", value: "status" },
        { text: "دسته ی اصلی", value: "parent_id" },
        { text: "نوع دسته", value: "type" },
        { text: "Tools", value: "actions" },
        { text: "", value: "data-table-expand" },
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