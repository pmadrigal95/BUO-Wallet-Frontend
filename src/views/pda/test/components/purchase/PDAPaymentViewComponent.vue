<script>
/**
 * Descripción: Pantalla Pago PDA
 *
 * @displayName PaymentViewComponent
 */

const PaymentViewComponent = () =>
    import('@/components/pda/payments/PaymentViewComponent');

export default {
    name: 'PDAPaymentViewComponent',

    components: {
        PaymentViewComponent,
    },

    methods: {
        $_buoWallet() {
            this.$router.push({
                name: 'PDAWalletViewComponent',
            });
        },
    },
};
</script>

<template>
    <PaymentViewComponent :fnClose="$_buoWallet" />
</template>
