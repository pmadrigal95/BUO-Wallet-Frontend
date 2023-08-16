<script>
/**
 * Descripción: WorkExperienceCardViewComponent
 *
 * @displayName WorkExperienceCardViewComponent
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

export default {
    name: 'WorkExperienceCardViewComponent',

    data() {
        return {
            entity: {},
            loading: false,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),
        ...mapGetters('authentication', ['user']),
    },

    created() {
        this.$_sendToApi();
    },

    methods: {
        $_sendToApi() {
            this.loading = true;
            httpService
                .get(`experienciaLaboral/getAllByUsuarioId/${this.user.userId}`)
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        this.entity = BaseArrayHelper.SetObject(
                            {},
                            response.data
                        );
                    }
                });
        },
    },
};
</script>

<template>
    <v-row justify="center" align-content="center">
        <BaseSkeletonLoader v-if="loading" type="card" />
        <v-card
            flat
            height="100%"
            width="100%"
            class="rounded-lg"
            v-else-if="
                entity.mostrarExperiencia &&
                entity.experienciaLaboralList.length > 0
            "
        >
            <v-expansion-panels flat>
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <span
                            class="buo-word-break BUO-Paragraph-Large-SemiBold"
                            :class="[app ? 'white--text' : 'grey700--text']"
                            >Experiencia laboral</span
                        >
                    </v-expansion-panel-header>

                    <v-expansion-panel-content>
                        <v-list three-line>
                            <template
                                v-for="(
                                    item, index, customKey
                                ) in entity.experienciaLaboralList"
                            >
                                <v-list-item :key="index">
                                    <v-list-item-avatar>
                                        <v-icon color="grey-500" large
                                            >mdi-briefcase-outline</v-icon
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
                                            >{{
                                                item.nombreCualificacion
                                            }}</v-list-item-title
                                        >
                                        <v-list-item-subtitle
                                            class="buo-word-break BUO-Label-XSmall-SemiBold mt-n2 mb-1"
                                            :class="[
                                                app
                                                    ? 'white--text'
                                                    : 'grey600--text',
                                            ]"
                                            >{{
                                                item.nombreOrganizacion
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
                                                item.fechaFormato
                                            }}</v-list-item-subtitle
                                        >
                                    </v-list-item-content>
                                </v-list-item>

                                <v-divider
                                    v-if="
                                        entity.experienciaLaboralList.length -
                                            1 >
                                        customKey
                                    "
                                    :key="customKey"
                                ></v-divider>
                            </template>
                        </v-list>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
    </v-row>
</template>
