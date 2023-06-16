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

    data() {
        return {
            key: 0,
        };
    },

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'loadingPdaWallet']),

        ...mapGetters('theme', ['app']),
    },

    watch: {
        app: {
            handler() {
                this.key++;
            },
        },
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
            :dark="app ? true : false"
            class="pb-4"
            :key="key"
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
                <section
                    class="BUO-Label-Small-SemiBold"
                    :class="[app ? 'white--text' : 'grey700--text']"
                >
                    <b>Importante</b>
                </section>
                <span
                    class="BUO-Label-Small"
                    :class="[app ? 'white--text' : 'grey700--text']"
                >
                    El porcentaje en cada indicador no indica la falta o
                    presencia de la misma, sino cuanto esfuerzo toma desempeñar
                    ese indicador.
                </span>
            </v-alert>
        </v-card-text>
    </v-card>
</template>
