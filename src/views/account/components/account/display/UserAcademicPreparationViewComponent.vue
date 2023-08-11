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

const UserAcademicPreparationEditorViweComponent = () =>
    import(
        '@/views/account/components/account/editor/UserAcademicPreparationEditorViweComponent'
    );

export default {
    name: 'UserAcademicPreparationViewComponent',

    components: {
        UserAcademicPreparationDisplayComponent,
        UserAcademicPreparationEditorViweComponent,
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

        education() {
            const educationList = this.entity.preparacionAcademicaList.filter(
                (item) => item.tituloAcademicoId != 2
            );

            return {
                list: educationList,
                enum: 'EDUCACION',
                title: 'Educación',
                show: this.entity.mostrarEducacion,
            };
        },

        certification() {
            const certificationList =
                this.entity.preparacionAcademicaList.filter(
                    (item) => item.tituloAcademicoId == 2
                );

            return {
                list: certificationList,
                enum: 'CERTIFICACION',
                title: 'Certificaciones',
                show: this.entity.mostrarCertificaciones,
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
                            {},
                            response.data
                        );
                    }
                });
        },

        $_open({ id, index, isEducation }) {
            this.$refs['popUp'].$_open({ id, index, isEducation });
        },
    },
};
</script>

<template>
    <BaseSkeletonLoader v-if="loading" type="card" />
    <section v-else>
        <UserAcademicPreparationEditorViweComponent
            ref="popUp"
            v-model="entity"
        />

        <UserAcademicPreparationDisplayComponent
            v-if="education.list.length"
            :entity="education"
            :callback="$_open"
            v-model="entity.mostrarEducacion"
        />

        <UserAcademicPreparationDisplayComponent
            v-if="certification.list.length"
            :entity="certification"
            :callback="$_open"
            v-model="entity.mostrarCertificaciones"
        />
    </section>
</template>
