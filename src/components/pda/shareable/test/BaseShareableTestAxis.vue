<script>
/**
 * Descripción: Eje del REPNA
 *
 * @displayName BaseShareableTestAxis
 */

import { mapGetters } from 'vuex';

import html2canvas from '@/services/sharing/html2canvas.js';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BasePdaSlider = () => import('@/components/pda/slider/BasePdaSlider');

const BaseShareableBrand = () =>
    import('@/components/pda/shareable/test/BaseShareableBrand.vue');

const BaseShareableTitle = () =>
    import('@/components/pda/shareable/test/BaseShareableTitle');

const BaseShareActions = () =>
    import('@/components/pda/shareable/test/BaseShareActions');

export default {
    name: 'BaseShareableTestAxis',

    components: {
        BaseCardViewComponent,
        BasePdaSlider,
        BaseShareableBrand,
        BaseShareActions,
        BaseShareableTitle,
    },

    props: {
        entity: {
            type: Object,
            requiered: true,
        },

        md: {
            type: String,
            default: '9',
        },

        offset: {
            type: String,
            default: '1',
        },

        nextStep: {
            type: Function,
            default: undefined,
        },

        previousStep: {
            type: Function,
            default: undefined,
        },

        btns: {
            type: Boolean,
            default: true,
        },
    },

    computed: { ...mapGetters('theme', ['app']) },

    methods: {
        $_share() {
            html2canvas.$_share(
                this.$refs.result,
                `${
                    this.entity.name
                } - Eje de ${this.entity.type.toLowerCase()}`,
                this.$_open
            );
        },

        $_download() {
            html2canvas.$_download(
                this.$refs.result,
                `${
                    this.entity.name
                } - Eje de ${this.entity.type.toLowerCase()}.png`
            );
        },

        $_downloadPopUp() {
            this.$_download();
            this.$_open();
        },

        $_open() {
            this.$refs['popUp'].$_openModal();
        },
    },
};
</script>

<template>
    <section>
        <BasePopUp
            ref="popUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '45%'"
            scrollable
            dark
            :isDrawer="false"
        >
            <div slot="Content">
                <v-card flat>
                    <v-card-title class="BUO-Paragraph-Medium-SemiBold">
                        Lo sentimos
                    </v-card-title>
                    <v-card-text class="BUO-Label-Small white--text">
                        La opción de compartir actualmente no es compatible con
                        este dispositivo.
                    </v-card-text>
                    <v-card-actions>
                        <v-row>
                            <v-col cols="12">
                                <v-layout align-center justify-center>
                                    <v-btn
                                        color="primary"
                                        elevation="0"
                                        block
                                        class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
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
        <BaseCardViewComponent :md="md" :offset="offset">
            <div slot="card-text">
                <BaseShareableTitle
                    title="Eje de Comportamiento"
                    :share="$_share"
                    :download="$_download"
                    :nextStep="nextStep"
                    :previousStep="previousStep"
                />
            </div>
            <div slot="card-text">
                <v-layout align-center justify-center>
                    <v-btn
                        icon
                        x-large
                        v-if="previousStep && $vuetify.breakpoint.mdAndUp"
                        @click="previousStep"
                    >
                        <v-icon :color="app ? 'blueProgress600' : 'black'"
                            >mdi-chevron-left</v-icon
                        >
                    </v-btn>
                    <section
                        :class="`pda-gradient-${entity.perfilPDA.toLowerCase()} rounded-lg ${[
                            $vuetify.breakpoint.mdAndUp && 'shareable',
                        ]}`"
                    >
                        <v-card dark flat color="transparent">
                            <section
                                ref="result"
                                :class="`pda-gradient-${entity.perfilPDA.toLowerCase()} rounded-lg`"
                            >
                                <v-card dark flat color="transparent">
                                    <section class="pda-gradient-base">
                                        <v-card-subtitle
                                            class="buo-word-break text-center pt-5"
                                        >
                                            <span class="BUO-Paragraph-Medium">
                                                Tus ejes de comportamiento
                                            </span>
                                            <section
                                                class="BUO-Paragraph-Large-SemiBold pt-2"
                                            >
                                                {{ entity.nombreUI }}:
                                            </section>
                                            <section
                                                class="BUO-Label-Small text-center pt-3"
                                                v-html="entity.frase"
                                            />
                                        </v-card-subtitle>
                                    </section>

                                    <v-card-text class="pt-0">
                                        <v-card class="rounded-lg pt-3">
                                            <v-card-text>
                                                <BasePdaSlider
                                                    :value="
                                                        entity.valorEjeFormato
                                                    "
                                                    :color="
                                                        entity.type.toLowerCase()
                                                    "
                                                />
                                                <section
                                                    class="d-flex flex-no-wrap justify-space-between buo-word-break"
                                                >
                                                    <span
                                                        class="BUO-Label-XSmall white--text"
                                                    >
                                                        {{ entity.left }}
                                                    </span>
                                                    <span
                                                        class="BUO-Label-XSmall white--text"
                                                    >
                                                        {{ entity.right }}
                                                    </span>
                                                </section>
                                                <v-divider
                                                    class="ma-4"
                                                ></v-divider>

                                                <v-row justify="center">
                                                    <v-col cols="12">
                                                        <v-layout
                                                            justify-center
                                                        >
                                                            <v-progress-circular
                                                                class="BUO-Paragraph-Medium white--text"
                                                                size="100"
                                                                width="3"
                                                                :value="
                                                                    entity.benchmarkEjeFormato
                                                                "
                                                                color="white"
                                                                rotate="90"
                                                                ><span
                                                                    class="BUO-Paragraph-Medium-SemiBold"
                                                                    >{{
                                                                        entity.benchmarkEjeFormato
                                                                    }}</span
                                                                >%
                                                            </v-progress-circular>
                                                        </v-layout>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <section
                                                            class="text-center buo-word-break BUO-Label-Small white--text"
                                                        >
                                                            <span
                                                                class="BUO-Label-Small-SemiBold"
                                                                >{{
                                                                    entity.name
                                                                }}</span
                                                            >, el
                                                            <span
                                                                class="BUO-Label-Small-SemiBold"
                                                                >{{
                                                                    entity.benchmarkEjeFormato
                                                                }}%</span
                                                            >
                                                            de la población
                                                            comparte tu misma
                                                            tendencia en el
                                                            {{
                                                                entity.nombreUI.toLowerCase()
                                                            }}.
                                                        </section>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                        </v-card>
                                    </v-card-text>
                                </v-card>

                                <BaseShareableBrand
                                    copy="Descubre tus 5 ejes de comportamiento"
                                    class="mb-1"
                                />
                            </section>

                            <v-card-actions v-if="btns">
                                <v-layout align-center justify-center>
                                    <BaseShareActions
                                        :share="$_share"
                                        :download="$_download"
                                        :nextStep="nextStep"
                                    />
                                </v-layout>
                            </v-card-actions>
                        </v-card>
                    </section>
                    <v-btn
                        icon
                        x-large
                        v-if="nextStep && $vuetify.breakpoint.mdAndUp"
                        @click="nextStep"
                    >
                        <v-icon :color="app ? 'blueProgress600' : 'black'"
                            >mdi-chevron-right</v-icon
                        >
                    </v-btn>
                </v-layout>
            </div>
        </BaseCardViewComponent>
    </section>
</template>

<style scoped>
.shareable {
    max-width: 55% !important;
}
</style>
