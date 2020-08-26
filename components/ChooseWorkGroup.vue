<template>
  <v-col cols="12">
    <v-autocomplete
      v-model="selected"
      :disabled="isUpdating"
      :items="workGroups"
      filled
      chips
      label="Select"
      item-text="title"
      item-value="id"
      multiple
    >
      <template v-slot:selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          close
          @click="data.select"
          @click:close="remove(data.item)"
        >{{ data.item.title }}</v-chip>
      </template>
    </v-autocomplete>
  </v-col>
</template>

<script>
export default {
  props: ["work_groups"],
  data() {
    return {
      selected: [],
      isUpdating: false,
      workGroups: [],
    };
  },
  created() {
    this.fixWokrGroupData();
  },
  watch: {
    selected() {
      this.$emit("selected_work_group_changed", this.selected);
    },
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
  },

  methods: {
    fixWokrGroupData() {
      for (let i = 0; i < this.work_groups.length; i++) {
        if (i != 0) {
          //   this.workGroups.push({ divider: true });
        }
        this.workGroups.push({ header: this.work_groups[i].header });
        if (this.work_groups[i].children.length != 0) {
          this.workGroups.push(...this.work_groups[i].children);
        }
      }
    },
    remove(item) {
      const index = this.selected.indexOf(item);
      this.selected = this.selected.filter((workGroup) => {
        return workGroup != item.id;
      });
    },
  },
};
</script>