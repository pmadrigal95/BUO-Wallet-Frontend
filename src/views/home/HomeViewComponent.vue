<script>
/**
 * Descripción: Pantalla Home BUO Wallet
 *
 * @displayName BUOWalletHomeViewComponent Test
 */

import { mapActions } from 'vuex';

// const MenuCardViewComponent = () =>
//     import('@/views/buoWallet/home/components/MenuCardViewComponent');

const BaseMyAbilities = () =>
    import('@/components/wallet/common/myAbilities/BaseMyAbilities');

const ExploreBUOViewComponent = () =>
    import('@/components/wallet/ExploreBUOViewComponent');

export default {
    name: 'HomeViewComponent',

    metaInfo: { title: 'BUO Wallet' },

    components: {
        // MenuCardViewComponent,
        BaseMyAbilities,
        ExploreBUOViewComponent,
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

    destroyed() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.white;
    },

    methods: {
        ...mapActions('wallet', ['$_wallet_getbyuserid']),

        // $_BuoShareableLink() {
        //     this.$router.push({
        //         name: 'BUOWalletShareableLinkViewComponent',
        //     });
        // },
    },
};
</script>

<template>
    <v-row>
        <v-col cols="12" md="9" offset-md="1">
            <v-layout justify-end>
                <!-- <v-btn
                    class="ma-1 no-uppercase rounded-lg"
                    depressed
                    color="white"
                    @click="$_BuoShareableLink"
                >
                    <span class="BUO-Primary"> Compartir Wallet </span>
                    <v-icon small right dark color="primary">
                        mdi-share-variant-outline
                    </v-icon>
                </v-btn> -->
            </v-layout>
        </v-col>
        <v-col cols="12" md="9" offset-md="1">
            <!-- <MenuCardViewComponent /> -->
        </v-col>

        <v-col cols="12" md="9" offset-md="1">
            <BaseMyAbilities />
        </v-col>

        <v-col cols="12" md="9" offset-md="1">
            <ExploreBUOViewComponent v-if="$vuetify.breakpoint.mobile" />
        </v-col>
    </v-row>
</template>
