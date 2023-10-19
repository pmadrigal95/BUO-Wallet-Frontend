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
                class="rounded-lg my-2"
                :class="`pda-gradient-${profile}`"
            >
                <v-layout align-center justify-space-between class="px-4 py-3">
                    <v-img
                        max-height="120"
                        max-width="120"
                        src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/CoBrandPDA.png"
                    ></v-img>

                    <v-btn icon color="white" @click="$_fn">
                        <v-icon>{{ icon }}</v-icon>
                    </v-btn>
                </v-layout>

                <v-row>
                    <v-col
                        cols="5"
                        class="d-flex flex-column justify-center align-center"
                    >
                        <h2
                            class="BUO-Paragraph-Medium white--text pl-6 text-shadow text-center"
                        >
                            Mi perfil conductual es:
                            <strong class="text-upper">{{ profile }}</strong>
                        </h2>
                    </v-col>
                    <v-col cols="7">
                        <section
                            class="d-flex flex-column justify-center border-left pr-2"
                        >
                            <h2
                                class="BUO-Paragraph-Medium-SemiBold white--text pl-4 align-self-center py-2 text-shadow"
                            >
                                MIS TOP SKILLS
                            </h2>
                            <section
                                v-for="(skill, index) in skills"
                                :key="index"
                                class="d-flex flex-row pl-2 align-self-start"
                            >
                                <v-img
                                    height="20"
                                    width="20"
                                    contain
                                    src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/vector-check.png"
                                >
                                </v-img>
                                <p
                                    class="px-1 pl-1 BUO-Paragraph-Small white--text text-shadow"
                                >
                                    {{ skill.name }}
                                </p>
                            </section>
                        </section>
                    </v-col>
                </v-row>

                <v-layout justify-end class="px-4 pt-2">
                    <p
                        class="align-self-end white--text BUO-Label-XSmall text-shadow"
                    >
                        Descubre tu perfil en <strong>getbuo.com</strong>
                    </p>
                </v-layout>
            </v-card>
        </v-hover>
    </section>
</template>

<style scoped>
.text-upper {
    text-transform: uppercase;
}
.border-left {
    border-left: #ffffff solid 2px;
}
</style>
