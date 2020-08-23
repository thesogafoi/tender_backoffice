export const strict = false

export const state = () => ({
  baseUrl: 'http://api.aradmobile.matican.work/api/',
  cityList: [{
      name: "آذربایجان شرقی",
      id: 1,
    },
    {
      name: "آذربایجان غربی",
      id: 2,
    },
    {
      name: "اردبیل",
      id: 3,
    },
    {
      name: "اصفهان",
      id: 4,
    },
    {
      name: "بوشهر",
      id: 5,
    },
    {
      name: "تهران",
      id: 6,
    },
    {
      name: "چهارمحال و بختیاری",
      id: 7,
    },
    {
      name: "خراسان جنوبی",
      id: 8,
    },
    {
      name: "خراسان رضوی",
      id: 9,
    },
    {
      name: "خراسان شمالی",
      id: 10,
    },
    {
      name: "خوزستان",
      id: 11,
    },
    {
      name: "زنجان",
      id: 12,
    },
    {
      name: "سمنان",
      id: 13,
    },
    {
      name: "سیستان و بلوچستان",
      id: 14,
    },
    {
      name: "فارس",
      id: 15,
    },
    {
      name: "قم",
      id: 16,
    },
    {
      name: "کرمانشاه",
      id: 17,
    },
    {
      name: "کرمان",
      id: 18,
    },
    {
      name: "کهکیلویه و بویراحمد",
      id: 19,
    },
    {
      name: "گلستان",
      id: 20,
    },
    {
      name: "گیلان",
      id: 21,
    },
    {
      name: "کرمان",
      id: 22,
    },
    {
      name: "لرستان",
      id: 23,
    },
    {
      name: "مازندران",
      id: 24,
    },
    {
      name: "هرمزگان",
      id: 25,
    },
    {
      name: "مرکزی",
      id: 26,
    },
    {
      name: "همدان",
      id: 27,
    },
    {
      name: "یزد",
      id: 28,
    },
    {
      name: "البرز",
      id: 29,
    },
    {
      name: "ایلام",
      id: 30,
    },
    {
      name: "قزوین",
      id: 31,
    },
  ],
})
export const getters = {
  isAuthenticated(state) {
    return state.token != null
  }
}

export const mutations = {}
