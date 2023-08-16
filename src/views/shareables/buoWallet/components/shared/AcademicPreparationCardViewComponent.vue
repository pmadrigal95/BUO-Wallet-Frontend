<script>
/**
 * Descripción: AcademicPreparationCardViewComponent
 *
 * @displayName AcademicPreparationCardViewComponent
 */

import { mapGetters } from 'vuex';

export default {
    name: 'AcademicPreparationCardViewComponent',

    props: {
        entity: {
            type: Object,
            default: undefined,
        },
    },

    computed: {
        ...mapGetters('theme', ['app']),
        ...mapGetters('authentication', ['user']),
    },
};
</script>

<template>
    <v-card
        flat
        height="100%"
        width="100%"
        class="rounded-lg"
        v-if="entity.show && entity.list.length > 0"
    >
        <v-expansion-panels flat>
            <v-expansion-panel>
                <v-expansion-panel-header>
                    <span
                        class="buo-word-break BUO-Paragraph-Large-SemiBold"
                        :class="[app ? 'white--text' : 'grey700--text']"
                        >{{ entity.title }}</span
                    >
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                    <v-list three-line>
                        <template
                            v-for="(item, index, customKey) in entity.list"
                        >
                            <v-list-item :key="index">
                                <v-list-item-avatar>
                                    <v-icon color="grey-500" large
                                        >mdi-{{ entity.icon }}</v-icon
                                    >
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title
                                        class="buo-word-break BUO-Paragraph-Medium-SemiBold"
                                        :class="[
                                            app
                                                ? 'white--text'
                                                : 'grey700--text',
                                        ]"
                                        >{{ item.nombre }}</v-list-item-title
                                    >
                                    <v-list-item-subtitle
                                        class="buo-word-break BUO-Label-XSmall-SemiBold mt-n2 mb-1"
                                        :class="[
                                            app
                                                ? 'white--text'
                                                : 'grey600--text',
                                        ]"
                                        >{{
                                            item.nombreTituloAcademico
                                        }}</v-list-item-subtitle
                                    >
                                    <v-list-item-subtitle
                                        class="buo-word-break BUO-Label-XSmall"
                                        :class="[
                                            app
                                                ? 'white--text'
                                                : 'grey600--text',
                                        ]"
                                        >{{
                                            item.nombreLugarCompleto
                                        }}</v-list-item-subtitle
                                    >
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider
                                v-if="entity.list.length - 1 > customKey"
                                :key="customKey"
                            ></v-divider>
                        </template>
                    </v-list>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
</template>
