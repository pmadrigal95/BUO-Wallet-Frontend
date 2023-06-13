<script>
/**
 * Descripción: Pantalla BaseAxesBehavior
 *
 * @displayName BaseAxesBehavior
 */

import { mapGetters } from 'vuex';

const BasePdaSlider = () => import('@/components/pda/slider/BasePdaSlider');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid.vue');

const BasePDAPayment = () =>
    import('@/views/pda/wallet/home/components/BasePDAPayment');

export default {
    name: 'BaseAxesBehavior',

    components: {
        BasePdaSlider,
        BaseCustomsButtonsGrid,
        BasePDAPayment,
    },

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'loadingPdaWallet', 'premium']),

        riskAxis() {
            return this.pdaWallet.ejePDADTOSet.find(
                (element) => element.nombre === 'Riesgo'
            );
        },
    },

    methods: {
        $_goToBehaviors() {
            if (this.pdaWallet.tipoMembrecia == this.premium) {
                this.$router.push({
                    name: 'PDABehaviorsViewComponent',
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
        <div v-else-if="pdaWallet.ejePDADTOSet">
            <v-card-title
                class="buo-word-break Buo-Black"
                :class="[
                    $vuetify.breakpoint.smAndDown
                        ? 'BUO-Paragraph-Large'
                        : 'BUO-Heading-XSmall',
                ]"
            >
                Ejes de Comportamiento
                <v-layout justify-end>
                    <v-btn
                        class="no-uppercase rounded-lg"
                        text
                        color="blue800"
                        elevation="0"
                        @click="$_goToBehaviors"
                    >
                        Ver más
                        <v-icon right>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-layout>
            </v-card-title>
            <v-card-text>
                <v-card flat @click="$_goToBehaviors">
                    <v-card-subtitle
                        class="text-center Buo-Black"
                        :class="[
                            $vuetify.breakpoint.smAndDown
                                ? 'BUO-Paragraph-Small'
                                : 'BUO-Paragraph-Medium',
                        ]"
                    >
                        <div>Eje de Riesgo</div>

                        <br />
                        <div
                            class="BUO-Heading-XSmall"
                            v-html="riskAxis.fraseEje"
                        ></div>
                        <br />
                        <div v-html="riskAxis.descripcionEje"></div>
                    </v-card-subtitle>

                    <v-card-text>
                        <BasePdaSlider :value="riskAxis.valorEjeFormato" />
                        <div
                            class="d-flex flex-no-wrap justify-space-between buo-word-break Buo-Black"
                            :class="[
                                $vuetify.breakpoint.smAndDown
                                    ? 'BUO-Paragraph-Small'
                                    : 'BUO-Paragraph-Medium',
                            ]"
                        >
                            <span> {{ riskAxis.etiquetaIzquierda }} </span>
                            <span> {{ riskAxis.etiquetaDerecha }} </span>
                        </div>
                    </v-card-text>
                </v-card>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-layout justify-center align-content-center>
                    <BaseCustomsButtonsGrid
                        label="Ver todos los ejes"
                        icon="mdi-chevron-right"
                        :isSmall="false"
                        :fnMethod="$_goToBehaviors"
                    />
                </v-layout>
            </v-card-actions>
        </div>
    </v-card>
</template>
