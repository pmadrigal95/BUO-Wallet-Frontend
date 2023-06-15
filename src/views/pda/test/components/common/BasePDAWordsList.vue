<script>
/**
 * Descripción: Palabras PDA
 *
 * @displayName BasePDAWordsList
 */

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper.js';

export default {
    name: 'BasePDAWordsList',
    props: {
        list: {
            type: Array,
            required: true,
        },

        containerList: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            componentKey: 0,
        };
    },

    computed: {
        filtered() {
            return this.list.filter(function (e) {
                return this.indexOf(e) < 0;
            }, this.containerList);
        },

        containerSize() {
            return 400;
        },
    },

    methods: {
        $_review(array, id) {
            return baseSharedFnHelper.$_getObjectFromArray(array, id);
        },

        $_insertIntoContainer(id) {
            if (!this.$_review(this.containerList, id)) {
                this.containerList.push(
                    baseSharedFnHelper.$_getObjectFromArray(this.list, id)
                );
                this.componentKey++;
            }
        },
    },
};
</script>

<template>
    <v-card
        flat
        color="transparent"
        class="overflow-auto"
        :height="containerSize"
        v-if="list.length > 0"
    >
        <v-card-text v-if="list.length > 0">
            <v-layout justify-center>
                <v-chip-group column :key="componentKey">
                    <v-chip
                        v-for="item in list"
                        :disabled="!filtered.some((x) => x.id === item.id)"
                        :key="item.id"
                        @click="$_insertIntoContainer(item.id)"
                    >
                        <span class="BUO-Label-Small grey600--text">
                            {{ item.palabra }}
                        </span>
                    </v-chip>
                </v-chip-group>
            </v-layout>
        </v-card-text>
    </v-card>
</template>
