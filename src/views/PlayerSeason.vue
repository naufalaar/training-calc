<template>
  <div>
    <b-form @submit.prevent="calculate(true)">
      <b-card-group class="mt-3 mb-2">
        <b-card bg-variant="primary" text-variant="light">
          <b-card-text>
            <h4 class="text-light py-1">Training Options</h4>
            <!-- Row 1 -->
            <b-row>
              <b-col>
                <b-form-group label="Player Age:" label-for="playerAge">
                  <b-form-select
                    id="playerAge"
                    v-model="playerAge"
                    :options="age"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Stamina Nets:" label-for="staminaNets">
                  <b-form-select
                    id="staminaNets"
                    v-model="seasonResult[0].staminaNets"
                    :options="twoNets"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Batting Nets:" label-for="battingNets">
                  <b-form-select
                    v-model="seasonResult[0].battingNets"
                    :options="fourNets"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Bowling Nets:" label-for="bowlingNets">
                  <b-form-select
                    v-model="seasonResult[0].bowlingNets"
                    :options="fourNets"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Fielding Nets:" label-for="fieldingNets">
                  <b-form-select
                    v-model="seasonResult[0].fieldingNets"
                    :options="twoNets"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Keeping Nets:" label-for="keepingNets">
                  <b-form-select
                    v-model="seasonResult[0].keepingNets"
                    :options="twoNets"
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>

            <!-- Row 2 -->
            <b-row>
              <b-col></b-col>
              <b-col>
                <b-form-group label="Stamina:" label-for="stamina">
                  <b-form-input
                    id="stamina"
                    v-model.number="seasonResult[0].stamina"
                    required
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Batting:" label-for="batting">
                  <b-form-input
                    id="batting"
                    v-model.number="seasonResult[0].batting"
                    required
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Bowling:" label-for="bowling">
                  <b-form-input
                    id="bowling"
                    v-model.number="seasonResult[0].bowling"
                    required
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Fielding:" label-for="fielding">
                  <b-form-input
                    id="fielding"
                    v-model.number="seasonResult[0].fielding"
                    required
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Keeping:" label-for="keeping">
                  <b-form-input
                    id="keeping"
                    v-model.number="seasonResult[0].keeping"
                    required
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Row 3 -->
            <b-row>
              <b-col> </b-col>
              <b-col> </b-col>
              <b-col>
                <b-form-group label="Concetration:" label-for="concentration">
                  <b-form-input
                    id="concentration"
                    v-model.number="seasonResult[0].concentration"
                    required
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Consistency:" label-for="consistency">
                  <b-form-input
                    id="consistency"
                    v-model.number="seasonResult[0].consistency"
                    required
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col></b-col>
              <b-col align="center" align-self="center">
                <b-button type="submit" variant="secondary">Train!</b-button>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-card-group>
    </b-form>
    <!-- Results begin here -->
    <div v-for="weekResult in filteredResults" v-bind:key="weekResult.week">
      <b-card-group class="py-2">
        <b-card bg-variant="primary" text-variant="light">
          <b-card-text>
            <h4 class="text-light py-1">Week {{ weekResult.week }}</h4>
            <!-- Column Names -->
            <b-row align-v="center">
              <b-col></b-col>
              <b-col>
                <h5 class="text-light text-center">Stamina</h5>
              </b-col>
              <b-col>
                <h5 class="text-light text-center">Batting</h5>
              </b-col>
              <b-col>
                <h5 class="text-light text-center">Bowling</h5>
              </b-col>
              <b-col>
                <h5 class="text-light text-center">Fielding</h5>
              </b-col>
              <b-col>
                <h5 class="text-light text-center">Keeping</h5>
              </b-col>
            </b-row>

            <!-- Results Row 1 -->
            <b-row align-v="center">
              <b-col align-self="end">
                <h5 class="text-light text-right">Nets:</h5>
              </b-col>
              <b-col>
                <b-form-select
                  id="staminaNets"
                  v-model="weekResult.staminaNets"
                  :options="twoNets"
                ></b-form-select>
              </b-col>
              <b-col>
                <b-form-select
                  v-model="weekResult.battingNets"
                  :options="fourNets"
                ></b-form-select>
              </b-col>
              <b-col>
                <b-form-select
                  v-model="weekResult.bowlingNets"
                  :options="fourNets"
                ></b-form-select>
              </b-col>
              <b-col>
                <b-form-select
                  v-model="weekResult.fieldingNets"
                  :options="twoNets"
                ></b-form-select>
              </b-col>
              <b-col>
                <b-form-select
                  v-model="weekResult.keepingNets"
                  :options="twoNets"
                ></b-form-select>
              </b-col>
            </b-row>

            <!-- Results Row 2 -->
            <b-row class="py-3">
              <b-col align-self="end">
                <h5 class="text-light text-right">Primary:</h5>
              </b-col>
              <b-col>
                <b-form-input
                  id="staminaResult"
                  disabled
                  :placeholder="staminaSkills[Math.floor(weekResult.stamina)]"
                  v-if="isHovered"
                ></b-form-input>
                <b-form-input
                  id="staminaResult"
                  disabled
                  :placeholder="weekResult.stamina"
                  v-else
                >
                </b-form-input>
              </b-col>
              <b-col>
                <b-form-input
                  id="battingResult"
                  disabled
                  :placeholder="skills[Math.floor(weekResult.batting)]"
                  v-if="isHovered"
                >
                </b-form-input>
                <b-form-input
                  id="battingResult"
                  disabled
                  :placeholder="weekResult.batting"
                  v-else
                >
                </b-form-input>
              </b-col>
              <b-col>
                <b-form-input
                  id="bowlingResult"
                  disabled
                  :placeholder="skills[Math.floor(weekResult.bowling)]"
                  v-if="isHovered"
                >
                </b-form-input>
                <b-form-input
                  id="bowlingResult"
                  disabled
                  :placeholder="weekResult.bowling"
                  v-else
                >
                </b-form-input>
              </b-col>
              <b-col>
                <b-form-input
                  id="fieldingResult"
                  disabled
                  :placeholder="skills[Math.floor(weekResult.fielding)]"
                  v-if="isHovered"
                >
                </b-form-input>
                <b-form-input
                  id="fieldingResult"
                  disabled
                  :placeholder="weekResult.fielding"
                  v-else
                >
                </b-form-input>
              </b-col>
              <b-col>
                <b-form-input
                  id="keepingResult"
                  disabled
                  :placeholder="skills[Math.floor(weekResult.keeping)]"
                  v-if="isHovered"
                >
                </b-form-input>
                <b-form-input
                  id="keepingResult"
                  disabled
                  :placeholder="weekResult.keeping"
                  v-else
                >
                </b-form-input>
              </b-col>
            </b-row>
            <!-- Results Row 3 -->
            <b-row class="py-1">
              <b-col align-self="end">
                <h5 class="text-light text-right">Conc / Cons:</h5>
              </b-col>
              <b-col> </b-col>
              <b-col>
                <b-form-input
                  id="concentration"
                  disabled
                  :placeholder="skills[Math.floor(weekResult.concentration)]"
                  v-if="isHovered"
                >
                </b-form-input>
                <b-form-input
                  id="concentration"
                  disabled
                  :placeholder="weekResult.concentration"
                  v-else
                >
                </b-form-input>
              </b-col>
              <b-col>
                <b-form-input
                  id="consistency"
                  disabled
                  :placeholder="skills[Math.floor(weekResult.consistency)]"
                  v-if="isHovered"
                >
                </b-form-input>
                <b-form-input
                  id="consistency"
                  disabled
                  :placeholder="weekResult.consistency"
                  v-else
                >
                </b-form-input>
              </b-col>
              <b-col align="center">
                <b-button
                  variant="secondary"
                  v-if="isHovered"
                  v-on:click="toggleSkill(false)"
                  >Show Levels</b-button
                >
                <b-button
                  variant="secondary"
                  v-else
                  v-on:click="toggleSkill(true)"
                  >Show Skills</b-button
                >
              </b-col>
              <b-col align="center">
                <b-button type="submit" variant="secondary"
                  >Update Nets</b-button
                >
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-card-group>
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
          keeping: 2,
          batting: 3,
          concentration: 4,
          bowling: 5,
          consistency: 6,
          fielding: 7,
          staminaNets: 1,
          keepingNets: 0,
          battingNets: 2,
          bowlingNets: 0,
          fieldingNets: 1,
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
  },
};
</script>
