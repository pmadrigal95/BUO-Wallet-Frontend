<script>
/**
 * Descripción: Pantalla PDA Wallet
 *
 * @displayName PDAWalletViewComponent
 */

import '@/css/pda.css';

import { mapGetters, mapActions } from 'vuex';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const ExploreBUOViewComponent = () =>
    import('@/components/wallet/ExploreBUOViewComponent');

const BaseAdGetPremium = () =>
    import('@/views/pda/wallet/home/components/BaseAdGetPremium');

const BasePDAProfile = () =>
    import('@/views/pda/wallet/home/components/BasePDAProfile');

const BaseAxesBehavior = () =>
    import('@/views/pda/wallet/home/components/BaseAxesBehavior');

const BaseMyAbilities = () =>
    import('@/views/pda/wallet/home/components/BaseMyAbilities');

const BaseMaximizeMyPotential = () =>
    import('@/views/pda/wallet/home/components/BaseMaximizeMyPotential');

export default {
    name: 'PDAWalletViewComponent',

    metaInfo: { title: 'PDA Wallet' },

    components: {
        BaseCardViewComponent,
        ExploreBUOViewComponent,
        BaseAdGetPremium,
        BasePDAProfile,
        BaseAxesBehavior,
        BaseMyAbilities,
        BaseMaximizeMyPotential,
    },

    computed: {
        ...mapGetters('pda', [
            'pdaWallet',
            'loadingPdaWallet',
            'freemium',
            'premium',
        ]),
    },

    mounted() {
        this.$_setColor();
        if (!this.pdaWallet) {
            this.$_request_pda_wallet();
        }
    },

    watch: {
        'pdaWallet.tipoMembrecia'() {
            this.$_setColor();
        },
    },

    methods: {
        ...mapActions('pda', ['$_request_pda_wallet']),

        $_setColor() {
            //TODO: How to implement on vue router the background config
            this.$vuetify.theme.themes.light.background =
                this.$vuetify.theme.themes.light.clouds;
        },

        /**
         * Volver al Wallet
         */
        $_returnToWallet() {
            this.$router.push({
                name: 'HomeViewComponent',
            });
        },

        $_returnToShareables() {
            this.$router.push({
                name: 'ShareablesViewComponent',
            });
        },
    },
};
</script>

<template>
    <div>
        <BaseCardViewComponent
            title="Mi PDA"
            :btnAction="$_returnToWallet"
            v-if="pdaWallet"
        >
            <div slot="top-actions">
                <v-btn
                    v-if="pdaWallet && pdaWallet.tipoMembrecia == freemium"
                    class="no-uppercase rounded-lg"
                    text
                    @click="$_returnToShareables"
                >
                    Compartir
                    <v-icon right dark>
                        mdi-share-variant-outline
                    </v-icon></v-btn
                >
            </div>
            <div slot="card-text">
                <BaseAdGetPremium
                    v-if="pdaWallet && pdaWallet.tipoMembrecia == freemium"
                />
                <BasePDAProfile />
                <br />
                <BaseAxesBehavior />
                <br />
                <BaseMyAbilities />
                <br />
                <BaseMaximizeMyPotential />
            </div>

            <div slot="body">
                <ExploreBUOViewComponent v-if="$vuetify.breakpoint.mobile" />
            </div>
        </BaseCardViewComponent>
        <BaseSkeletonLoader v-else type="card, actions" />
    </div>
</template>
