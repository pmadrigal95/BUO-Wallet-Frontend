<script>
/**
 * Descripción: Pantalla Pago PDA
 *
 * @displayName PaymentViewComponent
 */

const PaymentDetailsViewComponent = () =>
    import('@/components/pda/payments/components/PaymentDetailsViewComponent');

const PaymentMethodsViewComponent = () =>
    import('@/components/pda/payments/components/PaymentMethodsViewComponent');

const PaymentSuccessViewComponent = () =>
    import('@/components/pda/payments/components/PaymentSuccessViewComponent');

export default {
    name: 'PaymentViewComponent',

    data() {
        return {
            key: 0,
        };
    },

    props: {
        md: {
            type: String,
            default: '9',
        },

        offset: {
            type: String,
            default: '1',
        },

        fnClose: {
            type: Function,
            required: true,
        },
    },

    components: {
        PaymentDetailsViewComponent,
        PaymentMethodsViewComponent,
        PaymentSuccessViewComponent,
    },

    methods: {
        $_next() {
            this.key++;
        },
    },
};
</script>

<template>
    <v-window touchless v-model="key">
        <v-window-item :value="0">
            <PaymentDetailsViewComponent
                :md="md"
                :offset="offset"
                :next="$_next"
            />
        </v-window-item>
        <v-window-item :value="1">
            <PaymentMethodsViewComponent
                :md="md"
                :offset="offset"
                :next="$_next"
            />
        </v-window-item>

        <v-window-item :value="2">
            <PaymentSuccessViewComponent :fnClose="fnClose" />
        </v-window-item>
    </v-window>
</template>
