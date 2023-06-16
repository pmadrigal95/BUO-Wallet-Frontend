<script>
/**
 * Descripción: Pantalla PDA Wallet
 *
 * @displayName PDAWalletViewComponent
 */

import { mapGetters } from 'vuex';

import basePDATrackingStatus from '@/helpers/basePDATrackingStatus.js';

import httpService from '@/services/axios/httpService.js';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseStripeElement = () =>
    import('@/components/core/payments/BaseStripeElement');

export default {
    name: 'PaymentMethodsViewComponent',

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
        BaseStripeElement,
    },

    data() {
        return {
            showBtn: true,
            loading: false,
            card: true,
            code: undefined,
            length: 6,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user']),

        ...mapGetters('theme', ['app']),
    },

    methods: {
        $_submit() {
            if (this.card) {
                this.$refs['BaseStripeElement'].submit();
            } else {
                this.$_sendToApi(this.code, this.card);
            }
        },

        forceRerender() {
            this.code = undefined;
        },

        tokenCreated(token) {
            try {
                this.showBtn = false;
                this.$_sendToApi(token.id, this.card);
            } catch (error) {
                console.error(error);
            }
        },

        $_sendToApi(token, card) {
            this.$_sendToPDAAnalytics(this.user.userId);

            this.loading = true;

            let entity = {
                usuarioId: this.user.userId,
                productoId: 2,
                cantidad: 1,
            };

            card ? (entity.token = token) : (entity.code = token);

            httpService
                .post(
                    `payments/${
                        card ? 'processPayment' : 'processPaymentCode'
                    }`,
                    entity
                )
                .then((response) => {
                    if (response != undefined) {
                        this.next();
                    }
                    this.showBtn = true;
                    this.loading = false;
                });
        },

        $_changeMode() {
            this.card = !this.card;
            this.code = undefined;
        },

        $_sendToPDAAnalytics(userId) {
            basePDATrackingStatus.$_sendToPDAAnalytics(
                userId,
                basePDATrackingStatus.payment
            );
        },
    },
};
</script>

<template>
    <BaseCardViewComponent :md="md" :offset="offset">
        <div slot="card-text">
            <section
                class="BUO-Heading-Small"
                :class="[app ? 'white--text' : 'grey700--text']"
            >
                Reporte completo PDA
            </section>
        </div>
        <div slot="card-text">
            <v-radio-group v-model="card" @change="forceRerender">
                <v-card flat color="transparent">
                    <v-card-text>
                        <v-card flat outlined class="rounded-lg">
                            <v-card-text>
                                <v-radio :value="true">
                                    <template v-slot:label>
                                        <section
                                            class="BUO-Paragraph-Large-SemiBold"
                                            :class="[
                                                app
                                                    ? 'white--text'
                                                    : 'grey700--text',
                                            ]"
                                        >
                                            Comprar con tarjeta de crédito
                                        </section>
                                    </template>
                                </v-radio>
                                <section v-if="card">
                                    <!-- @ Use Loanding... -->
                                    <BaseSkeletonLoader
                                        v-if="loading"
                                        type="article, actions"
                                    />
                                    <BaseStripeElement
                                        v-show="!loading"
                                        ref="BaseStripeElement"
                                        :tokenCreated="tokenCreated"
                                    />
                                </section>
                            </v-card-text>
                        </v-card>
                    </v-card-text>
                    <v-card-text>
                        <v-card flat outlined class="rounded-lg">
                            <v-card-text>
                                <v-radio :value="false">
                                    <template v-slot:label>
                                        <section
                                            class="BUO-Paragraph-Large-SemiBold"
                                            :class="[
                                                app
                                                    ? 'white--text'
                                                    : 'black--text',
                                            ]"
                                        >
                                            Comprar con código promocional
                                        </section>
                                    </template>
                                </v-radio>
                                <section v-if="!card">
                                    <!-- @ Use Loanding... -->
                                    <BaseSkeletonLoader
                                        v-if="loading"
                                        type="article, actions"
                                    />
                                    <v-otp-input
                                        v-model="code"
                                        :length="length"
                                        v-else
                                    ></v-otp-input>
                                </section>
                            </v-card-text>
                        </v-card>
                    </v-card-text>
                </v-card>
            </v-radio-group>
            <v-layout justify-end v-if="card">
                <section
                    class="BUO-Paragraph-Medium"
                    :class="[app ? 'white--text' : 'grey700--text']"
                >
                    Total: <span class="BUO-Heading-XSmall">$199 MXN</span>
                </section>
            </v-layout>
        </div>

        <div slot="body">
            <v-btn
                v-if="showBtn"
                class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                elevation="0"
                color="primary"
                dark
                block
                @click="$_submit"
                >Finalizar Compra</v-btn
            >
        </div>
    </BaseCardViewComponent>
</template>
