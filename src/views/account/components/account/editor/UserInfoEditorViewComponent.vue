<script>
/**
 * Descripción: Pantalla de display sobre información principal Editor
 *
 * @displayName UserInfoEditorViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

const BaseDatePicker = () => import('@/components/core/forms/BaseDatePicker');

export default {
    name: 'UserInfoEditorViewComponent',

    props: {
        entity: {
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
        ...mapGetters('authentication', ['user']),
    },

    methods: {
        $_setToTemp() {
            this.temp = BaseArrayHelper.SetObject({}, this.entity);
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
                mostrarIntro: true,
            };
        },

        $_setToEntity(resp) {
            this.entity.fechaNacimiento = resp.fechaNacimiento;
            this.entity.fechaNacimientoFormato = resp.fechaNacimientoFormato;
            this.entity.mostrarIntro = resp.mostrarIntro;
            this.entity.nombreCompleto = resp.nombreCompleto;
            this.entity.nombrePais = resp.nombrePais;
            this.entity.paisId = resp.paisId;
            this.entity.token = resp.token;
            this.entity.usuarioId = resp.usuarioId;

            //TODO: Actualizar JWT
        },

        $_sendToApi() {
            this.loading = true;

            const data = this.$_setRequest();

            httpService.post('perfilUsuario/intro', data).then((response) => {
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
