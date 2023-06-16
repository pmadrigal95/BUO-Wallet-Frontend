<script>
/**
 * Descripción: Pasate a premium
 *
 * @displayName BaseAdGetPremium
 */

import { mapGetters } from 'vuex';

const BasePDAPayment = () =>
    import('@/views/pda/wallet/home/components/BasePDAPayment');

export default {
    name: 'BaseAdGetPremium',

    components: {
        BasePDAPayment,
    },

    computed: { ...mapGetters('theme', ['app']) },

    methods: {
        $_open() {
            this.$refs['popUp'].$_open();
        },
    },
};
</script>

<template>
    <section>
        <BasePDAPayment ref="popUp" />
        <v-alert text outlined color="greenA600" class="rounded-lg">
            <div
                class="BUO-Label-Small-SemiBold"
                :class="[app ? 'white--text' : 'black--text']"
            >
                ¡Conoce tus resultados completos!
            </div>
            <div
                class="BUO-Label-Small"
                :class="[app ? 'white--text' : 'black--text']"
            >
                Desbloquea tus resultados completos y descubre como maximizar tu
                potencial
            </div>

            <v-row justify="end" no-gutters>
                <v-col class="shrink">
                    <v-btn
                        class="no-uppercase rounded-lg"
                        :color="app ? 'blueProgress600' : 'blue800'"
                        elevation="0"
                        text
                        @click="$_open"
                    >
                        Resultados completos
                        <v-icon right>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-alert>
    </section>
</template>
