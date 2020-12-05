const state = {
    wizardStep : 1
};

const getters = {
    getWizardStep (state) {
        return state.wizardStep
    }
};

const actions = {
    updateStep (context, stepNumber) {
        return new Promise ((resolve, reject) => {
            context.commit("updateStepNumber", stepNumber);
            resolve(stepNumber)
        })
    }
};

const mutations = {
    updateStepNumber(state, value) {
        state.wizardStep = value
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};