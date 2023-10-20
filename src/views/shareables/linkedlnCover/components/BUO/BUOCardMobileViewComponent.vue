<script>
/**
 * Descripción: Pantalla BUO Cover versión mobile para Linkedln
 *
 * @displayName BUOCardMobileViewComponent
 */

export default {
    name: 'BUOCardMobileViewComponent',

    props: {
        fn: {
            type: Function,
            required: true,
        },

        icon: {
            type: String,
            required: true,
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
        <span class="BUO-Paragraph-Large grey700--text">Indicadores Buo</span>
        <v-hover v-slot="{ hover }" open-delay="200">
            <v-card
                :elevation="hover ? 8 : 3"
                class="rounded-lg bg-buo my-2"
                min-height="200"
                @click="$_fn"
            >
                <v-layout align-center justify-space-between class="px-4 py-3">
                    <v-img
                        max-height="120"
                        max-width="120"
                        src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/CoBrand.png"
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
                            class="BUO-Heading-Medium white--text text-shadow text-center"
                        >
                            MIS TOP SKILLS
                        </h2>
                    </section>

                    <section class="pt-6">
                        <p class="white--text BUO-Label-XSmall text-shadow">
                            Valida tus habilidades en
                            <strong>getbuo.com</strong>
                        </p>
                    </section>
                </section>
            </v-card>
        </v-hover>
    </section>
</template>

<style scoped>
.bg-buo {
    background: linear-gradient(0.25turn, #6dc629, #01aa71);
}
</style>
