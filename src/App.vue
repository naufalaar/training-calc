<template>
  <b-container class="overflow-hidden" fluid="xs">
    <Header />
    <router-view />
  </b-container>
</template>

<script>
import Header from './components/Header.vue'
export default {
  
  name: "App",
  components: {
    Header
  },
  data() {
    return {
      appName: "Training Calculator",
    };
  },
};
</script>


<style lang="scss">
@import "./styles/app.scss";
body {
  background: var(--dark) !important;
}
.form-control {
  background-color:  var(--dark) !important;
  border-color: var(--secondary) !important;
  color: var(--secondary) !important;
}
.custom-select {
  background-color:  var(--dark) !important;
  border-color: var(--secondary) !important;
  color: var(--secondary) !important;
}
.form-control:disabled {
  background-color:  var(--dark) !important;
  border-color: var(--dark) !important;
}
.form-control:disabled::placeholder {
  color: var(--secondary) !important;
}
</style>
