<template>
  <div>
    <b-form @submit.prevent="calculate(true)">
      <b-card-group deck class="mt-3 mb-2">
        <b-card bg-variant="primary" text-variant="light">
          <b-card-text>
            <h4 class="text-light py-1">Current Skills</h4>
            <b-row class="py-1">
              <b-col>
                <label for="stamina">Stamina </label>
              </b-col>
              <b-col>
                <b-form-input
                  id="stamina"
                  v-model.number="playerHistories[0].stamina"
                  required
                >
                </b-form-input>
              </b-col>
              <b-col>
                <label for="keeping">Keeping </label>
              </b-col>
              <b-col>
                <b-form-input
                  id="keeping"
                  v-model.number="playerHistories[0].keeping"
                  required
                >
                </b-form-input>
              </b-col>
            </b-row>
            <b-row class="py-1">
              <b-col>
                <label for="batting">Batting </label>
              </b-col>
              <b-col>
                <b-form-input
                  id="batting"
                  v-model.number="playerHistories[0].batting"
                  required
                >
                </b-form-input>
              </b-col>
              <b-col>
                <label for="concentration"
                  >Conc<span class="d-none d-md-inline">entration</span></label
                >
              </b-col>
              <b-col>
                <b-form-input
                  id="concentration"
                  v-model.number="playerHistories[0].concentration"
                  required
                >
                </b-form-input>
              </b-col>
            </b-row>
            <b-row class="py-1">
              <b-col>
                <label for="bowling">Bowling </label>
              </b-col>
              <b-col>
                <b-form-input
                  id="bowling"
                  v-model.number="playerHistories[0].bowling"
                  required
                >
                </b-form-input>
              </b-col>
              <b-col>
                <label for="consistency"
                  >Cons<span class="d-none d-md-inline">istency</span></label
                >
              </b-col>
              <b-col>
                <b-form-input
                  id="consistency"
                  v-model.number="playerHistories[0].consistency"
                  required
                >
                </b-form-input>
              </b-col>
            </b-row>
            <b-row class="py-1">
              <b-col cols="3">
                <label for="fielding">Fielding </label>
              </b-col>
              <b-col cols="3">
                <b-form-input
                  id="fielding"
                  v-model.number="playerHistories[0].fielding"
                  required
                >
                </b-form-input>
              </b-col>
            </b-row>
            <b-row align-h="end">
              <b-col cols="3">
                <b-button size="lg"  type="submit" variant="secondary">Train!</b-button>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
        <b-card bg-variant="primary" text-variant="light">
          <b-card-text>
            <h4 class="text-light py-1">Training Options</h4>
            <b-row class="py-1">
              <b-col>
                <label for="staminaNets">Stamina Nets</label>
              </b-col>
              <b-col>
                <b-form-select
                  v-model="playerHistories[0].staminaNets"
                  :options="twoNets"
                ></b-form-select>
              </b-col>
              <b-col>
                <label for="currentAge">Current Age </label>
              </b-col>
              <b-col>
                <b-form-select
                  v-model="playerHistories[0].currentAge"
                  :options="age"
                ></b-form-select>
              </b-col>
            </b-row>
            <b-row class="py-1">
              <b-col>
                <label for="keepingNets">Keeping Nets</label>
              </b-col>
              <b-col>
                <b-form-select
                  v-model="playerHistories[0].keepingNets"
                  :options="twoNets"
                ></b-form-select>
              </b-col>
              <b-col>
                <label for="trainingAge">Training Until </label>
              </b-col>
              <b-col>
                <b-form-select
                  v-model="trainingAge"
                  :options="age"
                ></b-form-select>
              </b-col>
            </b-row>
            <b-row class="py-1">
              <b-col cols="3">
                <label for="battingNets">Batting Nets</label>
              </b-col>
              <b-col cols="3">
                <b-form-select
                  v-model="playerHistories[0].battingNets"
                  :options="fourNets"
                ></b-form-select>
              </b-col>
              <b-col>
                <label for="trainingAge">Current Week </label>
              </b-col>
              <b-col>
                <b-form-select
                  v-model="playerHistories[0].currentWeek"
                  :options="week"
                ></b-form-select>
              </b-col>
            </b-row>
            <b-row class="py-1">
              <b-col cols="3">
                <label for="bowlingNets">Bowling Nets</label>
              </b-col>
              <b-col cols="3">
                <b-form-select
                  v-model="playerHistories[0].bowlingNets"
                  :options="fourNets"
                ></b-form-select>
              </b-col>
            </b-row>
            <b-row class="py-1">
              <b-col cols="3">
                <label for="fieldingNets">Fielding Nets</label>
              </b-col>
              <b-col cols="3">
                <b-form-select
                  v-model="playerHistories[0].fieldingNets"
                  :options="twoNets"
                ></b-form-select>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-card-group>
    </b-form>

    <!-- This is where the results begin -->
    <div
      v-for="(playerHistory, index) in filteredResults"
      v-bind:key="playerHistory.currentAge"
    >
      <b-form
        @submit.prevent="calculate(false)"
        v-if="playerHistories.length > 0"
      >
        <b-card-group class="py-2">
          <b-card bg-variant="primary" text-variant="light">
            <b-card-text>
              <h4 class="text-light py-1">
                End of Season {{ index + 1 }} : Age
                {{ playerHistory.currentAge + 1 }}
              </h4>
              <b-row class="py-1">
                <b-col>
                  <label for="stamina">Stamina: </label>
                </b-col>
                <b-col
                  ><p class="text-secondary">
                    {{ staminaSkills[Math.floor(playerHistory.stamina)] }}
                  </p></b-col
                >
                <b-col>
                  <b-form-input
                    id="stamina"
                    v-model="playerHistory.stamina"
                    disabled
                  >
                  </b-form-input>
                </b-col>
                <b-col>
                  <b-form-select
                    v-model="playerHistory.staminaNets"
                    :options="twoNets"
                  ></b-form-select>
                </b-col>
                <b-col>
                  <label for="keeping">Keeping: </label>
                </b-col>
                <b-col
                  ><p class="text-secondary">
                    {{
                      21 > playerHistory.keeping
                        ? skills[Math.floor(playerHistory.keeping)]
                        : skills[skills.length - 1]
                    }}
                  </p></b-col
                >
                <b-col>
                  <b-form-input
                    id="keeping"
                    v-model="playerHistory.keeping"
                    disabled
                  >
                  </b-form-input>
                </b-col>
                <b-col>
                  <b-form-select
                    v-model="playerHistory.keepingNets"
                    :options="twoNets"
                  ></b-form-select>
                </b-col>
              </b-row>
              <b-row class="py-1">
                <b-col>
                  <label for="batting">Batting: </label>
                </b-col>
                <b-col
                  ><p class="text-secondary">
                    {{
                      21 > playerHistory.batting
                        ? skills[Math.floor(playerHistory.batting)]
                        : skills[skills.length - 1]
                    }}
                  </p></b-col
                >
                <b-col>
                  <b-form-input
                    id="batting"
                    v-model="playerHistory.batting"
                    disabled
                  >
                  </b-form-input>
                </b-col>
                <b-col>
                  <b-form-select
                    v-model="playerHistory.battingNets"
                    :options="fourNets"
                  ></b-form-select>
                </b-col>
                <b-col>
                  <label for="concentration">Concentration:</label>
                </b-col>
                <b-col
                  ><p class="text-secondary">
                    {{
                      21 > playerHistory.concentration
                        ? skills[Math.floor(playerHistory.concentration)]
                        : skills[skills.length - 1]
                    }}
                  </p></b-col
                >
                <b-col>
                  <b-form-input
                    id="concentration"
                    v-model="playerHistory.concentration"
                    disabled
                  >
                  </b-form-input>
                </b-col>
                <b-col> </b-col>
              </b-row>
              <b-row class="py-1">
                <b-col>
                  <label for="bowling">Bowling: </label>
                </b-col>
                <b-col
                  ><p class="text-secondary">
                    {{
                      21 > playerHistory.bowling
                        ? skills[Math.floor(playerHistory.bowling)]
                        : skills[skills.length - 1]
                    }}
                  </p></b-col
                >
                <b-col>
                  <b-form-input
                    id="bowling"
                    v-model="playerHistory.bowling"
                    disabled
                  >
                  </b-form-input>
                </b-col>
                <b-col>
                  <b-form-select
                    v-model="playerHistory.bowlingNets"
                    :options="fourNets"
                  ></b-form-select>
                </b-col>
                <b-col>
                  <label for="consistency"
                    >Cons<span class="d-none d-md-inline">istency</span>:</label
                  >
                </b-col>
                <b-col
                  ><p class="text-secondary">
                    {{
                      21 > playerHistory.consistency
                        ? skills[Math.floor(playerHistory.consistency)]
                        : skills[skills.length - 1]
                    }}
                  </p></b-col
                >
                <b-col>
                  <b-form-input
                    id="consistency"
                    v-model="playerHistory.consistency"
                    disabled
                  >
                  </b-form-input>
                </b-col>
                <b-col> </b-col>
              </b-row>
              <b-row class="py-1">
                <b-col>
                  <label for="fielding">Fielding: </label>
                </b-col>
                <b-col
                  ><p class="text-secondary">
                    {{
                      21 > playerHistory.fielding
                        ? skills[Math.floor(playerHistory.fielding)]
                        : skills[skills.length - 1]
                    }}
                  </p></b-col
                >
                <b-col>
                  <b-form-input
                    id="fielding"
                    v-model="playerHistory.fielding"
                    disabled
                  >
                  </b-form-input>
                </b-col>
                <b-col>
                  <b-form-select
                    v-model="playerHistory.fieldingNets"
                    :options="twoNets"
                  ></b-form-select>
                </b-col>
                <b-col cols="6">
                  <b-button type="submit" variant="secondary"
                    >Update Nets</b-button
                  >
                </b-col>
              </b-row>
            </b-card-text>
          </b-card>
        </b-card-group>
      </b-form>
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
