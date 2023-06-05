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
    <v-card :dark="dark" flat color="transparent">
        <v-card-text class="text-center">
            <span
                :class="[
                    $vuetify.breakpoint.smAndDown
                        ? 'BUO-Paragraph-Large'
                        : 'BUO-Paragraph-Medium',
                ]"
            >
                {{ copy }} en
                <b>getbuo.com</b>
                <v-img
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
        </v-card-text>
    </v-card>
</template>
