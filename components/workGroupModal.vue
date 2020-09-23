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
          <v-form ref="form">
            <v-row>
              <v-col cols="12" class="text-left">
                <v-btn color="success" type="button" @click="submitGroup()" dark>تعیین گروه</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-card class="c-mb-20">
                <v-card-body class="c-pa-10">
                  <v-row class="c-px-30">
                    <div v-for="id in selected" :key="id">
                      <p class="c-mb-0">{{findTitle(id)}} /</p>
                    </div>
                  </v-row>
                </v-card-body>
              </v-card>
              <div
                background-color="white"
                color="deep-purple accent-4"
                right
                v-if="type!='action'"
              >
                <div class="header">
                  <div v-for="(tab , index) in headerTab" :key="index">
                    <button v-show=" tab.id == type" @click.prevent="activeTab(tab.id)">{{tab.name}}</button>
                  </div>
                </div>
                <div class="tab-body">
                  <div v-if="currentTab=='AUCTION'">
                    <v-row>
                      <v-col cols="4" v-for="(parentGroup,index) in workingGroups" :key="index">
                        <v-expansion-panels accordion v-if="parentGroup.type=='AUCTION'">
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
                  </div>
                  <div v-if="currentTab=='TENDER'">
                    <v-row>
                      <v-col cols="4" v-for="(parentGroup,index) in workingGroups" :key="index">
                        <v-expansion-panels accordion v-if="parentGroup.type=='TENDER'">
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
                  </div>
                  <div v-if="currentTab=='INQUIRY'">
                    <v-row>
                      <v-col cols="4" v-for="(parentGroup,index) in workingGroups" :key="index">
                        <v-expansion-panels accordion v-if="parentGroup.type=='INQUIRY'">
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
                  </div>
                </div>
              </div>
              <!-- Work Groups on Action -->
              <div
                background-color="white"
                color="deep-purple accent-4"
                right
                v-if="type=='action'"
              >
                <div class="header">
                  <div v-for="(tab , index) in headerTab" :key="index">
                    <button @click.prevent="activeTab(tab.id)">{{tab.name}}</button>
                  </div>
                </div>
                <div class="tab-body">
                  <div v-if="currentTab=='AUCTION'">
                    <v-row>
                      <v-col cols="4" v-for="(parentGroup,index) in workingGroups" :key="index">
                        <v-expansion-panels accordion v-if="parentGroup.type=='AUCTION'">
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
                  </div>
                  <div v-if="currentTab=='TENDER'">
                    <v-row>
                      <v-col cols="4" v-for="(parentGroup,index) in workingGroups" :key="index">
                        <v-expansion-panels accordion v-if="parentGroup.type=='TENDER'">
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
                  </div>
                  <div v-if="currentTab=='INQUIRY'">
                    <v-row>
                      <v-col cols="4" v-for="(parentGroup,index) in workingGroups" :key="index">
                        <v-expansion-panels accordion v-if="parentGroup.type=='INQUIRY'">
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
    findTitle(id) {
      if (!id) return "";
      let title = "";
      this.$store.getters["workGroups"].forEach((element) => {
        if (element.children.find((child) => child.id == id) != undefined) {
          title = element.children.find((child) => child.id == id).title;
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