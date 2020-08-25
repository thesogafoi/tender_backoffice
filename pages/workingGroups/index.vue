<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      item-key="name"
      sort-by="name"
      group-by="category"
      class="elevation-1"
      show-group-by
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>گروه های کاری</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">اضافه کردن</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <!-- card form -->
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          value: "name",
          groupable: false,
        },
        { text: "Category", value: "category", align: "right" },
        { text: "Dairy", value: "dairy", align: "right" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          category: "Ice cream",
          dairy: "Yes",
        },
        {
          name: "Ice cream sandwich",
          category: "Ice cream",
          dairy: "Yes",
        },
        {
          name: "Eclair",
          category: "Cookie",
          dairy: "Yes",
        },
        {
          name: "Cupcake",
          category: "Pastry",
          dairy: "Yes",
        },
        {
          name: "Gingerbread",
          category: "Cookie",
          dairy: "No",
        },
        {
          name: "Jelly bean",
          category: "Candy",
          dairy: "No",
        },
        {
          name: "Lollipop",
          category: "Candy",
          dairy: "No",
        },
        {
          name: "Honeycomb",
          category: "Toffee",
          dairy: "No",
        },
        {
          name: "Donut",
          category: "Pastry",
          dairy: "Yes",
        },
        {
          name: "KitKat",
          category: "Candy",
          dairy: "Yes",
        },
      ],
    };
  },
};
</script>