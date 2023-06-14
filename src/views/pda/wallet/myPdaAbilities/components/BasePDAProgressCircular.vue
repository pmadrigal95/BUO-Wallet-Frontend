<script>
/**
 * Descripción: Pantalla PDA Habilidades
 *
 * @displayName BasePDAProgressCircular
 */

import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'BasePDAProgressCircular',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    data() {
        return {
            onboarding: this.entity.step,
        };
    },

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'loadingPdaWallet']),
    },

    methods: {
        ...mapActions('pda', ['$_request_pda_wallet']),

        next() {
            this.onboarding =
                this.onboarding + 1 === this.pdaWallet.habilidadPDADTOSet.length
                    ? 0
                    : this.onboarding + 1;
        },

        prev() {
            this.onboarding =
                this.onboarding - 1 < 0
                    ? this.pdaWallet.habilidadPDADTOSet.length - 1
                    : this.onboarding - 1;
        },
    },
};
</script>

<template>
    <div>
        <BaseSkeletonLoader
            v-if="loadingPdaWallet && !pdaWallet"
            type="image"
        />
        <v-card flat v-else>
            <v-card-text>
                <v-card flat tile>
                    <v-card-actions class="justify-space-between">
                        <v-btn
                            text
                            @click="prev"
                            x-small
                            :color="pdaWallet.perfilPDA.toLowerCase()"
                        >
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-item-group
                            v-model="onboarding"
                            class="text-center"
                            mandatory
                        >
                            <v-item
                                v-for="n in pdaWallet.habilidadPDADTOSet.length"
                                :key="`btn-${n}`"
                                v-slot="{ active, toggle }"
                            >
                                <v-btn
                                    :input-value="active"
                                    icon
                                    @click="toggle"
                                    :color="pdaWallet.perfilPDA.toLowerCase()"
                                    x-small
                                >
                                    <v-icon x-small>mdi-record</v-icon>
                                </v-btn>
                            </v-item>
                        </v-item-group>
                        <v-btn
                            text
                            @click="next"
                            x-small
                            :color="pdaWallet.perfilPDA.toLowerCase()"
                        >
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <v-window v-model="onboarding">
                    <v-window-item
                        v-for="(item, i) in pdaWallet.habilidadPDADTOSet"
                        :key="i"
                    >
                        <v-card flat>
                            <v-card-text
                                class="BUO-Paragraph-Large-SemiBold text-center buo-word-break grey700--text"
                            >
                                {{ item.habilidad }}
                            </v-card-text>
                            <v-card-text>
                                <v-row justify="center">
                                    <v-progress-circular
                                        size="100"
                                        width="10"
                                        :value="
                                            item.porcentajeNaturalHabilidadFormato
                                        "
                                        :color="
                                            pdaWallet.perfilPDA.toLowerCase()
                                        "
                                        >{{
                                            item.porcentajeNaturalHabilidadFormato
                                        }}%
                                    </v-progress-circular>
                                </v-row>
                                <v-layout
                                    justify-end
                                    v-if="$vuetify.breakpoint.smAndDown"
                                >
                                    <v-img
                                        contain
                                        max-height="49"
                                        max-width="29"
                                        src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/next.svg
                                        "
                                        lazy-src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/next.svg
                                        "
                                    >
                                    </v-img>
                                </v-layout>
                            </v-card-text>
                            <v-card-text>
                                <v-alert
                                    text
                                    outlined
                                    :color="pdaWallet.perfilPDA.toLowerCase()"
                                    class="rounded-lg"
                                >
                                    <section
                                        class="BUO-Label-Small-SemiBold grey700--text"
                                    >
                                        <b>Sabías que..</b>
                                    </section>
                                    <section
                                        class="BUO-Label-Small grey700--text"
                                    >
                                        {{ item.descripcion }}
                                    </section>
                                </v-alert>
                            </v-card-text>
                        </v-card>
                        <br />
                        <v-card flat>
                            <v-card-text
                                class="BUO-Heading-XSmall text-center buo-word-break grey700--text"
                            >
                                <section class="pb-3">
                                    <v-icon
                                        large
                                        :color="
                                            pdaWallet.perfilPDA.toLowerCase()
                                        "
                                        >mdi-radiobox-marked</v-icon
                                    >
                                </section>
                                {{ item.habilidad }}
                            </v-card-text>

                            <v-card flat class="rounded-lg">
                                <v-card-title
                                    class="buo-word-break black--text BUO-Paragraph-Small-SemiBold"
                                >
                                    <b>Principales características</b>
                                </v-card-title>
                                <v-card-text
                                    class="BUO-Paragraph-Small buo-word-break grey600--text"
                                >
                                    {{ item.caracteristicas }}
                                </v-card-text>
                            </v-card>
                        </v-card>
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </div>
</template>
