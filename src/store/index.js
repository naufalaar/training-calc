import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fourNets: [0, 1, 2, 3, 4],
    twoNets: [0, 1, 2],
    week: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    age: [
      17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
      35,
    ],
    trainingTimes: {
      primary: {
        1: [
          11.1, 12.4, 13.6, 14.9, 16.2, 17.5, 18.8, 20.1, 21.4, 22.7, 24, 25.3,
          26.6, 27.9, 29.2, 30.5, 31.8, 33.1, 34.4,
        ],
        2: [
          7.4, 8.2, 9.9, 11.2, 12.5, 13.8, 15.1, 16.4, 17.7, 19, 20.3, 21.6,
          22.9, 24.2, 25.5, 26.8, 28.1, 29.4, 30.7,
        ],
        3: [6.3, 7, 8.2, 9.2, 10.3, 11.4, 12.5, 13.6, 14.7],
        4: [5.9, 6.6],
      },
      keeping: {
        1: [
          7.4, 8.6, 9.9, 11.2, 12.5, 13.8, 15.1, 16.4, 17.7, 19, 20.3, 21.6,
          22.9, 24.2, 25.5, 26.8, 28.1, 29.4, 30.7,
        ],
        2: [
          4.9, 7.3, 8.2, 9.2, 10.3, 11.4, 12.5, 13.6, 14.7, 15.7, 17, 18.3,
          19.6, 20.9, 22.2, 23.5, 24.8, 26.1, 27.1,
        ],
      },
      secondary: {
        1: [
          14.2, 13.6, 13, 12.4, 11.8, 11.2, 10.6, 10, 9.4, 8.8, 8.2, 7.6, 7,
          6.4, 5.8, 5.2, 4.6, 4, 4,
        ],
        2: [
          7.1, 6.8, 6.5, 6.2, 5.9, 5.6, 5.3, 5, 4.7, 4.4, 4.1, 3.8, 3.5, 3.2,
          2.9, 2.6,
        ],
        3: [
          4.7, 4.5, 4.3, 4.1, 3.9, 3.7, 3.5, 3.3, 3.1, 2.9, 2.7, 2.5, 2.3, 2.1,
        ],
      },
      fielding: {
        1: [
          6.1, 7.2, 8.3, 9.4, 10.5, 11.6, 12.7, 13.8, 14.9, 16, 17.1, 18.2,
          19.3, 20.4, 21.5, 22.6, 23.7, 24.8, 25.9,
        ],
        2: [
          4.2, 5.3, 6.4, 7.5, 8.6, 9.7, 10.8, 11.9, 13.1, 14.1, 15.2, 16.3,
          17.4, 18.5, 19.6, 20.7, 21.8, 22.9, 24,
        ],
      },
      stamina: {
        1: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 9.5, 11.1, 14.9],
        2: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5.3, 5.7, 6.6],
      },
    },
    skills: [
      "Useless",
      "Worthless",
      "Abysmal",
      "Woeful",
      "Feeble",
      "Mediocre",
      "Competant",
      "Respectable",
      "Proficient",
      "Strong",
      "Superb",
      "Quality",
      "Remarkable",
      "Wonderful",
      "Exceptional",
      "Sensational",
      "Exquisite",
      "Masterful",
      "Miraculous",
      "Phenomenal",
      "Elite",
    ],
    staminaSkills: [
      "Useless",
      "Worthless",
      "Abysmal",
      "Woeful",
      "Feeble",
      "Mediocre",
      "Competent",
      "Respectable",
      "Proficient",
      "Strong",
      "Superb",
      "Superb*",
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    getFourNets: (state) => {
      return state.fourNets;
    },
    getTwoNets: (state) => {
      return state.twoNets;
    },
    getWeek: (state) => {
      return state.week;
    },
    getAge: (state) => {
      return state.age;
    },
    getTrainingTimes: (state) => {
      return state.trainingTimes;
    },
    getSkills: (state) => {
      return state.skills;
    },
    getStaminaSkills: (state) => {
      return state.staminaSkills;
    },
  },
});
