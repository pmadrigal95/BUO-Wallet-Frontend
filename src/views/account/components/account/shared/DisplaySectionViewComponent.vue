<script>
/**
 * Descripción: Toggle show or hidden element
 *
 * @displayName DisplaySectionViewComponent
 */
import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

export default {
    name: 'DisplaySectionViewComponent',

    inheritAttrs: false,

    props: {
        section: {
            type: String,
            required: true,
        },

        value: {
            required: true,
        },
    },

    data() {
        return {
            switchValue: undefined,
            loading: false,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user']),
    },

    created() {
        this.switchValue = this.value;
    },

    watch: {
        /**
         * Comunicación de componente
         */
        switchValue(val, old) {
            if (val != old && val != this.value) {
                this.$_sendToApi();
            }
        },
    },

    methods: {
        $_updateValue(event) {
            this.$emit('input', event);
        },

        $_setRequest() {
            return {
                usuarioId: this.user.userId,
                mostrar: this.switchValue,
                seccion: this.section,
            };
        },

        $_sendToApi() {
            this.loading = true;

            httpService
                .post('perfilUsuario/privacidad', this.$_setRequest())
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        this.$_updateValue(this.switchValue ? true : false);
                    }
                });
        },
    },
};
</script>

<template>
    <v-layout
        justify-start
        class="BUO-Paragraph-Medium"
        :class="[app ? 'blueProgress600--text' : 'grey500--text']"
    >
        <BaseSkeletonLoader v-if="loading" type="avatar" />
        <BaseSwitch v-else v-model="switchValue" label="Mostrar al público" />
    </v-layout>
</template>
