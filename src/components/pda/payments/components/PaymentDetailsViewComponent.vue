<script>
/**
 * Descripción: Pantalla PDA Wallet
 *
 * @displayName PDAWalletViewComponent
 */

import { mapGetters } from 'vuex';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

export default {
    name: 'PDAWalletViewComponent',

    props: {
        md: {
            type: String,
            default: '9',
        },

        offset: {
            type: String,
            default: '1',
        },

        next: {
            type: Function,
            required: true,
        },
    },

    components: {
        BaseCardViewComponent,
    },

    computed: {
        ...mapGetters('authentication', ['user']),
        ...mapGetters('pda', ['pdaWallet']),
        ...mapGetters('theme', ['app']),

        details() {
            return [
                {
                    title: 'Reporte completo de tu perfil comportamental',
                },
                {
                    divider: true,
                },
                {
                    title: 'Tus 5 ejes de personalidad',
                },
                {
                    divider: true,
                },
                {
                    title: 'Radiografía de tus indicadores',
                },
                {
                    divider: true,
                },
                {
                    title: 'La clave para maximizar tu potencial ¡Y mucho más!',
                },
            ];
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        :title="$vuetify.breakpoint.mobile ? 'Resumen de Compra' : undefined"
        :subtitle="
            $vuetify.breakpoint.mobile
                ? 'Resultados Completos de tu Buo Psychometric:'
                : undefined
        "
        :md="md"
        :offset="offset"
        v-if="pdaWallet && user"
    >
        <div slot="top-single-action" v-if="$vuetify.breakpoint.mobile">
            <v-layout justify-end>
                <v-btn
                    color="primary"
                    class="ma-2 no-uppercase rounded-lg"
                    elevation="0"
                    @click="next"
                >
                    Comprar</v-btn
                >
            </v-layout>
        </div>
        <div slot="card-text">
            <v-row>
                <v-col cols="12" md="7">
                    <v-card-title
                        v-if="$vuetify.breakpoint.mdAndUp"
                        class="BUO-Heading-Small buo-word-break"
                        :class="[app ? 'white--text' : 'grey700--text']"
                        >Resumen de Compra</v-card-title
                    >
                    <v-card-subtitle
                        v-if="$vuetify.breakpoint.mdAndUp"
                        class="BUO-Paragraph-Small buo-word-break"
                        :class="[app ? 'white--text' : 'grey700--text']"
                        >Resultados Completos de tu Buo
                        Psychometric:</v-card-subtitle
                    >
                    <v-list color="transparent">
                        <template v-for="(item, index) in details">
                            <v-list-item v-if="!item.divider" :key="item.title">
                                <v-list-item-content>
                                    <v-list-item-title
                                        ><span
                                            class="buo-none-word-break buo-white-space BUO-Paragraph-Medium"
                                            :class="[
                                                app
                                                    ? 'white--text'
                                                    : 'grey700--text',
                                            ]"
                                            >{{ item.title }}</span
                                        ></v-list-item-title
                                    >
                                </v-list-item-content>

                                <v-list-item-action>
                                    <v-icon
                                        :color="
                                            pdaWallet.perfilPDA.toLowerCase()
                                        "
                                        >mdi-check</v-icon
                                    >
                                </v-list-item-action>
                            </v-list-item>
                            <v-divider
                                v-else
                                :key="index"
                                :inset="false"
                            ></v-divider>
                        </template>
                    </v-list>
                </v-col>
                <v-col cols="12" md="5">
                    <v-layout justify-center align-center>
                        <v-card
                            width="326px"
                            height="348px"
                            flat
                            dark
                            class="rounded-lg"
                        >
                            <v-card
                                flat
                                :class="`pda-gradient-${pdaWallet.perfilPDA.toLowerCase()} rounded-b-0`"
                                width="326px"
                                height="174px"
                            >
                                <section class="pda-gradient-base rounded-lg">
                                    <v-card-subtitle
                                        class="BUO-Paragraph-Medium text-center buo-word-break white--text"
                                    >
                                        <section
                                            class="BUO-Paragraph-Large-SemiBold white--text"
                                        >
                                            <b>{{ user.name }}</b>
                                        </section>
                                        Acceso completo Buo Psychometric
                                    </v-card-subtitle>
                                </section>
                                <v-layout justify-center align-center>
                                    <section class="circle">
                                        <img
                                            class="cicleImage"
                                            :src="pdaWallet.hotcakeSimpleURL"
                                        />
                                    </section>
                                </v-layout>
                            </v-card>
                            <v-card flat dark width="326px" height="174px">
                                <v-card-subtitle
                                    class="BUO-Heading-Medium text-center buo-word-break pt-8"
                                >
                                    <h6 class="BUO-Heading-Medium Price pt-10">
                                        $199 MXN
                                    </h6>
                                </v-card-subtitle>
                                <v-card-actions>
                                    <v-layout
                                        align-center
                                        align-content-center
                                        class=""
                                    >
                                        <v-img
                                            contain
                                            height="40px"
                                            src="
                                            https://buo-resources.s3.us-east-2.amazonaws.com/wallet/buo_psycometric_clear.png
                                            "
                                            lazy-src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/buo_psycometric_clear.png"
                                        />
                                    </v-layout>
                                </v-card-actions>
                            </v-card>
                        </v-card>
                    </v-layout>
                </v-col>
            </v-row>
        </div>

        <div slot="body">
            <v-btn
                class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                color="primary"
                dark
                block
                @click="next"
                >Comprar</v-btn
            >
        </div>
    </BaseCardViewComponent>
</template>

<style scoped>
.circle {
    top: 50%;
    position: absolute;
    z-index: 1 !important;
    height: 159px;
    width: 159px;
    clip-path: circle();
    background-color: #fff;
}

.cicleImage {
    left: 22%;
    top: 15%;
    height: 102px !important;
    width: 90px !important;
    position: absolute;
}

.Price {
    color: #fff;
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 125%;
}
</style>
