<template>
  <div>
    <b-form @submit.prevent="calculate(true)">
      <b-card class="mt-3 mb-2" bg-variant="primary" text-variant="light">
        <b-card-text>
          <h4 class="text-secondary py-1">Current Skills</h4>
          <!-- Player Skills -->
          <b-row>
            <b-col md cols="6">
              <b-form-group label="Stamina:" label-for="stamina">
                <b-form-input
                  id="stamina"
                  v-model.number="playerHistories[0].stamina"
                  :state="validateSkill('stamina')"
                  required
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Keeping:" label-for="keeping">
                <b-form-input
                  id="keeping"
                  v-model.number="playerHistories[0].keeping"
                  :state="validateSkill('keeping')"
                  required
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Batting:" label-for="batting">
                <b-form-input
                  id="batting"
                  v-model.number="playerHistories[0].batting"
                  :state="validateSkill('batting')"
                  required
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Concetration:" label-for="concentration">
                <b-form-input
                  id="concentration"
                  v-model.number="playerHistories[0].concentration"
                  :state="validateSkill('concentration')"
                  required
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Bowling:" label-for="bowling">
                <b-form-input
                  id="bowling"
                  v-model.number="playerHistories[0].bowling"
                  :state="validateSkill('bowling')"
                  required
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Consistency:" label-for="consistency">
                <b-form-input
                  id="consistency"
                  v-model.number="playerHistories[0].consistency"
                  :state="validateSkill('consistency')"
                  required
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Fielding:" label-for="fielding">
                <b-form-input
                  id="fielding"
                  v-model.number="playerHistories[0].fielding"
                  :state="validateSkill('fielding')"
                  required
                >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- Player Nets -->
          <h4 class="text-secondary py-1">Nets</h4>
          <b-row>
            <b-col md cols="6">
              <b-form-group label="Stamina Nets:" label-for="staminaNets">
                <b-form-select
                  id="staminaNets"
                  v-model="playerHistories[0].staminaNets"
                  :options="twoNets"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Keeping Nets:" label-for="keepingNets">
                <b-form-select
                  v-model="playerHistories[0].keepingNets"
                  :options="twoNets"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Batting Nets:" label-for="battingNets">
                <b-form-select
                  v-model="playerHistories[0].battingNets"
                  :options="fourNets"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Conc Nets:" label-for="concNets">
                <b-form-input
                  id="concNets"
                  disabled
                  :value="getSecondaryNets(playerHistories[0], 'conc')"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Bowling Nets:" label-for="bowlingNets">
                <b-form-select
                  v-model="playerHistories[0].bowlingNets"
                  :options="fourNets"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Cons Nets:" label-for="consNets">
                <b-form-input
                  id="consNets"
                  disabled
                  :value="getSecondaryNets(playerHistories[0], 'cons')"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Fielding Nets:" label-for="fieldingNets">
                <b-form-select
                  v-model="playerHistories[0].fieldingNets"
                  :options="twoNets"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- Training Options -->
          <h4 class="text-secondary py-1">Training Options</h4>
          <b-row align-v="center">
            <b-col md cols="6">
              <b-form-group label="Current Age:" label-for="currentAge">
                <b-form-select
                  id="currentAge"
                  v-model="playerHistories[0].currentAge"
                  :options="age"
                  :state="validateAge()"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Training Until:" label-for="trainingAge">
                <b-form-select
                  id="trainingAge"
                  v-model="trainingAge"
                  :options="age"
                  :state="validateAge()"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Current Week:" label-for="currentWeek">
                <b-form-select
                  id="currentWeek"
                  v-model="playerHistories[0].currentWeek"
                  :options="week"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md cols="6"
              ><b-button
                block
                class="mt-2"
                type="submit"
                variant="secondary"
                :disabled="!canTrain()"
                >Train!</b-button
              ></b-col
            >
            <b-col></b-col>
            <b-col></b-col>
            <b-col></b-col>
          </b-row>
        </b-card-text>
      </b-card>
    </b-form>

    <!-- This is where the results begin -->
    <div
      v-for="(playerHistory, index) in filteredResults"
      v-bind:key="playerHistory.currentAge"
    >
      <b-card
        class="mt-3 mb-2"
        bg-variant="primary"
        text-variant="light"
        v-if="playerHistories.length > 0"
      >
        <b-card-text>
          <h4 class="text-secondary pb-3">
            End of Season {{ index + 1 }} : Age
            {{ playerHistory.currentAge + 1 }}
          </h4>
          <!-- Player Skills -->
          <b-row>
            <b-col md cols="6">
              <b-form-group label="Stamina:" label-for="stamina">
                <b-form-input
                  id="stamina"
                  :value="getSkillLevel(true, playerHistory.stamina)"
                  disabled
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Keeping:" label-for="keeping">
                <b-form-input
                  id="keeping"
                  :value="getSkillLevel(false, playerHistory.keeping)"
                  disabled
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Batting:" label-for="batting">
                <b-form-input
                  id="batting"
                  :value="getSkillLevel(false, playerHistory.batting)"
                  disabled
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Concetration:" label-for="concentration">
                <b-form-input
                  id="concentration"
                  :value="getSkillLevel(false, playerHistory.concentration)"
                  disabled
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Bowling:" label-for="bowling">
                <b-form-input
                  id="bowling"
                  :value="getSkillLevel(false, playerHistory.bowling)"
                  disabled
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Consistency:" label-for="consistency">
                <b-form-input
                  id="consistency"
                  :value="getSkillLevel(false, playerHistory.consistency)"
                  disabled
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Fielding:" label-for="fielding">
                <b-form-input
                  id="fielding"
                  :value="getSkillLevel(false, playerHistory.fielding)"
                  disabled
                >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md cols="6">
              <b-form-group label="Stamina Nets:" label-for="staminaNets">
                <b-form-select
                  id="staminaNets"
                  v-model="playerHistory.staminaNets"
                  :options="twoNets"
                  @change="modifyNets('staminaNets', index)"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Keeping Nets:" label-for="keepingNets">
                <b-form-select
                  v-model="playerHistory.keepingNets"
                  :options="twoNets"
                  @change="modifyNets('keepingNets', index)"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Batting Nets:" label-for="battingNets">
                <b-form-select
                  v-model="playerHistory.battingNets"
                  :options="fourNets"
                  @change="modifyNets('battingNets', index)"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Conc Nets:" label-for="concNets">
                <b-form-input
                  id="concNets"
                  disabled
                  :value="getSecondaryNets(playerHistory, 'conc')"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Bowling Nets:" label-for="bowlingNets">
                <b-form-select
                  v-model="playerHistory.bowlingNets"
                  :options="fourNets"
                  @change="modifyNets('bowlingNets', index)"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Cons Nets:" label-for="consNets">
                <b-form-input
                  id="consNets"
                  disabled
                  :value="getSecondaryNets(playerHistory, 'cons')"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Fielding Nets:" label-for="fieldingNets">
                <b-form-select
                  v-model="playerHistory.fieldingNets"
                  :options="twoNets"
                  @change="modifyNets('fieldingNets', index)"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card-text>
      </b-card>
    </div>
    <!-- This is where the result ends -->
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "SinglePlayer",
  components: {},
  data() {
    return {
      playerHistories: [
        {
          stamina: 1,
          keeping: 1,
          batting: 1,
          concentration: 1,
          bowling: 1,
          consistency: 1,
          fielding: 1,
          staminaNets: 1,
          keepingNets: 0,
          battingNets: 2,
          bowlingNets: 0,
          fieldingNets: 1,
          currentAge: 17,
          currentWeek: 1,
        },
      ],
      trainingAge: 23,
    };
  },
  computed: {
    filteredResults() {
      return this.playerHistories.slice(1, 19);
    },
    fourNets: function () {
      return this.$store.state.fourNets;
    },
    twoNets: function () {
      return this.$store.state.twoNets;
    },
    week: function () {
      return this.$store.state.week;
    },
    age: function () {
      return this.$store.state.age;
    },
    trainingTimes: function () {
      return this.$store.state.trainingTimes;
    },
    skills: function () {
      return this.$store.state.skills;
    },
    staminaSkills: function () {
      return this.$store.state.staminaSkills;
    },
  },
  methods: {
    build() {
      let backup = $.extend(true, {}, this.playerHistories[0]);
      this.playerHistories = [];
      this.playerHistories.push(backup);
      for (
        let index = 1;
        index <= this.trainingAge - this.playerHistories[0].currentAge;
        index++
      ) {
        this.playerHistories.push(
          $.extend(true, {}, this.playerHistories[index - 1])
        );
        if (index > 1) {
          this.playerHistories[index].currentAge++;
          this.playerHistories[index].currentWeek = 1;
        }
      }
    },
    calculate(build) {
      if (build) {
        this.build();
      }
      this.modifyResult();
    },
    modifyResult() {
      for (let index = 1; index < this.playerHistories.length; index++) {
        this.playerHistories[index].stamina =
          this.playerHistories[index - 1].stamina;
        this.playerHistories[index].keeping =
          this.playerHistories[index - 1].keeping;
        this.playerHistories[index].batting =
          this.playerHistories[index - 1].batting;
        this.playerHistories[index].concentration =
          this.playerHistories[index - 1].concentration;
        this.playerHistories[index].bowling =
          this.playerHistories[index - 1].bowling;
        this.playerHistories[index].consistency =
          this.playerHistories[index - 1].consistency;
        this.playerHistories[index].fielding =
          this.playerHistories[index - 1].fielding;
        this.calculateResult(this.playerHistories[index]);
      }
    },
    calculateResult(currentSeason) {
      let concNets = this.getSecondaryNets(currentSeason, "conc");
      let consNets = this.getSecondaryNets(currentSeason, "cons");
      this.skillIncrease(currentSeason, "batting", currentSeason.battingNets);
      this.skillIncrease(currentSeason, "bowling", currentSeason.bowlingNets);
      this.skillIncrease(currentSeason, "stamina", currentSeason.staminaNets);
      this.skillIncrease(currentSeason, "keeping", currentSeason.keepingNets);
      this.skillIncrease(currentSeason, "fielding", currentSeason.fieldingNets);
      this.skillIncrease(currentSeason, "concentration", concNets);
      this.skillIncrease(currentSeason, "consistency", consNets);
    },
    skillIncrease(currentPlayer, skill, nets) {
      if (!nets == 0) {
        let type = skill;
        switch (skill) {
          case "batting":
          case "bowling":
            type = "primary";
            break;
          case "consistency":
          case "concentration":
            type = "secondary";
            break;
        }
        let multiplier = 0;
        multiplier =
          this.trainingTimes[type][nets][currentPlayer.currentAge - 17];
        currentPlayer[skill] = Number.parseFloat(
          Number(currentPlayer[skill]) +
            (17 - Number(currentPlayer.currentWeek)) / multiplier
        ).toPrecision(4);
        if (skill == "stamina" && currentPlayer[skill] > 11)
          currentPlayer[skill] = 11;
      }
    },
    getSecondaryNets(currentPlayer, type) {
      switch (type) {
        case "conc":
          return (
            (currentPlayer.battingNets > 0) +
            (currentPlayer.fieldingNets > 0) +
            (currentPlayer.keepingNets > 0)
          );
        case "cons":
          return (
            (currentPlayer.bowlingNets > 0) +
            (currentPlayer.fieldingNets > 0) +
            (currentPlayer.keepingNets > 0)
          );
      }
    },
    getSkillLevel(stamina, level) {
      let temp = "";
      if (stamina) temp = this.staminaSkills[Math.floor(level)];
      else
        temp =
          21 > level
            ? this.skills[Math.floor(level)]
            : this.skills[this.skills.length - 1];
      return level + " - " + temp;
    },
    validateSkill(skillName) {
      if (skillName == "stamina")
        return (
          this.playerHistories[0][skillName] >= 1 &&
          this.playerHistories[0][skillName] <= 11
        );
      else
        return (
          this.playerHistories[0][skillName] >= 1 &&
          this.playerHistories[0][skillName] <= 25
        );
    },
    validateAge() {
      return this.playerHistories[0].currentAge < this.trainingAge;
    },
    canTrain() {
      return (
        this.validateSkill("stamina") &&
        this.validateSkill("batting") &&
        this.validateSkill("bowling") &&
        this.validateSkill("consistency") &&
        this.validateSkill("concentration") &&
        this.validateSkill("keeping") &&
        this.validateSkill("fielding") &&
        this.validateAge()
      );
    },
    modifyNets(skill, index) {
      console.log(skill + " " + index);
      for (let i = index + 2; i < this.playerHistories.length; i++) {
        console.log("Moo: " + i);
        this.playerHistories[i][skill] = this.playerHistories[i - 1][skill];
      }
      this.calculate(false);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
