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
        <div v-else>
            <v-card-title
                class="buo-word-break Buo-Black"
                :class="[
                    $vuetify.breakpoint.smAndDown
                        ? 'BUO-Paragraph-Large'
                        : 'BUO-Heading-XSmall',
                ]"
            >
                Mis indicadores
                <v-layout justify-end>
                    <v-btn
                        class="no-uppercase rounded-lg"
                        text
                        color="blue800"
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
                        <div>
                            <v-card-title
                                class="buo-word-break Buo-Black"
                                :class="[
                                    $vuetify.breakpoint.smAndDown
                                        ? 'BUO-Paragraph-Medium Buo-Black'
                                        : 'BUO-Paragraph-Large Buo-Black',
                                ]"
                                >Conoce tus indicadores
                                principales:</v-card-title
                            >

                            <v-card-text
                                class="buo-word-break Buo-Black"
                                :class="[
                                    $vuetify.breakpoint.smAndDown
                                        ? 'BUO-Label-Small'
                                        : 'BUO-Paragraph-Small',
                                ]"
                                >Tus indicadores más fuertes están validadas en
                                tu Buo Wallet.</v-card-text
                            >
                        </div>

                        <div>
                            <br />
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
                        </div>
                    </v-layout>
                </v-card>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-layout justify-center align-content-center>
                    <BaseCustomsButtonsGrid
                        label="Ver todas los indicadores"
                        icon="mdi-chevron-right"
                        :isSmall="false"
                        :fnMethod="$_goToAbilities"
                    />
                </v-layout>
            </v-card-actions>
        </div>
    </v-card>
</template>
