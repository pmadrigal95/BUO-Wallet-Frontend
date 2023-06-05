<script>
/**
 * Descripción: Pantalla PDA Comportamientos
 *
 * @displayName PDABehaviourDetailsViewComponent
 */

import { mapGetters, mapActions } from 'vuex';

const BasePDABehaviourDetailsViewComponent = () =>
    import(
        '@/views/pda/wallet/behaviors/components/BasePDABehaviourDetailsViewComponent'
    );

export default {
    name: 'PDABehaviourDetailsViewComponent',

    metaInfo: { title: 'Mis Comportamientos PDA' },

    components: {
        BasePDABehaviourDetailsViewComponent,
    },

    data() {
        return {
            loading: false,
        };
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
    <BasePDABehaviourDetailsViewComponent v-else />
</template>
