/**
 * Descripción: Gestor de PDA Wallet
 *
 * @displayName BUO PDA Wallet
 */

import httpService from '@/services/axios/httpService';

export const namespaced = true;

export const state = {
    pdaWallet: undefined,
    loadingPdaWallet: false,
};

export const getters = {
    /**
     * Status Code
     */
    freemium: () => 1,
    premium: () => 2,

    /**
     * BUO PDA Wallet Object
     */
    pdaWallet: (state) => state.pdaWallet,

    /**
     * BUO Loanding Process
     */
    loadingPdaWallet: (state) => state.loadingPdaWallet,
};

export const mutations = {
    $_SET_PDA_WALLET(state, Wallet) {
        state.pdaWallet = Wallet;
    },

    $_SET_PDA_LOADING(state, value) {
        state.loadingPdaWallet = value;
    },

    $_CLEAN_PDA_WALLET(state) {
        state.pdaWallet = undefined;
    },
};

export const actions = {
    $_pda_wallet_clean({ commit }) {
        commit('$_CLEAN_PDA_WALLET');
    },

    $_set_pda_wallet({ commit }, pdaWallet) {
        commit('$_SET_PDA_WALLET', pdaWallet);
    },

    $_request_pda_wallet({ commit }) {
        this.state.pda.pdaWallet = undefined;
        commit('$_SET_PDA_LOADING', true);
        const username = this.state.authentication.user.email;
        if (username) {
            //HttpServices a la vista para obtener Vista
            httpService.get(`pda/getTest/${username}`).then((response) => {
                if (response != undefined) {
                    // Encontro la entidad
                    commit('$_SET_PDA_WALLET', response.data);
                }
                commit('$_SET_PDA_LOADING', false);
            });
        }
    },
};
