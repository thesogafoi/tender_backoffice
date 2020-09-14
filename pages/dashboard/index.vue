<template>
  <div>
    <v-row>
      <v-col cols="12" lg="4" md="4" sm="12">
        <v-card class="card" color="rgba(0, 143, 251, 0.85)">
          <v-row>

            <v-col class="inside-card" cols="12" lg="6">
              <v-icon class="icon">mdi-human-male</v-icon>
              <h5>مشتری</h5>
            </v-col>
            <v-col class="inside-card" cols="12" lg="6">
              <h6>130</h6>
            </v-col>

          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" lg="4" md="4" sm="12">
        <v-card class="card" color="rgba(255, 69, 96, 0.85)">
          <v-row>
            <v-col class="inside-card" cols="12" lg="6">
              <v-icon class="icon">mdi-human-male</v-icon>
              <h5>مشتری</h5>
            </v-col>

            <v-col class="inside-card" cols="12" lg="6">
              <h6>130</h6>
            </v-col>

          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" lg="4" md="4" sm="12">
        <v-card class="card" color="rgba(254, 176, 25, 0.85)">
          <v-row>
            <v-col class="inside-card" cols="12" lg="6">
              <v-icon class="icon">mdi-human-male</v-icon>
              <h5>مشتری</h5>
            </v-col>
            <v-col class="inside-card" cols="12" lg="6">
              
              <h6>130</h6>
            </v-col>

          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6" md="12" sm="12">
        <v-data-table :headers="headers" :items="desserts" class="elevation-1"></v-data-table>
      </v-col>
      <v-col cols="6" lg="6" md="12" sm="12">
        <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1"></v-data-table>
      </v-col>
    </v-row>
    <!-- snackbar show sample  -->
  </div>
</template>

<script>
  export default {
    methods: {},

    data() {
      return {
        rowsPerPageItems: [10, 20, 30, 40],
        pagination: {
          rowsPerPage: 20,
        },
        headers: [{
            text: "Dessert (100g serving)",
            align: "start",
            sortable: false,
            value: "name",
          },
          {
            text: "Calories",
            value: "calories"
          },
          {
            text: "Fat (g)",
            value: "fat"
          },
          {
            text: "Carbs (g)",
            value: "carbs"
          },
          {
            text: "Protein (g)",
            value: "protein"
          },
          {
            text: "Iron (%)",
            value: "iron"
          },
        ],
        desserts: [{
            name: "Frozen Yogurt",
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: "1%",
          },
          {
            name: "Ice cream sandwich",
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: "1%",
          },
          {
            name: "Eclair",
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: "7%",
          },
          {
            name: "Cupcake",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: "8%",
          },
          {
            name: "Ice cream sandwich",
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: "1%",
          },
          {
            name: "Eclair",
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: "7%",
          },
          {
            name: "Cupcake",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: "8%",
          },
          {
            name: "Ice cream sandwich",
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: "1%",
          },
          {
            name: "Eclair",
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: "7%",
          },
          {
            name: "Cupcake",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: "8%",
          },
          {
            name: "Ice cream sandwich",
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: "1%",
          },
          {
            name: "Eclair",
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: "7%",
          },
          {
            name: "Cupcake",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: "8%",
          },
          {
            name: "Ice cream sandwich",
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: "1%",
          },
          {
            name: "Eclair",
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: "7%",
          },
          {
            name: "Cupcake",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: "8%",
          },
          {
            name: "Ice cream sandwich",
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: "1%",
          },
          {
            name: "Eclair",
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: "7%",
          },
          {
            name: "Cupcake",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: "8%",
          },
          {
            name: "Ice cream sandwich",
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: "1%",
          },
          {
            name: "Eclair",
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: "7%",
          },
          {
            name: "Cupcake",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: "8%",
          },
          {
            name: "Ice cream sandwich",
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: "1%",
          },
          {
            name: "Eclair",
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: "7%",
          },
          {
            name: "Cupcake",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: "8%",
          },
          {
            name: "Ice cream sandwich",
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: "1%",
          },
          {
            name: "Eclair",
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: "7%",
          },
          {
            name: "Cupcake",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: "8%",
          },
          {
            name: "Gingerbread",
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: "16%",
          },
          {
            name: "Jelly bean",
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: "0%",
          },
          {
            name: "Lollipop",
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: "2%",
          },
          {
            name: "Honeycomb",
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: "45%",
          },
          {
            name: "Donut",
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: "22%",
          },
          {
            name: "KitKat",
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: "6%",
          },
        ],
      };
    },
  };

</script>

<style lang="scss" scoped>
  .box {
    box-shadow: 0 0 2px black;
    width: 100%;
    height: 150px;
  }

  .card {
    height: 150px;
    display: flex;
    align-items: center;
  }

  .inside-card {
    justify-content: center;
    display: flex;
    align-items: center;

    h5{
      font-size: 16px;
    }
    h6{
      font-size: 40px;
    }
  }

  .icon {
    font-size: 70px;
  }

</style>
