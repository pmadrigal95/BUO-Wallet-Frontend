<script>
/**
 * Descripción: Pantalla PDA Wallet
 *
 * @displayName PDAWalletViewComponent
 */

import '@/css/pda.css';

import { mapGetters, mapActions } from 'vuex';

const BaseShareableTestProfile = () =>
    import('@/components/pda/shareable/test/BaseShareableTestProfile');

const BaseShareableTestAxis = () =>
    import('@/components/pda/shareable/test/BaseShareableTestAxis');

const BaseShareableAbilitiesPDA = () =>
    import('@/components/pda/shareable/test/BaseShareableAbilitiesPDA');

export default {
    name: 'ShareablesViewComponent',

    metaInfo: { title: 'PDA Wallet' },

    components: {
        BaseShareableTestProfile,
        BaseShareableTestAxis,
        BaseShareableAbilitiesPDA,
    },

    data: () => ({
        length: 3,
        onboarding: 0,
    }),

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'loadingPdaWallet']),
        ...mapGetters('authentication', ['user']),
    },

    mounted() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.white;

        if (!this.pdaWallet) {
            this.$_request_pda_wallet();
        }
    },

    methods: {
        /**
         * Volver al Wallet
         */
        $_returnToWallet() {
            this.$router.push({
                name: 'PDAWalletViewComponent',
            });
        },

        ...mapActions('pda', ['$_request_pda_wallet']),

        next() {
            this.onboarding =
                this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
        },
        prev() {
            this.onboarding =
                this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
        },

        $_profile() {
            return {
                name: this.user.name.split(' ')[0],
                perfilPDAVisual: this.pdaWallet.perfilPDAVisual,
                perfilPDA: this.pdaWallet.perfilPDA,
                superpoder: this.pdaWallet.superpoder,
                hotcakeURL: this.pdaWallet.hotcakeURL,
                benchmarkFormato: this.pdaWallet.benchmarkFormato,
            };
        },

        $_riskAxis() {
            const riskAxis = this.pdaWallet.ejePDADTOSet.find(
                (element) => element.nombre === 'Riesgo'
            );
            return {
                name: this.user.name.split(' ')[0],
                perfilPDA: this.pdaWallet.perfilPDA,
                left: riskAxis.etiquetaIzquierda,
                right: riskAxis.etiquetaDerecha,
                valorEjeFormato: riskAxis.valorEjeFormato,
                frase: riskAxis.fraseEje,
                benchmarkEjeFormato: riskAxis.benchmarkEjeFormato,
                type: riskAxis.nombre,
                nombreUI: riskAxis.nombreUI,
            };
        },

        $_pdaAbilities() {
            return {
                name: this.user.name.split(' ')[0],
                habilidadPDADTOSet: this.pdaWallet.habilidadPDADTOSet,
                profile:
                    this.$vuetify.theme.themes.light[
                        this.pdaWallet.perfilPDA.toLowerCase()
                    ],
                perfilPDA: this.pdaWallet.perfilPDA.toLowerCase(),
            };
        },
    },
};
</script>

<template>
    <div v-if="pdaWallet">
        <v-card flat tile color="transparent">
            <v-layout justify-start align-center>
                <v-btn
                    color="blue800"
                    class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                    text
                    @click="$_returnToWallet"
                >
                    <v-icon left dark> mdi-chevron-left </v-icon>Regresar</v-btn
                >
            </v-layout>
        </v-card>
        <v-window v-model="onboarding">
            <v-window-item>
                <BaseShareableTestProfile
                    ref="BaseShareableTestProfile"
                    md="12"
                    offset="0"
                    :entity="$_profile()"
                    :nextStep="next"
                    :previousStep="prev"
                />
            </v-window-item>

            <v-window-item>
                <BaseShareableTestAxis
                    ref="BaseShareableTestAxis"
                    md="12"
                    offset="0"
                    :entity="$_riskAxis()"
                    :nextStep="next"
                    :previousStep="prev"
                />
            </v-window-item>

            <v-window-item v-if="onboarding == 2">
                <BaseShareableAbilitiesPDA
                    ref="BaseShareableAbilitiesPDA"
                    md="12"
                    offset="0"
                    :entity="$_pdaAbilities()"
                    :nextStep="next"
                    :previousStep="prev"
                />
            </v-window-item>
        </v-window>
    </div>
    <BaseSkeletonLoader v-else type="card, actions" />
</template>
