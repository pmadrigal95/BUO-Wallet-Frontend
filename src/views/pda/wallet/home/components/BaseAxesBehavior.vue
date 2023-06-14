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
        <section v-else-if="pdaWallet.ejePDADTOSet">
            <v-card-title
                class="buo-word-break grey700--text BUO-Paragraph-Large-SemiBold"
            >
                Ejes de Comportamiento
                <v-layout justify-end>
                    <v-btn
                        class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
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
                    <v-card-subtitle class="text-center">
                        <section class="BUO-Label-XSmall grey600--text pb-2">
                            Eje de Riesgo
                        </section>
                        <section
                            class="BUO-Heading-XSmall grey700--text"
                            v-html="riskAxis.fraseEje"
                        ></section>
                        <section
                            class="BUO-Paragraph-Small grey600--text pb-4"
                            v-html="riskAxis.descripcionEje"
                        ></section>
                    </v-card-subtitle>

                    <v-card-text>
                        <BasePdaSlider :value="riskAxis.valorEjeFormato" />
                        <section
                            class="d-flex flex-no-wrap justify-space-between buo-word-break"
                        >
                            <span class="BUO-Label-Small grey700--text">
                                {{ riskAxis.etiquetaIzquierda }}
                            </span>
                            <span class="BUO-Label-Small grey700--text">
                                {{ riskAxis.etiquetaDerecha }}
                            </span>
                        </section>
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
                        class="BUO-Paragraph-Small-SemiBold"
                    />
                </v-layout>
            </v-card-actions>
        </section>
    </v-card>
</template>
