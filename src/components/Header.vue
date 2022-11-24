<template>
  <div>
    <b-alert show variant="danger">
      <p>
        This tool will no longer provide accurate results due to the training
        changes being introduced in Season 57. We will update the tool once
        there is a better understanding of training times for age / skill
        combination. I would love to get in touch if you are contributing or
        wish to contribute in estimating the new training times. Please reach
        out to me on Battrick by clicking on my username -
        <a href="https://www.battrick.org/nl/myoffice.asp?userID=129254"
          >Cryptix</a
        >
      </p>
    </b-alert>
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
  </div>
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
