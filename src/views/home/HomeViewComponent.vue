<script>
/**
 * Descripción: Pantalla Home BUO Wallet
 *
 * @displayName BUOWalletHomeViewComponent Test
 */

import { mapGetters, mapActions } from 'vuex';

const MenuCardViewComponent = () =>
    import('@/views/home/components/MenuCardViewComponent');

const BaseMyAbilities = () =>
    import('@/components/wallet/common/myAbilities/BaseMyAbilities');

const ExploreBUOViewComponent = () =>
    import('@/components/wallet/ExploreBUOViewComponent');

export default {
    name: 'HomeViewComponent',

    metaInfo: { title: 'BUO Wallet' },

    components: {
        MenuCardViewComponent,
        BaseMyAbilities,
        ExploreBUOViewComponent,
    },

    computed: {
        ...mapGetters('security', ['permissionList', 'loadingSecurity']),

        ...mapGetters('theme', ['app']),

        $_shareables() {
            return this.permissionList.find(
                (x) => x.nombre === 'ShareablesView'
            ).subMenu;
        },
    },

    created() {
        /**
         * Obtener BUO Wallet Object
         */
        this.$_wallet_getbyuserid();

        //TODO: How to implement on vue router the background config
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.clouds;
    },

    methods: {
        ...mapActions('wallet', ['$_wallet_getbyuserid']),
    },
};
</script>

<template>
    <v-row>
        <v-col cols="12" md="9" offset-md="1">
            <v-layout justify-end v-if="!loadingSecurity">
                <div class="text-center">
                    <v-menu offset-y rounded>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                                :class="[
                                    app ? 'grey700' : 'Buo-White-Background',
                                ]"
                                elevation="0"
                                depressed
                                outlined
                                :color="app ? 'white' : 'primary'"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <span class="BUO-Paragraph-Small-SemiBold">
                                    Compartir
                                </span>
                                <v-icon small right dark>
                                    mdi-share-variant-outline
                                </v-icon>
                            </v-btn>
                        </template>
                        <v-list v-if="$_shareables && $_shareables.length > 0">
                            <section
                                v-for="(item, index) in $_shareables"
                                :key="index"
                            >
                                <v-list-item :to="{ name: item.rutaURL }">
                                    <v-list-item-title>{{
                                        item.nombreUI
                                    }}</v-list-item-title>
                                </v-list-item>
                            </section>
                        </v-list>
                    </v-menu>
                </div>
            </v-layout>
        </v-col>
        <v-col cols="12" md="9" offset-md="1">
            <MenuCardViewComponent />
        </v-col>

        <v-col cols="12" md="9" offset-md="1">
            <BaseMyAbilities />
        </v-col>

        <v-col cols="12" md="9" offset-md="1">
            <ExploreBUOViewComponent v-if="$vuetify.breakpoint.mobile" />
        </v-col>
    </v-row>
</template>
