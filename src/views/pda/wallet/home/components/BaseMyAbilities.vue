<script>
/**
 * Descripción: Pantalla BaseMyAbilities
 *
 * @displayName BaseMyAbilities
 */

import { mapGetters } from 'vuex';

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid.vue');

const BasePDAPayment = () =>
    import('@/views/pda/wallet/home/components/BasePDAPayment');

export default {
    name: 'BaseMyAbilities',

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'loadingPdaWallet', 'premium']),
        ...mapGetters('theme', ['app']),
    },

    components: {
        BaseCustomsButtonsGrid,
        BasePDAPayment,
    },

    methods: {
        $_goToAbilities() {
            if (this.pdaWallet.tipoMembrecia == this.premium) {
                this.$router.push({
                    name: 'MyAbilitiesPDAViewComponent',
                });
            } else {
                this.$_open();
            }
        },

        $_open() {
            this.$refs['popUp'].$_open();
        },
    },
};
</script>

<template>
    <v-card flat max-width="100%" max-height="100%">
        <BasePDAPayment ref="popUp" />
        <BaseSkeletonLoader v-if="loadingPdaWallet" type="image" />
        <section v-else>
            <v-card-title
                class="buo-word-break BUO-Paragraph-Large-SemiBold"
                :class="[app ? 'white--text' : 'grey700--text']"
            >
                Mis indicadores
                <v-layout justify-end>
                    <v-btn
                        class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                        text
                        :color="app ? 'blueProgress600' : 'blue800'"
                        elevation="0"
                        :disabled="pdaWallet.tipoMembrecia != premium"
                        @click="$_goToAbilities"
                    >
                        Ver más
                        <v-icon right>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-layout>
            </v-card-title>
            <v-card-text>
                <v-card
                    flat
                    max-width="100%"
                    max-height="100%"
                    @click="$_goToAbilities"
                >
                    <v-layout align-center justify-space-between>
                        <section>
                            <v-card-title
                                class="buo-word-break BUO-Paragraph-Large"
                                :class="[
                                    app
                                        ? 'blueProgress600--text'
                                        : 'grey600--text',
                                ]"
                                >Conoce tus indicadores
                                principales:</v-card-title
                            >

                            <v-card-text
                                class="buo-word-break BUO-Small-Large"
                                :class="[app ? 'white--text' : 'grey700--text']"
                                >Tus indicadores más fuertes están validadas en
                                tu Buo Wallet.</v-card-text
                            >
                        </section>
                        <section>
                            <v-img
                                class="rounded-lg"
                                contain
                                height="100%"
                                width="auto"
                                src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/pda-graphic.svg
                                "
                                lazy-src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/pda-graphic.svg
                                "
                            />
                        </section>
                    </v-layout>
                </v-card>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-layout justify-center align-content-center>
                    <BaseCustomsButtonsGrid
                        label="Ver todos los indicadores"
                        icon="mdi-chevron-right"
                        :isSmall="false"
                        :fnMethod="$_goToAbilities"
                        class="BUO-Paragraph-Small-SemiBold"
                        :color="app ? 'blueProgress600' : 'blue800'"
                    />
                </v-layout>
            </v-card-actions>
        </section>
    </v-card>
</template>
