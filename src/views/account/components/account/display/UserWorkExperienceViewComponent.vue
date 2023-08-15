<script>
/**
 * Descripción: Work Exp User
 *
 * @displayName UserAvatarViewComponent
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

const DisplaySectionViewComponent = () =>
    import(
        '@/views/account/components/account/shared/DisplaySectionViewComponent'
    );

const UserAcademicPreparationCardsComponent = () =>
    import(
        '@/views/account/components/account/shared/UserAcademicPreparationCardsComponent'
    );

const UserWorkExperienceEditorViewComponent = () =>
    import(
        '@/views/account/components/account/editor/UserWorkExperienceEditorViewComponent'
    );

export default {
    name: 'UserWorkExperienceViewComponent',

    components: {
        DisplaySectionViewComponent,
        UserAcademicPreparationCardsComponent,
        UserWorkExperienceEditorViewComponent,
    },

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

        $_open() {
            this.$refs['popUp'].$_open({});
        },

        $_edit({ id }) {
            this.$refs['popUp'].$_open({ id });
        },
    },
};
</script>

<template>
    <section class="mt-6">
        <UserWorkExperienceEditorViewComponent ref="popUp" v-model="entity" />
        <v-layout justify-center>
            <BaseSkeletonLoader v-if="loading" type="card" />
            <v-card flat class="rounded" width="100%" height="100%" v-else>
                <v-card-text>
                    <section>
                        <v-layout
                            justify-space-between
                            align-center
                            class="pt-2"
                        >
                            <span
                                class="BUO-Paragraph-Large-SemiBold"
                                :class="[app ? 'white--text' : 'grey700--text']"
                                >Experiencia laboral</span
                            >
                            <v-btn
                                @click="$_open"
                                icon
                                :color="app ? 'clouds' : 'blue900'"
                            >
                                <v-icon>mdi-plus-circle</v-icon>
                            </v-btn>
                        </v-layout>
                        <DisplaySectionViewComponent
                            v-if="entity.mostrarExperiencia != undefined"
                            section="EXPERIENCIA"
                            v-model="entity.mostrarExperiencia"
                        />
                    </section>

                    <UserAcademicPreparationCardsComponent
                        v-if="entity.experienciaLaboralList.length > 0"
                        :list="entity.experienciaLaboralList"
                        :callback="$_edit"
                    />

                    <v-alert
                        v-else
                        border="left"
                        colored-border
                        color="primary"
                        elevation="0"
                        class="ml-2"
                    >
                        <span
                            class="BUO-Paragraph-Small"
                            :class="[app ? 'white--text' : 'grey600--text']"
                            >Agregar tu experiencia es fácil y solo llevará unos
                            minutos.</span
                        >
                    </v-alert>
                </v-card-text>
            </v-card>
        </v-layout>
    </section>
</template>
