<script>
/**
 * Descripción: Pantalla Success Message
 *
 * @displayName BaseNotificationCardTemplate
 */

export default {
    name: 'BaseNotificationCardTemplate',

    props: {
        title: {
            type: String,
            default: 'Titulo',
        },

        subtitle: {
            type: String,
            default: 'Subtitulo',
        },

        comment: {
            type: String,
            default: undefined,
        },

        img: {
            type: String,
            default:
                'https://buo-resources.s3.us-east-2.amazonaws.com/aproveBUO.png',
        },

        elevation: {
            type: String,
            default: '0',
        },
    },

    mounted() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.clouds;
    },

    destroyed() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.white;
    },
};
</script>

<template>
    <v-row justify="center" align-content="center">
        <v-card
            flat
            :elevation="elevation"
            :width="$vuetify.breakpoint.mobile ? '100%' : '70%'"
            :height="$vuetify.breakpoint.mobile ? '100%' : '100%'"
            class="rounded-t-xl pa-8"
        >
            <v-row justify="center" align-content="center">
                <v-col cols="12">
                    <v-img
                        contain
                        height="250"
                        :src="img"
                        :lazy-src="img"
                    ></v-img>
                </v-col>

                <section>
                    <v-card-title
                        class="pa-1"
                        :class="[
                            $vuetify.breakpoint.smAndDown
                                ? 'BUO-Heading-Small text-center buo-word-break'
                                : 'BUO-Heading-Medium text-center buo-word-break',
                        ]"
                    >
                        {{ title }}
                    </v-card-title>
                </section>

                <v-col cols="12">
                    <v-card-subtitle
                        class="pa-0"
                        :class="[
                            $vuetify.breakpoint.smAndDown
                                ? 'BUO-Paragraph-Small text-center'
                                : 'BUO-Paragraph-Medium text-center',
                        ]"
                    >
                        {{ subtitle }}
                    </v-card-subtitle>
                </v-col>

                <v-col cols="12">
                    <v-card-text
                        class="pa-0"
                        v-if="comment"
                        :class="[
                            $vuetify.breakpoint.smAndDown
                                ? 'BUO-Paragraph-Small text-center'
                                : 'BUO-Paragraph-Medium text-center',
                        ]"
                    >
                        {{ comment }}
                    </v-card-text>
                </v-col>

                <v-col cols="10">
                    <slot name="btns"></slot>
                </v-col>
            </v-row>
        </v-card>
    </v-row>
</template>
