<script>
/**
 * Descripción: Pantalla de Buscar Habilidad
 *
 * @displayName BaseSearchCategory
 */

import httpService from '@/services/axios/httpService';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper.js';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseNotFoundContent = () =>
    import('@/components/core/cards/BaseNotFoundContent');

export default {
    name: 'BaseSearchCategory',

    props: {
        fn: {
            type: Function,
            requiered: true,
        },

        categoriesList: {
            type: Array,
            requiered: true,
        },
    },

    components: {
        BaseCardViewComponent,
        BaseNotFoundContent,
    },

    data() {
        return {
            loading: false,
            name: null,
            categories: [],
            categoriesTemp: [],
            categoriesSelected: [],
            componentKey: 0,
        };
    },

    methods: {
        forceRerender() {
            this.componentKey += 1;
        },

        $_openModal() {
            if (this.categories.length <= 0) {
                this.$_sendToApi();
            }

            this.$_updateSelected();

            this.forceRerender();

            this.$refs['popUp'].$_openModal();
        },

        $_updateSelected() {
            this.categoriesSelected = [];

            this.$_updateCategoriesTemp();

            this.categoriesTemp.forEach((element) => {
                let index = baseSharedFnHelper.$_returnCurrentIndex(
                    this.categories,
                    element.id
                );
                if (index >= 0) {
                    this.categoriesSelected.push(index);
                }
            });
        },

        $_sendToApi() {
            const size = 50;
            let result;

            this.categories = [];

            this.loading = true;

            result = baseSharedFnHelper.$_checkValueNull(this.name)
                ? `categoria/getAllDTO?size=${size}`
                : `categoria/getAllDTOByNombre/${this.name}?size=${size}`;

            httpService.get(result).then((response) => {
                if (response != undefined) {
                    // Encontro la entidad
                    this.categories = response.data.content;
                    this.$_updateSelected();
                }
                this.loading = false;
            });
        },

        $_clearFilter() {
            this.name = undefined;
            this.$_sendToApi();
        },

        $_reviewCategoriesTemp(id) {
            return baseSharedFnHelper.$_getObjectFromArray(
                this.categoriesTemp,
                id
            );
        },

        $_insertCategoryToTemp(id) {
            this.categoriesTemp.push(
                baseSharedFnHelper.$_getObjectFromArray(this.categories, id)
            );
        },

        $_deleteCategoryToTemp(category) {
            this.categoriesTemp.splice(
                baseSharedFnHelper.$_returnCurrentIndex(
                    this.categoriesTemp,
                    category.id
                ),
                1
            );
        },

        $_setCategoriesTemp(id) {
            if (!this.$_reviewCategoriesTemp(id)) {
                this.$_insertCategoryToTemp(id);
            } else {
                this.$_deleteCategoryToTemp(this.$_reviewCategoriesTemp(id));
            }
        },

        $_updateCategoriesList() {
            this.categoriesList.length = 0;
            this.categoriesTemp.forEach((element) => {
                let index = baseSharedFnHelper.$_returnCurrentIndex(
                    this.categoriesList,
                    element.id
                );
                if (index < 0) {
                    this.categoriesList.push(element);
                }
            });
        },

        $_updateCategoriesTemp() {
            this.categoriesTemp.length = 0;
            this.categoriesList.forEach((element) => {
                let index = baseSharedFnHelper.$_returnCurrentIndex(
                    this.categoriesTemp,
                    element.id
                );
                if (index < 0) {
                    this.categoriesTemp.push(element);
                }
            });
        },

        $_sendToSearchAbilities() {
            if (this.categoriesTemp.length > 0) {
                this.$_updateCategoriesList();
                this.fn();
                this.$refs['popUp'].$_openModal();
            }
        },
    },
};
</script>

<template>
    <div>
        <BasePopUp
            ref="popUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '45%'"
            scrollable
        >
            <div slot="Content">
                <br />
                <BaseCardViewComponent
                    title="Filtra por categoría"
                    md="12"
                    offset="0"
                    :key="componentKey"
                >
                    <div slot="card-text">
                        <v-row align-content="center" justify="center">
                            <v-col cols="12">
                                <BaseInput
                                    label="Buscar"
                                    v-model="name"
                                    :max="50"
                                    hint="Ejemplo: Habilidades blandas"
                                    persistent-hint
                                    appendIcon="mdi-magnify"
                                    clearable
                                    @keydown.enter="$_sendToApi"
                                    @click:append="$_sendToApi"
                                    @click:clear="$_clearFilter"
                                />
                            </v-col>
                            <v-col cols="12">
                                <BaseSkeletonLoader
                                    v-if="loading"
                                    type="list-item-avatar"
                                />
                                <v-row
                                    align-content="center"
                                    v-else-if="categories.length > 0"
                                >
                                    <v-chip-group
                                        multiple
                                        column
                                        v-model="categoriesSelected"
                                        active-class="primary--text"
                                    >
                                        <v-chip
                                            style="
                                                height: auto;
                                                white-space: normal;
                                            "
                                            small
                                            v-for="category in categories"
                                            :key="category.id"
                                            filter
                                            filter-icon="mdi-check-circle"
                                            @click="
                                                $_setCategoriesTemp(category.id)
                                            "
                                        >
                                            <span>
                                                {{ category.nombre }}
                                            </span>
                                        </v-chip>
                                    </v-chip-group>
                                </v-row>

                                <BaseNotFoundContent
                                    v-else-if="categories.length <= 0"
                                    msg="No encontramos resultados."
                                />
                            </v-col>
                        </v-row>
                    </div>

                    <div slot="body">
                        <v-btn
                            block
                            dark
                            :color="
                                categoriesTemp.length > 0
                                    ? 'primary'
                                    : 'grey500'
                            "
                            class="no-uppercase rounded-lg"
                            @click="$_sendToSearchAbilities"
                            >Agregar
                            {{
                                categoriesTemp.length > 0
                                    ? '(' + categoriesTemp.length + ')'
                                    : ''
                            }}</v-btn
                        >
                    </div>
                </BaseCardViewComponent>
            </div>
        </BasePopUp>
        <v-btn outlined x-large @click="$_openModal" right>
            <v-icon>mdi-tune</v-icon>
        </v-btn>
    </div>
</template>
