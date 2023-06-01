<script>
/**
 * Descripción: Componente Lista Expandible
 *
 * @displayName BaseMyAbilitiesList
 */

import { mapActions } from 'vuex';

const BaseHeaderMyAbility = () =>
    import(
        '@/components/wallet/common/myAbilities/components/BaseHeaderMyAbility'
    );

const BaseBodyMyAbility = () =>
    import(
        '@/components/wallet/common/myAbilities/components/BaseBodyMyAbility'
    );

const BaseNotFoundContent = () =>
    import('@/components/core/cards/BaseNotFoundContent');

export default {
    name: 'BaseMyAbilitiesList',

    props: {
        /**
         * Lista de Habilidades
         */
        myAbilitiesList: {
            type: Array,
            required: true,
        },
    },

    components: {
        BaseHeaderMyAbility,
        BaseBodyMyAbility,
        BaseNotFoundContent,
    },

    methods: {
        ...mapActions('wallet', ['$_wallet_cleanbuowallet']),

        $_goToModule() {
            this.$_wallet_cleanbuowallet();

            this.$router.push({
                name: 'CertificationViewComponent',
            });
        },
    },
};
</script>

<template>
    <div>
        <!-- @ Use Loanding... -->
        <BaseSkeletonLoader v-if="!myAbilitiesList" type="list-item" />

        <v-expansion-panels flat v-else-if="myAbilitiesList.length > 0">
            <v-expansion-panel
                v-for="ability in myAbilitiesList"
                :key="ability.cualificacionId"
            >
                <v-expansion-panel-header class="buo-expansion-panel-header">
                    <BaseHeaderMyAbility :ability="ability" />
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                    <BaseBodyMyAbility :ability="ability" />
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

        <BaseNotFoundContent :fn="$_goToModule" v-else />
    </div>
</template>
