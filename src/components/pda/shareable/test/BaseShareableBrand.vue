<script>
export default {
    name: 'BaseShareableBrand',

    props: {
        dark: {
            type: Boolean,
            default: true,
        },

        copy: {
            type: String,
            default: undefined,
        },
    },
};
</script>

<template>
    <v-layout justify-center class="pb-6 pt-1">
        <span
            class="buo-word-break text-center BUO-Label-Small"
            :class="[dark ? 'white--text' : 'grey700--text']"
        >
            {{ copy }} en
            <span class="BUO-Label-Small-SemiBold">getbuo.com</span>
            <v-img
                class="mt-2"
                contain
                height="30px"
                :src="`https://buo-resources.s3.us-east-2.amazonaws.com/wallet/pda-${
                    dark ? 'brand' : 'brandDark'
                }.svg`"
                :lazy-src="`https://buo-resources.s3.us-east-2.amazonaws.com/wallet/pda-${
                    dark ? 'brand' : 'brandDark'
                }.svg`"
            />
        </span>
    </v-layout>
</template>
