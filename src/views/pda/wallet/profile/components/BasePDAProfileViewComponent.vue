<script>
/**
 * Descripción: Pantalla PDA Wallet
 *
 * @displayName PDAWalletViewComponent
 */

import { mapGetters } from 'vuex';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const ExploreBUOViewComponent = () =>
    import('@/components/wallet/ExploreBUOViewComponent');

export default {
    name: 'PDAWalletViewComponent',

    components: {
        BaseCardViewComponent,
        ExploreBUOViewComponent,
    },

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'premium']),
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

        $_shareableLink() {
            this.$router.push({
                name: 'PDAShareableProfileViewComponent',
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent :btnAction="$_returnToWallet" v-if="pdaWallet">
        <div slot="top-actions">
            <v-layout justify-end align-end>
                <v-btn
                    class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                    elevation="0"
                    text
                    @click="$_shareableLink"
                >
                    Compartir
                    <v-icon right dark>
                        mdi-share-variant-outline
                    </v-icon></v-btn
                >
            </v-layout>
        </div>
        <div slot="card-text">
            <v-card flat class="rounded-t-xl mb-6">
                <v-layout justify-center>
                    <v-img
                        v-if="pdaWallet.hotcakeURL"
                        contain
                        height="220"
                        width="151"
                        :src="pdaWallet.hotcakeURL"
                        :lazy-src="pdaWallet.hotcakeURL"
                    />
                </v-layout>
                <v-card-subtitle
                    class="BUO-Paragraph-Small buo-word-break text-center grey700--text"
                >
                    Tu Perfil:
                    <section class="BUO-Heading-XSmall grey700--text">
                        {{ pdaWallet.perfilPDAVisual }}
                    </section>
                </v-card-subtitle>

                <v-card-subtitle
                    class="BUO-Paragraph-Small buo-word-break text-center black--text pt-0"
                >
                    Tu superpoder es
                    <b>{{ pdaWallet.superpoder }}</b
                    >.
                </v-card-subtitle>

                <v-card-text>
                    <v-card flat class="pt-2">
                        <v-card-title
                            class="BUO-Paragraph-Small-SemiBold buo-word-break black--text"
                        >
                            Descripción del perfil
                        </v-card-title>
                        <v-card-text
                            class="BUO-Paragraph-Small buo-word-break black--text"
                        >
                            {{ pdaWallet.descripcion }}
                        </v-card-text>
                    </v-card>
                </v-card-text>
            </v-card>
            <v-card flat class="mb-6" v-if="pdaWallet.caracteristicas">
                <v-card-title
                    class="buo-word-break BUO-Paragraph-Large-SemiBold grey700--text"
                >
                    Características del perfil
                </v-card-title>

                <v-list
                    dense
                    flat
                    v-if="pdaWallet && pdaWallet.tipoMembrecia == premium"
                >
                    <v-list-item
                        v-for="(item, i) in pdaWallet.caracteristicas"
                        :key="i"
                    >
                        <v-list-item-avatar>
                            <v-icon :color="pdaWallet.perfilPDA.toLowerCase()"
                                >mdi-check-circle-outline</v-icon
                            >
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title
                                ><span
                                    class="BUO-Paragraph-Small buo-word-break buo-white-space grey600--text"
                                    >{{ item }}</span
                                ></v-list-item-title
                            >
                            <v-divider
                                v-if="$vuetify.breakpoint.smAndDown"
                            ></v-divider>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
            <v-card flat class="mb-6" v-if="pdaWallet.caracteristicas">
                <v-card-title
                    class="buo-word-break BUO-Paragraph-Large-SemiBold grey700--text"
                >
                    Motivadores
                </v-card-title>

                <v-list
                    dense
                    flat
                    v-if="pdaWallet && pdaWallet.tipoMembrecia == premium"
                >
                    <v-list-item
                        v-for="(item, i) in pdaWallet.motivadores"
                        :key="i"
                    >
                        <v-list-item-avatar>
                            <v-icon :color="pdaWallet.perfilPDA.toLowerCase()"
                                >mdi-check-circle-outline</v-icon
                            >
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title
                                ><span
                                    class="BUO-Paragraph-Small buo-word-break buo-white-space grey600--text"
                                    >{{ item }}</span
                                ></v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </div>

        <div slot="body">
            <ExploreBUOViewComponent v-if="$vuetify.breakpoint.mobile" />
        </div>
    </BaseCardViewComponent>
</template>
