<template>
  <div>
    <v-dialog
      v-model="modal"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary" class="small-header">
          <v-btn icon dark @click="closeModal()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>
            <div v-if="currentTab == 'AUCTION'">مزایده</div>
            <div v-if="currentTab == 'TENDER'">مناقصه</div>
            <div v-if="currentTab == 'INQUIRY'">استعلام</div>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="success" type="button" @click="submitGroup()" dark
            >تعیین گروه</v-btn
          >
        </v-toolbar>
        <v-container>
          <v-form ref="form">
            <v-row>
              <v-row class="c-px-30 c-py-20">
                <v-chip
                  v-for="(id, index) in selected"
                  :key="index"
                  class="c-ml-10 c-mb-15"
                  close
                  color="default"
                  label
                  outlined
                  @click:close="deleteGroup(index)"
                >
                  {{ findTitle(id) }}
                </v-chip>
              </v-row>
              <div
                background-color="white"
                color="deep-purple accent-4"
                right
                v-if="type != 'action'"
              >
                <div class="header">
                  <div v-for="(tab, index) in headerTab" :key="index">
                    <!-- <button
                      v-show="tab.id == type"
                      @click.prevent="activeTab(tab.id)"
                    >
                      {{ tab.name }}
                    </button> -->
                  </div>
                </div>
                <div class="tab-body">
                  <div v-if="currentTab == 'AUCTION'">
                    <v-row>
                      <v-col
                        cols="4"
                        v-for="(parentGroup, index) in workingGroups"
                        :key="index"
                      >
                        <v-expansion-panels
                          accordion
                          v-if="parentGroup.type == 'AUCTION'"
                        >
                          <v-expansion-panel>
                            <v-expansion-panel-header>{{
                              parentGroup.title
                            }}</v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-checkbox
                                class="c-mt-0"
                                v-for="(childrenGroup,
                                i) in parentGroup.children"
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
                  </div>
                  <div v-if="currentTab == 'TENDER'">
                    <v-row>
                      <v-col
                        cols="4"
                        v-for="(parentGroup, index) in workingGroups"
                        :key="index"
                      >
                        <v-expansion-panels
                          accordion
                          v-if="parentGroup.type == 'TENDER'"
                        >
                          <v-expansion-panel>
                            <v-expansion-panel-header>{{
                              parentGroup.title
                            }}</v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-checkbox
                                class="c-mt-0"
                                v-for="(childrenGroup,
                                i) in parentGroup.children"
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
                  </div>
                  <div v-if="currentTab == 'INQUIRY'">
                    <v-row>
                      <v-col
                        cols="4"
                        v-for="(parentGroup, index) in workingGroups"
                        :key="index"
                      >
                        <v-expansion-panels
                          accordion
                          v-if="parentGroup.type == 'INQUIRY'"
                        >
                          <v-expansion-panel>
                            <v-expansion-panel-header>{{
                              parentGroup.title
                            }}</v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-checkbox
                                class="c-mt-0"
                                v-for="(childrenGroup,
                                i) in parentGroup.children"
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
                  </div>
                </div>
              </div>
              <!-- Work Groups on Action -->
              <div
                background-color="white"
                color="deep-purple accent-4"
                right
                v-if="type == 'action'"
              >
                <div class="header">
                  <div v-for="(tab, index) in headerTab" :key="index">
                    <button @click.prevent="activeTab(tab.id)">
                      {{ tab.name }}
                    </button>
                  </div>
                </div>
                <div class="tab-body">
                  <div v-if="currentTab == 'AUCTION'">
                    <v-row>
                      <v-col
                        cols="4"
                        v-for="(parentGroup, index) in workingGroups"
                        :key="index"
                      >
                        <v-expansion-panels
                          accordion
                          v-if="parentGroup.type == 'AUCTION'"
                        >
                          <v-expansion-panel>
                            <v-expansion-panel-header>{{
                              parentGroup.title
                            }}</v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-checkbox
                                class="c-mt-0"
                                v-for="(childrenGroup,
                                i) in parentGroup.children"
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
                  </div>
                  <div v-if="currentTab == 'TENDER'">
                    <v-row>
                      <v-col
                        cols="4"
                        v-for="(parentGroup, index) in workingGroups"
                        :key="index"
                      >
                        <v-expansion-panels
                          accordion
                          v-if="parentGroup.type == 'TENDER'"
                        >
                          <v-expansion-panel>
                            <v-expansion-panel-header>{{
                              parentGroup.title
                            }}</v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-checkbox
                                class="c-mt-0"
                                v-for="(childrenGroup,
                                i) in parentGroup.children"
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
                  </div>
                  <div v-if="currentTab == 'INQUIRY'">
                    <v-row>
                      <v-col
                        cols="4"
                        v-for="(parentGroup, index) in workingGroups"
                        :key="index"
                      >
                        <v-expansion-panels
                          accordion
                          v-if="parentGroup.type == 'INQUIRY'"
                        >
                          <v-expansion-panel>
                            <v-expansion-panel-header>{{
                              parentGroup.title
                            }}</v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-checkbox
                                class="c-mt-0"
                                v-for="(childrenGroup,
                                i) in parentGroup.children"
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
                  </div>
                </div>
              </div>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["props_selected", "modal", "type"],
  mounted() {
    this.workingGroups = this.$store.getters["workGroups"];
  },
  created() {
    if (this.props_selected != undefined) {
      this.props_selected.forEach((e) => {
        this.selected.push(e);
      });
    }
    this.currentTab = this.type;
  },
  watch: {},
  methods: {
    deleteGroup(index) {
      this.selected.splice(index, 1);
    },
    findTitle(id) {
      if (!id) return "";
      let title = "";
      this.$store.getters["workGroups"].forEach((element) => {
        let findedId = element.children.find((child) => child.id == id);
        if ( findedId!= undefined) {
          title = findedId.title;
        }
      });
      return title;
    },
    activeTab(id) {
      this.currentTab = id;
    },
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
      headerTab: [
        {
          id: "AUCTION",
          name: "مزایده",
        },
        {
          id: "TENDER",
          name: "مناقصه",
        },
        {
          id: "INQUIRY",
          name: "استعلام",
        },
      ],
      currentTab: "1",
      selected: [],
      selectedChildren: [],
      workingGroups: [],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>