<template>
  <div>
    <v-dialog
      v-model="$store.state.workingGroupsModal"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="$store.state.workingGroupsModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>دسته‌های کاری</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container>
          <v-form ref="form">
            <v-row>
              <v-col cols="4">
                <v-expansion-panels accordion>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Item</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
                      <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
                      <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
                      <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
                      <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
                      <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
                      <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
                      <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
                      <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
                      <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
                      <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
                      <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
                      <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
                      <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
                      <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
                      <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
                      <v-checkbox v-model="selected" label="Jacob" value="Jacob"></v-checkbox>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
              <v-col cols="4">
                <v-expansion-panels accordion>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Item</v-expansion-panel-header>
                    <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
              <v-col cols="4">
                <v-expansion-panels accordion>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Item</v-expansion-panel-header>
                    <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
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
  data() {
    return {
      workingGroups: [
        {
          id: 1,
          name: 'Applications :',
          children: [
            { id: 2, name: 'Calendar : app' },
            { id: 3, name: 'Chrome : app' },
            { id: 4, name: 'Webstorm : app' },
          ],
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>