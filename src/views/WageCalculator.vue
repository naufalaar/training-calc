<template>
  <div>
    <b-form @submit.prevent="calculate(true)">
      <b-card-group deck class="mt-3 mb-2">
        <b-card bg-variant="primary" text-variant="light">
          <b-card-text>
            <h4 class="text-light py-1">Wage Caculator</h4>
            <b-row>
              <b-col>
                <!-- <h5 class="text-light text-right">Current Wage:</h5> -->
              </b-col>
              <b-col>
                <!-- <b-form-group>
                  <b-form-input id="wage" v-model="wage" required>
                  </b-form-input>
                </b-form-group> -->
              </b-col>
              <b-col></b-col>
              <b-col></b-col>
              <b-col></b-col>
            </b-row>
            <b-row align-v="center">
              <b-col></b-col>
              <b-col>
                <h5 class="text-light text-center">Skill Level</h5>
              </b-col>
              <b-col>
                <h5 class="text-light text-center">Estimated Wage</h5>
              </b-col>
              <b-col>
                <h5 class="text-light text-center">Minimum wage</h5>
              </b-col>
              <b-col>
                <h5 class="text-light text-center">Maximum wage</h5>
              </b-col>
              <b-col>
                <!-- <h5 class="text-light text-center">Estimate</h5> -->
              </b-col>
            </b-row>
            <b-row
              align-v="center"
              v-for="(skill, index) in wages"
              v-bind:key="skill.skillName"
            >
              <b-col>
                <h5 class="text-light text-right">{{ skill.skillName }}:</h5>
              </b-col>
              <b-col>
                <b-form-group>
                  <b-form-input
                    id="stamina"
                    v-model.number="skill.skillLevel"
                    v-on:change="skillChange(index)"
                    required
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group>
                  <b-form-input id="stamina" v-model="skill.current" disabled>
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group>
                  <b-form-input id="stamina" v-model="skill.min" disabled>
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group>
                  <b-form-input id="stamina" v-model="skill.max" disabled>
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col align="center" align-self="center">
                <!-- <b-form-group>
                  <b-form-radio
                    size="lg"
                    name="some-radios"
                    value="B"
                  ></b-form-radio>
                </b-form-group> -->
              </b-col>
            </b-row>
            <b-row align-v="center">
              <b-col>
                <h5 class="text-light text-right">Total:</h5>
              </b-col>
              <b-col> </b-col>
              <b-col>
                <b-form-group>
                  <b-form-input id="stamina" v-model="estimatedWage" disabled>
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group>
                  <b-form-input id="stamina" v-model="minWage" disabled>
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group>
                  <b-form-input id="stamina" v-model="maxWage" disabled>
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col></b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-card-group>
    </b-form>
    <!-- This is where the result ends -->
  </div>
</template>

<script>
export default {
  name: "WageCalculator",
  components: {},
  data() {
    return {
      wage: 400,
      estimatedWage: 0,
      minWage: 0,
      maxWage: 0,
      player: {
        stamina: 5,
        batting: 6,
        bowling: 1,
        fielding: 5,
        keeping: 1,
        concentration: 5,
        consistency: 1,
      },
      wages: [
        {
          skillName: "Stamina",
          skillLevel: 5,
          type: "secondary",
          current: 0,
          min: 0,
          max: 0,
        },
        {
          skillName: "Batting",
          skillLevel: 5.5,
          type: "primary",
          current: 0,
          min: 0,
          max: 0,
        },
        {
          skillName: "Bowling",
          skillLevel: 1,
          type: "primary",
          current: 0,
          min: 0,
          max: 0,
        },
        {
          skillName: "Fielding",
          skillLevel: 5,
          type: "secondary",
          current: 0,
          min: 0,
          max: 0,
        },
        {
          skillName: "Keeping",
          skillLevel: 1,
          type: "primary",
          current: 0,
          min: 0,
          max: 0,
        },
        {
          skillName: "Concentration",
          skillLevel: 5,
          type: "secondary",
          current: 0,
          min: 0,
          max: 0,
        },
        {
          skillName: "Consistency",
          skillLevel: 1,
          type: "secondary",
          current: 0,
          min: 0,
          max: 0,
        },
      ],
    };
  },
  mounted() {
    this.initialWage();
  },
  methods: {
    initialWage() {
      for (let i = 0; i < this.wages.length; i++) {
        this.wages[i].current = this.calculateWage(
          this.wages[i].skillLevel,
          this.wages[i].type,
          "current"
        );
        this.wages[i].min = this.calculateWage(
          this.wages[i].skillLevel,
          this.wages[i].type,
          "min"
        );
        this.wages[i].max = this.calculateWage(
          this.wages[i].skillLevel,
          this.wages[i].type,
          "max"
        );
      }
      this.wageReset();
      this.calculateMinEstimate("batting");
    },
    wageReset(){
      this.estimatedWage = this.wageSum("current");
      this.minWage = this.wageSum("min");
      this.maxWage = this.wageSum("max");
    },
    skillChange(index) {
      this.wages[index].current = this.calculateWage(
        this.wages[index].skillLevel,
        this.wages[index].type,
        "current"
      );
      this.wages[index].min = this.calculateWage(
        this.wages[index].skillLevel,
        this.wages[index].type,
        "min"
      );
      this.wages[index].max = this.calculateWage(
        this.wages[index].skillLevel,
        this.wages[index].type,
        "max"
      );
      this.wageReset();
    },
    calculateWage(skillLevel, skillType, type) {
      let calculatedWage = 0;
      let level = skillLevel;
      if (level < 3) return calculatedWage;
      if (type == "min") level = Math.floor(skillLevel);
      else if (type == "max") level = Math.floor(skillLevel) + 0.99;
      if (skillType == "secondary")
        calculatedWage = Math.pow(level * 0.67 - 0.33, 5) * 0.05;
      if (skillType == "primary")
        calculatedWage = Math.pow(level - 3, 3) * (level - 1);
      return calculatedWage.toFixed(2);
    },
    wageSum(field) {
      let sum = 250;
      for (let skill of this.wages) {
        sum += Number.parseFloat(skill[field]);
      }
      return sum.toFixed(2);
    },
    calculateMinEstimate(skill){
      let skillWage = Number.parseInt(this.wage) - 250;
      for (let wage of this.wages){
        if (wage.skillName != skill){
          skillWage -= wage.max;
        }
      }
      console.log(skillWage);
    }
    
  },
};
</script>