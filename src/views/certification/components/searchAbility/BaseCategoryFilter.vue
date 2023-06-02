<script>
/**
 * Descripción: Pantalla de categorias seleccionadas
 *
 * @displayName BaseCategoryFilter
 */

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper.js';

export default {
    name: 'BaseCategoryFilter',

    props: {
        fn: {
            type: Function,
            requiered: true,
        },

        categories: {
            type: Array,
            requiered: true,
        },
    },

    data() {
        return {
            componentKey: 0,
        };
    },

    methods: {
        forceRerender() {
            this.componentKey += 1;
        },

        $_deleteAll() {
            this.categories.length = 0;
            this.$_sendToApi();
        },

        $_sendToApi() {
            this.fn();
            this.forceRerender();
        },

        $_deleteFilter(id) {
            this.categories.splice(
                baseSharedFnHelper.$_returnCurrentIndex(this.categories, id),
                1
            );
            this.$_sendToApi();
        },
    },
};
</script>

<template>
    <v-row
        v-if="categories && categories.length > 0"
        :key="componentKey"
        align-content="center"
        justify="start"
    >
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn text icon v-bind="attrs" v-on="on" @click="$_deleteAll">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
            <span>Eliminar Filtros</span>
        </v-tooltip>
        <v-chip-group column>
            <div v-for="category in categories" :key="category.id">
                <v-chip
                    style="height: auto; white-space: normal"
                    close
                    close-icon="mdi-close"
                    @click="$_deleteFilter(category.id)"
                    @click:close="$_deleteFilter(category.id)"
                >
                    {{ category.nombre }}
                </v-chip>
            </div>
        </v-chip-group>
    </v-row>
</template>
