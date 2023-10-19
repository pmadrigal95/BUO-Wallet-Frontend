<script>
/**
 * Descripción: Pantalla PDA Cover para Linkedln
 *
 * @displayName PDACardViewComponent
 */
import '@/css/pda.css';

export default {
    name: 'PDACardViewComponent',

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
                class="d-flex flex-row justify-space-between rounded-lg click"
                :class="`pda-gradient-${profile}`"
            >
                <section>
                    <section class="circle" :class="`pda-gradient-${profile}`">
                        <section class="py-5 px-5">
                            <v-img
                                max-height="120"
                                max-width="120"
                                src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/CoBrandPDA.png"
                            ></v-img>
                        </section>
                    </section>
                </section>

                <section class="d-flex flex-column justify-center py-2">
                    <v-row>
                        <section class="d-flex justify-center py-6">
                            <section class="align-self-center px-2">
                                <h1
                                    class="BUO-Heading-Small white--text text-shadow"
                                >
                                    <strong>Mi perfil conductual es:</strong>
                                </h1>
                                <h2
                                    class="BUO-Heading-Medium white--text text-shadow"
                                >
                                    <strong class="text-upper">{{
                                        profile
                                    }}</strong>
                                </h2>
                            </section>
                            <section
                                class="d-flex flex-column justify-center align-start pr-2"
                            >
                                <h2
                                    class="BUO-Paragraph-Medium-SemiBold white--text pl-4 align-self-center py-2 text-shadow"
                                >
                                    MIS TOP SKILLS
                                </h2>
                                <section
                                    v-for="(skill, index) in skills"
                                    :key="index"
                                    class="d-flex flex-row border-left pl-2"
                                >
                                    <v-img
                                        height="20"
                                        width="20"
                                        contain
                                        src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/vector-check.png"
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
                                Descubre tu perfil en
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
.circle {
    max-width: 300px;
    position: absolute;
    z-index: 1;
    overflow: auto;
    width: 100%;
    height: 100%;
    clip-path: circle(95% at 0%);
}

.text-upper {
    text-transform: uppercase;
}
</style>
