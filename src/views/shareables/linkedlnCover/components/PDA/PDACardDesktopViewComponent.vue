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
                class="d-flex flex-row justify-space-between rounded-lg click mt-4"
                :class="`pda-gradient-${profile.toLowerCase()}`"
                min-height="225"
                @click="$_fn"
            >
                <section>
                    <section
                        class="circle"
                        :class="`pda-gradient-${profile.toLowerCase()}`"
                    >
                        <section class="py-5 px-5">
                            <v-img
                                max-height="120"
                                max-width="120"
                                src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/CoBrandPDA.png"
                            ></v-img>
                        </section>
                    </section>
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
                        <h1 class="BUO-Heading-Medium white--text text-shadow">
                            <strong>Mi perfil conductual es:</strong>
                        </h1>
                        <h2
                            class="BUO-Heading-Large white--text text-shadow text-center"
                        >
                            <strong>{{ profile }}</strong>
                        </h2>
                    </section>

                    <section class="pa-2 align-self-end">
                        <p class="white--text BUO-Label-XSmall text-shadow">
                            Descubre tu perfil en
                            <strong>getbuo.com</strong>
                        </p>
                    </section>
                </section>
            </v-card>
        </v-hover>
    </section>
</template>

<style scoped>
.circle {
    max-width: 420px;
    position: absolute;
    z-index: 1;
    overflow: auto;
    width: 100%;
    height: 100%;
    clip-path: circle(95% at 0%);
    border-top-left-radius: 10px;
    border-end-start-radius: 10px;
}
</style>
