<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">title</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid">
              <v-row>
                <v-col cols="12" sm="12">
                  <ChooseWorkGroup
                    :work_groups="this.workGroups"
                    @selected_work_group_changed="selectedWorkGroupChanged"
                    ref="workGroups"
                  />
                </v-col>
                <v-col cols="12" sm="12">
                  <v-autocomplete
                    v-model="editedItem.subWorks"
                    item-text="title"
                    item-value="id"
                    :items="items"
                    small-chips
                    label="Outlined"
                  ></v-autocomplete>
                </v-col>
                <v-col v-if="editedItem.subWorks.length === 0" cols="12" sm="12">
                  <v-file-input
                    :rules="[v => !!v || 'You must agree to continue!']"
                    v-model="editedItem.image"
                    accept="image/*"
                    label="File input"
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="4" class="c-rtl">
        <v-text-field v-model="filters.title" label="عنوان آگهی"></v-text-field>
      </v-col>

      <v-col cols="4" class="c-rtl">
        <v-text-field v-model="filters.priorty" label="اولویت"></v-text-field>
      </v-col>

      <v-col class="c-rtl" cols="4">
        <v-select
          v-model="filters.status"
          :items="statusList"
          item-value="id"
          item-text="value"
          label="وضعیت آگهی"
          required
        ></v-select>
      </v-col>

      <v-col class="c-rtl" cols="4">
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
    <v-data-table
      :headers="headers"
      :items="workGroups"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="name"
      show-expand
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Expandable Table</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" @click="dialog = true">New Item</v-btn>
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
        <span v-if="item.parent_id==null">سر گروه</span>
        <span v-else>زیر گروه</span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="openDialog(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
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
      </template>
    </v-data-table>
  </div>
</template>

<script>
import searchOnWorkGroupsMixins from "~/mixins.js/searchOnWorkGroupsMixins.js";
import WorkGroupMixin from "~/mixins.js/chooseWorkGroupMixins.js";
export default {
  mixins: [searchOnWorkGroupsMixins, WorkGroupMixin],
  methods: {
    openDialog(item) {
      this.dialog = true;
      this.editedItem = item;
    },
    openDialogSubWork(item, index) {
      console.log(item, index);
      this.dialog = true;
      console.log(item);
      this.editedItem.subWorks = item.subWorks[index];
      this.editedItem.subWorks = item.subWorks[index];
    },
    save() {
      var temp = this.$refs.form.validate();
      if (temp) {
        if (this.editedItem.subWork.length != 0) {
          // add subWork here
        } else {
          // add Work group here
        }
      }
    },
  },
  data() {
    return {
      workGroups: [],
      selected: [],
      valid: false,
      expanded: [],
      dialog: false,
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
        subWorks: [],
      },
      formData: {},
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
          subWorks: [
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
        },
      ],
    };
  },
};
</script>