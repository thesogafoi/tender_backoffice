export const store = () => ({
    errors: {},
    status: '',
});

export const getters = {
    errors(state) {
        return state.errors;
    },
    status(state) {
        return state.status;
    }
};

export const mutations = {
    SET_ERRORS(state, errors) {
        state.errors = errors;
    },
    SET_ERRORSTATUS(state, status) {
        state.status = status;
    }
};

export const actions = {
    setErrors({ commit }, errors) {
        commit('SET_ERRORS', errors);
    },
    clearErrors({ commit }) {
        commit('SET_ERRORS', {});
    },
    setErrorStatus({ commit }, errors) {
        commit('SET_ERRORSTATUS', errors);
    },
};