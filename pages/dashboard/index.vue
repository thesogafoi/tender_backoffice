<template>
  <div>
    <div class="row center">
      <div class="card">
        <div class="row">
          <div class="col-4 icon">
            <v-icon class="icon-card" large>mdi-account</v-icon>
            <h5>مشتری</h5>
          </div>
          <div class="col-7">
            <h4 class="card-number">578</h4>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="row">
          <div class="col-4 icon">
            <v-icon class="icon-card" large>mdi-chart-bar-stacked</v-icon>
            <h5>آمار</h5>
          </div>
          <div class="col-7">
            <h4 class="card-number">578</h4>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="row">
          <div class="col-4 icon">
            <v-icon class="icon-card" large>mdi-attachment</v-icon>
            <h5>تبلیغات</h5>
          </div>
          <div class="col-7">
            <h4 class="card-number">578</h4>
          </div>
        </div>
      </div>
    </div>
    <v-row>
      <v-col cols="6">
        <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1"></v-data-table>
      </v-col>
      <v-col cols="6">
        <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1"></v-data-table>
      </v-col>
    </v-row>
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
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      desserts: [
        {
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
.center {
  display: flex;
  .card {
    background-color: white;
    width: 380px;
    height: 100px;
    box-shadow: 0px 0px 3px black;
    margin: 5px;
  }
  .icon {
    background-color: rgba(255, 0, 85, 0.377);
    margin-right: 10px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon-card {
    justify-content: center;
    display: flex;
  }
  .card-number {
    align-items: center;
    font-size: 50px;
    justify-content: center;
    display: flex;
  }
  h5 {
    font-size: 20px;
  }
}
</style>