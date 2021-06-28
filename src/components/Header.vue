<template>
  <b-jumbotron bg-variant="primary" text-variant="light" class="py-3">
    <template #header>{{ appName }}</template>
    <template #lead>This is just a Beta version!</template>
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

<style scoped></style>
