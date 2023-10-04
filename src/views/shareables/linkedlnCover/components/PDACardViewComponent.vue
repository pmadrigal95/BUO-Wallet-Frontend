<script>
/**
 * Descripción: Pantalla PDA Cover para Linkedln
 *
 * @displayName PDACardViewComponent
 */

export default {
    name: 'PDACardViewComponent',

    props: {
        fn: {
            type: Function,
            required: true,
        },
    },

    methods: {
        $_dowload() {
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
                :class="{ 'on-hover': hover }"
                class="d-flex flex-row justify-space-between align-center rounded-lg buo-background click mx-2s my-4"
                height="200"
                @click="$_dowload"
            >
                <h1>Prueba</h1>
            </v-card>
        </v-hover>
    </section>
</template>

<style scoped>
.buo-background {
    background: linear-gradient(0.25turn, #6dc629, #01aa71);
}

.click:hover {
    animation: 0.7s click 1;
}
@keyframes click {
    25%,
    75% {
        -webkit-transform: scale(0.8);
    }
    50% {
        -webkit-transform: scale(1.05);
    }
}
</style>
