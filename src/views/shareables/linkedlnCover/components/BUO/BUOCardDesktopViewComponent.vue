<script>
/**
 * Descripción: Pantalla BUO Cover para Linkedln
 *
 * @displayName BUOCardViewComponent
 */

export default {
    name: 'BUOCardViewComponent',

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
                class="d-flex flex-row justify-space-between rounded-lg bg-buo mt-4"
                @click="$_fn"
                min-height="225"
            >
                <section>
                    <v-img
                        contain
                        src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/circle-cover.png"
                        max-width="350"
                        class="rounded-l-lg"
                    >
                        <section class="py-5 px-5">
                            <v-img
                                max-height="120"
                                max-width="120"
                                src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/CoBrand.png"
                            ></v-img>
                        </section>
                    </v-img>
                </section>

                <section
                    class="d-flex flex-column justify-space-between py-2 px-4"
                >
                    <section class="align-self-end">
                        <v-btn icon color="white">
                            <v-icon>{{ icon }}</v-icon>
                        </v-btn>
                    </section>

                    <section class="px-2 align-self-center">
                        <h2
                            class="BUO-Heading-Large white--text text-shadow text-center"
                        >
                            MIS TOP SKILLS
                        </h2>
                    </section>

                    <section class="pa-2 align-self-end">
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
.border-left {
    border-left: #ffffff solid 2px;
}
</style>
