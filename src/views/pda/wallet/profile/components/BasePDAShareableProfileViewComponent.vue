<script>
/**
 * Descripción: Pantalla PDA Wallet
 *
 * @displayName PDAWalletViewComponent
 */

import '@/css/pda.css';

import { mapGetters } from 'vuex';

const BaseShareableTestProfile = () =>
    import('@/components/pda/shareable/test/BaseShareableTestProfile');

export default {
    name: 'PDAWalletViewComponent',

    components: {
        BaseShareableTestProfile,
    },

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'premium']),
        ...mapGetters('authentication', ['user']),
    },

    mounted() {
        if (this.pdaWallet && this.pdaWallet.tipoMembrecia != this.premium) {
            this.$_returnToWallet();
        }
    },

    methods: {
        /**
         * Volver al Wallet
         */
        $_returnToWallet() {
            this.$router.push({
                name: 'PDAWalletViewComponent',
            });
        },

        $_returnToProfile() {
            this.$router.push({
                name: 'PDAProfileViewComponent',
            });
        },

        $_profile() {
            return {
                name: this.user.name.split(' ')[0],
                perfilPDAVisual: this.pdaWallet.perfilPDAVisual,
                perfilPDA: this.pdaWallet.perfilPDA,
                superpoder: this.pdaWallet.superpoder,
                hotcakeURL: this.pdaWallet.hotcakeURL,
                benchmarkFormato: this.pdaWallet.benchmarkFormato,
            };
        },
    },
};
</script>

<template>
    <div v-if="pdaWallet">
        <v-layout justify-start align-center>
            <v-btn
                color="blue800"
                class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                text
                @click="$_returnToProfile"
            >
                <v-icon left dark> mdi-chevron-left </v-icon>Regresar</v-btn
            >
        </v-layout>
        <BaseShareableTestProfile
            ref="BaseShareableTestProfile"
            :entity="$_profile()"
        />
    </div>
</template>
