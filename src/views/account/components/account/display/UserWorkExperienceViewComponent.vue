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

export default {
    name: 'UserWorkExperienceViewComponent',

    components: {
        DisplaySectionViewComponent,
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
            this.$refs['popUp'].$_open();
        },
    },
};
</script>

<template>
    <section class="mt-6">
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
                            <v-btn icon :color="app ? 'clouds' : 'blue900'">
                                <v-icon>mdi-plus-circle</v-icon>
                            </v-btn>
                        </v-layout>
                        <DisplaySectionViewComponent
                            v-if="entity.mostrarExperiencia != undefined"
                            section="EXPERIENCIA"
                            v-model="entity.mostrarExperiencia"
                        />
                    </section>
                </v-card-text>
            </v-card>
        </v-layout>
    </section>
</template>
