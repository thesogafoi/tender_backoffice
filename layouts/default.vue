<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" right :clipped="clipped" fixed app>
      <v-list>
        <v-toolbar-title class="nav-title" >
          <img src="/Asan-2.png" alt="">
        </v-toolbar-title>

        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router>
          <v-list-item-title class="nav-icon" v-text="item.title" />
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-spacer />
      <div class="d-flex align-center justify-center">
        <p class="c-mb-0 c-user-name">خانم کهشیدی</p>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>
      </div>
    </v-app-bar>
    <v-main>
      <div class="c-container">
        <nuxt />
      </div>
    </v-main>

    <v-snackbar v-model="$store.state.snackbar" :color="$store.state.snackbarColor">
      <v-card-title
        class="font-weight-regular pa-2"
        style="word-spacing: 1.2px; text-align: center"
      >{{ $store.state.snackbarText }}</v-card-title>

      <v-btn icon @click="$store.state.snackbar = false">
        <v-icon color="white">mdi-close-circle-outline</v-icon>
      </v-btn>
    </v-snackbar>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "mdi-view-dashboard",
          title: "داشبورد",
          to: "/dashboard",
        },
        {
          icon: "mdi-notebook-check",
          title: "آگهی",
          to: "/advertising",
        },
        {
          icon: "mdi-card-search-outline",
          title: "جستجوی آگهی",
          to: "/adSearch",
        },
        {
          icon: "mdi-lightbulb-group",
          title: "گروه های کاری",
          to: "/workingGroups",
        },
        {
          icon: "mdi-account-group",
          title: "مشتریان",
          to: "/customers",
        },
        {
          icon: "mdi-format-list-text",
          title: "پلن های فروش",
          to: "/salesPlans",
        },
        {
          icon: "mdi-receipt",
          title: "پرداخت ها",
          to: "/payments",
        },
        {
          icon: "mdi-ticket-percent",
          title: "کد تخفیف",
          to: "/discountCode",
        },
        {
          icon: "mdi-post-outline",
          title: "تبلیغات",
          to: "/publicity",
        },
        {
          icon: "mdi-ticket-account",
          title: "آگهی گذار",
          to: "/adTransition",
        },
        {
          icon: "mdi-account",
          title: "کارمندان و دسترسی ها",
          to: "/staffAndAccess",
        },
        {
          icon: "mdi-cog",
          title: "تنظیمات",
          to: "/settings",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Asantender",
    };
  },
};
</script>
<style lang="css">
.nav-icon {
  direction: rtl;
  padding-right: 22px;
}
.nav-title {
  display: flex;
  justify-content: center;
  margin: 13px;
}
.c-header {
  background-color: #ccc;
  margin-right: 0;
  margin-left: 0;
}

.c-form {
  padding: 10px;
}
</style>