<script>
/**
 * Descripción: Pantalla PDA Comportamientos
 *
 * @displayName BasePDABehaviorsViewComponent
 */

import html2canvas from '@/services/sharing/html2canvas.js';

import { mapGetters, mapActions } from 'vuex';

const BasePdaSlider = () => import('@/components/pda/slider/BasePdaSlider');

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const ExploreBUOViewComponent = () =>
    import('@/components/wallet/ExploreBUOViewComponent');

export default {
    name: 'BasePDABehaviorsViewComponent',

    components: {
        BaseCardViewComponent,
        ExploreBUOViewComponent,
        BasePdaSlider,
    },

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'premium']),

        options() {
            return [
                {
                    icon: 'share-variant-outline',
                    name: 'Compartir',
                    fn: this.$_share,
                },
                {
                    icon: 'download',
                    name: 'Descargar',
                    fn: this.$_download,
                },
            ];
        },
    },

    mounted() {
        if (this.pdaWallet && this.pdaWallet.tipoMembrecia != this.premium) {
            this.$_returnToWallet();
        }
    },

    methods: {
        ...mapActions('pda', ['$_request_pda_wallet']),

        ...mapGetters('theme', ['app']),

        $_download() {
            html2canvas.$_download(
                this.$refs['behaviors'],
                'Mis Comportamientos'
            );
        },

        $_share() {
            html2canvas.$_share(
                this.$refs['behaviors'],
                'Mis Comportamientos',
                this.$_open
            );
        },

        $_downloadPopUp() {
            this.$_download();
            this.$_open();
        },

        $_open() {
            this.$refs['popUp'].$_openModal();
        },

        /**
         * Volver al Wallet
         */
        $_returnToWallet() {
            this.$router.push({
                name: 'PDAWalletViewComponent',
            });
        },

        $_goToDetails(Id) {
            this.$router.push({
                name: 'PDABehaviourDetailsViewComponent',
                params: { Id: Id },
            });
        },
    },
};
</script>

<template>
    <section>
        <BasePopUp
            ref="popUp"
            :isDrawer="false"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '45%'"
            scrollable
            dark
        >
            <div slot="Content">
                <v-card flat>
                    <v-card-title class="BUO-Heading-XSmall">
                        Lo sentimos
                    </v-card-title>
                    <v-card-text>
                        <span class="BUO-Paragraph-Small">
                            La opción de compartir actualmente no es compatible
                            con este dispositivo.
                        </span>
                    </v-card-text>
                    <v-card-actions>
                        <v-row>
                            <v-col cols="12">
                                <v-layout align-center justify-center>
                                    <v-btn
                                        color="primary"
                                        block
                                        class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                                        elevation="0"
                                        @click="$_downloadPopUp"
                                        >Descargar resultado</v-btn
                                    >
                                </v-layout>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </div>
        </BasePopUp>
        <BaseCardViewComponent
            :btnAction="$_returnToWallet"
            title="Comportamientos"
            subtitle="El PDA Assessment analiza 5 comportamientos básicos. Descubre tu tendencia conductual en cada eje. "
            v-if="pdaWallet"
        >
            <div slot="top-actions">
                <v-layout justify-end align-end>
                    <v-menu dark>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                depressed
                                text
                                v-bind="attrs"
                                v-on="on"
                                class="ma-2 no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                                elevation="0"
                                :color="app ? 'blueProgress600' : 'blue800'"
                            >
                                Compartir
                                <v-icon right>mdi-share-variant-outline</v-icon>
                            </v-btn>
                        </template>
                        <v-list
                            class="BUO-Paragraph-Medium-SemiBold"
                            v-for="(item, i) in options"
                            :key="i"
                        >
                            <v-list-item @click="item.fn" v-if="item.fn">
                                <v-list-item-title
                                    class="buo-word-break buo-white-space"
                                    >{{ item.name }}</v-list-item-title
                                >
                                <v-list-item-avatar>
                                    <v-icon small>{{
                                        'mdi-' + item.icon
                                    }}</v-icon>
                                </v-list-item-avatar>
                            </v-list-item>
                            <v-divider></v-divider>
                        </v-list>
                    </v-menu>
                </v-layout>
            </div>
            <div slot="card-text">
                <v-card flat class="rounded-t-xl">
                    <v-card-title
                        class="buo-word-break BUO-Paragraph-Large-SemiBold"
                        :class="[app ? 'white--text' : 'grey700--text']"
                    >
                        Ejes de comportamiento
                    </v-card-title>

                    <v-card-text>
                        <div ref="behaviors">
                            <div
                                v-for="item in pdaWallet.ejePDADTOSet"
                                :key="item.id"
                            >
                                <v-card flat @click="$_goToDetails(item.id)">
                                    <v-card-title
                                        class="buo-word-break BUO-Paragraph-Small-SemiBold pb-5"
                                        :class="[
                                            app ? 'white--text' : 'black--text',
                                        ]"
                                    >
                                        {{ item.nombreUI }}
                                    </v-card-title>
                                    <v-card-subtitle
                                        class="buo-word-break BUO-Paragraph-Small"
                                        :class="[
                                            app
                                                ? 'blueProgress600--text'
                                                : 'grey600--text',
                                        ]"
                                    >
                                        {{ item.descripcionEje }}
                                    </v-card-subtitle>

                                    <v-card-text class="pt-3">
                                        <BasePdaSlider
                                            :value="item.valorEjeFormato"
                                            :color="item.nombre.toLowerCase()"
                                        />
                                        <section
                                            class="d-flex flex-no-wrap justify-space-between buo-word-break"
                                        >
                                            <span
                                                class="BUO-Label-Small"
                                                :class="[
                                                    app
                                                        ? 'blueProgress600--text'
                                                        : 'grey600--text',
                                                ]"
                                            >
                                                {{ item.etiquetaIzquierda }}
                                            </span>
                                            <span
                                                class="BUO-Label-Small"
                                                :class="[
                                                    app
                                                        ? 'blueProgress600--text'
                                                        : 'grey600--text',
                                                ]"
                                            >
                                                {{ item.etiquetaDerecha }}
                                            </span>
                                        </section>
                                        <br />
                                    </v-card-text>
                                </v-card>
                                <v-divider></v-divider>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </div>

            <div slot="body">
                <ExploreBUOViewComponent v-if="$vuetify.breakpoint.mobile" />
            </div>
        </BaseCardViewComponent>
    </section>
</template>
