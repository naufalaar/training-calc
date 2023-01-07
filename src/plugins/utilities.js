import store from '../store/index'

export default{
    testFunction(){
        console.log(store.getters.getFourNets);
        return 5;
    },
    getSkillText(skill, skillLevel){
        if(skill == "stamina" || skill == "teamStamina")
            return store.getters.getStaminaSkills[skillLevel];
        return store.getters.getSkills[skillLevel];
    }
}