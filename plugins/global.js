import Vue from 'vue'

import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import {
  snackbarMixin
} from "../mixins/snackbarMixin";

Vue.mixin(snackbarMixin)
