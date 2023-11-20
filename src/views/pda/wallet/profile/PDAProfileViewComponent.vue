<script>
/**
 * Descripción: Pantalla PDA Wallet
 *
 * @displayName PDAProfileViewComponent
 */

import { mapGetters, mapActions } from 'vuex';

const BasePDAProfileViewComponent = () =>
    import('@/views/pda/wallet/profile/components/BasePDAProfileViewComponent');

export default {
    name: 'PDAProfileViewComponent',

    metaInfo: { title: 'Mi Perfil Buo Psychometric' },

    components: {
        BasePDAProfileViewComponent,
    },

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'loadingPdaWallet', 'premium']),
    },

    created() {
        //TODO: How to implement on vue router the background config
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.clouds;

        if (!this.pdaWallet) {
            this.$_request_pda_wallet();
        }
    },

    methods: {
        ...mapActions('pda', ['$_request_pda_wallet']),
    },
};
</script>

<template>
    <BaseSkeletonLoader
        v-if="!pdaWallet && loadingPdaWallet"
        type="card, actions"
    />
    <BasePDAProfileViewComponent v-else />
</template>
