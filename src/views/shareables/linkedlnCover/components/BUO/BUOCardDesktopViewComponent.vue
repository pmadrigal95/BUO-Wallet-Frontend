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

        skills: {
            type: Array,
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
                class="d-flex flex-row justify-space-between rounded-lg bg-buo click"
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

                <section class="d-flex flex-column justify-center py-2">
                    <v-row>
                        <section class="d-flex flex-row justify-center py-6">
                            <section class="align-self-center px-4">
                                <h1
                                    class="BUO-Heading-Small white--text text-shadow"
                                >
                                    <strong>MIS TOP</strong>
                                </h1>
                                <h2
                                    class="BUO-Heading-Medium white--text text-shadow"
                                >
                                    SKILLS
                                </h2>
                            </section>
                            <section
                                class="d-flex flex-column justify-center align-start pr-2"
                            >
                                <section
                                    v-for="(skill, index) in skills"
                                    :key="index"
                                    class="d-flex flex-row border-left pl-2"
                                >
                                    <v-img
                                        height="20"
                                        width="20"
                                        contain
                                        src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/vector-item.png"
                                    >
                                    </v-img>
                                    <p
                                        class="px-1 pl-1 BUO-Paragraph-Medium white--text text-shadow"
                                    >
                                        {{ skill.name }}
                                    </p>
                                </section>
                            </section>
                        </section>

                        <section class="d-flex flex-column">
                            <section class="align-self-end mr-3">
                                <v-btn icon color="white" @click="$_fn">
                                    <v-icon>{{ icon }}</v-icon>
                                </v-btn>
                            </section>
                        </section>
                    </v-row>
                    <v-row>
                        <v-layout justify-end class="px-8 pt-2">
                            <p
                                class="align-self-end white--text BUO-Label-XSmall text-shadow"
                            >
                                Valida tus habilidades en
                                <strong>getbuo.com</strong>
                            </p>
                        </v-layout>
                    </v-row>
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
