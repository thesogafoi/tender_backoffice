<template>
  <div>
    <v-dialog v-model="$store.state.openWorkGroupModal" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="$store.state.openWorkGroupModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>دسته‌های کاری</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container>
          <v-form ref="form" @submit.prevent="submitGroup()">
            <v-row>
              <v-col cols="12" class="text-left">
                <v-btn color="success" type="submit" dark @click="$store.state.openWorkGroupModal = false">تعیین گروه</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" v-for="(parentGroup,index) in workingGroups" :key="index">
                <v-expansion-panels accordion>
                  <v-expansion-panel>
                    <v-expansion-panel-header>{{parentGroup.title}}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        {{$store.state.WorkGroupSelected}}
                      <v-checkbox
                        class="c-mt-0"
                        v-for="(childrenGroup,i) in parentGroup.children"
                        :key="i"
                        v-model="$store.state.WorkGroupSelected"
                        :label="childrenGroup.title"
                        :value="childrenGroup"
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
  mounted() {
    this.workingGroups = this.$store.getters["workGroups"];
  },
  watch: {
    selected() {
      this.$emit("add_selected", this.selected);
    },
  },
  methods: {
    submitGroup() {
      this.$store.state.workingGroupsModal = false;
      this.$store.state.showGroupTitle = []
      this.selected.forEach(element => {
         this.$store.state.showGroupTitle.push(element.title);
      });
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