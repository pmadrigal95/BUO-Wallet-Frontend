<script>
/**
 * Descripción: Pantalla de display sobre información principal Editor
 *
 * @displayName UserInfoEditorViewComponent
 *
 */

import { AES } from 'crypto-js';

import { mapGetters, mapActions } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import baseConfigHelper from '@/helpers/baseConfigHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

const BaseDatePicker = () => import('@/components/core/forms/BaseDatePicker');

export default {
    name: 'UserInfoEditorViewComponent',

    props: {
        value: {
            type: Object,
            required: true,
        },
    },

    components: {
        BaseDatePicker,
    },

    data() {
        return {
            componentKey: 0,
            loading: false,
            temp: {},
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user']),
    },

    methods: {
        ...mapActions('authentication', ['set_user_name']),

        $_updateValue(event) {
            this.$emit('input', event);
        },

        $_setToTemp() {
            this.temp = BaseArrayHelper.SetObject({}, this.value);
            this.temp.fechaNacimiento =
                baseSharedFnHelper.$_parseArrayToDateISOString(
                    this.temp.fechaNacimiento
                );
        },

        $_open() {
            this.$_setToTemp();
            this.$refs['popUp'].$_openModal();
        },

        $_setRequest() {
            return {
                nombreCompleto: this.temp.nombreCompleto,
                fechaNacimiento: this.temp.fechaNacimiento,
                paisId: this.temp.paisId,
                usuarioId: this.user.userId,
            };
        },

        $_updateJWT(value) {
            if (value)
                sessionStorage.setItem(
                    baseConfigHelper.$_jwtToken,
                    AES.encrypt(value, baseConfigHelper.$_encryptKey).toString()
                );
        },

        $_setToEntity(resp) {
            this.set_user_name(resp?.nombreCompleto);
            this.$_updateJWT(resp?.token?.jwtToken);
            delete resp?.token;
            this.$_updateValue(resp);
        },

        $_sendToApi() {
            this.loading = true;

            httpService
                .post('perfilUsuario/intro', this.$_setRequest())
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        const resp = response.data;

                        this.$_setToEntity(resp);

                        this.$_cancel();
                    }
                });
        },

        $_cancel() {
            this.$refs['popUp'].$_openModal();
            this.componentKey++;
        },
    },
};
</script>

<template>
    <BasePopUp
        ref="popUp"
        :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '60%'"
        :isDrawer="false"
        :key="componentKey"
    >
        <div slot="Content">
            <BaseSkeletonLoader v-if="loading" type="article" />
            <BaseForm :method="$_sendToApi" :cancel="$_cancel" v-else>
                <div slot="body">
                    <section class="pb-5">
                        <span
                            class="BUO-Heading-XSmall"
                            :class="[app ? 'white--text' : 'grey700--text']"
                        >
                            Introducción
                        </span>
                    </section>
                    <v-row dense>
                        <v-col cols="12">
                            <BaseInput
                                label="Nombre Completo"
                                :validate="['text']"
                                v-model="temp.nombreCompleto"
                                :min="1"
                                :max="255"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseDatePicker
                                label="Fecha de nacimiento"
                                appendIcon="mdi-calendar-month"
                                v-model="temp.fechaNacimiento"
                                reqCurrentMaxDate
                                :validate="['optionalText']"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseSelect
                                label="País"
                                endpoint="pais/list"
                                itemText="nombre"
                                itemValue="id"
                                v-model.number="temp.paisId"
                            />
                        </v-col>
                    </v-row>
                </div>
            </BaseForm>
        </div>
    </BasePopUp>
</template>
