export const strict = false

export const state = () => ({
  openWorkGroupModal: false,
  showGroupTitle: [],
  toolbarColor: 'grey lighten-1',
  snackbarTextDeleteSuccessful: 'The Item was  deleted',
  snackbarTextDeleteFailed: 'The Item were not deleted',
  snackbarTextEditSuccessful: 'The Item was edited',
  snackbarTextEditFailed: 'The Item was not edited',
  snackbarTextAddSuccessful: 'The New Item was added',
  snackbarTextAddFailed: 'The New Item was not added',
  snackbarText: 'Oops something wrong',
  snackbarColor: 'error',
  snackbar: false,
  baseUrl: 'http://asan.matican.work/api/',
  cityList: [
    {
      id: 1,
      name: "آذربایجان شرقی"
    },
    {
      id: 2,
      name: "آذربایجان غربی"
    },
    {
      id: 3,
      name: "اردبیل"
    },
    {
      id: 4,
      name: "اصفهان"
    },
    {
      id: 5,
      name: "البرز"
    },
    {
      id: 6,
      name: "ایلام"
    },
    {
      id: 7,
      name: "بوشهر"
    },
    {
      id: 8,
      name: "تهران"
    },
    {
      id: 9,
      name: "چهارمحال و بختیاری"
    },
    {
      id: 10,
      name: "خراسان جنوبی"
    },
    {
      id: 11,
      name: "خراسان رضوی"
    },
    {
      id: 12,
      name: "خراسان شمالی"
    },
    {
      id: 13,
      name: "خوزستان"
    },
    {
      id: 14,
      name: "زنجان"
    },
    {
      id: 15,
      name: "سمنان"
    },
    {
      id: 16,
      name: "سیستان و بلوچستان"
    },
    {
      id: 17,
      name: "فارس"
    },
    {
      id: 18,
      name: "قزوین"
    },
    {
      id: 19,
      name: "قم"
    },
    {
      id: 20,
      name: "کردستان"
    },
    {
      id: 21,
      name: "کرمان"
    },
    {
      id: 22,
      name: "کرمانشاه"
    },
    {
      id: 23,
      name: "کهگیلویه و بویراحمد"
    },
    {
      id: 24,
      name: "گلستان"
    },
    {
      id: 25,
      name: "گیلان"
    },
    {
      id: 26,
      name: "لرستان"
    },
    {
      id: 27,
      name: "مازندران"
    },
    {
      id: 28,
      name: "مرکزی"
    },
    {
      id: 29,
      name: "هرمزگان"
    },
    {
      id: 30,
      name: "همدان"
    },
    {
      id: 31,
      name: "یزد"
    },

  ],
  required: [(v) => !!v || 'This Field Is Required'],

  work_groups: []

})
export const getters = {
  isAuthenticated(state) {
    return state.token != null
  },
  workGroups(state) {
    return state.work_groups;
  }
}

export const mutations = {
  SET_WORK_GROUPS(state, work_groups) {
    state.work_groups = work_groups;
  }
}


export const actions = {
  async refreshWorkGroups({ commit }) {
    let data = await this.$axios.$get('workgroup/component/index')
    commit('SET_WORK_GROUPS', data.data);
  },
  async nuxtServerInit({
    dispatch
  }) {
    await dispatch('refreshWorkGroups')
  },
}
