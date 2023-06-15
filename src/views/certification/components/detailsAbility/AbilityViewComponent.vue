<script>
/**
 * Descripción: Pantalla de Buscar Habilidad
 *
 * @displayName AbilityViewComponent
 */

import httpService from '@/services/axios/httpService';

const BaseCardAbilityDetails = () =>
    import(
        '@/views/certification/components/detailsAbility/BaseCardAbilityDetails'
    );

export default {
    name: 'AbilityViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BaseCardAbilityDetails,
    },

    data() {
        return {
            loading: false,
            ability: undefined,
        };
    },

    created() {
        this.$_getAbility();
    },

    watch: {
        'entity.step'() {
            if (this.entity.step == 3) {
                this.$_getAbility();
            }
        },
    },

    methods: {
        $_getAbility() {
            if (!this.entity || !this.entity.header) {
                this.entity.step = 2;
            } else if (this.entity.type === 'new') {
                this.$_new_ability();
            }
        },

        $_new_ability() {
            this.$_sendToApi(this.entity.header.cualificacionId);
        },

        $_sendToApi(id) {
            this.loading = true;
            httpService
                .get(`competencia/findAllDTOByCualificacion/${id}?size=50`)
                .then((response) => {
                    if (response != undefined) {
                        // Encontro la entidad
                        this.entity.header.totalDisponibles =
                            response.data.totalElements;
                        this.entity.header.listaTotalDisponibles =
                            response.data.content;
                    }
                    this.loading = false;
                });
        },
    },
};
</script>

<template>
    <section>
        <BaseSkeletonLoader v-if="loading" type="card, article" />
        <section v-else>
            <span v-show="false"> {{ entity.step }}</span>
            <BaseCardAbilityDetails
                v-if="this.entity.header"
                :entity="entity"
            />
        </section>
    </section>
</template>
