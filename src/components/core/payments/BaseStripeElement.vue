<script>
import { StripeElementCard } from '@vue-stripe/vue-stripe';
export default {
    name: 'BaseStripeElement',

    props: {
        tokenCreated: {
            type: Function,
            required: true,
        },
    },

    components: {
        StripeElementCard,
    },

    computed: {
        publishableKey() {
            return process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY;
        },
    },

    methods: {
        submit() {
            // this will trigger the process
            this.$refs.elementRef.submit();
        },
    },
};
</script>

<template>
    <stripe-element-card
        ref="elementRef"
        :pk="publishableKey"
        :hidePostalCode="true"
        @token="tokenCreated"
    />
</template>
