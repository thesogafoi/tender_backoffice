<template>
  <div>
    <v-dialog v-model="modal" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closeModal()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>دسته‌های کاری</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container>
          <v-form ref="form" @submit.prevent="submitGroup()">
            <p>it's here</p>
            {{props_selected}}
            <v-row>
              <v-col cols="12" class="text-left">
                <v-btn color="success" type="submit" dark>تعیین گروه</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" v-for="(parentGroup,index) in workingGroups" :key="index">
                <v-expansion-panels accordion>
                  <v-expansion-panel>
                    <v-expansion-panel-header>{{parentGroup.title}}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-checkbox
                        class="c-mt-0"
                        v-for="(childrenGroup,i) in parentGroup.children"
                        :key="i"
                        v-model="selected"
                        :label="childrenGroup.title"
                        :value="childrenGroup.id"
                      ></v-checkbox>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["props_selected", "modal"],
  mounted() {
    this.workingGroups = this.$store.getters["workGroups"];
  },
  created() {
    console.log(this.props_selected);
    if (this.props_selected != undefined) {
      this.props_selected.forEach((e) => {
        this.selected.push(e);
      });
    }
  },
  watch: {},
  methods: {
    submitGroup() {
      this.closeModal();
      this.$emit("add_selected", this.selected);
    },
    closeModal() {
      this.$emit("close_modal");
    },
  },
  data() {
    return {
      selected: [],
      selectedChildren: [],
      workingGroups: [],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>