<template>
  <div>
    <v-dialog v-model="childDialog" persistent max-width="500">
      <template v-slot:activator="{ on }">
        <v-btn icon dark color="red" v-on="on">
          <v-icon color="red">mdi-trash-can-outline</v-icon>
        </v-btn>
      </template>
      <v-card style="border: 1px solid #494949">
        <v-card-title class="font-weight-regular font-14 c-px-10"
          >آیا از پاک کردن این مورد اطمینان دارد؟</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-3"
            class="white--text"
            small
            @click="childDialog = !childDialog"
            >انصراف</v-btn
          >
          <v-btn
            color="red darken-3"
            class="white--text"
            small
            @click="emitToParent"
            >بله</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogStatus"],
  data() {
    return {
      childDialog: false,
    };
  },
  methods: {
    emitToParent() {
      this.$emit("delete");
      this.childDialog = !this.childDialog;
    },
  },
};
</script>
