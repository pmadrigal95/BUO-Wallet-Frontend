<script>
/**
 * Descripción: Perfil Compartible
 *
 * @displayName BaseShareableTestProfile
 */

import html2canvas from '@/services/sharing/html2canvas.js';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseShareableBrand = () =>
    import('@/components/pda/shareable/test/BaseShareableBrand');

const BaseShareableTitle = () =>
    import('@/components/pda/shareable/test/BaseShareableTitle');

const BaseShareActions = () =>
    import('@/components/pda/shareable/test/BaseShareActions');

export default {
    name: 'BaseShareableTestProfile',

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
        BaseShareableBrand,
        BaseShareActions,
        BaseShareableTitle,
    },

    methods: {
        $_share() {
            html2canvas.$_share(
                this.$refs.result,
                `${this.entity.name} - Perfil`,
                this.$_open
            );
        },

        $_download() {
            html2canvas.$_download(
                this.$refs.result,
                `${this.entity.name} - Perfil.png`
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
                    title="Perfil comportamental"
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
                    <div
                        ref="result"
                        class="rounded-lg"
                        :class="[$vuetify.breakpoint.mdAndUp && 'shareable']"
                    >
                        <v-card
                            dark
                            flat
                            :class="`pda-gradient-${entity.perfilPDA.toLowerCase()} bottom`"
                        >
                            <div class="pda-gradient-base">
                                <v-card-subtitle
                                    class="buo-word-break text-center"
                                >
                                    <br />
                                    <div class="BUO-Paragraph-Large">
                                        {{ entity.name + ', eres una persona' }}
                                    </div>
                                    <div class="BUO-Display-XSmall">
                                        {{ entity.perfilPDAVisual }}
                                    </div>
                                    <br />
                                </v-card-subtitle>
                            </div>
                        </v-card>

                        <v-card light flat>
                            <v-card-subtitle
                                class="BUO-Paragraph-Large buo-word-break text-center"
                            >
                                Tu superpoder es
                                <b>{{ entity.superpoder }}</b
                                >.
                            </v-card-subtitle>

                            <v-card-text>
                                <br />
                                <v-layout justify-center>
                                    <v-img
                                        contain
                                        height="220px"
                                        width="340px"
                                        :src="
                                            require(`@/assets/hotcakes/Hotcake${entity.perfilPDA}.svg`)
                                        "
                                    />
                                </v-layout>
                                <br />
                                <br />
                                <v-alert
                                    icon="mdi-star"
                                    prominent
                                    dense
                                    outlined
                                >
                                    <b>De más de 3 millones de PDAs</b>, solo el
                                    {{ entity.benchmarkFormato }}% de la
                                    población tiene tu mismo perfil
                                </v-alert>
                            </v-card-text>
                        </v-card>

                        <BaseShareableBrand
                            :dark="false"
                            copy="Descubre tu perfil"
                        />
                        <br />
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

                <v-layout align-center justify-center v-if="btns">
                    <v-card-actions
                        :class="[$vuetify.breakpoint.mdAndUp && 'shareable']"
                    >
                        <BaseShareActions
                            :share="$_share"
                            :download="$_download"
                            :nextStep="nextStep"
                        />
                    </v-card-actions>
                </v-layout>
            </div>
        </BaseCardViewComponent>
    </div>
</template>

<style scoped>
.bottom {
    border-radius: 0px 0px 60px 60px !important;
}

.shareable {
    max-width: 55% !important;
}
</style>
