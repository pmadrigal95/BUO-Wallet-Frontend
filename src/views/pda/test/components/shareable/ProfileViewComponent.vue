<script>
/**
 * Descripción: Perfil Compartible
 *
 * @displayName ProfileViewComponent
 */

import { mapGetters } from 'vuex';

import basePDATrackingStatus from '@/helpers/basePDATrackingStatus.js';

const BaseShareableTestProfile = () =>
    import('@/components/pda/shareable/test/BaseShareableTestProfile');

export default {
    name: 'ProfileViewComponent',

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

    computed: {
        ...mapGetters('authentication', ['user']),
        ...mapGetters('pda', ['pdaWallet']),
    },

    components: {
        BaseShareableTestProfile,
    },

    methods: {
        $_nextStep() {
            this.$_sendToPDAAnalytics(this.user.userId);

            this.entity.step = 5;
        },

        $_data() {
            return {
                name: this.user.name.split(' ')[0],
                perfilPDAVisual: this.pdaWallet.perfilPDAVisual,
                perfilPDA: this.pdaWallet.perfilPDA,
                superpoder: this.pdaWallet.superpoder,
                hotcakeURL: this.pdaWallet.hotcakeURL,
                benchmarkFormato: this.pdaWallet.benchmarkFormato,
            };
        },

        $_sendToPDAAnalytics(userId) {
            basePDATrackingStatus.$_sendToPDAAnalytics(
                userId,
                basePDATrackingStatus.resultOne
            );
        },
    },
};
</script>

<template>
    <BaseShareableTestProfile
        ref="BaseShareableTestProfile"
        :entity="$_data()"
        :nextStep="$_nextStep"
        v-if="pdaWallet"
    />
</template>
