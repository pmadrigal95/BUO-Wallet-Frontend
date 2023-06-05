<script>
/**
 * Descripción: PDA Grapgh Shareable
 *
 * @displayName BaseShareableAbilitiesPDA
 */
import html2canvas from '@/services/sharing/html2canvas.js';

const PDARadarChart = () => import('@/components/pda/charts/PDARadarChart');

const PDAProgressCircular = () =>
    import('@/components/pda/charts/PDAProgressCircular');

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseShareableBrand = () =>
    import('@/components/pda/shareable/test/BaseShareableBrand.vue');

const BaseShareActions = () =>
    import('@/components/pda/shareable/test/BaseShareActions');

const BaseShareableTitle = () =>
    import('@/components/pda/shareable/test/BaseShareableTitle');

export default {
    name: 'BaseShareableAbilitiesPDA',

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

    components: {
        BaseCardViewComponent,
        PDARadarChart,
        PDAProgressCircular,
        BaseShareableBrand,
        BaseShareActions,
        BaseShareableTitle,
    },

    computed: {
        validatedAbilities() {
            return this.entity.habilidadPDADTOSet.filter((x) => x.resaltar);
        },
    },

    methods: {
        $_share() {
            html2canvas.$_share(
                this.$refs.result,
                `${this.entity.name} - Indicadores`,
                this.$_open
            );
        },

        $_download() {
            html2canvas.$_download(
                this.$refs.result,
                `${this.entity.name} - Indicadores.png`
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
        <BaseCardViewComponent v-if="entity" :md="md" :offset="offset">
            <div slot="card-text">
                <BaseShareableTitle
                    title="Tu perfil PDA"
                    :share="$_share"
                    :download="$_download"
                    :nextStep="nextStep"
                    :previousStep="previousStep"
                />
            </div>
            <div slot="card-text" class="rounded-lg">
                <v-layout align-center justify-center>
                    <v-btn
                        icon
                        x-large
                        v-if="previousStep && $vuetify.breakpoint.mdAndUp"
                        @click="previousStep"
                    >
                        <v-icon color="black">mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-card
                        flat
                        dark
                        class="buo-word-break text-center rounded-lg"
                        :class="[$vuetify.breakpoint.mdAndUp && 'shareable']"
                    >
                        <div
                            ref="result"
                            class="rounded-lg"
                            style="background-color: #1e1e1e !important"
                        >
                            <v-card flat dark class="rounded-lg">
                                <br />
                                <v-card-subtitle
                                    class="Buo-White"
                                    :class="[
                                        $vuetify.breakpoint.smAndDown
                                            ? 'BUO-Heading-Small'
                                            : 'BUO-Display-XSmall',
                                    ]"
                                >
                                    Indicadores de {{ entity.name }}
                                </v-card-subtitle>
                                <v-card-text>
                                    <PDARadarChart
                                        :data="entity.habilidadPDADTOSet"
                                        :profile="entity.profile.toLowerCase()"
                                    />
                                    <br />
                                    <v-card-subtitle
                                        class="Buo-White"
                                        :class="[
                                            $vuetify.breakpoint.smAndDown
                                                ? 'BUO-Paragraph-Medium'
                                                : 'BUO-Paragraph-Large',
                                        ]"
                                    >
                                        Indicadores principales
                                    </v-card-subtitle>
                                    <PDAProgressCircular
                                        :data="validatedAbilities"
                                    />
                                </v-card-text>
                                <br />
                                <BaseShareableBrand
                                    copy="Descubre tus Indicadores"
                                />
                                <br />
                            </v-card>
                        </div>
                        <v-card
                            v-if="btns"
                            width="100%"
                            height="100%"
                            flat
                            :class="`pda-gradient-${entity?.perfilPDA} rounded-t-xl`"
                        >
                            <div class="pda-gradient-base">
                                <br />
                                <br />
                                <v-card-actions>
                                    <BaseShareActions
                                        :nextStep="nextStep"
                                        :share="$_share"
                                        :download="$_download"
                                    />
                                </v-card-actions>
                                <br />
                            </div>
                        </v-card>
                    </v-card>
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
    width: 55% !important;
}
</style>
