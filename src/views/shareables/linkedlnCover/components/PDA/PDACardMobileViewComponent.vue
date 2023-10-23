<script>
/**
 * Descripción: Pantalla PDA Cover versión mobile para Linkedln
 *
 * @displayName PDACardMobileViewComponent
 */
import '@/css/pda.css';

export default {
    name: 'PDACardMobileViewComponent',

    props: {
        fn: {
            type: Function,
            required: true,
        },

        icon: {
            type: String,
            required: true,
        },

        profile: {
            type: String,
            default: 'amigable',
        },
    },

    methods: {
        $_fn() {
            this.fn();
        },
    },
};
</script>

<template>
    <section>
        <span class="BUO-Paragraph-Large grey700--text">Indicadores PDA</span>
        <v-hover v-slot="{ hover }" open-delay="200">
            <v-card
                :elevation="hover ? 8 : 3"
                class="rounded-lg my-2"
                :class="`pda-gradient-${profile.toLowerCase()}`"
                @click="$_fn"
            >
                <v-layout align-center justify-space-between class="px-4 py-3">
                    <v-img
                        max-height="120"
                        max-width="120"
                        src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/CoBrandPDA.png"
                    ></v-img>

                    <v-btn icon color="white">
                        <v-icon>{{ icon }}</v-icon>
                    </v-btn>
                </v-layout>

                <section
                    class="d-flex flex-column justify-center align-center px-1"
                >
                    <section class="px-2">
                        <h2
                            class="BUO-Heading-Small white--text text-shadow text-center"
                        >
                            Mi perfil conductual es:
                            <strong>{{ profile }}</strong>
                        </h2>
                    </section>

                    <section class="pt-6">
                        <p class="white--text BUO-Label-XSmall text-shadow">
                            Descubre tu perfil en <strong>getbuo.com</strong>
                        </p>
                    </section>
                </section>
            </v-card>
        </v-hover>
    </section>
</template>

<style scoped>
.border-left {
    border-left: #ffffff solid 2px;
}
</style>
