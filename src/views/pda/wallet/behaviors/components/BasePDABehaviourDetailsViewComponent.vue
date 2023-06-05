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

    metaInfo: { title: 'Mis Comportamientos PDA' },

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
                    class="no-uppercase rounded-lg"
                    text
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
            <v-card flat class="rounded-lg" v-if="entity">
                <v-card-text>
                    <br />
                    <BasePdaSlider
                        :value="entity.valorEjeFormato"
                        :color="entity.nombre.toLowerCase()"
                    />
                    <div
                        class="d-flex flex-no-wrap justify-space-between buo-word-break"
                        :class="[
                            $vuetify.breakpoint.smAndDown
                                ? 'BUO-Paragraph-Small'
                                : 'BUO-Paragraph-Medium',
                        ]"
                    >
                        <span>
                            {{ entity.etiquetaIzquierda }}
                        </span>
                        <span>
                            {{ entity.etiquetaDerecha }}
                        </span>
                    </div>
                    <br />
                </v-card-text>
                <v-card-subtitle
                    class="BUO-Paragraph-Small buo-word-break text-center Buo-Black"
                >
                    <div class="BUO-Heading-XSmall">
                        {{ entity.nombreUI }}
                    </div>
                    <br />
                    <div v-html="entity.fraseEje"></div>
                </v-card-subtitle>
                <v-spacer></v-spacer>
                <v-card-text
                    class="BUO-Paragraph-Small buo-word-break text-justify Buo-Black"
                >
                    <b>Principales características</b>
                    <div>
                        {{ entity.descripcionEje }}
                    </div>
                </v-card-text>
                <v-card-text>
                    <v-layout justify-center>
                        <v-chip-group column>
                            <v-chip
                                outlined
                                v-for="item in entity.caracteristicas"
                                :key="item"
                            >
                                <span>
                                    {{ item }}
                                </span>
                            </v-chip>
                        </v-chip-group>
                    </v-layout>
                </v-card-text>
            </v-card>
            <V-card flat v-else>
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
