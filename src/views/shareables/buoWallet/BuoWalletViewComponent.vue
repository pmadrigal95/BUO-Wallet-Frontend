<script>
/**
 * Descripción: Pantalla BUO Shareable Link
 *
 * @displayName BuoWalletViewComponent
 */

import { mapGetters, mapActions } from 'vuex';

const BaseContainerViewComponent = () =>
    import(
        '@/views/shareables/buoWallet/components/BaseContainerViewComponent'
    );

export default {
    name: 'BuoWalletViewComponent',

    components: {
        BaseContainerViewComponent,
    },

    metaInfo: { title: 'Buo Wallet' },

    computed: {
        ...mapGetters('authentication', ['user']),
        ...mapGetters('wallet', ['buoWallet']),

        entity() {
            return {
                ...this.buoWallet,
                ...this.user,
            };
        },
    },

    created() {
        this.$_reviewStatus();

        //TODO: How to implement on vue router the background config
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.clouds;
    },

    methods: {
        ...mapActions('wallet', ['$_wallet_getbyuserid']),

        $_reviewStatus() {
            if (!this.buoWallet) {
                this.$_wallet_getbyuserid();
            }
        },
    },
};
</script>

<template>
    <BaseSkeletonLoader v-if="!buoWallet && !entity" type="card, actions" />
    <BaseContainerViewComponent :entity="entity" v-else />
</template>
