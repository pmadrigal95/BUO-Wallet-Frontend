<script>
/**
 * Descripción: Actions component
 *
 * @displayName BaseAbilityActions
 */

import { mapActions } from 'vuex';

export default {
    name: 'BaseAbilityActions',

    props: {
        /**
         * Lista de Habilidades
         */
        ability: {
            type: Object,
            required: true,
        },

        btnLabel: {
            type: String,
            default: undefined,
        },
    },

    data() {
        return {
            menu: false,
        };
    },

    methods: {
        ...mapActions('wallet', ['$_wallet_deleteability']),

        /**
         * Ir a la Habilidad
         */
        $_validateAbility() {
            this.$router.push({
                name: 'CertificationViewComponent',
                params: {
                    data: {
                        cualificacionId: this.ability.cualificacionId,
                        nombreCualificacion: this.ability.nombreCualificacion,
                        porcentajeCertificado: 0,
                        proposito: this.ability.proposito,
                    },
                },
            });
        },

        /**
         * Validaciones y ejecutar función
         */
        $_DeleteModal() {
            this.$refs.popUp.$_openModal();
        },

        /**
         * Validaciones y ejecutar función
         */
        $_Delete() {
            this.$_wallet_deleteability(this.ability.cualificacionId);
            this.$refs.popUp.$_openModal();
            if (this.btnLabel != undefined) {
                this.$_goBack();
            }
        },

        $_goBack() {
            this.$router.push({
                name: 'MyAbilitiesViewComponent',
            });
        },
    },
};
</script>

<template>
    <div>
        <!-- @Componente:  BaseDialog-->
        <BaseActionPopUp
            ref="popUp"
            action="delete"
            item="Indicador"
            inset
            :fn="$_Delete"
        />

        <v-menu
            bottom
            offset-y
            allow-overflow
            max-height="60%"
            max-width="60%"
            absolute
            auto
        >
            <template v-slot:activator="{ on, attrs }">
                <v-avatar class="ma-2" tile v-if="btnLabel == undefined">
                    <v-btn
                        :text="btnLabel != undefined"
                        :icon="btnLabel == undefined"
                        v-bind="attrs"
                        v-on="on"
                        class="no-uppercase rounded-lg"
                        :color="btnLabel ? 'blue800' : 'black'"
                    >
                        {{ btnLabel ? btnLabel : '' }}
                        <v-icon color="black"> mdi-dots-vertical </v-icon>
                    </v-btn>
                </v-avatar>
                <v-btn
                    v-else
                    :text="btnLabel != undefined"
                    :icon="btnLabel == undefined"
                    v-bind="attrs"
                    v-on="on"
                    class="no-uppercase rounded-lg"
                    :color="btnLabel ? 'blue800' : 'black'"
                >
                    {{ btnLabel ? btnLabel : '' }}
                    <v-icon color="black"> mdi-dots-vertical </v-icon>
                </v-btn>
            </template>
            <v-list class="BUO-Paragraph-Small">
                <v-list-item @click="$_validateAbility(ability)">
                    <v-list-item-avatar>
                        <v-icon>mdi-checkbox-marked-circle-plus-outline</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title class="buo-word-break buo-white-space"
                        >Validar con otra Empresa</v-list-item-title
                    >
                </v-list-item>

                <v-list-item @click="$_DeleteModal(ability)">
                    <v-list-item-avatar>
                        <v-icon>mdi-delete-outline</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title class="buo-word-break buo-white-space"
                        >Eliminar indicador</v-list-item-title
                    >
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>
