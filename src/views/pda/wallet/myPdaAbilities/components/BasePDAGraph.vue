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
    <BaseSkeletonLoader v-if="loadingPdaWallet && !pdaWallet" type="image" />
    <v-card flat v-else>
        <PDARadarChart
            :data="pdaWallet.habilidadPDADTOSet"
            :profile="
                $vuetify.theme.themes.light[pdaWallet.perfilPDA.toLowerCase()]
            "
            :dark="false"
            class="pb-4"
        />

        <v-card-text>
            <v-alert
                text
                outlined
                :color="pdaWallet.perfilPDA.toLowerCase()"
                type="warning"
                class="rounded-lg"
                dismissible
            >
                <section class="grey700--text BUO-Label-Small-SemiBold">
                    <b>Importante</b>
                </section>
                <span class="grey700--text BUO-Label-Small">
                    El porcentaje en cada indicador no indica la falta o
                    presencia de la misma, sino cuanto esfuerzo toma desempeñar
                    ese indicador.
                </span>
            </v-alert>
        </v-card-text>
    </v-card>
</template>
