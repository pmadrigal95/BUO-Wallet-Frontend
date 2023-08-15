<script>
/**
 * Descripción: Pantalla editor exp laboral
 *
 * @displayName UserWorkExperienceEditorViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

const BaseDatePicker = () => import('@/components/core/forms/BaseDatePicker');

const DeleteUserItemViewComponent = () =>
    import(
        '@/views/account/components/account/shared/DeleteUserItemViewComponent'
    );

export default {
    name: 'UserAcademicPreparationEditorViewComponent',

    props: {
        value: {
            type: Object,
            required: true,
        },
    },

    components: {
        BaseDatePicker,
        DeleteUserItemViewComponent,
    },

    data() {
        return {
            componentKey: 0,
            loading: false,
            temp: {},
            isNew: undefined,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user']),
    },

    methods: {
        $_Object() {
            return {
                continuaLaborando: true,
                cualificacionId: undefined,
                descripcion: undefined,
                fechaFinal: undefined,
                fechaInicio: undefined,
                id: undefined,
                nombreCualificacion: undefined,
                nombreOrganizacion: undefined,
                organizacionId: undefined,
            };
        },

        $_getObjectFromValue({ id }) {
            const result = this.value.experienciaLaboralList.find((obj) => {
                return obj.id == id;
            });

            if (result) {
                result.fechaInicio =
                    baseSharedFnHelper.$_parseArrayToDateISOString(
                        result.fechaInicio
                    );
                result.fechaFinal =
                    baseSharedFnHelper.$_parseArrayToDateISOString(
                        result.fechaFinal
                    );
                result.continuaLaborando = result.fechaFinal ? false : true;
            }

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

        $_initConfig({ id }) {
            this.isNew = id ? false : true;

            this.$_setToTemp({ id });
        },

        $_open({ id }) {
            this.componentKey++;
            this.$_initConfig({ id });
            this.$refs['popUp'].$_openModal();
        },

        $_setToEntity(resp) {
            if (this.isNew) {
                this.value?.experienciaLaboralList.push(resp);
            } else {
                const index = this.value?.experienciaLaboralList.findIndex(
                    (object) => {
                        return object?.id === resp?.id;
                    }
                );

                if (index != undefined && index >= 0) {
                    const tempArray = BaseArrayHelper.SetObject(
                        [],
                        this.value.experienciaLaboralList
                    );

                    tempArray[index] = resp;

                    this.value.experienciaLaboralList =
                        BaseArrayHelper.SetObject([], tempArray);
                }
            }
        },

        $_setRequest() {
            return {
                continuaLaborando: this.temp.continuaLaborando,
                cualificacionId: this.temp.cualificacionId,
                descripcion: this.temp.descripcion,
                fechaFinal: this.temp.fechaFinal,
                fechaInicio: this.temp.fechaInicio,
                id: this.temp.id,
                nombreCualificacion: this.temp.nombreCualificacion,
                nombreOrganizacion: this.temp.nombreOrganizacion,
                organizacionId: this.temp.organizacionId,
                usuarioId: this.user.userId,
            };
        },

        $_sendToApi() {
            this.loading = true;

            httpService
                .post('experienciaLaboral/save', this.$_setRequest())
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        const resp = response.data;

                        this.$_setToEntity(resp);

                        this.$_cancel();
                    }
                });
        },

        $_delete() {
            this.$refs.popUpDelete.$_open();
        },

        $_cancel() {
            this.$refs['popUp'].$_openModal();
            this.componentKey++;
        },
    },
};
</script>

<template>
    <section>
        <DeleteUserItemViewComponent
            v-if="temp.id"
            ref="popUpDelete"
            label="Experiencia Laboral"
            arrayName="experienciaLaboralList"
            v-model="value"
            :itemId="temp.id"
            :callback="$_cancel"
        />

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
                                        isNew ? 'Agregar' : 'Editar'
                                    } Experiencia laboral`
                                }}
                            </span>
                        </section>
                        <v-row dense>
                            <v-col cols="12">
                                <BaseInput
                                    label="Puesto"
                                    v-model="temp.nombreCualificacion"
                                    :validate="['text']"
                                />
                            </v-col>
                            <v-col cols="12">
                                <BaseInput
                                    label="Empresa"
                                    v-model="temp.nombreOrganizacion"
                                    :validate="['text']"
                                />
                            </v-col>
                            <v-col cols="12">
                                <BaseTextArea
                                    label="Descripción"
                                    v-model.trim="temp.descripcion"
                                    :validate="['optionalText']"
                                    :max="500"
                                    :min="1"
                                    counter="500"
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
                                    v-if="!temp.continuaLaborando"
                                />
                            </v-col>
                            <v-col cols="12">
                                <BaseSwitch
                                    label="Continúo laborando para esta empresa"
                                    v-model="temp.continuaLaborando"
                                />
                            </v-col>
                        </v-row>
                    </div>
                    <div slot="Betweenbtns" v-if="!isNew">
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
    </section>
</template>
