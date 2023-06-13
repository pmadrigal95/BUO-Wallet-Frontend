<script>
/**
 * Descripción: Pantalla PDA Habilidades
 *
 * @displayName BaseShareableMyAbilitiesViewComponent
 */

import '@/css/pda.css';

import { mapGetters } from 'vuex';

const BaseShareableAbilitiesPDA = () =>
    import('@/components/pda/shareable/test/BaseShareableAbilitiesPDA');

export default {
    name: 'BaseShareableMyAbilitiesViewComponent',

    components: {
        BaseShareableAbilitiesPDA,
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
                name: 'MyAbilitiesPDAViewComponent',
            });
        },

        $_data() {
            return {
                name: this.user.name.split(' ')[0],
                habilidadPDADTOSet: this.pdaWallet.habilidadPDADTOSet,
                profile:
                    this.$vuetify.theme.themes.light[
                        this.pdaWallet.perfilPDA.toLowerCase()
                    ],
                perfilPDA: this.pdaWallet.perfilPDA.toLowerCase(),
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
                class="no-uppercase rounded-lg"
                elevation="0"
                text
                @click="$_returnToWallet"
            >
                <v-icon left dark> mdi-chevron-left </v-icon>Regresar</v-btn
            >
        </v-layout>
        <BaseShareableAbilitiesPDA
            ref="BaseShareableAbilitiesPDA"
            :entity="$_data()"
            v-if="pdaWallet"
        />
    </div>
</template>
