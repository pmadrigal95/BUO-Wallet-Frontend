<script>
/**
 * Descripción: Pasate a premium
 *
 * @displayName BaseAdGetPremium
 */

const BasePDAPayment = () =>
    import('@/views/pda/wallet/home/components/BasePDAPayment');

export default {
    name: 'BaseAdGetPremium',

    components: {
        BasePDAPayment,
    },

    methods: {
        $_open() {
            this.$refs['popUp'].$_open();
        },
    },
};
</script>

<template>
    <div>
        <BasePDAPayment ref="popUp" />
        <v-alert
            text
            outlined
            color="success"
            class="rounded-lg"
            :class="[
                $vuetify.breakpoint.smAndDown
                    ? 'BUO-Paragraph-Small'
                    : 'BUO-Paragraph-Medium',
            ]"
        >
            <div class="Buo-Black">¡Conoce tus resultados completos!</div>
            <div class="Buo-Black">
                Desbloquea tus resultados completos y descubre como maximizar tu
                potencial
            </div>

            <v-row justify="end" no-gutters>
                <v-col class="shrink">
                    <v-btn
                        class="no-uppercase rounded-lg"
                        color="primary"
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
    </div>
</template>
