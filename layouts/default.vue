<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      right
      :clipped="clipped"
      fixed
      app
      :width="200"
    >
      <v-list>
        <v-toolbar-title class="nav-title">
          <img src="/Asan-2.png" alt />
        </v-toolbar-title>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          dir="ltr"
        >
          <div
            class="d-flex justify-space-between w-100 align-center"
            v-if="afterStaff"
          >
            <v-list-item-title class="nav-icon" v-text="item.title" />
            <v-icon>{{ item.icon }}</v-icon>
          </div>
          <div v-else>
            <div
              class="d-flex justify-space-between w-100 align-center"
              v-if="to != '/staffAndAccess'"
            >
              <v-list-item-title class="nav-icon" v-text="item.title" />
              <v-icon>{{ item.icon }}</v-icon>
            </div>
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app height="62">
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-spacer />
      <div class="d-flex align-center justify-center">
        <p class="c-mb-0 c-user-name">{{ $auth.user.name }}</p>
        <v-btn class="ma-2" color="indigo" dark @click.prevent="logOut">
          خروج
        </v-btn>
        <v-list-item-avatar>
          <v-img
            src="https://randomuser.me/api/portraits/men/85.jpg"
            width="20"
          ></v-img>
        </v-list-item-avatar>
      </div>
    </v-app-bar>
    <v-main>
      <div class="c-container">
        <nuxt />
      </div>
    </v-main>

    <v-snackbar
      v-model="$store.state.snackbar"
      :color="$store.state.snackbarColor"
    >
      <v-card-title
        class="font-weight-regular pa-2"
        style="word-spacing: 1.2px; text-align: center"
        >{{ $store.state.snackbarText }}</v-card-title
      >

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
  middleware: ["checkLogin"],
  methods: {
    async logOut() {
      await this.$auth.logout();
    },
  },

  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "mdi-view-dashboard",
          title: "داشبورد",
          to: "#",
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
          icon: "mdi-format-list-text",
          title: "طرح های اشتراکی ",
          to: "/salesPlans",
        },
        {
          icon: "mdi-account-group",
          title: "مشتریان",
          to: "/customers",
        },
        {
          icon: "mdi-account-group",
          title: "تبلیغات",
          to: "/advertisementBanner",
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
          icon: "mdi-account",
          title: "کارمندان و دسترسی ها",
          to: "/staffAndAccess",
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
.buttons-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
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
