<script>
/**
 * Descripción: Pantalla PDA Habilidades
 *
 * @displayName ShareableMyAbilitiesViewComponent
 */

import '@/css/pda.css';

import { mapGetters, mapActions } from 'vuex';

const BaseShareableMyAbilitiesViewComponent = () =>
    import(
        '@/views/pda/wallet/myPdaAbilities/components/BaseShareableMyAbilitiesViewComponent'
    );

export default {
    name: 'ShareableMyAbilitiesViewComponent',

    metaInfo: { title: 'Mis indicadores' },

    components: {
        BaseShareableMyAbilitiesViewComponent,
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
    <BaseSkeletonLoader v-if="loadingPdaWallet && !pdaWallet" type="image" />
    <BaseShareableMyAbilitiesViewComponent v-else />
</template>
