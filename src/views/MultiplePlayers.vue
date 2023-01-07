<template>
  <div>
    <b-card bg-variant="secondary" text-variant="dark" class="rounded-0 border-0">
      <b-card-text>
        <h4 class="text-dark py-1">Plan Options</h4>
        <b-row align-v="center" class="mb-3">
          <b-col md cols="6">
            <b-form-group label="Plan For:" label-for="season">
              <b-form-select
                id="season"
                v-model="season"
                :options="seasons"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col></b-col>
          <b-col></b-col>
          <b-col></b-col>
          <b-col></b-col>
          <b-col md cols="6"
            ><b-button
              v-on:click="addPlayer()"
              block
              class="mt-2"
              type="submit"
              variant="primary"
              >Add Player</b-button
            ></b-col
          >
          <b-col md cols="6">
            <b-button
              v-on:click="train(true)"
              block
              class="mt-2"
              type="submit"
              variant="primary"
              :disabled="!canTrain()"
              >Train!</b-button
            ></b-col
          >
        </b-row>

        <b-button
          v-for="(player, index) in players"
          :key="index.id"
          v-b-toggle="`id-${index}`"
          variant="primary"
          class="mr-1 mb-3"
          >{{ player.playerName }}</b-button
        >

        <!-- Start of Player Entry Loop -->

        <div v-for="(player, index) in players" :key="index.id">
          <b-collapse
            visible
            :id="`id-${index}`"
            class="mb-2"
            accordion="my-accordion"
            role="tabpanel"
          >
            <b-card
              border-variant="primary"
              bg-variant="secondary"
              text-variant="dark"
            >
              <b-card-text>
                <!-- Row 1 -->
                <b-row align-v="center">
                  <b-col md cols="6">
                    <b-form-group label="Player Name:" label-for="name">
                      <b-form-input
                        id="name"
                        v-model.number="player.playerName"
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md cols="6">
                    <b-form-group label="Player Age:" label-for="playerAge">
                      <b-form-select
                        id="playerAge"
                        v-model="player.playerAge"
                        :options="age"
                        :state="validateAge(index)"
                      ></b-form-select>
                    </b-form-group>
                  </b-col>
                  <b-col md cols="6">
                    <b-form-group label="Train Until:" label-for="targetAge">
                      <b-form-select
                        id="targetAge"
                        v-model="player.targetAge"
                        :options="age"
                        :state="validateAge(index)"
                      ></b-form-select>
                    </b-form-group>
                  </b-col>
                  <b-col md cols="6"
                    ><b-button
                      v-on:click="removePlayer(index)"
                      block
                      class="mt-2"
                      type="submit"
                      variant="primary"
                      >Remove Player</b-button
                    ></b-col
                  >
                  <b-col md cols="6"
                    ><b-button
                      block
                      class="mt-2"
                      variant="primary"
                      @click="copySkills(index)"
                      >Copy Skills</b-button
                    ></b-col
                  >
                  <b-col md cols="6"
                    ><b-button
                      block
                      class="mt-2"
                      variant="primary"
                      @click="readClipboard(index)"
                      >Paste Skills</b-button
                    ></b-col
                  >
                  <b-col></b-col>
                </b-row>

                <!-- Row 2 -->
                <b-row>
                  <b-col md cols="6">
                    <b-form-group label="Stamina:" label-for="stamina">
                      <b-form-input
                        id="stamina"
                        v-model.number="player.stamina"
                        :state="validateSkill('stamina', index)"
                        required
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md cols="6">
                    <b-form-group label="Keeping:" label-for="keeping">
                      <b-form-input
                        id="keeping"
                        v-model.number="player.keeping"
                        :state="validateSkill('keeping', index)"
                        required
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md cols="6">
                    <b-form-group label="Batting:" label-for="batting">
                      <b-form-input
                        id="batting"
                        v-model.number="player.batting"
                        :state="validateSkill('batting', index)"
                        required
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md cols="6">
                    <b-form-group
                      label="Concetration:"
                      label-for="concentration"
                    >
                      <b-form-input
                        id="concentration"
                        v-model.number="player.concentration"
                        :state="validateSkill('concentration', index)"
                        required
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md cols="6">
                    <b-form-group label="Bowling:" label-for="bowling">
                      <b-form-input
                        id="bowling"
                        v-model.number="player.bowling"
                        :state="validateSkill('bowling', index)"
                        required
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md cols="6">
                    <b-form-group label="Consistency:" label-for="consistency">
                      <b-form-input
                        id="consistency"
                        v-model.number="player.consistency"
                        :state="validateSkill('consistency', index)"
                        required
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md cols="6">
                    <b-form-group label="Fielding:" label-for="fielding">
                      <b-form-input
                        id="fielding"
                        v-model.number="player.fielding"
                        :state="validateSkill('fielding', index)"
                        required
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>

                <!-- Row 3 -->
                <b-row>
                  <b-col md cols="6">
                    <b-form-group label="Stamina Nets:" label-for="staminaNets">
                      <b-form-select
                        id="staminaNets"
                        v-model="player.staminaNets"
                        :options="twoNets"
                      ></b-form-select>
                    </b-form-group>
                  </b-col>
                  <b-col md cols="6">
                    <b-form-group label="Keeping Nets:" label-for="keepingNets">
                      <b-form-select
                        v-model="player.keepingNets"
                        :options="twoNets"
                      ></b-form-select>
                    </b-form-group>
                  </b-col>
                  <b-col md cols="6">
                    <b-form-group label="Batting Nets:" label-for="battingNets">
                      <b-form-select
                        v-model="player.battingNets"
                        :options="fourNets"
                      ></b-form-select>
                    </b-form-group>
                  </b-col>
                  <b-col md cols="6">
                    <b-form-group label="Conc Nets:" label-for="concNets">
                      <b-form-input
                        id="concNets"
                        disabled
                        :value="getSecondaryNets(player, 'conc')"
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md cols="6">
                    <b-form-group label="Bowling Nets:" label-for="bowlingNets">
                      <b-form-select
                        v-model="player.bowlingNets"
                        :options="fourNets"
                      ></b-form-select>
                    </b-form-group>
                  </b-col>
                  <b-col md cols="6">
                    <b-form-group label="Cons Nets:" label-for="consNets">
                      <b-form-input
                        id="consNets"
                        disabled
                        :value="getSecondaryNets(player, 'cons')"
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md cols="6">
                    <b-form-group
                      label="Fielding Nets:"
                      label-for="fieldingNets"
                    >
                      <b-form-select
                        v-model="player.fieldingNets"
                        :options="twoNets"
                      ></b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row> </b-card-text
            ></b-card>
          </b-collapse>
        </div>
        <!-- End of Player Entry Loop -->
      </b-card-text>
    </b-card>

    <!-- Start of Results -->
    <b-card
      v-for="(result, seasonIndex) in results"
      :key="seasonIndex.id"
      bg-variant="secondary"
      text-variant="dark"
      class="rounded-0 border-0 my-3"
    >
      <b-card-text>
        <h4 class="text-dark py-1">End of Season {{ seasonIndex + 1 }}</h4>
        <!-- Start of Player Results Loop -->
        <div>
          <b-card
            border-variant="primary"
            bg-variant="secondary"
            text-variant="dark"
          >
            <b-card-text>
              <!-- Row 1 -->
              <div
                v-for="(player, playerIndex) in result"
                :key="playerIndex.id"
              >
                <div v-if="Object.keys(player).length > 0">
                  <b-row>
                    <b-col>
                      <h5 class="text-dark pb-1">
                        <strong
                          >{{ player.playerName }} -
                          {{ player.playerAge + 1 }}</strong
                        >
                      </h5>
                    </b-col>
                  </b-row>
                  <!-- Row 2 -->
                  <b-row>
                    <b-col md cols="6">
                      <b-form-group label="Stamina:" label-for="stamina">
                        <b-form-input
                          id="stamina"
                          :value="getSkillLevel(true, player.stamina)"
                          disabled
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md cols="6">
                      <b-form-group label="Keeping:" label-for="keeping">
                        <b-form-input
                          id="keeping"
                          :value="getSkillLevel(false, player.keeping)"
                          disabled
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md cols="6">
                      <b-form-group label="Batting:" label-for="batting">
                        <b-form-input
                          id="batting"
                          :value="getSkillLevel(false, player.batting)"
                          disabled
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md cols="6">
                      <b-form-group
                        label="Concetration:"
                        label-for="concentration"
                      >
                        <b-form-input
                          id="concentration"
                          :value="getSkillLevel(false, player.concentration)"
                          disabled
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md cols="6">
                      <b-form-group label="Bowling:" label-for="bowling">
                        <b-form-input
                          id="bowling"
                          :value="getSkillLevel(false, player.bowling)"
                          disabled
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md cols="6">
                      <b-form-group
                        label="Consistency:"
                        label-for="consistency"
                      >
                        <b-form-input
                          id="consistency"
                          :value="getSkillLevel(false, player.consistency)"
                          disabled
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md cols="6">
                      <b-form-group label="Fielding:" label-for="fielding">
                        <b-form-input
                          id="fielding"
                          :value="getSkillLevel(false, player.fielding)"
                          disabled
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md cols="6">
                      <b-form-group
                        label="Stamina Nets:"
                        label-for="staminaNets"
                      >
                        <b-form-select
                          id="staminaNets"
                          v-model="player.staminaNets"
                          :options="twoNets"
                          @change="
                            modifyNets('staminaNets', seasonIndex, playerIndex)
                          "
                        ></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col md cols="6">
                      <b-form-group
                        label="Keeping Nets:"
                        label-for="keepingNets"
                      >
                        <b-form-select
                          v-model="player.keepingNets"
                          :options="twoNets"
                          @change="
                            modifyNets('keepingNets', seasonIndex, playerIndex)
                          "
                        ></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col md cols="6">
                      <b-form-group
                        label="Batting Nets:"
                        label-for="battingNets"
                      >
                        <b-form-select
                          v-model="player.battingNets"
                          :options="fourNets"
                          @change="
                            modifyNets('battingNets', seasonIndex, playerIndex)
                          "
                        ></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col md cols="6">
                      <b-form-group label="Conc Nets:" label-for="concNets">
                        <b-form-input
                          id="concNets"
                          disabled
                          :value="getSecondaryNets(player, 'conc')"
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md cols="6">
                      <b-form-group
                        label="Bowling Nets:"
                        label-for="bowlingNets"
                      >
                        <b-form-select
                          v-model="player.bowlingNets"
                          :options="fourNets"
                          @change="
                            modifyNets('bowlingNets', seasonIndex, playerIndex)
                          "
                        ></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col md cols="6">
                      <b-form-group label="Cons Nets:" label-for="consNets">
                        <b-form-input
                          id="consNets"
                          disabled
                          :value="getSecondaryNets(player, 'cons')"
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md cols="6">
                      <b-form-group
                        label="Fielding Nets:"
                        label-for="fieldingNets"
                      >
                        <b-form-select
                          v-model="player.fieldingNets"
                          :options="twoNets"
                          @change="
                            modifyNets('fieldingNets', seasonIndex, playerIndex)
                          "
                        ></b-form-select>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </div>
              </div> </b-card-text
          ></b-card>
        </div>
        <!-- End of Player Results Loop -->
      </b-card-text>
    </b-card>
    <!-- End of Results -->
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "PlayerSeason",
  components: {},
  data() {
    return {
      season: 6,
      players: [
        {
          playerName: "Player 1",
          playerAge: 17,
          targetAge: 23,
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
        },
      ],
      results: [],
    };
  },
  computed: {
    fourNets: function () {
      return this.$store.state.fourNets;
    },
    twoNets: function () {
      return this.$store.state.twoNets;
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
    seasons: function () {
      return this.$store.state.seasons;
    },
  },
  methods: {
    removePlayer(index) {
      this.players.splice(index, 1);
    },
    addPlayer() {
      this.players.push({
        playerName: "Player " + (this.players.length + 1),
        playerAge: 17,
        targetAge: 23,
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
      });
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
    train(newSession) {
      if (newSession) {
        this.buildResults();
      }
      this.calculateResults();
    },
    buildResults() {
      this.results = [];
      for (let i = 0; i < this.season; i++) {
        this.results.push([]);
      }
      for (let i = 0; i < this.players.length; i++) {
        let player = this.players[i];
        this.fourNetsToast(player, player.targetAge);
        for (let j = 0; j < this.season; j++) {
          if (j < player.targetAge - player.playerAge) {
            let current = $.extend(true, {}, player);
            current.playerAge += j;
            this.results[j].push(current);
          } else {
            this.results[j].push({});
          }
        }
      }
    },
    calculateResults() {
      for (let i = 0; i < this.players.length; i++) {
        for (
          let index = 0;
          index < this.players[i].targetAge - this.players[i].playerAge;
          index++
        ) {
          let player = this.results[index][i];
          if (index == 0) this.copyPrevious(this.players[i], player);
          else this.copyPrevious(this.results[index - 1][i], player);
          this.calculateTrainingLevel(player);
        }
      }
    },
    copyPrevious(previous, current) {
      current.stamina = previous.stamina;
      current.keeping = previous.keeping;
      current.batting = previous.batting;
      current.concentration = previous.concentration;
      current.bowling = previous.bowling;
      current.consistency = previous.consistency;
      current.fielding = previous.fielding;
    },
    calculateTrainingLevel(player) {
      let concNets = this.getSecondaryNets(player, "conc");
      let consNets = this.getSecondaryNets(player, "cons");
      this.skillIncrease(player, "batting", player.battingNets);
      this.skillIncrease(player, "bowling", player.bowlingNets);
      this.skillIncrease(player, "stamina", player.staminaNets);
      this.skillIncrease(player, "keeping", player.keepingNets);
      this.skillIncrease(player, "fielding", player.fieldingNets);
      this.skillIncrease(player, "concentration", concNets);
      this.skillIncrease(player, "consistency", consNets);
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
          this.trainingTimes[type][nets][currentPlayer.playerAge - 17];
        currentPlayer[skill] = Number.parseFloat(
          Number(currentPlayer[skill]) + 16 / multiplier
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
    validateAge(index) {
      return this.players[index].playerAge < this.players[index].targetAge;
    },
    validateSkill(skillName, index) {
      if (skillName == "stamina")
        return (
          this.players[index][skillName] >= 1 &&
          this.players[index][skillName] <= 11
        );
      else
        return (
          this.players[index][skillName] >= 1 &&
          this.players[index][skillName] <= 25
        );
    },
    canTrain() {
      for (let i = 0; i < this.players.length; i++) {
        let result =
          this.validateSkill("stamina", i) &&
          this.validateSkill("batting", i) &&
          this.validateSkill("bowling", i) &&
          this.validateSkill("consistency", i) &&
          this.validateSkill("concentration", i) &&
          this.validateSkill("keeping", i) &&
          this.validateSkill("fielding", i) &&
          this.validateAge(i);
        if (!result) return result;
      }

      return true;
    },
    modifyNets(skill, index, playerIndex) {
      this.fourNetsToast(
        this.results[index][playerIndex],
        this.results[index][playerIndex].targetAge
      );
      for (let i = index + 1; i < this.results.length; i++) {
        this.results[i][playerIndex][skill] =
          this.results[i - 1][playerIndex][skill];
      }
      this.train(false);
    },
    copySkills(index) {
      let temp = {
        stamina: this.players[index].stamina,
        batting: this.players[index].batting,
        bowling: this.players[index].bowling,
        fielding: this.players[index].fielding,
        keeping: this.players[index].keeping,
        concentration: this.players[index].concentration,
        consistency: this.players[index].consistency,
      };
      this.$store.dispatch("setClipboard", temp);
    },
    readClipboard(index) {
      let temp = this.$store.state.clipboard;
      this.players[index].stamina = temp.stamina;
      this.players[index].batting = temp.batting;
      this.players[index].bowling = temp.bowling;
      this.players[index].fielding = temp.fielding;
      this.players[index].keeping = temp.keeping;
      this.players[index].concentration = temp.concentration;
      this.players[index].consistency = temp.consistency;
    },
    fourNetsToast(player, targetAge) {
      if (
        (player.battingNets > 3 || player.bowlingNets > 3) &&
        targetAge > 19
      ) {
        this.$bvToast.toast(
          `The training times for 4 primary nets are currently unknown for players older than 18. Please change the number of nets for ages 19 and above for ${player.playerName} to get accurate results`,
          {
            title: `Insufficient Data`,
            toaster: "b-toaster-top-full",
            noAutoHide: true,
            variant: "primary",
          }
        );
      }
    },
  },
};
</script>

<style scoped>
.collapsing {
  transition: none !important;
}
</style>
