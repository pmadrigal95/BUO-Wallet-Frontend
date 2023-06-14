<script>
/**
 * Descripción: Pantalla BaseMaximizeMyPotential
 *
 * @displayName BaseMaximizeMyPotential
 */

import { mapGetters } from 'vuex';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper.js';

const BasePDAPayment = () =>
    import('@/views/pda/wallet/home/components/BasePDAPayment');

export default {
    name: 'BaseMaximizeMyPotential',

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'loadingPdaWallet', 'premium']),
        color() {
            return baseSharedFnHelper.$_returnRandomPDAGradient();
        },
    },

    components: {
        BasePDAPayment,
    },

    methods: {
        $_open() {
            this.$refs['popUp'].$_open();
        },
    },
};
</script>

<template>
    <section>
        <BasePDAPayment ref="popUp" />
        <v-card flat max-width="100%" max-height="100%">
            <BaseSkeletonLoader v-if="loadingPdaWallet" type="image" />
            <v-card
                flat
                :color="
                    pdaWallet.tipoMembrecia == premium ? 'white' : 'transparent'
                "
                v-else-if="pdaWallet.potencial"
            >
                <v-card-title
                    v-if="pdaWallet && pdaWallet.tipoMembrecia == premium"
                    class="buo-word-break grey700--text BUO-Paragraph-Large-SemiBold"
                >
                    ¿Cómo maximizar mi potencial?
                </v-card-title>

                <v-img
                    style="cursor: pointer"
                    @click="$_open"
                    v-if="
                        pdaWallet &&
                        pdaWallet.tipoMembrecia != premium &&
                        !$vuetify.breakpoint.smAndDown
                    "
                    contain
                    max-width="100%"
                    max-height="100%"
                    src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/pda-bannerPayment.png"
                    lazy-src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/pda-bannerPayment.png"
                ></v-img>
                <v-card
                    v-if="
                        pdaWallet &&
                        pdaWallet.tipoMembrecia != premium &&
                        $vuetify.breakpoint.smAndDown
                    "
                    flat
                    dark
                    color="transparent"
                    :class="`rounded-lg ${color}`"
                    width="100%"
                    height="100%"
                >
                    <v-card-text>
                        <v-img
                            contain
                            height="30px"
                            src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/pda-brandDark.svg"
                            lazy-src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/pda-brandDark.svg"
                        />
                    </v-card-text>
                    <v-card-subtitle
                        class="buo-word-break text-center BUO-Paragraph-Medium white--text"
                    >
                        <b>¡MAXIMIZA TU POTENCIAL!</b>
                    </v-card-subtitle>

                    <v-card-text>
                        <v-layout justify-center>
                            <v-btn
                                color="black"
                                depressed
                                block
                                @click="$_open"
                                class="ma-2 rounded-lg BUO-Paragraph-Small-SemiBold"
                                elevation="0"
                            >
                                Accede a tu perfil completo
                            </v-btn>
                        </v-layout>
                    </v-card-text>
                </v-card>

                <v-card-text
                    v-if="pdaWallet && pdaWallet.tipoMembrecia == premium"
                >
                    <v-list
                        dense
                        flat
                        v-if="pdaWallet && pdaWallet.tipoMembrecia == premium"
                    >
                        <v-list-item
                            v-for="(item, i) in pdaWallet.potencial"
                            :key="i"
                        >
                            <v-list-item-avatar>
                                <v-icon
                                    :color="pdaWallet.perfilPDA.toLowerCase()"
                                    >mdi-check-circle-outline</v-icon
                                >
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title
                                    ><span
                                        class="buo-word-break buo-white-space grey700--text BUO-Paragraph-Small"
                                        >{{ item }}</span
                                    ></v-list-item-title
                                >
                                <v-divider
                                    v-if="$vuetify.breakpoint.smAndDown"
                                ></v-divider>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-card>
    </section>
</template>
