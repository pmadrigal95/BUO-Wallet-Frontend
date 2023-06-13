<script>
/**
 * Descripción: Contenedor de palabras seleccionadas
 *
 * @displayName BaseWordsListContainer
 */

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper.js';

export default {
    name: 'BaseWordsListContainer',
    props: {
        list: {
            type: Array,
            required: true,
        },

        position: {
            type: String,
            default: 'top',
        },
    },

    data() {
        return {
            show: false,
            icon: 'pda-happyFace',
            color: baseSharedFnHelper.$_returnRandomPDAGradient(),
        };
    },

    computed: {
        reverse() {
            if (this.show) {
                return this.list.slice().reverse();
            } else {
                let items = this.list.slice().reverse();
                return items.slice(0, 6);
            }
        },

        containerSize() {
            let size = 65;

            if (this.reverse.length > 7) {
                size = 80;
            }

            if (this.reverse.length > 14) {
                size = 110;
            }

            if (this.reverse.length > 20) {
                size = 150;
            }

            return size;
        },
    },

    watch: {
        // whenever list changes, this function will run
        list(newlist) {
            this.color = baseSharedFnHelper.$_returnRandomPDAGradient();
            if (newlist.length > 0) {
                this.$_changeFace();
            }
        },
    },

    methods: {
        $_review(array, id) {
            return baseSharedFnHelper.$_getObjectFromArray(array, id);
        },

        $_delete(id) {
            if (this.$_review(this.list, id)) {
                this.list.splice(
                    baseSharedFnHelper.$_returnCurrentIndex(this.list, id),
                    1
                );
            }
        },

        $_changeFace() {
            this.icon = 'pda-hungryFace';
            setTimeout(this.$_cleanFace, 450);
        },

        $_cleanFace() {
            this.icon = 'pda-happyFace';
        },
    },
};
</script>

<template>
    <v-card
        flat
        dark
        max-width="100%"
        max-height="100%"
        color="transparent"
        class="rounded-b-xl text-align-center"
        :class="[position == 'top' ? `top ${color}` : `bottom ${color}`]"
    >
        <v-row>
            <v-col cols="12" :order="position == 'top' ? 1 : 2">
                <v-list-item class="list">
                    <v-list-item-avatar class="cleanBorder">
                        <v-img
                            contain
                            :height="
                                $vuetify.breakpoint.mobile ? '40px' : '30px'
                            "
                            :src="`https://buo-resources.s3.us-east-2.amazonaws.com/wallet/pda-${
                                position == 'top' ? '1' : '2'
                            }.svg`"
                            :lazy-src="`https://buo-resources.s3.us-east-2.amazonaws.com/wallet/pda-${
                                position == 'top' ? '1' : '2'
                            }.svg`"
                        >
                        </v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title
                            class="buo-white-space BUO-Paragraph-Large"
                            >{{
                                position == 'top'
                                    ? 'La gente dice que soy una persona:'
                                    : 'Realmente soy una persona...'
                            }}</v-list-item-title
                        >
                    </v-list-item-content>
                </v-list-item>
            </v-col>
            <v-col
                cols="12"
                :order="position == 'top' ? 2 : 3"
                v-if="reverse.length > 0"
            >
                <v-card-text>
                    <v-layout justify-center>
                        <v-card
                            flat
                            color="transparent"
                            class="overflow-auto"
                            :height="containerSize"
                        >
                            <v-chip-group column>
                                <v-chip
                                    light
                                    v-for="item in reverse"
                                    :key="item.id"
                                    @click="$_delete(item.id)"
                                >
                                    <span>
                                        {{ item.palabra }}
                                    </span>
                                </v-chip>
                            </v-chip-group>
                        </v-card>
                    </v-layout>

                    <br />

                    <v-row justify="center" v-if="list.length > 6">
                        <v-btn
                            class="no-uppercase rounded-lg"
                            elevation="0"
                            text
                            small
                            @click="show = !show"
                        >
                            {{
                                show == false
                                    ? `Ver más (${list.length})`
                                    : 'Ver menos'
                            }}
                            <v-icon right>
                                {{
                                    show == false
                                        ? 'mdi-chevron-down'
                                        : 'mdi-dots-horizontal'
                                }}
                            </v-icon>
                        </v-btn>
                    </v-row>
                </v-card-text>
            </v-col>
            <v-col cols="12" :order="position == 'top' ? 3 : 1">
                <v-card-title>
                    <v-layout justify-center>
                        <v-img
                            contain
                            width="51px"
                            height="35px"
                            :src="`https://buo-resources.s3.us-east-2.amazonaws.com/pda/${icon}.svg`"
                            :lazy-src="`https://buo-resources.s3.us-east-2.amazonaws.com/pda/${icon}.svg`"
                        >
                        </v-img>
                    </v-layout>
                </v-card-title>
            </v-col>
        </v-row>
    </v-card>
</template>

<style scoped>
.top {
    border-radius: 0px 0px 50% 50% !important;
}

.bottom {
    border-radius: 50% 50% 0px 0px !important;
}

.cleanBorder {
    border-radius: 0% !important;
}
</style>
