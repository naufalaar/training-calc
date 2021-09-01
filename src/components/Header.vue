<template>
  <b-jumbotron bg-variant="primary" text-variant="light" class="py-4 mb-1 mt-3">
    <template #header>{{ appName }}</template>
    <template #lead>This is just a Beta version!</template>
    <b-nav pills fill>
    <b-nav-item to="/" exact exact-active-class="active">Single Player Training Plan</b-nav-item>
    <b-nav-item to="/playerSeason" exact exact-active-class="active">Custom Training Plan</b-nav-item>
    <b-nav-item to="/multiplePlayers" exact exact-active-class="active">Multiple Player Training Plan</b-nav-item>
    <b-nav-item to="/insane" exact exact-active-class="active">Insane Training Plan</b-nav-item>
  </b-nav>
  </b-jumbotron>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      appName: "Training Calculator",
    };
  },
};
</script>

<style lang="scss" scoped>
.nav-pills .nav-link.active, .nav-pills .show > .nav-link {
    color: var(--dark) !important;
    background-color: var(--secondary) !important;
}

.nav-pills .nav-link{
    color: var(--light);
}

</style>
