<template>
  <div>
    <b-card bg-variant="primary" text-variant="light" class="mt-3 mb-2">
      <b-card-text>
        <h4 class="text-secondary py-1">Wage Caculator</h4>
        <!-- Wage -->
        <b-row align-v="center" class="mb-3">
          <b-col md cols="6">
            <b-form-group label="Current Wage:" label-for="wage">
              <b-form-input
                id="wage"
                v-model.number="wage"
                :state="validateWage()"
                v-on:change="calculateSkillLevel()"
                required
              >
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col md cols="6">
            <b-form-group
              label="Estimated Total Wage:"
              label-for="estimatedTotalWage"
            >
              <b-form-input
                id="estimatedTotalWage"
                v-model="estimatedWage"
                disabled
              >
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col md cols="6">
            <b-form-group
              label="Estimated Min Wage:"
              label-for="estimatedMinWage"
            >
              <b-form-input id="estimatedMinWage" v-model="minWage" disabled>
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col md cols="6">
            <b-form-group
              label="Estimated Max Wage:"
              label-for="estimatedMaxWage"
            >
              <b-form-input id="estimatedMaxWage" v-model="maxWage" disabled>
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col md cols="6"
            ><b-button
              block
              class="mt-2"
              type="submit"
              variant="secondary"
              @click="copySkills"
              >Copy Skills</b-button
            ></b-col
          >
          <b-col md cols="6"
            ><b-button
              block
              class="mt-2"
              type="submit"
              variant="secondary"
              @click="readClipboard"
              >Paste Skills</b-button
            ></b-col
          >
        </b-row>
        <!-- Skills -->
        <b-row
          align-v="center"
          v-for="(skill, index) in wages"
          v-bind:key="skill.skillName"
          class="mb-3"
        >
          <b-col md cols="6">
            <b-form-group
              :label="skill.skillName + ' Level:'"
              :label-for="skill.skillName"
            >
              <b-form-input
                :id="skill.skillName"
                v-model.number="skill.skillLevel"
                v-on:change="skillChange(index)"
                :state="validateSkill(index)"
                required
              >
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col md cols="6">
            <b-form-group label="Skill" label-for="skillName">
              <b-form-input
                id="skillName"
                :value="getSkillLevel(skill.skillName, skill.skillLevel)"
                disabled
              >
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col md cols="6">
            <b-form-group label="Estimated Level" label-for="estimatedLevel">
              <b-form-input
                id="estimatedLevel"
                :value="skill.estimatedMin + ' - ' + skill.estimatedMax"
                disabled
              >
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col md cols="6">
            <b-form-group label="Estimated Wage" label-for="estimatedWage">
              <b-form-input id="estimatedWage" v-model="skill.current" disabled>
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col md cols="6">
            <b-form-group label="Minimum Wage" label-for="minWage">
              <b-form-input id="minWage" v-model="skill.min" disabled>
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col md cols="6">
            <b-form-group label="Maximum Wage" label-for="maxWage">
              <b-form-input id="maxWage" v-model="skill.max" disabled>
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card-text>
    </b-card>
    <!-- This is where the result ends -->
  </div>
</template>

<script>
export default {
  name: "WageCalculator",
  components: {},
  data() {
    return {
      baseWage: 250,
      wage: 250,
      estimatedWage: 0,
      minWage: 0,
      maxWage: 0,
      wages: [
        {
          skillName: "Stamina",
          skillLevel: 1,
          type: "secondary",
          current: 0,
          min: 0,
          max: 0,
          estimatedMin: 0,
          estimatedMax: 0,
        },
        {
          skillName: "Batting",
          skillLevel: 1,
          type: "primary",
          current: 0,
          min: 0,
          max: 0,
          estimatedMin: 0,
          estimatedMax: 0,
        },
        {
          skillName: "Bowling",
          skillLevel: 1,
          type: "primary",
          current: 0,
          min: 0,
          max: 0,
          estimatedMin: 0,
          estimatedMax: 0,
        },
        {
          skillName: "Fielding",
          skillLevel: 1,
          type: "secondary",
          current: 0,
          min: 0,
          max: 0,
          estimatedMin: 0,
          estimatedMax: 0,
        },
        {
          skillName: "Keeping",
          skillLevel: 1,
          type: "primary",
          current: 0,
          min: 0,
          max: 0,
          estimatedMin: 0,
          estimatedMax: 0,
        },
        {
          skillName: "Concentration",
          skillLevel: 1,
          type: "secondary",
          current: 0,
          min: 0,
          max: 0,
          estimatedMin: 0,
          estimatedMax: 0,
        },
        {
          skillName: "Consistency",
          skillLevel: 1,
          type: "secondary",
          current: 0,
          min: 0,
          max: 0,
          estimatedMin: 0,
          estimatedMax: 0,
        },
      ],
    };
  },
  mounted() {
    this.initialWage();
  },
  computed: {
    skills: function () {
      return this.$store.state.skills;
    },
    staminaSkills: function () {
      return this.$store.state.staminaSkills;
    },
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
      this.calculateSkillLevel();
    },
    wageReset() {
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
      this.calculateSkillLevel();
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
        // calculatedWage = Math.pow(leformulavel - 3, 3) * (level - 1);
        // Ollie's formula
        calculatedWage = Math.pow(level - 1, 5) * 0.05;
      return calculatedWage.toFixed(2);
    },
    wageSum(field) {
      let sum = this.baseWage;
      for (let skill of this.wages) {
        sum += Number.parseFloat(skill[field]);
      }
      return sum.toFixed(2);
    },
    calculateSkillLevel() {
      for (let i = 0; i < this.wages.length; i++) {
        this.wages[i].estimatedMin = this.calculateEstimate(
          this.wages[i],
          "Min"
        );
        this.wages[i].estimatedMax = this.calculateEstimate(
          this.wages[i],
          "Max"
        );
      }
    },
    calculateEstimate(skill, type) {
      let skillWage = Number.parseInt(this.wage) - this.baseWage;
      for (let wage of this.wages) {
        if (wage.skillName != skill.skillName) {
          if (type == "Min") skillWage -= wage.max;
          else if (type == "Max") skillWage -= wage.min;
        }
      }
      console.log(skill.skillName + ":" + skillWage);

      let skillLevel = 1;
      if (skill.type == "primary")
        skillLevel = Math.pow(skillWage / 0.05, 1 / 5) + 1;
      else if (skill.type == "secondary")
        skillLevel = (Math.pow(skillWage / 0.05, 1 / 5) + 0.03) / 0.67;
      if (isNaN(skillLevel)) return skill.skillLevel;
      if (type == "Min" && skill.skillLevel > skillLevel)
        return skill.skillLevel;
      if (type == "Max" && Math.floor(skill.skillLevel) + 0.99 < skillLevel)
        return Math.floor(skill.skillLevel) + 0.99;
      if (type == "Max" && Math.floor(skill.skillLevel) > skillLevel)
        return Math.floor(skill.skillLevel) + 0.0;
      return skillLevel.toFixed(2);
    },
    getSkillLevel(skill, level) {
      let temp = "";
      if (skill == "Stamina")
        temp =
          11 > level
            ? this.staminaSkills[Math.floor(level)]
            : this.staminaSkills[this.staminaSkills.length - 1];
      else
        temp =
          21 > level
            ? this.skills[Math.floor(level)]
            : this.skills[this.skills.length - 1];
      return temp;
    },
    validateWage() {
      return this.wage >= this.baseWage;
    },
    validateSkill(index) {
      if (index == 0)
        return (
          this.wages[index].skillLevel >= 1 &&
          this.wages[index].skillLevel <= 11
        );
      else
        return (
          this.wages[index].skillLevel >= 1 &&
          this.wages[index].skillLevel <= 25
        );
    },
    copySkills() {
      let temp = {
        stamina : this.wages[0].skillLevel,
        batting : this.wages[1].skillLevel,
        bowling : this.wages[2].skillLevel,
        fielding : this.wages[3].skillLevel,
        keeping : this.wages[4].skillLevel,
        concentration : this.wages[5].skillLevel,
        consistency : this.wages[6].skillLevel,
      };
      this.$store.dispatch("setClipboard", temp);
    },
    readClipboard() {
      let temp = this.$store.state.clipboard;
      this.wages[0].skillLevel = temp.stamina;
      this.wages[1].skillLevel = temp.batting;
      this.wages[2].skillLevel = temp.bowling;
      this.wages[3].skillLevel = temp.fielding;
      this.wages[4].skillLevel = temp.keeping;
      this.wages[5].skillLevel = temp.concentration;
      this.wages[6].skillLevel = temp.consistency;
    },
  },
};
</script>