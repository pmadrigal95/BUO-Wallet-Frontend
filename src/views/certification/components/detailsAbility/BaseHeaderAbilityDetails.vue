<script>
/**
 * Descripción: Pantalla de Buscar Habilidad
 *
 * @displayName BaseHeaderAbilityDetails
 */

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper.js';

export default {
    name: 'BaseHeaderAbilityDetails',

    props: {
        header: {
            type: Object,
            requiered: true,
        },
    },

    methods: {
        $_color(number) {
            return baseSharedFnHelper.$_returnColorGraph(number);
        },
    },
};
</script>

<template>
    <v-list-item>
        <v-list-item-avatar size="50">
            <v-progress-circular
                size="50"
                width="3"
                :value="Math.round(header.porcentajeCertificado * 100)"
                :color="$_color(Math.round(header.porcentajeCertificado * 100))"
                rotate="90"
                ><span class="BUO-Label-XSmall grey700--text"
                    >{{ Math.round(header.porcentajeCertificado * 100) }}%</span
                >
            </v-progress-circular>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title
                class="buo-word-break buo-white-space BUO-Heading-Small"
            >
                {{ header.nombreCualificacion }}
            </v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>
