<script>
/**
 * Descripción: Pantalla Mis Habilidades BUO Wallet
 *
 * @displayName AbilityViewComponent
 */

import { mapGetters, mapActions } from 'vuex';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseMyAbilities = () =>
    import('@/components/wallet/common/myAbilities/BaseMyAbilities');

export default {
    name: 'AbilityViewComponent',

    metaInfo: { title: 'Mis Indicadores' },

    components: {
        BaseCardViewComponent,
        BaseMyAbilities,
    },

    computed: {
        /**
         * Objecto de Wallet
         */
        ...mapGetters('wallet', ['buoWallet']),
    },

    created() {
        /**
         * Obtener BUO Wallet Object
         */
        if (!this.buoWallet) {
            this.$_wallet_getbyuserid();
        }

        //TODO: How to implement on vue router the background config
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.clouds;
    },

    methods: {
        ...mapActions('wallet', ['$_wallet_getbyuserid']),

        /**
         * Volver al Wallet
         */
        $_returnToWallet() {
            this.$router.push({
                name: 'HomeViewComponent',
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        :btnAction="$_returnToWallet"
        title="Mis Indicadores"
        subtitle="Aquí puedes visualizar, agregar y validar todos tus
                    indicadores."
    >
        <div slot="body">
            <BaseMyAbilities />
        </div>
    </BaseCardViewComponent>
</template>
