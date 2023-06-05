<script>
/**
 * Descripción: Pantalla PDA Comportamientos
 *
 * @displayName PDAShareableAxisBehaviourViewComponent
 */

import { mapGetters, mapActions } from 'vuex';

const BasePDAShareableAxisBehaviourViewComponent = () =>
    import(
        '@/views/pda/wallet/behaviors/components/BasePDAShareableAxisBehaviourViewComponent'
    );

export default {
    name: 'PDAShareableAxisBehaviourViewComponent',

    metaInfo: { title: 'Mis Comportamientos PDA' },

    components: {
        BasePDAShareableAxisBehaviourViewComponent,
    },

    data() {
        return {
            loading: false,
        };
    },

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'loadingPdaWallet']),
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
    <BasePDAShareableAxisBehaviourViewComponent v-else />
</template>
