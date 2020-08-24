<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-combobox v-model="select" :items="items" multiple chips>
          <template v-slot:selection="data">
            <v-chip
              :key="JSON.stringify(data.item.name)"
              v-bind="data.attrs"
              :input-value="data.selected"
              :disabled="data.disabled"
              @click:close="data.parent.selectItem(data.item)"
            >
              {{data}}
              <v-avatar
                class="accent white--text"
                left
                v-text="data.item.slice(0, 1).toUpperCase()"
              ></v-avatar>
              {{ data.item }}
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      select: [],
      items: [
        {
          name: "test1",
          category: 1,
        },
        {
          name: "test1",
          category: 1,
        },
        {
          name: "test1",
          category: 2,
        },
        {
          name: "test1",
          category: 2,
        },
        {
          name: "test1",
          category: 3,
        },
        {
          name: "test1",
          category: 3,
        },
        {
          name: "test1",
          category: 3,
        },
      ],
    };
  },
};
</script>