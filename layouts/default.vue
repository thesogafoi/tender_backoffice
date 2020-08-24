<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" right :clipped="clipped" fixed app>
      <v-list>
        <v-toolbar-title v-text="title" class="nav-title" />

        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router>
          <v-list-item-title class="nav-icon" v-text="item.title" />
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>

      <v-spacer />
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

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
.c-rtl {
  direction: rtl !important;
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