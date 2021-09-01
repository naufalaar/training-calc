import Vue from "vue";
import VueRouter from "vue-router";
import SinglePlayer from "../views/SinglePlayer.vue";
import PlayerSeason from "../views/PlayerSeason.vue";
import MultiplePlayers from "../views/MultiplePlayers.vue";
import Insane from "../views/Insane.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
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
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
