<script>
/**
 * Descripción: Pantalla editor sobre educación o certificaciones
 *
 * @displayName UserAcademicPreparationEditorViweComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

const BaseDatePicker = () => import('@/components/core/forms/BaseDatePicker');

export default {
    name: 'UserAcademicPreparationEditorViweComponent',

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
            index: undefined,
            isEducation: undefined,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user']),

        endpoint() {
            return this.isEducation
                ? 'tituloAcademico/getAll'
                : 'tituloAcademico/getAllEducation';
        },
    },

    methods: {
        $_Object() {
            return {
                id: undefined,
                nombre: undefined,
                fechaInicio: undefined,
                fechaFinal: undefined,
                continuaCursando: true,
                tituloAcademicoId: undefined,
                nombreTituloAcademico: undefined,
                nombreLugar: undefined,
                nombreLugarCompleto: undefined,
                url: undefined,
            };
        },

        $_getObjectFromValue({ id }) {
            const result = this.value.preparacionAcademicaList.find((obj) => {
                return obj.id == id;
            });

            return result ? result : this.$_Object();
        },

        $_setToTemp({ id }) {
            this.temp = id
                ? BaseArrayHelper.SetObject(
                      {},
                      this.$_getObjectFromValue({ id })
                  )
                : BaseArrayHelper.SetObject({}, this.$_Object());
        },

        $_initConfig({ id, index, isEducation = true }) {
            this.index = index ? index : -1;

            this.isEducation = isEducation;

            this.$_setToTemp({ id });
        },

        $_open({ id, index, isEducation }) {
            this.componentKey++;
            this.$_initConfig({ id, index, isEducation });
            this.$refs['popUp'].$_openModal();
        },

        $_setToEntity(resp) {
            if (this.index > 0) {
                console.log(resp);
            } else {
                this.value?.preparacionAcademicaList.push(resp);
            }
        },

        $_setRequest() {
            return {
                id: this.temp.id,
                nombre: this.temp.nombre,
                fechaInicio: this.temp.fechaInicio,
                fechaFinal: this.temp.fechaFinal,
                continuaCursando: this.temp.continuaCursando,
                tituloAcademicoId: this.temp.tituloAcademicoId,
                nombreTituloAcademico: this.temp.nombreTituloAcademico,
                nombreLugar: this.temp.nombreLugar,
                nombreLugarCompleto: this.temp.nombreLugarCompleto,
                url: this.temp.url,
                usuarioId: this.user.userId,
            };
        },

        $_sendToApi() {
            this.loading = true;

            httpService
                .post('preparacionAcademica/save', this.$_setRequest())
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        const resp = response.data;

                        this.$_setToEntity(resp);

                        this.$_cancel();
                    }
                });
        },

        $_delete() {},

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
        :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '600'"
        scrollable
        :isDrawer="false"
    >
        <div slot="Content" :key="componentKey">
            <BaseSkeletonLoader v-if="loading" type="article" />
            <BaseForm
                :method="$_sendToApi"
                :cancel="$_cancel"
                v-else
                :block="$vuetify.breakpoint.mobile"
            >
                <div slot="body">
                    <section class="pb-5">
                        <span
                            class="BUO-Heading-XSmall"
                            :class="[app ? 'white--text' : 'grey700--text']"
                        >
                            {{
                                `${
                                    index > 0 ? 'Editar' : 'Agregar'
                                } Preparación Académica`
                            }}
                        </span>
                    </section>
                    <v-row dense>
                        <v-col cols="12">
                            <BaseInput
                                label="Carrera"
                                v-model="temp.nombre"
                                :validate="['text']"
                                :min="1"
                                :max="255"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseSelect
                                label="Título de grado"
                                :endpoint="endpoint"
                                itemText="nombre"
                                itemValue="id"
                                :validate="['text']"
                                v-model="temp.tituloAcademicoId"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseInput
                                label="Universidad o centro educativo"
                                v-model="temp.nombreLugar"
                                :validate="['text']"
                                :min="1"
                                :max="255"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseInput
                                label="Url"
                                v-model="temp.url"
                                :validate="['optionalWeb']"
                                :min="1"
                                :max="500"
                                v-if="!isEducation"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseDatePicker
                                label="Fecha de inicio"
                                appendIcon="mdi-calendar-month"
                                v-model="temp.fechaInicio"
                                reqCurrentMaxDate
                                :validate="['text']"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseDatePicker
                                label="Fecha de finalización"
                                appendIcon="mdi-calendar-month"
                                v-model="temp.fechaFinal"
                                reqCurrentMaxDate
                                :validate="['text']"
                                v-if="!temp.continuaCursando"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseSwitch
                                label="Continúo cursando esta carrera"
                                v-model="temp.continuaCursando"
                            />
                        </v-col>
                    </v-row>
                </div>
                <div slot="Betweenbtns" v-if="index > 0">
                    <v-btn
                        class="no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                        :class="[
                            $vuetify.breakpoint.smAndDown
                                ? 'mb-n3 mt-2'
                                : 'my-1',
                        ]"
                        elevation="0"
                        large
                        dark
                        depressed
                        @click="$_delete"
                        color="error"
                        block
                    >
                        Eliminar
                    </v-btn>
                </div>
            </BaseForm>
        </div>
    </BasePopUp>
</template>
