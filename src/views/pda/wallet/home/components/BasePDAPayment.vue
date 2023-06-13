<script>
/**
 * Descripción: Pantalla Pago PDA
 *
 * @displayName BasePDAPayment
 */

import { mapGetters } from 'vuex';

const PaymentViewComponent = () =>
    import('@/components/pda/payments/PaymentViewComponent');

export default {
    name: 'BasePDAPayment',

    components: {
        PaymentViewComponent,
    },

    data() {
        return {
            componentKey: 0,
        };
    },

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'freemium']),
    },

    methods: {
        $_open() {
            this.componentKey++;
            this.$refs['popUp'].$_openModal();
        },
    },
};
</script>

<template>
    <BasePopUp
        ref="popUp"
        :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '792'"
        :isDrawer="false"
        scrollable
        persistent
    >
        <div slot="Content">
            <v-layout justify-end>
                <v-btn
                    class="no-uppercase rounded-lg"
                    text
                    color="blue800"
                    elevation="0"
                    @click="$_open()"
                >
                    Cerrar
                </v-btn>
            </v-layout>

            <v-divider></v-divider>
            <PaymentViewComponent
                :key="componentKey"
                ref="PaymentViewComponent"
                md="12"
                offset="0"
                :fnClose="$_open"
            />
        </div>
    </BasePopUp>
</template>
