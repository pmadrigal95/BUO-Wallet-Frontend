<script>
/**
 * Descripción: Actions component
 *
 * @displayName BaseShareActions
 */

import { mapGetters } from 'vuex';

export default {
    name: 'BaseShareActions',

    props: {
        title: {
            type: String,
            requiered: true,
        },

        share: {
            type: Function,
            default: undefined,
        },

        download: {
            type: Function,
            default: undefined,
        },

        nextStep: {
            type: Function,
            default: undefined,
        },

        previousStep: {
            type: Function,
            default: undefined,
        },
    },

    computed: { ...mapGetters('theme', ['app']) },
};
</script>

<template>
    <v-card flat color="transparent">
        <v-card-title
            class="BUO-Paragrah-Large-SemiBold"
            :class="[app ? 'white--text' : 'grey700--text']"
        >
            <v-layout justify-space-between v-if="$vuetify.breakpoint.mdAndUp">
                <span>{{ title }}</span>
                <section>
                    <v-btn
                        elevation="0"
                        class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                        text
                        :color="app ? 'blueProgress600' : 'blue800'"
                        @click="download"
                    >
                        Descargar
                        <v-icon right>mdi-download</v-icon>
                    </v-btn>
                    <v-btn
                        class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                        elevation="0"
                        text
                        :color="app ? 'blueProgress600' : 'blue800'"
                        @click="share"
                    >
                        Compartir
                        <v-icon right>mdi-share-variant-outline</v-icon>
                    </v-btn>
                </section>
            </v-layout>
            <section v-else>
                <v-row justify="center" align-content="center">
                    <v-btn icon :disabled="!previousStep" style="bottom: 9px">
                        <v-icon
                            :color="app ? 'blueProgress600' : 'black'"
                            v-if="previousStep === undefined"
                            >mdi-chevron-left</v-icon
                        >
                        <v-icon
                            :color="app ? 'blueProgress600' : 'black'"
                            v-else
                            @click="previousStep"
                            >mdi-chevron-left</v-icon
                        >
                    </v-btn>
                    <div class="text-center">{{ title }}</div>
                    <v-btn icon :disabled="!nextStep" style="bottom: 9px">
                        <v-icon
                            :color="app ? 'blueProgress600' : 'black'"
                            v-if="nextStep === undefined"
                            >mdi-chevron-right</v-icon
                        >
                        <v-icon
                            :color="app ? 'blueProgress600' : 'black'"
                            v-else
                            @click="nextStep"
                            >mdi-chevron-right</v-icon
                        >
                    </v-btn>
                </v-row>
                <br />
                <v-row justify="center" align-content="center">
                    <v-btn
                        class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                        elevation="0"
                        text
                        :color="app ? 'blueProgress600' : 'black'"
                        @click="download"
                    >
                        Descargar
                        <v-icon right>mdi-download</v-icon>
                    </v-btn>
                    <v-btn
                        class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                        elevation="0"
                        text
                        :color="app ? 'blueProgress600' : 'black'"
                        @click="share"
                    >
                        Compartir
                        <v-icon right>mdi-share-variant-outline</v-icon>
                    </v-btn>
                </v-row>
            </section>
        </v-card-title>
    </v-card>
</template>
