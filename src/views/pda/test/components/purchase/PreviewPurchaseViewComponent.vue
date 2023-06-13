<script>
/**
 * Descripción:
 *
 * @displayName PreviewPurchaseViewComponent
 */

import { mapGetters } from 'vuex';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

export default {
    name: 'PreviewPurchaseViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BaseCardViewComponent,
    },

    data() {
        return {
            items: [
                { header: 'Al acceder a los resultados completos recibes:' },
                {
                    text: 'Descripción detallada de tu perfil de personalidad con las maneras exactas para sacarle más provecho',
                },
                { divider: true, inset: true },
                {
                    text: '5 ejes de comportamiento que indican tu nivel de riesgo, paciencia, extroversión, independencia y autocontrol',
                },
                { divider: true, inset: true },
                {
                    text: 'Explicaciones detalladas sobre cómo usar tus ejes de comportamiento para desenvolverte mejor',
                },
                { divider: true, inset: true },
                {
                    text: 'Conoce tus 5 indicadores más desarrolladas y el estado exacto de 16 indicadores que puedes desarrollar más',
                },
                { divider: true, inset: true },
                {
                    text: 'Compartir toda tu información de manera fácil con la gente que te ayudará a subir de nivel',
                },
            ],
        };
    },

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'freemium']),
    },

    methods: {
        $_buoWallet() {
            this.$router.push({
                name: 'PDAWalletViewComponent',
            });
        },

        $_nextStep() {
            this.entity.step = 8;
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        v-if="pdaWallet"
        title="Ya mejoraste tu perfil, ¿te gustaría dar un paso más y darle superpoderes?"
        subtitle="El perfil completo te da la información experta para conocerte y entenderte mejor. Te servirá como guía para buscar oportunidades para tu crecimiento profesional."
    >
        <div slot="card-text">
            <v-row justify="center" align-content="center">
                <v-col cols="12" md="10">
                    <v-list class="list">
                        <template v-for="(item, index) in items">
                            <v-subheader
                                :class="[
                                    $vuetify.breakpoint.smAndDown
                                        ? 'BUO-Paragraph-Small'
                                        : 'BUO-Paragraph-Medium',
                                ]"
                                v-if="item.header"
                                :key="item.header"
                                >{{ item.header }}</v-subheader
                            >

                            <v-divider
                                v-else-if="item.divider"
                                :key="index"
                                :inset="item.inset"
                            ></v-divider>

                            <v-list-item v-else :key="item.text">
                                <v-list-item-avatar>
                                    <v-icon
                                        :color="
                                            pdaWallet.perfilPDA.toLowerCase()
                                        "
                                        >mdi-check-circle-outline</v-icon
                                    >
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title
                                        class="buo-white-space"
                                        >{{ item.text }}</v-list-item-title
                                    >
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-col>
                <v-col cols="12" md="2" align-self="center">
                    <img
                        height="220px"
                        width="340px"
                        src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/pda-wallet.svg"
                    />
                </v-col>
            </v-row>

            <br />

            <v-card flat color="transparent" width="100%" height="100%">
                <v-row justify="center">
                    <v-btn
                        dark
                        depressed
                        color="black"
                        @click="$_nextStep"
                        class="ma-2 no-uppercase rounded-lg"
                        elevation="0"
                        v-if="pdaWallet.tipoMembrecia === freemium"
                    >
                        ¡Quiero mi perfil completo!
                    </v-btn>

                    <v-btn
                        outlined
                        class="ma-2 no-uppercase rounded-lg"
                        elevation="0"
                        @click="$_buoWallet"
                    >
                        Ir a mi perfil Buo
                    </v-btn>
                </v-row>
            </v-card>
        </div>
    </BaseCardViewComponent>
</template>
