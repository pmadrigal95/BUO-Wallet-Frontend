<script>
/**
 * Descripción: AcademicPreparationViewComponent
 *
 * @displayName AcademicPreparationViewComponent
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

const AcademicPreparationCardViewComponent = () =>
    import(
        '@/views/shareables/buoWallet/components/shared/AcademicPreparationCardViewComponent'
    );

export default {
    name: 'AcademicPreparationViewComponent',

    components: { AcademicPreparationCardViewComponent },

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
                icon: 'school-outline',
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
                icon: 'certificate-outline',
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
    },
};
</script>

<template>
    <BaseSkeletonLoader v-if="loading" type="card" />
    <section v-else>
        <v-row justify="center" align-content="center">
            <AcademicPreparationCardViewComponent :entity="education" />
        </v-row>
        <v-row justify="center" align-content="center" class="pt-3">
            <AcademicPreparationCardViewComponent :entity="certification" />
        </v-row>
    </section>
</template>
