<script>
/**
 * Descripción: Pantalla Pago PDA
 *
 * @displayName PaymentViewComponent
 */

import { mapGetters, mapActions } from 'vuex';

const BaseNotificationCardTemplate = () =>
    import('@/components/core/cards/BaseNotificationCardTemplate');

export default {
    name: 'PaymentSuccessViewComponent',

    props: {
        fnClose: {
            type: Function,
            required: true,
        },
    },

    components: {
        BaseNotificationCardTemplate,
    },

    computed: {
        ...mapGetters('pda', ['loadingPdaWallet']),
    },

    methods: {
        ...mapActions('pda', ['$_request_pda_wallet', '$_pda_wallet_clean']),

        $_fnClose() {
            this.$_pda_wallet_clean();
            this.$_request_pda_wallet();
            this.fnClose();
        },
    },
};
</script>

<template>
    <BaseSkeletonLoader v-if="loadingPdaWallet" type="card, article" />
    <BaseNotificationCardTemplate
        v-else
        title="¡Listo!"
        subtitle="Ahora tienes acceso completo a tu perfil PDA. Accede a tus resultados."
        img="https://buo-resources.s3.us-east-2.amazonaws.com/invite.png"
        elevation="0"
    >
        <div slot="btns">
            <v-row>
                <v-col cols="12">
                    <v-btn
                        class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                        elevation="0"
                        color="primary"
                        dark
                        block
                        @click="$_fnClose"
                        >Ver mis resultados</v-btn
                    >
                </v-col>
            </v-row>
        </div>
    </BaseNotificationCardTemplate>
</template>
