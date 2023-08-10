<script>
/**
 * Descripción: Academic Preparation User
 *
 * @displayName UserAcademicPreparationViewComponent
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

const UserAcademicPreparationDisplayComponent = () =>
    import(
        '@/views/account/components/account/shared/UserAcademicPreparationDisplayComponent'
    );

export default {
    name: 'UserAcademicPreparationViewComponent',

    components: {
        UserAcademicPreparationDisplayComponent,
    },

    data() {
        return {
            entity: [],
            loading: false,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user']),

        education() {
            const educationList = this.entity.filter(
                (item) => item.tituloAcademicoId != 2
            );

            return {
                list: educationList,
                enum: 'EDUCACION',
                title: 'Educación',
            };
        },

        certification() {
            const educationList = this.entity.filter(
                (item) => item.tituloAcademicoId == 2
            );

            return {
                list: educationList,
                enum: 'EDUCACION',
                title: 'Certificaciones',
            };
        },
    },

    created() {
        this.$_sendToApi();
    },

    methods: {
        $_sendToApi() {
            this.loading = true;
            httpService
                .get(
                    `preparacionAcademica/getAllByUsuarioId/${this.user.userId}`
                )
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        this.entity = BaseArrayHelper.SetObject(
                            [],
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
    <BaseSkeletonLoader v-if="loading" type="card" />
    <section v-else>
        <UserAcademicPreparationDisplayComponent
            v-if="education.list.length"
            :entity="education"
            v-model="entity"
        />

        <UserAcademicPreparationDisplayComponent
            v-if="certification.list.length"
            :entity="certification"
            v-model="entity"
        />
    </section>
</template>
