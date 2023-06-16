<script>
/**
 * Descripción: Componente Lista Expandible
 *
 * @displayName BaseMyAbilitiesList
 */

import { mapGetters } from 'vuex';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper.js';

export default {
    name: 'BaseHeaderMyAbility',

    props: {
        /**
         * Lista de Habilidades
         */
        ability: {
            type: Object,
            required: true,
        },
    },

    computed: {
        /**
         * Objecto de Wallet
         */
        ...mapGetters('wallet', [
            'validatedCode',
            'inProgressCode',
            'notValidatedCode',
        ]),

        ...mapGetters('theme', ['app']),
    },

    methods: {
        $_color(number) {
            return baseSharedFnHelper.$_returnColorGraph(number);
        },
    },
};
</script>

<template>
    <v-layout justify-start v-if="ability">
        <v-list-item two-line class="buo-headerAbility-position">
            <v-list-item-avatar size="45">
                <v-progress-circular
                    v-if="ability.estadoId == inProgressCode"
                    size="45"
                    width="2"
                    rotate="90"
                    :value="Math.round(ability.porcentajeCertificado * 100)"
                    :color="
                        $_color(Math.round(ability.porcentajeCertificado * 100))
                    "
                    ><span class="BUO-Label-Small"
                        >{{
                            Math.round(ability.porcentajeCertificado * 100)
                        }}%</span
                    >
                </v-progress-circular>

                <v-icon
                    v-if="ability.estadoId == notValidatedCode"
                    color="primary"
                    size="45"
                    >mdi-plus-circle</v-icon
                >

                <v-img
                    v-if="
                        ability.estadoId == validatedCode &&
                        ability.imagenCertificacion
                    "
                    :src="ability.imagenCertificacion"
                >
                </v-img>
            </v-list-item-avatar>
            <v-list-item-content class="ms-n3">
                <v-list-item-title
                    ><span
                        class="BUO-Paragraph-Medium-SemiBold buo-white-space"
                        :class="[app ? 'white--text' : 'grey700--text']"
                        >{{ ability.nombreCualificacion }}</span
                    >
                </v-list-item-title>
                <v-list-item-subtitle v-if="ability.estadoId != validatedCode"
                    ><section
                        v-if="ability.estadoId === notValidatedCode"
                        class="BUO-Label-XSmall"
                        :class="[
                            app ? 'blueProgress600--text' : 'grey600--text',
                        ]"
                    >
                        Pendiente ({{ ability.totalDisponibles }})
                    </section>
                    <section
                        v-if="ability.estadoId === inProgressCode"
                        class="BUO-Label-XSmall"
                        :class="[
                            app ? 'blueProgress600--text' : 'grey600--text',
                        ]"
                    >
                        Por Aprobar ({{ ability.totalPendientes }}) /
                        Disponibles ({{ ability.totalDisponibles }})
                    </section>
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-layout>
</template>
