<script>
/**
 * Descripción: Pantalla Mis habilidades
 *
 * @displayName menuCardViewComponent
 */

import { mapGetters } from 'vuex';

const BaseCardMenu = () => import('@/components/core/cards/BaseCardMenu');

export default {
    name: 'menuCardViewComponent',

    components: {
        BaseCardMenu,
    },

    computed: {
        /**
         * Objecto de Usuario
         */
        ...mapGetters('authentication', ['user']),

        /**
         * Objecto de Wallet
         */
        ...mapGetters('wallet', [
            'buoWallet',
            'loadingWallet',
            'validatedCode',
        ]),

        validatedList() {
            return this.buoWallet.habilidades.filter(
                (x) => x.estadoId == this.validatedCode
            ).length;
        },

        menuItems() {
            return [
                {
                    src: 'https://buo-resources.s3.us-east-2.amazonaws.com/wallet/skills.svg',
                    title: 'Indicadores',
                    subtitle:
                        this.validatedList > 0
                            ? this.validatedList
                            : 'Sin Indicadores',
                    module: 'MyAbilitiesViewComponent',
                },
                {
                    src: 'https://buo-resources.s3.us-east-2.amazonaws.com/wallet/test.svg',
                    title: 'Prueba Psychometric',
                    subtitle: this.user.pdaCompleted
                        ? 'Ver resultados'
                        : 'Descubre tu perfil',
                    module: 'TestTakingViewComponent',
                },
                {
                    src: 'https://buo-resources.s3.us-east-2.amazonaws.com/wallet/company.svg',
                    title: 'Mi empresa',
                    subtitle: 'Disponible pronto...' /*this.user?.companyName
                        ? this.user?.companyName
                        : 'Sin empresa',*/,
                    module: undefined,
                },
            ];
        },
    },
};
</script>

<template>
    <div>
        <!-- @ Use Loanding... -->
        <BaseSkeletonLoader
            v-if="!user || !buoWallet || loadingWallet"
            type="image"
        />
        <v-flex xs12 sm12 md12 v-else>
            <!--Desktop-->
            <BaseCardMenu :menuItems="menuItems" />
        </v-flex>
    </div>
</template>
