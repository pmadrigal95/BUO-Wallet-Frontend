<script>
/**
 * Descripción: Pantalla Explora dentro de Buo Wallet
 *
 * @displayName exploreBUOViewComponent
 */

export default {
    name: 'ExploreBUOViewComponent',

    computed: {
        menuItems() {
            return [
                {
                    title: 'Mis Indicadores',
                    icon: 'mdi-chevron-right',
                    module: 'MyAbilitiesViewComponent',
                },
            ];
        },
    },

    methods: {
        $_goToModule(module) {
            if (module && module != undefined) {
                this.$router.push({
                    name: module,
                });
            }
        },
    },
};
</script>

<template>
    <v-card
        flat
        max-width="100%"
        max-height="100%"
        class="rounded-lg"
        color="transparent"
    >
        <v-card-title class="buo-word-break"
            >Explora dentro de Buo Wallet</v-card-title
        >

        <v-flex xs12 sm12 md12>
            <v-list flat class="mt-5 list" color="transparent">
                <v-list-item v-for="item in menuItems" :key="item.title" link>
                    <v-list-item-content @click="$_goToModule(item.module)">
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list>
        </v-flex>
    </v-card>
</template>

<style>
.list .v-expansion-panel-content__wrap {
    padding: 16px 0px !important;
}

.list .v-expansion-panel-header {
    padding: 16px 0px;
}

.list .v-expansion-panel-header--active {
    padding: 16px 0px;
}

.list .v-simple-table thead th {
    font-size: 1rem !important;
}
</style>
