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
        <v-list-item-avatar size="60">
            <v-progress-circular
                size="60"
                width="5"
                :value="Math.round(header.porcentajeCertificado * 100)"
                :color="$_color(Math.round(header.porcentajeCertificado * 100))"
                >{{ Math.round(header.porcentajeCertificado * 100) }}%
            </v-progress-circular>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title
                class="buo-word-break buo-white-space"
                :class="[
                    $vuetify.breakpoint.smAndDown
                        ? 'BUO-Heading-Small'
                        : 'BUO-Heading-Medium',
                ]"
            >
                {{ header.nombreCualificacion }}
            </v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>
