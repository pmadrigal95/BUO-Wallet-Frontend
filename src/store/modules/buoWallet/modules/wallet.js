/**
 * Descripción: Gestor de Billeteras
 *
 * @displayName BUO Wallet
 */

import httpService from '@/services/axios/httpService';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper.js';

export const namespaced = true;

export const state = {
    buoWallet: undefined,
    loadingWallet: false,
};

export const getters = {
    /**
     * Status Code
     */
    validatedCode: () => 5,
    inProgressCode: () => 4,
    notValidatedCode: () => 3,

    PDACompanyId: () => 14,

    /**
     * BUO Wallet Object
     */
    buoWallet: (state) => state.buoWallet,

    /**
     * BUO Loanding Process
     */
    loadingWallet: (state) => state.loadingWallet,

    /**
     * Ability to Apply Proccess
     */
    getAbilityToApply: (state) => (id) => {
        const result = state.buoWallet.habilidades.filter(
            (x) => x.cualificacionId == id
        );
        return result.length > 0 ? result[0] : null;
    },
};

export const mutations = {
    $_WALLET_GETBYUSERID(state, Wallet) {
        state.buoWallet = Wallet;
    },

    $_SET_LOADINGWALLET(state, value) {
        state.loadingWallet = value;
    },

    $_CLEAN_BUOWALLET(state) {
        state.buoWallet = undefined;
    },
};

export const actions = {
    $_wallet_getbyuserid({ commit }, searchText) {
        this.state.wallet.buoWallet = undefined;
        commit('$_SET_LOADINGWALLET', true);
        const userId = this.state.authentication.user.userId;
        if (userId) {
            //HttpServices a la vista para obtener Vista
            httpService
                .get(
                    baseSharedFnHelper.$_checkValueNull(searchText)
                        ? `wallet/getByUsuarioId/${userId}?size=100`
                        : `wallet/getByUsuarioId/${userId}/AndDefinicion/${searchText}`
                )
                .then((response) => {
                    if (response != undefined) {
                        // Encontro la entidad
                        commit('$_WALLET_GETBYUSERID', response.data);
                    }
                    commit('$_SET_LOADINGWALLET', false);
                });
        }
    },

    $_wallet_deleteability({ commit, dispatch }, abilityId) {
        const userId = this.state.authentication.user.userId;
        if (userId) {
            //HttpServices a la vista para obtener Vista
            commit('$_SET_LOADINGWALLET', true);
            httpService
                .delete(
                    `wallet/deleteByUsuarioId/${userId}/habilidad/${abilityId}`
                )
                .then((response) => {
                    if (response != undefined) {
                        dispatch('$_wallet_getbyuserid');
                    }
                    commit('$_SET_LOADINGWALLET', false);
                });
        }
    },

    $_wallet_cleanbuowallet({ commit }) {
        commit('$_CLEAN_BUOWALLET');
    },
};
