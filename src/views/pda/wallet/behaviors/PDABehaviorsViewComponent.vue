<script>
/**
 * Descripción: Pantalla PDA Comportamientos
 *
 * @displayName PDABehaviorsViewComponent
 */

import { mapGetters, mapActions } from 'vuex';

const BasePDABehaviorsViewComponent = () =>
    import(
        '@/views/pda/wallet/behaviors/components/BasePDABehaviorsViewComponent'
    );

export default {
    name: 'PDABehaviorsViewComponent',

    metaInfo: { title: 'Mis Comportamientos PDA' },

    components: {
        BasePDABehaviorsViewComponent,
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
    <BasePDABehaviorsViewComponent v-else />
</template>
