<template>
  <div>
    <b-card-group class="mt-3 mb-2">
      <b-card bg-variant="primary" text-variant="light">
        <b-card-text>
          <b-row class="pb-2">
            <b-col>
              <h4 class="text-light py-1">Players & Nets</h4>
            </b-col>
            <b-col></b-col>
            <b-col></b-col>
            <b-col>
              <b-form-group label="Plan For:" label-for="season">
                <b-form-select
                  id="season"
                  v-model="season"
                  :options="seasons"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col align-self="center"
              ><b-button
                v-on:click="addPlayer()"
                block
                type="submit"
                variant="secondary"
                >Add Player</b-button
              ></b-col
            >
            <b-col align-self="center">
              <b-button
                v-on:click="train(true)"
                block
                type="submit"
                variant="secondary"
                >Train!</b-button
              ></b-col
            >
          </b-row>

          <b-button
            v-for="(player, index) in players"
            :key="index.id"
            v-b-toggle="`id-${index}`"
            variant="secondary"
            class="mr-1 mb-2"
            >{{ player.playerName }}</b-button
          >

          <!-- Start of Player Entry Loop -->

          <div v-for="(player, index) in players" :key="index.id">
            <b-collapse
              visible
              :id="`id-${index}`"
              class="py-2"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card
                border-variant="primary"
                bg-variant="primary"
                text-variant="light"
              >
                <b-card-text>
                  <!-- Row 1 -->
                  <b-row>
                    <b-col>
                      <b-form-group label="Player Name:" label-for="name">
                        <b-form-input
                          id="name"
                          v-model.number="player.playerName"
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group label="Player Age:" label-for="playerAge">
                        <b-form-select
                          id="playerAge"
                          v-model="player.playerAge"
                          :options="age"
                        ></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group label="Train Until:" label-for="targetAge">
                        <b-form-select
                          id="targetAge"
                          v-model="player.targetAge"
                          :options="age"
                        ></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col></b-col>
                    <b-col></b-col>
                    <b-col></b-col>
                    <b-col align-self="center"
                      ><b-button
                        v-on:click="removePlayer(index)"
                        block
                        type="submit"
                        variant="secondary"
                        >Remove Player</b-button
                      ></b-col
                    >
                  </b-row>
                  <!-- Row 2 -->
                  <b-row>
                    <b-col>
                      <b-form-group
                        label="Stamina Nets:"
                        label-for="staminaNets"
                      >
                        <b-form-select
                          id="staminaNets"
                          v-model="player.staminaNets"
                          :options="twoNets"
                        ></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        label="Keeping Nets:"
                        label-for="keepingNets"
                      >
                        <b-form-select
                          v-model="player.keepingNets"
                          :options="twoNets"
                        ></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        label="Batting Nets:"
                        label-for="battingNets"
                      >
                        <b-form-select
                          v-model="player.battingNets"
                          :options="fourNets"
                        ></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group label="Conc Nets:" label-for="concNets">
                        <b-form-input
                          id="concNets"
                          disabled
                          :value="getSecondaryNets(player, 'conc')"
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        label="Bowling Nets:"
                        label-for="bowlingNets"
                      >
                        <b-form-select
                          v-model="player.bowlingNets"
                          :options="fourNets"
                        ></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group label="Cons Nets:" label-for="consNets">
                        <b-form-input
                          id="consNets"
                          disabled
                          :value="getSecondaryNets(player, 'cons')"
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
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
                  </b-row>

                  <!-- Row 3 -->
                  <b-row>
                    <b-col>
                      <b-form-group label="Stamina:" label-for="stamina">
                        <b-form-input
                          id="stamina"
                          v-model.number="player.stamina"
                          required
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group label="Keeping:" label-for="keeping">
                        <b-form-input
                          id="keeping"
                          v-model.number="player.keeping"
                          required
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group label="Batting:" label-for="batting">
                        <b-form-input
                          id="batting"
                          v-model.number="player.batting"
                          required
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        label="Concetration:"
                        label-for="concentration"
                      >
                        <b-form-input
                          id="concentration"
                          v-model.number="player.concentration"
                          required
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group label="Bowling:" label-for="bowling">
                        <b-form-input
                          id="bowling"
                          v-model.number="player.bowling"
                          required
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        label="Consistency:"
                        label-for="consistency"
                      >
                        <b-form-input
                          id="consistency"
                          v-model.number="player.consistency"
                          required
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group label="Fielding:" label-for="fielding">
                        <b-form-input
                          id="fielding"
                          v-model.number="player.fielding"
                          required
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row> </b-card-text
              ></b-card>
            </b-collapse>
          </div>
          <!-- End of Player Entry Loop -->
        </b-card-text>
      </b-card>
    </b-card-group>

    <!-- Start of Results -->
    <b-card
      v-for="(result, index) in results"
      :key="index.id"
      bg-variant="primary"
      text-variant="light"
      class="my-3"
    >
      <b-card-text>
        <b-row class="pb-2">
          <b-col>
            <h4 class="text-light py-1">End of Season {{ index + 1 }}</h4>
          </b-col>
          <b-col></b-col>
          <b-col></b-col>
          <b-col></b-col>
          <b-col align-self="center">
            <b-button
              v-on:click="train(false)"
              block
              type="submit"
              variant="secondary"
              >Update Nets</b-button
            ></b-col
          >
        </b-row>
        <!-- Start of Player Results Loop -->
        <div>
          <b-card
            border-variant="primary"
            bg-variant="primary"
            text-variant="light"
          >
            <b-card-text>
              <!-- Row 1 -->
              <div v-for="(player, index) in result" :key="index.id">
                <div v-if="Object.keys(player).length > 0">
                  <b-row>
                    <b-col>
                      <h5 class="text-secondary pb-1">
                        <strong
                          >{{ player.playerName }} -
                          {{ player.playerAge + 1 }}</strong
                        >
                      </h5>
                    </b-col>
                  </b-row>
                  <!-- Row 2 -->
                  <b-row>
                    <b-col>
                      <b-form-group
                        label="Stamina Nets:"
                        label-for="staminaNets"
                      >
                        <b-form-select
                          id="staminaNets"
                          v-model="player.staminaNets"
                          :options="twoNets"
                        ></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        label="Keeping Nets:"
                        label-for="keepingNets"
                      >
                        <b-form-select
                          v-model="player.keepingNets"
                          :options="twoNets"
                        ></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        label="Batting Nets:"
                        label-for="battingNets"
                      >
                        <b-form-select
                          v-model="player.battingNets"
                          :options="fourNets"
                        ></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group label="Conc Nets:" label-for="concNets">
                        <b-form-input
                          id="concNets"
                          disabled
                          :value="getSecondaryNets(player, 'conc')"
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        label="Bowling Nets:"
                        label-for="bowlingNets"
                      >
                        <b-form-select
                          v-model="player.bowlingNets"
                          :options="fourNets"
                        ></b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group label="Cons Nets:" label-for="consNets">
                        <b-form-input
                          id="consNets"
                          disabled
                          :value="getSecondaryNets(player, 'cons')"
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
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
                  </b-row>

                  <!-- Row 3 -->
                  <b-row>
                    <b-col>
                      <b-form-group label="Stamina:" label-for="stamina">
                        <b-form-input
                          id="stamina"
                          v-model.number="player.stamina"
                          disabled
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group label="Keeping:" label-for="keeping">
                        <b-form-input
                          id="keeping"
                          v-model.number="player.keeping"
                          disabled
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group label="Batting:" label-for="batting">
                        <b-form-input
                          id="batting"
                          v-model.number="player.batting"
                          disabled
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        label="Concetration:"
                        label-for="concentration"
                      >
                        <b-form-input
                          id="concentration"
                          v-model.number="player.concentration"
                          disabled
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group label="Bowling:" label-for="bowling">
                        <b-form-input
                          id="bowling"
                          v-model.number="player.bowling"
                          disabled
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        label="Consistency:"
                        label-for="consistency"
                      >
                        <b-form-input
                          id="consistency"
                          v-model.number="player.consistency"
                          disabled
                        >
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group label="Fielding:" label-for="fielding">
                        <b-form-input
                          id="fielding"
                          v-model.number="player.fielding"
                          disabled
                        >
                        </b-form-input>
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
  },
};
</script>

<style scoped>
.collapsing {
  transition: none !important;
}
</style>