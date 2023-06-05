<script>
/**
 * Descripción: Pantalla BasePDAProfile
 *
 * @displayName BasePDAProfile
 */

import { mapGetters } from 'vuex';

const MenuCardViewComponent = () =>
    import('@/views/pda/wallet/home/components/MenuCardViewComponent');

const BasePDAPayment = () =>
    import('@/views/pda/wallet/home/components/BasePDAPayment');

export default {
    name: 'BasePDAProfile',

    components: {
        MenuCardViewComponent,
        BasePDAPayment,
    },

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'loadingPdaWallet', 'premium']),
    },

    methods: {
        $_returnToProfile() {
            if (this.pdaWallet.tipoMembrecia == this.premium) {
                this.$router.push({
                    name: 'PDAProfileViewComponent',
                });
            } else {
                this.$_open();
            }
        },

        $_open() {
            this.$refs['popUp'].$_open();
        },
    },
};
</script>

<template>
    <v-card flat class="rounded-t-xl">
        <BasePDAPayment ref="popUp" />
        <BaseSkeletonLoader v-if="loadingPdaWallet" type="image" />
        <div v-else>
            <v-card-text>
                <v-layout justify-center @click="$_returnToProfile">
                    <v-img
                        v-if="pdaWallet.hotcakeURL"
                        contain
                        height="220"
                        width="151"
                        :src="pdaWallet.hotcakeURL"
                        :lazy-src="pdaWallet.hotcakeURL"
                        style="cursor: pointer"
                    />
                </v-layout>
                <v-card-subtitle
                    class="BUO-Paragraph-Large buo-word-break text-center"
                >
                    <div class="BUO-Heading-XSmall">
                        {{ pdaWallet.perfilPDAVisual }}
                    </div>
                    Tu superpoder es
                    <b>{{ pdaWallet.superpoder }}</b
                    >.
                </v-card-subtitle>
            </v-card-text>

            <v-card-text v-if="pdaWallet && pdaWallet.tipoMembrecia == premium">
                <MenuCardViewComponent />
            </v-card-text>
        </div>
    </v-card>
</template>
