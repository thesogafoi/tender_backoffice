<template>
  <v-container fluid>
    <v-combobox
      v-model="model"
      :filter="filter"
      :hide-no-data="!search"
      :items="items"
      :search-input.sync="search"
      hide-selected
      label="Search for an option"
      multiple
      small-chips
      solo
    >
      <template v-slot:no-data>
        <v-list-item>
          <span class="subheading">Create</span>
          <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>{{ search }}</v-chip>
        </v-list-item>
      </template>
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip
          v-if="item === Object(item)"
          v-bind="attrs"
          :color="`${item.color} lighten-3`"
          :input-value="selected"
          label
          small
        >
          <span class="pr-2">{{ item.text }}</span>
          <v-icon small @click="parent.selectItem(item)">close</v-icon>
        </v-chip>
      </template>
      <template v-slot:item="{ index, item }">
        <p>{{item.text}}</p>
        <ul>
          <li v-for="(wor , index) in item.work">{{wor.name}}</li>
        </ul>
      </template>
    </v-combobox>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    activator: null,
    attach: null,
    colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
    editing: null,
    index: -1,
    items: [
      { header: "Select an option or create one" },
      {
        text: "Foo",
        color: "blue",
        work: [
          {
            name: "test1",
            id: 2,
          },
        ],
      },
      {
        text: "Bar",
        color: "purple",
        work: [
          {
            name: "test1",
            id: 2,
          },
        ],
      },
      {
        text: "1",
        color: "indigo",
        work: [
          {
            name: "test1",
            id: 2,
          },
        ],
      },
      {
        text: "2",
        color: "cyan",
        work: [
          {
            name: "test1",
            id: 2,
          },
        ],
      },
      {
        text: "3",
        color: "teal",
        work: [
          {
            name: "test1",
            id: 2,
          },
        ],
      },
      {
        text: "4",
        color: "orange",
        work: [
          {
            name: "test1",
            id: 2,
          },
        ],
      },
    ],
    nonce: 1,
    menu: false,
    model: [
      {
        text: "Foo",
        color: "blue",
      },
    ],
    x: 0,
    search: null,
    y: 0,
  }),

  watch: {
    model(val, prev) {
      if (val.length === prev.length) return;

      this.model = val.map((v) => {
        if (typeof v === "string") {
          v = {
            text: v,
            color: this.colors[this.nonce - 1],
          };

          this.items.push(v);

          this.nonce++;
        }

        return v;
      });
    },
  },

  methods: {
    edit(index, item) {
      if (!this.editing) {
        this.editing = item;
        this.index = index;
      } else {
        this.editing = null;
        this.index = -1;
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false;

      const hasValue = (val) => (val != null ? val : "");

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return (
        text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) >
        -1
      );
    },
  },
};
</script>