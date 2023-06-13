<script>
/**
 * Descripción: Pantalla de Buscar Habilidad
 *
 * @displayName BaseCardAbilityDetails
 */
import { mapGetters } from 'vuex';

const BaseHeaderAbilityDetails = () =>
    import(
        '@/views/certification/components/detailsAbility/BaseHeaderAbilityDetails'
    );

const BaseAvailableMicroSkills = () =>
    import(
        '@/views/certification/components/detailsAbility/BaseAvailableMicroSkills'
    );

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseAbilityActions = () =>
    import(
        '@/components/wallet/common/myAbilities/components/BaseAbilityActions'
    );

const BaseMicroSkillsDetails = () =>
    import(
        '@/views/certification/components/detailsAbility/BaseMicroSkillsDetails'
    );

export default {
    name: 'BaseCardAbilityDetails',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BaseCardViewComponent,
        BaseHeaderAbilityDetails,
        BaseAvailableMicroSkills,
        BaseAbilityActions,
        BaseMicroSkillsDetails,
    },

    computed: {
        ...mapGetters('authentication', ['user']),
        ...mapGetters('wallet', ['PDACompanyId']),
    },

    methods: {
        $_goBack() {
            this.$_deleteProperty();
            if (this.entity.type === 'new') {
                this.entity.step = 2;
            } else if (this.entity.type === 'edit') {
                this.$router.push({
                    name: 'MyAbilitiesViewComponent',
                });
            }
        },

        $_deleteProperty() {
            if (this.entity.header) {
                delete this.entity.header;
            }
        },

        $_createRequestBody() {
            this.entity.body = {
                usuarioId: this.user.userId,
                cualificacionId: this.entity.header.cualificacionId,
                listaCompetencias: [],
            };
            this.entity.labelBtn = 'Agregar';
            this.entity.step = 4;
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        :btnAction="$_goBack"
        :subtitle="entity.header.proposito"
    >
        <div slot="top-actions">
            <v-layout justify-end v-if="entity.type == 'edit'">
                <BaseAbilityActions
                    :ability="entity.header"
                    btnLabel="Opciones"
                    v-if="entity.header.organizacionId != PDACompanyId"
                />
            </v-layout>
        </div>
        <div slot="card-title">
            <br />
            <BaseHeaderAbilityDetails :header="entity.header" />
            <v-layout justify-start v-if="entity.type == 'new'">
                <v-btn
                    @click="$_createRequestBody"
                    color="blue800"
                    class="no-uppercase rounded-lg"
                    elevation="0"
                    text
                >
                    Añadir a mis objetivos<v-icon dark>
                        mdi-heart-outline
                    </v-icon></v-btn
                >
            </v-layout>
        </div>

        <div slot="card-text">
            <BaseAvailableMicroSkills :entity="entity" />
        </div>

        <div slot="body" v-if="entity.type == 'edit'">
            <BaseMicroSkillsDetails :entity="entity" />
        </div>
    </BaseCardViewComponent>
</template>
