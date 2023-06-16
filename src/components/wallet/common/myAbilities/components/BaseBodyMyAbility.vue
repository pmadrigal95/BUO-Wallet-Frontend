<script>
/**
 * Descripción: Componente Lista Expandible
 *
 * @displayName BaseBodyMyAbility
 */

import { mapGetters } from 'vuex';

const BaseGroupAvatar = () =>
    import('@/components/core/avatars/BaseGroupAvatar');

const BaseAbilityActions = () =>
    import(
        '@/components/wallet/common/myAbilities/components/BaseAbilityActions'
    );

export default {
    name: 'BaseBodyMyAbility',

    props: {
        /**
         * Lista de Habilidades
         */
        ability: {
            type: Object,
            required: true,
        },
    },

    components: {
        BaseGroupAvatar,
        BaseAbilityActions,
    },

    computed: {
        /**
         * Objecto de Wallet
         */
        ...mapGetters('wallet', [
            'validatedCode',
            'inProgressCode',
            'notValidatedCode',
            'PDACompanyId',
        ]),

        ...mapGetters('theme', ['app']),
    },

    methods: {
        /**
         * Ir a la Habilidad
         */
        $_goToAbility(abilityId) {
            this.$router.push({
                name: 'CertificationViewComponent',
                params: { Id: abilityId },
            });
        },

        $_avatarList(organizationChecklist) {
            let array = [];
            organizationChecklist.forEach((element) => {
                let object = {
                    id: element.id,
                    src: element.logo,
                    text: element.nombreOrganizacion,
                };

                array.push(object);
            });
            return array;
        },
    },
};
</script>

<template>
    <v-card
        flat
        max-width="100%"
        max-height="100%"
        :color="app ? 'grey700' : 'grey200'"
        class="rounded-lg"
    >
        <div class="d-flex flex-no-wrap justify-space-between">
            <v-card-title class="buo-word-break">
                <span
                    class="BUO-Label-Small"
                    :class="[app ? 'blueProgress600--text' : 'grey600--text']"
                    v-if="ability.estadoId === notValidatedCode"
                    >Tienes {{ ability.totalDisponibles }} indicadores
                    disponibles</span
                >
                <span
                    class="BUO-Label-Small"
                    :class="[app ? 'blueProgress600--text' : 'grey600--text']"
                    v-else-if="
                        ability.fechaEstadoFormato != null &&
                        ability.estadoId != notValidatedCode
                    "
                    >Actualizado el {{ ability.fechaEstadoFormato }}</span
                >
            </v-card-title>
            <BaseAbilityActions
                :ability="ability"
                v-if="ability.organizacionId != PDACompanyId"
            />
        </div>

        <v-card-subtitle
            v-if="
                ability.estadoId != notValidatedCode &&
                ability.listaOrganizacionVerificacion.length > 0
            "
        >
            <span
                class="BUO-Label-XSmall"
                :class="[app ? 'blueProgress600--text' : 'grey600--text']"
                >Validador:
            </span>
            <BaseGroupAvatar
                borderColor="white"
                :avatars="$_avatarList(ability.listaOrganizacionVerificacion)"
            ></BaseGroupAvatar
        ></v-card-subtitle>

        <v-card-actions class="pb-3 pr-3">
            <v-layout justify-end>
                <v-btn
                    class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                    elevation="0"
                    :color="app ? 'white' : 'primary'"
                    outlined
                    @click="$_goToAbility(ability.cualificacionId)"
                >
                    {{
                        ability.estadoId === notValidatedCode
                            ? 'Validar'
                            : 'Ver indicador'
                    }}
                </v-btn>
            </v-layout>
        </v-card-actions>
    </v-card>
</template>
