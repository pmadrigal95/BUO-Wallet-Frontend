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

    metaInfo: { title: 'Mi Perfil PDA' },

    components: {
        BasePDAProfileViewComponent,
    },

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'loadingPdaWallet', 'premium']),
    },

    mounted() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.buoBackground;

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
