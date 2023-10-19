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
            <v-card :elevation="hover ? 8 : 3" class="rounded-lg bg-buo my-2">
                <v-layout align-center justify-space-between class="px-4 py-3">
                    <v-img
                        max-height="120"
                        max-width="120"
                        src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/CoBrand.png"
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
                            class="BUO-Paragraph-Large-SemiBold white--text pl-2 text-center text-shadow"
                        >
                            MIS TOP SKILLS
                        </h2>
                    </v-col>
                    <v-col cols="7">
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
                        Valida tus habilidades en <strong>getbuo.com</strong>
                    </p>
                </v-layout>
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

.rotate-vert-center:hover {
    -webkit-animation: rotate-vert-center 0.5s
        cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
    animation: rotate-vert-center 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955)
        both;
}

@-webkit-keyframes rotate-vert-center {
    0% {
        -webkit-transform: rotateY(0);
        transform: rotateY(0);
    }
    100% {
        -webkit-transform: rotateY(360deg);
        transform: rotateY(360deg);
    }
}
@keyframes rotate-vert-center {
    0% {
        -webkit-transform: rotateY(0);
        transform: rotateY(0);
    }
    100% {
        -webkit-transform: rotateY(360deg);
        transform: rotateY(360deg);
    }
}
</style>
