export const state = () => ({
  all: []
});

export const actions = {
    async fetchAllCases ({commit}) {
        let {data} = await this.$axios.$get('/cases')
        commit('setCases', data)
    },

    async fetchCase ({commit}, id) {
        let {data} = await this.$axios.$get(`/cases/${id}`)
        commit('setCase', data)
    }
}

export const mutations = {
    setCase(state, _case) {
        state.all.push(_case)
    },

    setCases(state, cases) {
        state.all = cases
    }
}