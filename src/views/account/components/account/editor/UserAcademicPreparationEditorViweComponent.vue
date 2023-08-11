<script>
/**
 * Descripción: Pantalla editor sobre educación o certificaciones
 *
 * @displayName UserAcademicPreparationEditorViweComponent
 *
 */

import { mapGetters } from 'vuex';

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
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user']),
    },

    methods: {
        $_Object() {
            return {
                id: undefined,
                nombre: undefined,
                fechaInicio: undefined,
                fechaFinal: undefined,
                continuaCursando: true,
                tituloAcademicoId: this.isEducation ? undefined : 2,
                nombreTituloAcademico: undefined,
                nombreLugar: undefined,
                nombreLugarCompleto: undefined,
                url: undefined,
                usuarioId: undefined,
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

        $_open({ id, index }) {
            this.index = index ? index : -1;
            this.$_setToTemp({ id });
            this.$refs['popUp'].$_openModal();
        },

        $_sendToApi() {},

        $_cancel() {},
    },
};
</script>

<template>
    <BasePopUp
        ref="popUp"
        :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '600'"
        scrollable
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
                        <!-- <v-col cols="12">
                            <BaseSelect
                                label="Título de grado"
                                :endpoint="endPointAcademicTitle"
                                itemText="nombre"
                                itemValue="id"
                                :validate="['text']"
                                v-model="temp.tituloAcademicoId"
                                v-if="this.isEducation"
                            />
                        </v-col> -->
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
                                :validate="['text']"
                                :min="1"
                                :max="500"
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
            </BaseForm>
        </div>
    </BasePopUp>
</template>
