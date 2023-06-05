<script>
/**
 * Descripción: Pantalla PDA Habilidades
 *
 * @displayName MyAbilitiesPDAViewComponent
 */

import { mapGetters, mapActions } from 'vuex';

const BaseMyAbilitiesPDAViewComponent = () =>
    import(
        '@/views/pda/wallet/myPdaAbilities/components/BaseMyAbilitiesPDAViewComponent'
    );

export default {
    name: 'MyAbilitiesPDAViewComponent',

    metaInfo: { title: 'Mis Indicadores' },

    components: {
        BaseMyAbilitiesPDAViewComponent,
    },

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'loadingPdaWallet']),
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
    <BaseMyAbilitiesPDAViewComponent v-else />
</template>
