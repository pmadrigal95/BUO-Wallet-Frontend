<script>
/**
 * Descripción: Pantalla Eliminar
 *
 * @displayName DeleteUserItemViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

export default {
    name: 'DeleteUserItemViewComponent',

    props: {
        value: {
            type: Object,
            required: true,
        },

        itemId: {
            type: Number,
            required: true,
        },

        label: {
            type: String,
            default: 'Preparación Académica',
        },

        arrayName: {
            type: String,
            default: 'preparacionAcademicaList',
        },

        callback: {
            type: Function,
            required: true,
        },
    },

    data() {
        return {
            componentKey: 0,
            loading: false,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user']),
    },

    methods: {
        $_delete() {
            this.$_sendToApi();
            console.log(this.itemId);
        },

        $_open() {
            this.$refs.popUpDelete.$_openModal();
        },

        $_updateModel() {
            const index = this.value[this.arrayName].findIndex((object) => {
                return object?.id === this.itemId;
            });

            if (index != undefined && index >= 0) {
                const tempArray = BaseArrayHelper.SetObject(
                    [],
                    this.value[this.arrayName]
                );

                delete tempArray[index];

                this.value[this.arrayName] = BaseArrayHelper.SetObject(
                    [],
                    tempArray
                );
            }
        },

        $_sendToApi() {
            this.loading = true;

            httpService
                .delete(
                    `${
                        this.arrayName == 'preparacionAcademicaList'
                            ? 'preparacionAcademica'
                            : 'experienciaLaboral'
                    }/deleteById/${this.itemId}`
                )
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        this.$_updateModel();

                        this.$_cancel();
                    }
                });
        },

        $_cancel() {
            this.callback();
            this.$refs.popUpDelete.$_openModal();
            this.componentKey++;
        },
    },
};
</script>

<template>
    <!-- @Componente:  BaseDialog-->
    <BaseActionPopUp
        v-if="itemId"
        ref="popUpDelete"
        action="delete"
        :item="label"
        inset
        :fn="$_delete"
    />
</template>
