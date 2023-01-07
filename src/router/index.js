import Vue from "vue";
import VueRouter from "vue-router";
import SinglePlayer from "../views/SinglePlayer.vue";
import PlayerSeason from "../views/PlayerSeason.vue";
import MultiplePlayers from "../views/MultiplePlayers.vue";
import Insane from "../views/Insane.vue";
import WageCalculator from "../views/WageCalculator.vue";
import RawData from "../views/RawData.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/singlePlayer",
    name: "SinglePlayer",
    component: SinglePlayer,
  },
  {
    path: "/playerSeason",
    name: "PlayerSeason",
    component: PlayerSeason,
  },
  {
    path: "/multiplePlayers",
    name: "MultiplePlayers",
    component: MultiplePlayers,
  },
  {
    path: "/insane",
    name: "Insane",
    component: Insane,
  },
  {
    path: "/",
    name: "WageCalculator",
    component: WageCalculator,
  },
  {
    path: "/rawData",
    name: "RawData",
    component: RawData,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
