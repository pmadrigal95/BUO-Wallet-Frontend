<script>
/**
 * Descripción: Pantalla PDA Habilidades
 *
 * @displayName BasePDAGraph
 */

import { mapGetters, mapActions } from 'vuex';

const PDARadarChart = () => import('@/components/pda/charts/PDARadarChart');

export default {
    name: 'BasePDAGraph',
    components: { PDARadarChart },

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'loadingPdaWallet']),
    },

    methods: {
        ...mapActions('pda', ['$_request_pda_wallet']),
    },
};
</script>

<template>
    <div>
        <BaseSkeletonLoader
            v-if="loadingPdaWallet && !pdaWallet"
            type="image"
        />
        <v-card flat v-else>
            <br />
            <PDARadarChart
                :data="pdaWallet.habilidadPDADTOSet"
                :profile="
                    $vuetify.theme.themes.light[
                        pdaWallet.perfilPDA.toLowerCase()
                    ]
                "
                :dark="false"
            />

            <v-card-text>
                <v-alert
                    text
                    outlined
                    :color="pdaWallet.perfilPDA.toLowerCase()"
                    type="warning"
                    class="rounded-lg"
                    dismissible
                    :class="[
                        $vuetify.breakpoint.smAndDown
                            ? 'BUO-Paragraph-Small'
                            : 'BUO-Paragraph-Medium',
                    ]"
                >
                    <div class="Buo-Black"><b>Importante</b></div>
                    <div class="Buo-Black">
                        El porcentaje en cada indicador no indica la falta o
                        presencia de la misma, sino cuanto esfuerzo toma
                        desempeñar ese indicador.
                    </div>
                </v-alert>
            </v-card-text>
        </v-card>
    </div>
</template>
