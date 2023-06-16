<script>
/**
 * Descripción: Componente Lista Expandible
 *
 * @displayName BaseShareableMyAbilitiesList
 */

const BaseShareableHeaderMyAbility = () =>
    import(
        '@/views/shareables/buoWallet/components/myAbilitiesLink/components/BaseShareableHeaderMyAbility'
    );

const BaseShareableBodyMyAbility = () =>
    import(
        '@/views/shareables/buoWallet/components/myAbilitiesLink/components/BaseShareableBodyMyAbility'
    );

const BaseNotFoundContent = () =>
    import('@/components/core/cards/BaseNotFoundContent');

export default {
    name: 'BaseShareableMyAbilitiesList',

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
        BaseShareableHeaderMyAbility,
        BaseNotFoundContent,
        BaseShareableBodyMyAbility,
    },
};
</script>

<template>
    <section>
        <!-- @ Use Loanding... -->
        <BaseSkeletonLoader v-if="!myAbilitiesList" type="list-item" />

        <v-expansion-panels flat v-else-if="myAbilitiesList.length > 0">
            <v-expansion-panel
                v-for="ability in myAbilitiesList"
                :key="ability.cualificacionId"
            >
                <v-expansion-panel-header class="buo-expansion-panel-header">
                    <BaseShareableHeaderMyAbility :ability="ability" />
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                    <BaseShareableBodyMyAbility :ability="ability" />
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

        <BaseNotFoundContent v-else />
    </section>
</template>
