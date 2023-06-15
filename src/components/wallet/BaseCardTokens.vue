<script>
/**
 * Descripción: Card con los tokens Disponibles
 *
 * @displayName BaseCardTokens
 */

import { mapGetters } from 'vuex';

export default {
    name: 'BaseCardTokens',

    computed: {
        /**
         * tokens
         */
        ...mapGetters('authentication', ['user']),
    },
};
</script>

<template>
    <v-card
        flat
        max-width="100%"
        max-height="100%"
        class="rounded-lg"
        color="transparent"
        elevation="3"
    >
        <section class="d-flex flex-no-wrap justify-space-between">
            <section>
                <v-card-title class="BUO-Display-Small">{{
                    user.tokens
                }}</v-card-title>

                <v-card-subtitle class="BUO-Paragraph-Medium"
                    >Balance de Tokens</v-card-subtitle
                >
            </section>

            <v-avatar
                class="ma-3"
                size="134"
                tile
                style="top: 23px; left: 11px"
            >
                <img
                    src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/tokenCard.svg"
                />
            </v-avatar>
        </section>
    </v-card>
</template>
