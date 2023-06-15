<script>
/**
 * Descripción: Progress Circular PDA reutilizable
 *
 * @displayName PDAProgressCircular
 */
export default {
    name: 'PDAProgressCircular',

    props: {
        data: {
            type: Array,
            required: true,
        },
    },
};
</script>

<template>
    <v-row justify="center" v-if="data">
        <v-col
            :cols="$vuetify.breakpoint.smAndDown ? 6 : 4"
            v-for="item in data"
            :key="item.cualificacionHabilidadId"
            class="white--text"
        >
            <v-progress-circular
                size="44"
                width="2"
                :value="item.porcentajeNaturalHabilidadFormato"
                >{{ item.porcentajeNaturalHabilidadFormato }}%
            </v-progress-circular>
            <section class="buo-word-break BUO-Paragraph-Large white--text">
                {{ item.habilidad }}
            </section>
        </v-col>
    </v-row>
</template>
