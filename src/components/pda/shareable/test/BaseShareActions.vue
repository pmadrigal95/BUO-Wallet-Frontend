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
    },

    data() {
        return {
            key: 0,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        options() {
            return [
                {
                    icon: 'share-variant-outline',
                    name: 'Compartir',
                    fn: this.$_share,
                },
                {
                    icon: 'download',
                    name: 'Descargar',
                    fn: this.$_download,
                },
            ];
        },
    },

    methods: {
        $_download() {
            if (this.download) {
                this.key++;
                this.download();
            }
        },

        $_share() {
            if (this.share) {
                this.share();
            }
        },
    },
};
</script>

<template>
    <v-card flat color="transparent" width="100%" height="100%">
        <v-row justify="center">
            <v-menu dark>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        dark
                        depressed
                        v-bind="attrs"
                        v-on="on"
                        elevation="0"
                        class="ma-2 no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                        color="black"
                    >
                        Compartir
                        <v-icon right>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list v-for="(item, i) in options" :key="i">
                    <v-list-item @click="item.fn" v-if="item.fn">
                        <v-list-item-title
                            ><span
                                class="buo-word-break buo-white-space BUO-Label-Small-SemiBold"
                                >{{ item.name }}</span
                            ></v-list-item-title
                        >
                        <v-list-item-avatar>
                            <v-icon small>{{ 'mdi-' + item.icon }}</v-icon>
                        </v-list-item-avatar>
                    </v-list-item>
                    <v-divider></v-divider>
                </v-list>
            </v-menu>

            <v-btn
                v-if="nextStep"
                outlined
                class="ma-2 no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                @click="nextStep"
                elevation="0"
            >
                Continuar
                <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
        </v-row>
        <br />
        <v-layout v-if="key > 0" justify-center>
            <v-alert
                dismissible
                color="greenB800"
                border="left"
                elevation="2"
                colored-border
                icon="mdi-image-auto-adjust"
                class="BUO-Label-XSmall"
            >
                Recuerda que puedes encontrar la imagen de tu resultado en la
                carpeta de descargas de tu dispositivo.
            </v-alert>
        </v-layout>
    </v-card>
</template>
