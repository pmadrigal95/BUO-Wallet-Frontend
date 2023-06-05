<script>
/**
 * Descripción: Radar PDA Compartible
 *
 * @displayName AbilitiesPDAViewComponent
 */

import { mapGetters } from 'vuex';

import basePDATrackingStatus from '@/helpers/basePDATrackingStatus.js';

const BaseShareableAbilitiesPDA = () =>
    import('@/components/pda/shareable/test/BaseShareableAbilitiesPDA');

export default {
    name: 'AbilitiesPDAViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    computed: {
        ...mapGetters('authentication', ['user']),
        ...mapGetters('pda', ['pdaWallet']),
    },

    components: {
        BaseShareableAbilitiesPDA,
    },

    methods: {
        $_nextStep() {
            this.$_sendToPDAAnalytics(this.user.userId);

            this.entity.step = 7;
        },

        $_data() {
            return {
                name: this.user.name.split(' ')[0],
                habilidadPDADTOSet: this.pdaWallet.habilidadPDADTOSet,
                profile:
                    this.$vuetify.theme.themes.light[
                        this.pdaWallet.perfilPDA.toLowerCase()
                    ],
                perfilPDA: this.pdaWallet.perfilPDA.toLowerCase(),
            };
        },

        $_sendToPDAAnalytics(userId) {
            basePDATrackingStatus.$_sendToPDAAnalytics(
                userId,
                basePDATrackingStatus.resultThree
            );
        },
    },
};
</script>

<template>
    <BaseShareableAbilitiesPDA
        ref="BaseShareableAbilitiesPDA"
        :entity="$_data()"
        :nextStep="$_nextStep"
        v-if="pdaWallet"
    />
</template>
