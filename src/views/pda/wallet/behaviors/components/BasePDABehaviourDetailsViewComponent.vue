<script>
/**
 * Descripción: Pantalla PDA Comportamientos
 *
 * @displayName BasePDABehaviourDetailsViewComponent
 */

import { mapGetters } from 'vuex';

const BasePdaSlider = () => import('@/components/pda/slider/BasePdaSlider');

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const ExploreBUOViewComponent = () =>
    import('@/components/wallet/ExploreBUOViewComponent');

export default {
    name: 'BasePDABehaviourDetailsViewComponent',

    metaInfo: { title: 'Mis Comportamientos Buo Psychometric' },

    components: {
        BaseCardViewComponent,
        ExploreBUOViewComponent,
        BasePdaSlider,
    },

    data() {
        return {
            loading: false,
        };
    },

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'premium']),

        ...mapGetters('theme', ['app']),

        entity() {
            return this.pdaWallet?.ejePDADTOSet.find(
                (element) =>
                    element.id == parseInt(this.$router.currentRoute.params.Id)
            );
        },
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
                name: 'PDABehaviorsViewComponent',
            });
        },

        $_goToDetails() {
            this.$router.push({
                name: 'PDAShareableAxisBehaviourViewComponent',
                params: { Id: this.entity.id },
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
                    v-if="entity"
                    class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                    elevation="0"
                    text
                    :color="app ? 'blueProgress600' : 'blue800'"
                    @click="$_goToDetails"
                >
                    Compartir
                    <v-icon right dark>
                        mdi-share-variant-outline
                    </v-icon></v-btn
                >
            </v-layout>
        </div>
        <div slot="card-text">
            <v-card flat class="rounded-t-xl" v-if="entity">
                <v-card-text class="pt-10">
                    <BasePdaSlider
                        :value="entity.valorEjeFormato"
                        :color="entity.nombre.toLowerCase()"
                    />
                    <section
                        class="d-flex flex-no-wrap justify-space-between buo-word-break"
                    >
                        <span
                            class="BUO-Label-Small"
                            :class="[
                                app ? 'blueProgress600--text' : 'grey600--text',
                            ]"
                        >
                            {{ entity.etiquetaIzquierda }}
                        </span>
                        <span
                            class="BUO-Label-Small"
                            :class="[
                                app ? 'blueProgress600--text' : 'grey600--text',
                            ]"
                        >
                            {{ entity.etiquetaDerecha }}
                        </span>
                    </section>
                </v-card-text>
                <v-card-subtitle class="buo-word-break text-center">
                    <section
                        class="BUO-Heading-XSmall pb-2"
                        :class="[app ? 'white--text' : 'grey700--text']"
                    >
                        {{ entity.nombreUI }}
                    </section>
                    <section
                        class="BUO-Label-Small"
                        :class="[
                            app ? 'blueProgress600--text' : 'grey600--text',
                        ]"
                        v-html="entity.fraseEje"
                    ></section>
                </v-card-subtitle>
                <v-spacer></v-spacer>
                <v-card-text>
                    <section
                        class="BUO-Paragraph-Small-SemiBold buo-word-break text-justify"
                        :class="[app ? 'white--text' : 'black--text']"
                    >
                        Principales características
                    </section>
                    <section
                        class="BUO-Paragraph-Small buo-word-break text-justify"
                        :class="[
                            app ? 'blueProgress600--text' : 'grey600--text',
                        ]"
                    >
                        {{ entity.descripcionEje }}
                    </section>
                </v-card-text>
                <v-card-text>
                    <v-layout justify-center>
                        <v-chip-group column>
                            <v-chip
                                outlined
                                v-for="item in entity.caracteristicas"
                                :key="item"
                            >
                                <span
                                    class="BUO-Label-Small-SemiBold"
                                    :class="[
                                        app ? 'white--text' : 'grey700--text',
                                    ]"
                                >
                                    {{ item }}
                                </span>
                            </v-chip>
                        </v-chip-group>
                    </v-layout>
                </v-card-text>
            </v-card>
            <V-card flat class="rounded-t-xl" v-else>
                <v-img
                    contain
                    height="350"
                    src="https://buo-resources.s3.us-east-2.amazonaws.com/compartidos/404.png"
                    lazy-src="https://buo-resources.s3.us-east-2.amazonaws.com/compartidos/404.png"
                ></v-img>
            </V-card>
        </div>

        <div slot="body">
            <ExploreBUOViewComponent v-if="$vuetify.breakpoint.mobile" />
        </div>
    </BaseCardViewComponent>
</template>
