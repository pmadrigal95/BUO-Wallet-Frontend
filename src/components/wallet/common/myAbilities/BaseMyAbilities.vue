<script>
/**
 * Descripción: Lista de mis habilidades
 *
 * @displayName BaseMyAbilities
 */

import { mapGetters, mapActions } from 'vuex';

const BaseMyAbilitiesList = () =>
    import(
        '@/components/wallet/common/myAbilities/components/BaseMyAbilitiesList'
    );

export default {
    name: 'BaseMyAbilities',

    components: {
        BaseMyAbilitiesList,
    },

    data() {
        return {
            step: 0,
            search: undefined,
            showSearchInput: false,
        };
    },

    /**
     * Filtro por Estado
     */
    computed: {
        /**
         * Objecto de Wallet
         */
        ...mapGetters('wallet', [
            'buoWallet',
            'loadingWallet',
            'validatedCode',
            'inProgressCode',
            'notValidatedCode',
        ]),

        ...mapGetters('theme', ['app']),

        validatedList() {
            return this.buoWallet.habilidades
                .filter((x) => x.estadoId == this.validatedCode)
                .slice(0, 100);
        },
        inReviewList() {
            return this.buoWallet.habilidades
                .filter((x) => x.estadoId == this.inProgressCode)
                .slice(0, 100);
        },
        notValidatedList() {
            return this.buoWallet.habilidades
                .filter((x) => x.estadoId == this.notValidatedCode)
                .slice(0, 100);
        },
    },

    methods: {
        ...mapActions('wallet', ['$_wallet_getbyuserid']),

        $_goToModule(module) {
            this.$router.push({
                name: module,
            });
        },

        $_showSearchInput() {
            this.showSearchInput = !this.showSearchInput;
        },

        $_ParamsToAPI() {
            this.$_wallet_getbyuserid(this.search);
        },

        $_clear() {
            this.search = null;
            this.$_ParamsToAPI();
        },
    },
};
</script>

<template>
    <v-card flat max-width="100%" max-height="100%" class="rounded-t-xl">
        <v-card-title
            class="BUO-Paragraph-Large-SemiBold"
            :class="[app ? 'white--text' : 'grey700--text']"
        >
            Mis Indicadores
            <v-layout justify-end>
                <v-btn
                    v-if="$route.name == 'HomeViewComponent'"
                    class="no-uppercase rounded-lg BUO-Label-XSmall-SemiBold"
                    elevation="0"
                    text
                    :color="app ? 'clouds' : 'blue900'"
                    @click="$_goToModule('MyAbilitiesViewComponent')"
                >
                    Descubre más
                    <v-icon right>mdi-chevron-right</v-icon>
                </v-btn>

                <v-btn
                    icon
                    :color="app ? 'clouds' : 'blue900'"
                    v-if="$route.name == 'MyAbilitiesViewComponent'"
                    @click="$_showSearchInput"
                >
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <v-btn
                    class="ma-1 no-uppercase rounded-lg BUO-Label-XSmall-SemiBold"
                    elevation="0"
                    depressed
                    small
                    dark
                    color="blue900"
                    v-if="$route.name == 'MyAbilitiesViewComponent'"
                    @click="$_goToModule('CertificationViewComponent')"
                >
                    Agregar
                    <v-icon right> mdi-plus </v-icon>
                </v-btn>
            </v-layout>
        </v-card-title>

        <v-card-text>
            <v-row v-if="showSearchInput" justify="end">
                <v-col cols="12" md="6">
                    <BaseInput
                        label="Buscar"
                        v-model="search"
                        :max="50"
                        @keydown.enter="$_ParamsToAPI"
                        @click:prepend-inner="$_ParamsToAPI"
                        prependInnerIcon="mdi-magnify"
                        clearable
                        @click:clear="$_clear"
                        rounded
                        flat
                        dense
                    />
                </v-col>
            </v-row>
            <!-- @ Use Loanding... -->
            <BaseSkeletonLoader
                v-if="!buoWallet || loadingWallet"
                type="card-avatar"
            />
            <section v-else>
                <v-tabs
                    v-model="step"
                    right
                    show-arrows
                    height="25"
                    class="pa-6 pt-5"
                    flat
                    :color="app ? 'white' : 'primary'"
                >
                    <v-tabs-slider color="transparent"></v-tabs-slider>
                    <v-tab
                        class="BUO-Label-Small-SemiBold rounded-pill no-uppercase"
                    >
                        Aprobadas
                    </v-tab>
                    <v-tab
                        class="BUO-Label-Small-SemiBold rounded-pill no-uppercase"
                    >
                        Pendientes
                    </v-tab>
                    <v-tab
                        class="BUO-Label-Small-SemiBold rounded-pill no-uppercase"
                    >
                        Asignadas
                    </v-tab>
                </v-tabs>

                <v-tabs-items v-model="step" class="pa-5">
                    <v-tab-item>
                        <BaseMyAbilitiesList :myAbilitiesList="validatedList" />
                    </v-tab-item>

                    <v-tab-item class="rounded-pill no-uppercase">
                        <BaseMyAbilitiesList :myAbilitiesList="inReviewList" />
                    </v-tab-item>

                    <v-tab-item class="rounded-pill no-uppercase">
                        <BaseMyAbilitiesList
                            :myAbilitiesList="notValidatedList"
                        />
                    </v-tab-item>
                </v-tabs-items>
            </section>
        </v-card-text>
    </v-card>
</template>
