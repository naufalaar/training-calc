<template>
  <b-form @submit.prevent="calculate">
    <b-card-group deck class="py-3">
      <b-card bg-variant="primary" text-variant="light" title="Current Skills">
        <b-card-text>
          <b-row class="py-1">
            <b-col>
              <label for="stamina">Stamina </label>
            </b-col>
            <b-col>
              <b-form-input
                id="stamina"
                v-model="player.history[0].stamina"
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
                v-model="player.history[0].keeping"
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
                v-model="player.history[0].batting"
                required
              >
              </b-form-input>
            </b-col>
            <b-col>
              <label for="concentration">Concentration </label>
            </b-col>
            <b-col>
              <b-form-input
                id="concentration"
                v-model="player.history[0].concentration"
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
                v-model="player.history[0].bowling"
                required
              >
              </b-form-input>
            </b-col>
            <b-col>
              <label for="consistency">Consistency </label>
            </b-col>
            <b-col>
              <b-form-input
                id="consistency"
                v-model="player.history[0].consistency"
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
                v-model="player.history[0].fielding"
                required
              >
              </b-form-input>
            </b-col>
          </b-row>
          <b-row align-h="end">
            <b-col cols="3">
              <b-button type="submit" variant="secondary">Submit</b-button>
            </b-col>
          </b-row>
        </b-card-text>
      </b-card>
    </b-card-group>
  </b-form>
</template>

<script>
export default {
  name: "TrainingResult",
  data() {
    return {
      fourNets: [0, 1, 2, 3, 4],
      twoNets: [0, 1, 2],
      week: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      age: [
        17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
        35,
      ],
      player: {
        history: [
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
            currentAge: 17,
          },
        ],
        trainingAge: 22,
        currentWeek: 1,
      },
    };
  },
};
</script>

<style></style>
