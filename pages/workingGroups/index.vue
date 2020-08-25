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
                  {{editedItem}}
                  <v-text-field
                    :rules="[v => !!v || 'You must agree to continue!']"
                    v-model="editedItem.title"
                    :label="editedItem.subWorks.length === 0?` نام گروه کاری`:`اضافه کردن به گروه کاری` "
                  ></v-text-field>
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
                    v-model="editedItem.imageUrl"
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
    <v-data-table
      :headers="headers"
      :items="works"
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
        </v-toolbar>
      </template>
      <template v-slot:item.imageUrl="{ item }">
        <v-avatar size="36px">
          <img :src="item.imageUrl" alt="John" />
        </v-avatar>
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
export default {
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

      headers: [
        { text: "Image", value: "imageUrl" },
        { text: "Id", value: "id" },
        {
          text: "Work Title",
          align: "start",
          sortable: true,
          value: "title",
        },
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