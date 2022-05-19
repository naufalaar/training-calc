<template>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand to="/">{{ appName }}</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav> </b-navbar-nav>
        <b-navbar-nav class="ml-auto main-nav">
          <b-nav-item to="/" exact exact-active-class="active"
            >Wage Calculator</b-nav-item
          >
          <b-nav-item to="/singlePlayer" exact exact-active-class="active"
            >Single Player Plan</b-nav-item
          >
          <b-nav-item to="/playerSeason" exact exact-active-class="active"
            >Weekly Training Plan</b-nav-item
          >
          <b-nav-item to="/multiplePlayers" exact exact-active-class="active"
            >Multiple Players Plan</b-nav-item
          >
          <b-nav-item to="/insane" exact exact-active-class="active"
            >Insane Plan</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      appName: "BT Training Calculator",
    };
  },
};
</script>

