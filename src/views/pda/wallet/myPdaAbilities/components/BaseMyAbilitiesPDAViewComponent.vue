<script>
/**
 * Descripción: Pantalla PDA Habilidades
 *
 * @displayName BaseMyAbilitiesPDAViewComponent
 */

import { mapGetters } from 'vuex';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const ExploreBUOViewComponent = () =>
    import('@/components/wallet/ExploreBUOViewComponent');

const BasePDAGraph = () =>
    import('@/views/pda/wallet/myPdaAbilities/components/BasePDAGraph');

const BasePDAProgressLinear = () =>
    import(
        '@/views/pda/wallet/myPdaAbilities/components/BasePDAProgressLinear'
    );

const BasePDAProgressCircular = () =>
    import(
        '@/views/pda/wallet/myPdaAbilities/components/BasePDAProgressCircular'
    );

export default {
    name: 'BaseMyAbilitiesPDAViewComponent',

    data() {
        return {
            entity: {
                complete: true,
                step: 0,
            },
        };
    },

    components: {
        BaseCardViewComponent,
        ExploreBUOViewComponent,
        BasePDAGraph,
        BasePDAProgressLinear,
        BasePDAProgressCircular,
    },

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'premium']),

        ...mapGetters('theme', ['app']),
    },

    mounted() {
        if (this.pdaWallet && this.pdaWallet.tipoMembrecia != this.premium) {
            this.$_returnToWallet();
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

        $_shared() {
            this.$router.push({
                name: 'ShareableMyAbilitiesViewComponent',
            });
        },

        $_changeMode() {
            this.entity.complete = !this.entity.complete;
            this.entity.step = 0;
        },
    },
};
</script>

<template>
    <BaseCardViewComponent :btnAction="$_returnToWallet" v-if="pdaWallet">
        <div slot="top-actions">
            <v-layout justify-end align-end>
                <v-btn
                    elevation="0"
                    class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                    text
                    :color="app ? 'blueProgress600' : 'blue800'"
                    @click="$_shared"
                >
                    Compartir
                    <v-icon right dark>
                        mdi-share-variant-outline
                    </v-icon></v-btn
                >
            </v-layout>
        </div>
        <div slot="card-title">
            <v-card text flat color="transparent">
                <v-card-title
                    class="buo-word-break"
                    :class="[
                        $vuetify.breakpoint.smAndDown
                            ? 'BUO-Heading-Small'
                            : 'BUO-Heading-Medium',
                        app ? 'white--text' : 'grey700--text',
                    ]"
                >
                    Mis indicadores Buo Psychometric
                </v-card-title>
                <v-card-subtitle
                    :class="[
                        $vuetify.breakpoint.smAndDown
                            ? 'BUO-Paragraph-Small'
                            : 'BUO-Paragraph-Medium',
                        app ? 'white--text' : 'black--text',
                    ]"
                >
                    <section>
                        Creamos tu radiografía más completa de indicadores con
                        base en tus resultados.
                    </section>
                    <section>
                        <b
                            >Las más altas aparecerán validadas en tu Buo
                            Wallet.</b
                        >
                    </section>
                </v-card-subtitle>
            </v-card>
        </div>
        <div slot="card-text">
            <v-card flat class="rounded-t-xl mb-6">
                <v-card-title
                    class="buo-word-break BUO-Paragraph-Large-SemiBold"
                    :class="[app ? 'white--text' : 'grey700--text']"
                >
                    Gráfico de indicadores
                    <v-layout justify-end>
                        <v-btn elevation="0" icon @click="$_changeMode">
                            <v-icon>{{
                                entity.complete
                                    ? 'mdi-magnify-plus-outline'
                                    : 'mdi-magnify-minus-outline'
                            }}</v-icon>
                        </v-btn>
                    </v-layout>
                </v-card-title>

                <v-card-text>
                    <BasePDAGraph v-if="entity.complete" />
                    <BasePDAProgressCircular
                        :entity="entity"
                        v-if="!entity.complete"
                    />
                </v-card-text>
            </v-card>
            <v-card flat v-if="entity.complete">
                <BasePDAProgressLinear :entity="entity"
            /></v-card>
        </div>

        <div slot="body">
            <ExploreBUOViewComponent v-if="$vuetify.breakpoint.mobile" />
        </div>
    </BaseCardViewComponent>
</template>
