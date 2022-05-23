<template>
  <div>
    <b-form @submit.prevent="calculate(true)">
      <b-card bg-variant="primary" text-variant="light" class="mt-3 mb-2">
        <b-card-text>
          <h4 class="text-secondary py-1">Current Skills</h4>
          <!-- Skills -->
          <b-row>
            <b-col md cols="6">
              <b-form-group label="Stamina:" label-for="stamina">
                <b-form-input
                  id="stamina"
                  v-model.number="seasonResult[0].stamina"
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
                  v-model.number="seasonResult[0].keeping"
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
                  v-model.number="seasonResult[0].batting"
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
                  v-model.number="seasonResult[0].concentration"
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
                  v-model.number="seasonResult[0].bowling"
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
                  v-model.number="seasonResult[0].consistency"
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
                  v-model.number="seasonResult[0].fielding"
                  :state="validateSkill('fielding')"
                  required
                >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- Nets -->
          <h4 class="text-secondary py-1">Nets</h4>
          <b-row>
            <b-col md cols="6">
              <b-form-group label="Stamina Nets:" label-for="staminaNets">
                <b-form-select
                  id="staminaNets"
                  v-model="seasonResult[0].staminaNets"
                  :options="twoNets"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Keeping Nets:" label-for="keepingNets">
                <b-form-select
                  v-model="seasonResult[0].keepingNets"
                  :options="twoNets"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Batting Nets:" label-for="battingNets">
                <b-form-select
                  v-model="seasonResult[0].battingNets"
                  :options="fourNets"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Conc Nets:" label-for="concNets">
                <b-form-input
                  id="concNets"
                  disabled
                  :value="getSecondaryNets(seasonResult[0], 'conc')"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Bowling Nets:" label-for="bowlingNets">
                <b-form-select
                  v-model="seasonResult[0].bowlingNets"
                  :options="fourNets"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Cons Nets:" label-for="consNets">
                <b-form-input
                  id="consNets"
                  disabled
                  :value="getSecondaryNets(seasonResult[0], 'cons')"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Fielding Nets:" label-for="fieldingNets">
                <b-form-select
                  v-model="seasonResult[0].fieldingNets"
                  :options="twoNets"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- Training Options -->
          <h4 class="text-secondary py-1">Training Options</h4>
          <b-row>
            <b-col md cols="6"
              ><b-form-group label="Player Age:" label-for="playerAge">
                <b-form-select
                  id="playerAge"
                  v-model="playerAge"
                  :options="age"
                ></b-form-select> </b-form-group
            ></b-col>
            <b-col></b-col>
            <b-col></b-col>
            <b-col></b-col>
            <b-col></b-col>
            <b-col></b-col>
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
          </b-row>
        </b-card-text>
      </b-card>
    </b-form>
    <!-- Results begin here -->
    <div v-for="weekResult in filteredResults" v-bind:key="weekResult.week">
      <b-card class="mt-3 mb-2" bg-variant="primary" text-variant="light">
        <b-card-text>
          <h4 class="text-light py-1">Week {{ weekResult.week }}</h4>
          <!-- Player Skills -->
          <b-row>
            <b-col md cols="6">
              <b-form-group label="Stamina:" label-for="stamina">
                <b-form-input
                  id="stamina"
                  :value="getSkillLevel(true, weekResult.stamina)"
                  disabled
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Keeping:" label-for="keeping">
                <b-form-input
                  id="keeping"
                  :value="getSkillLevel(false, weekResult.keeping)"
                  disabled
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Batting:" label-for="batting">
                <b-form-input
                  id="batting"
                  :value="getSkillLevel(false, weekResult.batting)"
                  disabled
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Concetration:" label-for="concentration">
                <b-form-input
                  id="concentration"
                  :value="getSkillLevel(false, weekResult.concentration)"
                  disabled
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Bowling:" label-for="bowling">
                <b-form-input
                  id="bowling"
                  :value="getSkillLevel(false, weekResult.bowling)"
                  disabled
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Consistency:" label-for="consistency">
                <b-form-input
                  id="consistency"
                  :value="getSkillLevel(false, weekResult.consistency)"
                  disabled
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Fielding:" label-for="fielding">
                <b-form-input
                  id="fielding"
                  :value="getSkillLevel(false, weekResult.fielding)"
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
                  v-model="weekResult.staminaNets"
                  :options="twoNets"
                  @change="calculate(false)"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Keeping Nets:" label-for="keepingNets">
                <b-form-select
                  v-model="weekResult.keepingNets"
                  :options="twoNets"
                  @change="calculate(false)"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Batting Nets:" label-for="battingNets">
                <b-form-select
                  v-model="weekResult.battingNets"
                  :options="fourNets"
                  @change="calculate(false)"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Conc Nets:" label-for="concNets">
                <b-form-input
                  id="concNets"
                  disabled
                  :value="getSecondaryNets(weekResult, 'conc')"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Bowling Nets:" label-for="bowlingNets">
                <b-form-select
                  v-model="weekResult.bowlingNets"
                  :options="fourNets"
                  @change="calculate(false)"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Cons Nets:" label-for="consNets">
                <b-form-input
                  id="consNets"
                  disabled
                  :value="getSecondaryNets(weekResult, 'cons')"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md cols="6">
              <b-form-group label="Fielding Nets:" label-for="fieldingNets">
                <b-form-select
                  v-model="weekResult.fieldingNets"
                  :options="twoNets"
                  @change="calculate(false)"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card-text>
      </b-card>
    </div>

    <!-- End of Template -->
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "PlayerSeason",
  components: {},
  data() {
    return {
      isHovered: false,
      seasonResult: [
        {
          stamina: 1,
          keeping: 1,
          batting: 1,
          concentration: 1,
          bowling: 1,
          consistency: 1,
          fielding: 1,
          staminaNets: 0,
          keepingNets: 0,
          battingNets: 0,
          bowlingNets: 0,
          fieldingNets: 0,
          week: 0,
        },
      ],
      playerAge: 17,
      seasonWeeks: 16,
    };
  },
  computed: {
    filteredResults() {
      return this.seasonResult.slice(1, 17);
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
    toggleSkill(toggle) {
      this.isHovered = toggle;
    },
    calculate(build) {
      if (build) {
        this.build();
      }
      this.modifyResult();
    },
    build() {
      let backup = $.extend(true, {}, this.seasonResult[0]);
      this.seasonResult = [];
      this.seasonResult.push(backup);
      for (let index = 1; index <= this.seasonWeeks; index++) {
        this.seasonResult.push(
          $.extend(true, {}, this.seasonResult[index - 1])
        );
        this.seasonResult[index].week = index;
      }
    },
    modifyResult() {
      for (let index = 1; index < this.seasonResult.length; index++) {
        this.seasonResult[index].stamina = this.seasonResult[index - 1].stamina;
        this.seasonResult[index].keeping = this.seasonResult[index - 1].keeping;
        this.seasonResult[index].batting = this.seasonResult[index - 1].batting;
        this.seasonResult[index].concentration =
          this.seasonResult[index - 1].concentration;
        this.seasonResult[index].bowling = this.seasonResult[index - 1].bowling;
        this.seasonResult[index].consistency =
          this.seasonResult[index - 1].consistency;
        this.seasonResult[index].fielding =
          this.seasonResult[index - 1].fielding;
        this.calculateResult(this.seasonResult[index]);
      }
    },
    calculateResult(currentWeek) {
      let concNets = this.getSecondaryNets(currentWeek, "conc");
      let consNets = this.getSecondaryNets(currentWeek, "cons");
      this.skillIncrease(currentWeek, "batting", currentWeek.battingNets);
      this.skillIncrease(currentWeek, "bowling", currentWeek.bowlingNets);
      this.skillIncrease(currentWeek, "stamina", currentWeek.staminaNets);
      this.skillIncrease(currentWeek, "keeping", currentWeek.keepingNets);
      this.skillIncrease(currentWeek, "fielding", currentWeek.fieldingNets);
      this.skillIncrease(currentWeek, "concentration", concNets);
      this.skillIncrease(currentWeek, "consistency", consNets);
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
        multiplier = this.trainingTimes[type][nets][this.playerAge - 17];
        currentPlayer[skill] = Number.parseFloat(
          Number(currentPlayer[skill]) + 1 / multiplier
        ).toPrecision(4);
        if (skill == "stamina" && currentPlayer[skill] > 11)
          currentPlayer[skill] = 11;
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
          this.seasonResult[0][skillName] >= 1 &&
          this.seasonResult[0][skillName] <= 11
        );
      else
        return (
          this.seasonResult[0][skillName] >= 1 &&
          this.seasonResult[0][skillName] <= 25
        );
    },
    canTrain() {
      return (
        this.validateSkill("stamina") &&
        this.validateSkill("batting") &&
        this.validateSkill("bowling") &&
        this.validateSkill("consistency") &&
        this.validateSkill("concentration") &&
        this.validateSkill("keeping") &&
        this.validateSkill("fielding")
      );
    },
  },
};
</script>
