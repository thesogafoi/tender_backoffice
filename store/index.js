export const strict = false

export const state = () => ({
  workingGroupsModal:false,
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
  cityList: [{
    id: 1,
    name: "آذربایجان شرقی",

  },
  {
    id: 2,
    name: "آذربایجان غربی",

  },
  {
    id: 3,
    name: "اردبیل",

  },
  {
    id: 4,
    name: "اصفهان",

  },
  {
    id: 5,
    name: "بوشهر",

  },
  {
    id: 6,
    name: "تهران",

  },
  {
    id: 7,
    name: "چهارمحال و بختیاری",

  },
  {
    id: 8,
    name: "خراسان جنوبی",

  },
  {
    id: 9,
    name: "خراسان رضوی",

  },
  {
    id: 10,
    name: "خراسان شمالی",

  },
  {
    id: 11,
    name: "خوزستان",

  },
  {
    id: 12,
    name: "زنجان",

  },
  {
    id: 13,
    name: "سمنان",

  },
  {
    id: 14,
    name: "سیستان و بلوچستان",

  },
  {
    id: 15,
    name: "فارس",

  },
  {
    id: 16,
    name: "قم",

  },
  {
    id: 17,
    name: "کرمانشاه",

  },
  {
    id: 18,
    name: "کرمان",

  },
  {
    id: 19,
    name: "کهکیلویه و بویراحمد",

  },
  {
    id: 20,
    name: "گلستان",

  },
  {
    id: 21,
    name: "گیلان",

  },
  {
    id: 22,
    name: "کرمان",

  },
  {
    id: 23,
    name: "لرستان",

  },
  {
    id: 24,
    name: "مازندران",

  },
  {
    id: 25,
    name: "هرمزگان",

  },
  {
    id: 26,
    name: "مرکزی",

  },
  {
    id: 27,
    name: "همدان",

  },
  {
    id: 28,
    name: "یزد",

  },
  {
    id: 29,
    name: "البرز",

  },
  {
    id: 30,
    name: "ایلام",

  },
  {
    id: 31,
    name: "قزوین",

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
  async refreshWorkGroups({
    commit
  }) {
    console.log('refreshing database');
    let {
      data
    } = await this.$axios.$get('workgroup/component/index')
    commit('SET_WORK_GROUPS', data);
  },
  async nuxtServerInit({
    dispatch
  }) {
    await dispatch('refreshWorkGroups')
  },
}
