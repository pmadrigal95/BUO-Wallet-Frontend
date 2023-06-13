<script>
/**
 * Descripción: Eje del REPNA
 *
 * @displayName BaseShareableTestAxis
 */
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
    <div>
        <BasePopUp
            ref="popUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '45%'"
            scrollable
            dark
            :isDrawer="false"
        >
            <div slot="Content">
                <v-card flat>
                    <v-card-title> Lo sentimos </v-card-title>
                    <v-card-text>
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
                                        class="no-uppercase rounded-lg"
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
                        <v-icon color="black">mdi-chevron-left</v-icon>
                    </v-btn>
                    <div
                        :class="`pda-gradient-${entity.perfilPDA.toLowerCase()} rounded-lg ${[
                            $vuetify.breakpoint.mdAndUp && 'shareable',
                        ]}`"
                    >
                        <v-card dark flat color="transparent">
                            <div
                                ref="result"
                                :class="`pda-gradient-${entity.perfilPDA.toLowerCase()} rounded-lg`"
                            >
                                <v-card dark flat color="transparent">
                                    <div class="pda-gradient-base">
                                        <v-card-subtitle
                                            class="buo-word-break text-center"
                                        >
                                            <br />
                                            <div class="BUO-Paragraph-Large">
                                                {{ entity.nombreUI }}:
                                            </div>
                                            <br />
                                            <div
                                                class="BUO-Heading-Small text-center"
                                                v-html="entity.frase"
                                            ></div>
                                        </v-card-subtitle>
                                    </div>

                                    <v-card-text>
                                        <v-card class="rounded-lg">
                                            <v-card-text>
                                                <br />
                                                <BasePdaSlider
                                                    :value="
                                                        entity.valorEjeFormato
                                                    "
                                                    :color="
                                                        entity.type.toLowerCase()
                                                    "
                                                />
                                                <div
                                                    class="d-flex flex-no-wrap justify-space-between BUO-Paragraph-Small buo-word-break"
                                                >
                                                    <span>
                                                        {{ entity.left }}
                                                    </span>
                                                    <span>
                                                        {{ entity.right }}
                                                    </span>
                                                </div>
                                                <br />
                                                <v-divider></v-divider>
                                                <br />

                                                <v-row justify="center">
                                                    <v-col cols="12">
                                                        <v-layout
                                                            justify-center
                                                        >
                                                            <v-progress-circular
                                                                size="116"
                                                                width="3"
                                                                :value="
                                                                    entity.benchmarkEjeFormato
                                                                "
                                                                >{{
                                                                    entity.benchmarkEjeFormato
                                                                }}%
                                                            </v-progress-circular>
                                                        </v-layout>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <div
                                                            class="text-center buo-word-break"
                                                            :class="[
                                                                $vuetify
                                                                    .breakpoint
                                                                    .smAndDown
                                                                    ? 'BUO-Paragraph-XSmall'
                                                                    : 'BUO-Paragraph-Small',
                                                            ]"
                                                        >
                                                            <b>{{
                                                                entity.name
                                                            }}</b
                                                            >, el
                                                            <b
                                                                >{{
                                                                    entity.benchmarkEjeFormato
                                                                }}%</b
                                                            >
                                                            de la población
                                                            comparte tu misma
                                                            tendencia en el
                                                            {{
                                                                entity.nombreUI.toLowerCase()
                                                            }}.
                                                        </div>
                                                    </v-col>
                                                </v-row>
                                                <br />
                                            </v-card-text>
                                        </v-card>
                                    </v-card-text>
                                </v-card>

                                <BaseShareableBrand
                                    copy="Descubre tus 5 ejes de comportamiento"
                                />
                                <br />
                            </div>

                            <v-card-actions v-if="btns">
                                <v-layout align-center justify-center>
                                    <BaseShareActions
                                        :share="$_share"
                                        :download="$_download"
                                        :nextStep="nextStep"
                                    />
                                </v-layout>
                            </v-card-actions>
                            <br />
                        </v-card>
                    </div>
                    <v-btn
                        icon
                        x-large
                        v-if="nextStep && $vuetify.breakpoint.mdAndUp"
                        @click="nextStep"
                    >
                        <v-icon color="black">mdi-chevron-right</v-icon>
                    </v-btn>
                </v-layout>
            </div>
        </BaseCardViewComponent>
    </div>
</template>

<style scoped>
.shareable {
    max-width: 55% !important;
}
</style>
