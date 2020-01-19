
const state = {
    products: []
}
const getters = {
    search: state => word => {
        return state.products.filter(product => product.name.includes(word))
    }
}

const mutations = {
    set(state, payload) {
        state.products = payload.data
    },
    add(state, payload) {
        state.products ? state.products.unshift(payload.data)
            : state.products = [payload.data]
    },
    delete(state, payload) {
        state.products.splice(payload, 1)
    },

}

const actions = {
    setProducts({ commit }, payload) {
        commit('set', payload)
    },
    addProduct({ commit }, payload) {
        payload.data ? commit('add', payload) : null
    },
    deleteProduct({ commit }, payload) {
        commit('delete', payload)

    },
}

export default {
    state,
    mutations,
    actions,
    getters
}
