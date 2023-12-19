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
        ...mapGetters('theme', ['app']),
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
        <section v-else>
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
                <v-card-subtitle class="buo-word-break text-center">
                    <section
                        class="BUO-Heading-XSmall"
                        :class="[
                            app ? 'blueProgress600--text' : 'grey700--text',
                        ]"
                    >
                        {{ pdaWallet.perfilPDAVisual }}
                    </section>
                    <section
                        class="BUO-Paragraph-Small"
                        :class="[app ? 'white--text' : 'black--text']"
                    >
                        Tu superpoder es
                        <b>{{ pdaWallet.superpoder }}</b
                        >.
                    </section>
                </v-card-subtitle>
            </v-card-text>

            <v-card-text v-if="pdaWallet && pdaWallet.tipoMembrecia == premium">
                <MenuCardViewComponent />
                <v-layout justify-end>
                    <p class="BUO-Label-XSmall pt-4 px-4">
                        Powered by PDA International
                    </p></v-layout
                >
            </v-card-text>
        </section>
    </v-card>
</template>
