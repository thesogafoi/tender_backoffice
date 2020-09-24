<template>
  <v-autocomplete
    class="c-autocomplete"
    v-model="selected"
    :disabled="isUpdating || dis"
    :items="workGroups"
    chips
    dense
    label="انتخاب دسته‌های کاری"
    item-text="title"
    item-value="id"
    :multiple="multiple"
  >
    <template v-slot:item="{ parent, item }">
      <!--Highlight output item.name-->
      {{item.title}} -
      (
      <span v-if="item.type=='AUCTION'">مزایده</span>
      <span v-if="item.type=='TENDER'">مناقصه</span>
      <span v-if="item.type=='INQUIRY'">استعلام</span>
      <span v-if="item.parent_id==null">دسته ی اصلی</span>)
    </template>

    <template v-slot:selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selected"
        close
        dir="rtl"
        class="text-right"
        @click="data.select"
        @click:close="remove(data.item)"
      >{{ data.item.title }}</v-chip>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  props: ["work_groups", "multiple",'dis'],
  data() {
    return {
      selected: [],
      isUpdating: false,
      workGroups: [],
    };
  },
  created() {
    console.log(this.multiple);
    this.workGroups = this.work_groups;
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
    // fixWokrGroupData() {
    //   for (let i = 0; i < this.work_groups.length; i++) {
    //     if (i != 0) {
    //       //   this.workGroups.push({ divider: true });
    //     }
    //     this.workGroups.push({ header: this.work_groups[i].header });
    //     if (this.work_groups[i].children.length != 0) {
    //       this.workGroups.push(...this.work_groups[i].children);
    //     }
    //   }
    // },
    remove(item) {
      const index = this.selected.indexOf(item);
      this.selected = this.selected.filter((workGroup) => {
        return workGroup != item.id;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.c-autocomplete{
  &.v-text-field{
    margin-top: 8px;
  }
}
</style>