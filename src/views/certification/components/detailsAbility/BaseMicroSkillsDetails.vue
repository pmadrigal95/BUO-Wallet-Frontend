<script>
/**
 * Descripción: Micro Habilidades
 *
 * @displayName BaseMicroSkillsDetails
 */

import { mapGetters } from 'vuex';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

const BaseMicroSkillStatusList = () =>
    import(
        '@/views/certification/components/detailsAbility/BaseMicroSkillStatusList'
    );

export default {
    name: 'BaseMicroSkillsDetails',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BaseMicroSkillStatusList,
    },

    computed: {
        /**
         * Objecto de Wallet
         */
        ...mapGetters('wallet', ['validatedCode', 'inProgressCode']),

        totalPendingList() {
            this.entity.header.listaTotalPendientes.forEach((element) => {
                let result = this.$_returnOrganizationChecklist(
                    element.organizacionId
                );

                if (result) {
                    element.logo = result.logo;
                    element.nombreOrganizacion = result?.nombreOrganizacion;
                    element.nombreSupervisor = result?.nombreSupervisor;
                }
            });

            return this.entity.header.listaTotalPendientes;
        },

        totalValidatedList() {
            this.entity.header.listaTotalValidadas.forEach((element) => {
                let result = this.$_returnOrganizationChecklist(
                    element.organizacionId
                );

                if (result) {
                    element.logo = result.logo;
                    element.nombreOrganizacion = result?.nombreOrganizacion;
                    element.nombreSupervisor = result?.nombreSupervisor;
                }
            });
            return this.entity.header.listaTotalValidadas;
        },
    },

    methods: {
        $_returnOrganizationChecklist(id) {
            return baseSharedFnHelper.$_getObjectFromArray(
                this.entity.header.listaOrganizacionVerificacion,
                id
            );
        },
    },
};
</script>

<template>
    <div>
        <BaseMicroSkillStatusList
            v-if="totalPendingList.length > 0"
            :title="`En Progreso (${totalPendingList.length})`"
            :list="totalPendingList"
            :type="inProgressCode"
        />
        <BaseMicroSkillStatusList
            v-if="totalValidatedList.length > 0"
            :list="totalValidatedList"
            :type="validatedCode"
            :title="`Validado (${totalValidatedList.length})`"
        />
    </div>
</template>
