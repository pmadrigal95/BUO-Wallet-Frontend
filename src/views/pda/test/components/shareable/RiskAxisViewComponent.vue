<script>
/**
 * Descripción: Eje del REPNA Compartible Test Taking
 *
 * @displayName RiskAxisViewComponent
 */

import { mapGetters } from 'vuex';

import basePDATrackingStatus from '@/helpers/basePDATrackingStatus.js';

const BaseShareableTestAxis = () =>
    import('@/components/pda/shareable/test/BaseShareableTestAxis');

export default {
    name: 'RiskAxisViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    data() {
        return {
            key: 0,
        };
    },

    components: {
        BaseShareableTestAxis,
    },

    computed: {
        ...mapGetters('authentication', ['user']),
        ...mapGetters('pda', ['pdaWallet']),
    },

    methods: {
        $_nextStep() {
            this.$_sendToPDAAnalytics(this.user.userId);

            this.entity.step = 6;
        },

        $_data() {
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

        $_sendToPDAAnalytics(userId) {
            basePDATrackingStatus.$_sendToPDAAnalytics(
                userId,
                basePDATrackingStatus.resultTwo
            );
        },
    },
};
</script>

<template>
    <BaseShareableTestAxis
        ref="BaseShareableTestAxis"
        :entity="$_data()"
        :nextStep="$_nextStep"
        v-if="pdaWallet"
    />
</template>
