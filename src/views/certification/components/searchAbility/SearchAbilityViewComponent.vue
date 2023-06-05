<script>
/**
 * Descripción: Pantalla de Buscar Habilidad
 *
 * @displayName SearchAbilityViewComponent
 */

import httpService from '@/services/axios/httpService';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper.js';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseNotFoundContent = () =>
    import('@/components/core/cards/BaseNotFoundContent');

const BaseSearchCategory = () =>
    import('@/views/certification/components/searchAbility/BaseSearchCategory');

const BaseCategoryFilter = () =>
    import('@/views/certification/components/searchAbility/BaseCategoryFilter');

export default {
    name: 'SearchAbilityViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BaseCardViewComponent,
        BaseNotFoundContent,
        BaseSearchCategory,
        BaseCategoryFilter,
    },

    data() {
        return {
            searchCount: 0,
            loading: false,
            definition: null,
            categories: [],
            qualificationList: [],
            qualificationSelected: [],
            componentKey: 0,
        };
    },

    created() {
        if (!this.entity?.qualifications) {
            this.entity.qualifications = [];
        }
    },

    methods: {
        forceRerender() {
            this.componentKey += 1;
        },

        $_sendToApi() {
            const size = 50;
            let result,
                method = 'get',
                requestBody = undefined;

            this.qualificationList = [];
            this.searchCount++;
            this.loading = true;

            if (
                baseSharedFnHelper.$_checkValueNull(this.definition) &&
                baseSharedFnHelper.$_checkValueNull(this.categories)
            ) {
                result = `cualificacion/getAll?size=${size}`;
            } else if (
                !baseSharedFnHelper.$_checkValueNull(this.definition) &&
                baseSharedFnHelper.$_checkValueNull(this.categories)
            ) {
                result = `cualificacion/findAllByDefinicion/${this.definition}?size=${size}`;
            } else if (
                !baseSharedFnHelper.$_checkValueNull(this.definition) &&
                !baseSharedFnHelper.$_checkValueNull(this.categories)
            ) {
                method = 'post';
                requestBody = {
                    categoriaIds: baseSharedFnHelper.$_createArrFromProperty(
                        this.categories,
                        'id'
                    ),
                };
                result = `cualificacion/findAllByDefinicion/${this.definition}/AndCategoriaIdIn?size=${size}`;
            } else if (
                baseSharedFnHelper.$_checkValueNull(this.definition) &&
                !baseSharedFnHelper.$_checkValueNull(this.categories)
            ) {
                method = 'post';
                requestBody = {
                    categoriaIds: baseSharedFnHelper.$_createArrFromProperty(
                        this.categories,
                        'id'
                    ),
                };
                result = `cualificacion/findAllByCategoriaIdIn?size=${size}`;
            }

            httpService[method](result, requestBody).then((response) => {
                if (response != undefined) {
                    this.qualificationList = response.data.content;
                }
                this.loading = false;
            });
        },

        $_clearFilter() {
            this.definition = undefined;
            this.$_sendToApi();
        },

        $_reviewQualification(id) {
            return baseSharedFnHelper.$_getObjectFromArray(
                this.entity.qualifications,
                id,
                'cualificacionId'
            );
        },

        $_insertQualification(qualification) {
            this.entity.qualifications.push({
                cualificacionId: qualification.id,
                nombreCualificacion: qualification.definicion,
                proposito: qualification.proposito,
                porcentajeCertificado: 0,
            });
        },

        $_deleteQualification(id) {
            this.entity.qualifications.splice(
                baseSharedFnHelper.$_returnCurrentIndex(
                    this.entity.qualifications,
                    id,
                    'cualificacionId'
                ),
                1
            );
        },

        $_setQualification(qualification) {
            if (!this.$_reviewQualification(qualification.id)) {
                this.$_insertQualification(qualification);
            } else {
                this.$_deleteQualification(qualification.id);
            }
            this.forceRerender();
        },

        $_goBack() {
            this.$router.push({
                name: 'MyAbilitiesViewComponent',
            });
        },

        $_nextStep() {
            if (this.entity.qualifications.length > 0) {
                this.entity.step = 2;
            }
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Explora tus indicadores"
        subtitle="Cuéntanos qué sabes hacer"
        :btnAction="$_goBack"
    >
        <div slot="card-text">
            <v-layout justify-space-between>
                <v-col align-self="auto" cols="8" md="10">
                    <BaseInput
                        label="Buscar"
                        v-model="definition"
                        :max="50"
                        hint="Ejemplo: Análisis de Datos"
                        persistent-hint
                        appendIcon="mdi-magnify"
                        @keydown.enter="$_sendToApi"
                        @click:append="$_sendToApi"
                        clearable
                        @click:clear="$_clearFilter"
                    />
                </v-col>
                <v-col align-self="auto">
                    <BaseSearchCategory
                        :categoriesList="categories"
                        :fn="$_sendToApi"
                    />
                </v-col>
            </v-layout>

            <BaseCategoryFilter :categories="categories" :fn="$_sendToApi" />

            <v-row align-content="center" justify="center">
                <BaseSkeletonLoader v-if="loading" type="list-item-avatar" />
                <v-row v-else-if="qualificationList.length > 0">
                    <v-col cols="12">
                        <v-card
                            flat
                            class="overflow-auto"
                            :height="qualificationList.length > 5 ? 350 : 250"
                        >
                            <v-card-text>
                                <v-list-item-group
                                    multiple
                                    v-model="qualificationSelected"
                                >
                                    <div
                                        v-for="item in qualificationList"
                                        :key="item.id"
                                    >
                                        <v-list-item
                                            :key="item.id"
                                            :value="item.id"
                                            @click="$_setQualification(item)"
                                        >
                                            <template
                                                v-slot:default="{ active }"
                                            >
                                                <v-list-item-action>
                                                    <v-checkbox
                                                        :input-value="active"
                                                    ></v-checkbox>
                                                </v-list-item-action>

                                                <v-list-item-content>
                                                    <v-list-item-title
                                                        class="buo-white-space"
                                                        >{{
                                                            item.definicion
                                                        }}</v-list-item-title
                                                    >
                                                </v-list-item-content>
                                            </template>
                                        </v-list-item>
                                    </div>
                                </v-list-item-group>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>

                <BaseNotFoundContent
                    v-else-if="qualificationList.length <= 0 && searchCount > 0"
                    msg="No encontramos resultados."
                />
            </v-row>
            <br />
            <v-row>
                <v-col cols="12">
                    <v-btn
                        @click="$_nextStep"
                        :key="componentKey"
                        block
                        dark
                        :color="
                            entity.qualifications &&
                            entity.qualifications.length > 0
                                ? 'primary'
                                : 'grey500'
                        "
                        class="no-uppercase rounded-lg"
                        >Agregar
                        {{
                            entity.qualifications &&
                            entity.qualifications.length > 0
                                ? '(' + entity.qualifications.length + ')'
                                : ''
                        }}</v-btn
                    >
                </v-col>
            </v-row>
        </div>
    </BaseCardViewComponent>
</template>
