export const state = () => ({
  all: []
});

export const actions = {
    async fetchAllCases ({commit}) {
        let {data} = await this.$axios.$get('/cases')
        commit('setCases', data)
    },

    async fetchCase ({commit}, id) {
        let response = await this.$axios.$get(`/cases/${id}`)
        if (response.code === 200) {
            commit('setCase', response.data)
        } else {
            throw new Error('Error al obtener caso.')
        }
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