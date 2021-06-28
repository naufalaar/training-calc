<template>
  <b-container>
    <Header />
    <TrainingCalc />
  </b-container>
</template>

<script>
import TrainingCalc from "./components/TrainingCalc.vue";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    TrainingCalc,
    Header,
  },
};
</script>

<style lang="scss">
@import "./styles/app.scss";
body {
  background: var(--secondary) !important;
}
</style>
