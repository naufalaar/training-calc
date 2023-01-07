<template>
  <div>
    <b-card
      class="rounded-0 border-0"
      bg-variant="secondary"
      text-variant="dark"
    >
      <b-card-text>
        <!-- Filters -->
        <b-row align-v="center">
          <b-col md cols="6">
            <b-form-group label="Skill Type:" label-for="skillType">
              <b-form-select
                id="skillType"
                v-model="skillType"
                :options="skillTypes"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col md cols="6">
            <b-form-group label="Age:" label-for="age">
              <b-form-select
                v-model="selectedAge"
                :options="age"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col md cols="6"
            ><b-button
              block
              class="mt-2"
              variant="primary"
              @click="saveSublevels"
              >Save</b-button
            ></b-col
          >
          <b-col></b-col>
          <b-col></b-col>
          <b-col></b-col>
        </b-row>
        <!-- Nets -->
        <b-row align-v="center">
          <b-col md cols="3"></b-col>
          <b-col md cols="3" v-for="(net, indexOne) in filteredResults[0].length" v-bind:key="indexOne">
            <h5 class="text-center">{{ nets[indexOne] }}</h5>
          </b-col>
          <b-col v-for="(i,indexTwo) in 5-filteredResults[0].length" v-bind:key="indexTwo"></b-col>
        </b-row>
        <!-- Sublevels -->
        <b-row
          class="mb-1"
          align-v="center"
          v-for="(skill, indexThree) in filteredResults"
          v-bind:key="indexThree"
        >
          <b-col md cols="3">
            <h5 class="text-right">{{ getSkilltext(skillType, indexThree) }}</h5>
          </b-col>
          <b-col
            md
            cols="3"
            v-for="(sublevel, count) in skill"
            v-bind:key="count"
          >
            <b-form-input v-model.number="skill[count]"> </b-form-input>
          </b-col>
          <b-col v-for="(i, countTwo) in 5-filteredResults[0].length" v-bind:key="countTwo"></b-col>
        </b-row>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import utility from "../plugins/utilities";

export default {
  name: "RawData",
  components: {},
  computed: {
    age: function () {
      return this.$store.state.age;
    },
    trainingTimes: function () {
      return this.$store.state.newTrainingTimes;
    },
    skillTypes: function () {
      return this.$store.state.skillTypes;
    },
    filteredResults() {
      return this.trainingTimes[this.skillType][this.selectedAge - 17];
    },
  },
  data() {
    return {
      skillType: "primary",
      selectedAge: 17,
      nets: ["0 Net", "1 Net", "2 Nets", "3 Nets"],
    };
  },
  methods: {
    saveSublevels() {
      this.$store.dispatch("setNewTrainingTimes", this.trainingTimes);
    },
    getSkilltext(skill, skillLevel) {
      return utility.getSkillText(skill, skillLevel);
    },
  },
};
</script>