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
        >
            <v-progress-circular
                size="42"
                width="3"
                :value="item.porcentajeNaturalHabilidadFormato"
                >{{ item.porcentajeNaturalHabilidadFormato }}%
            </v-progress-circular>
            <div class="buo-word-break">
                {{ item.habilidad }}
            </div>
        </v-col>
    </v-row>
</template>
