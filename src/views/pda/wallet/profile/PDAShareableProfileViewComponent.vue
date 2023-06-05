<script>
/**
 * Descripción: Pantalla PDA Wallet
 *
 * @displayName PDAShareableProfileViewComponent
 */

import { mapGetters, mapActions } from 'vuex';

const BasePDAShareableProfileViewComponent = () =>
    import(
        '@/views/pda/wallet/profile/components/BasePDAShareableProfileViewComponent'
    );

export default {
    name: 'PDAShareableProfileViewComponent',

    metaInfo: { title: 'Mi Perfil PDA' },

    components: {
        BasePDAShareableProfileViewComponent,
    },

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'loadingPdaWallet', 'premium']),
    },

    mounted() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.white;

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
    <BasePDAShareableProfileViewComponent v-else />
</template>
