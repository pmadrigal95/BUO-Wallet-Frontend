<script>
/**
 * Descripción: Perfil Compartible
 *
 * @displayName BaseShareableTestProfile
 */

import { mapGetters } from 'vuex';

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

    computed: { ...mapGetters('theme', ['app']) },

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
                        :color="app ? 'blueProgress600' : 'black'"
                    >
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <section
                        ref="result"
                        class="white"
                        :class="[$vuetify.breakpoint.mdAndUp && 'shareable']"
                    >
                        <v-card
                            dark
                            flat
                            :class="`pda-gradient-${entity.perfilPDA.toLowerCase()} bottom`"
                        >
                            <section class="pda-gradient-base pa-5">
                                <v-card-subtitle
                                    class="buo-word-break text-center"
                                >
                                    <section
                                        class="BUO-Paragraph-Large-SemiBold white--text"
                                    >
                                        {{ entity.name + ', eres una persona' }}
                                    </section>
                                    <div class="BUO-Display-XSmall white--text">
                                        {{ entity.perfilPDAVisual }}
                                    </div>
                                </v-card-subtitle>
                            </section>
                        </v-card>

                        <v-card flat color="transparent">
                            <v-card-subtitle
                                class="BUO-Paragraph-Small buo-word-break text-center grey700--text"
                            >
                                Tu superpoder es
                                <span class="BUO-Paragraph-Small-SemiBold">{{
                                    entity.superpoder
                                }}</span
                                >.
                            </v-card-subtitle>

                            <v-card-text>
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
                                <v-alert
                                    icon="mdi-star"
                                    prominent
                                    dense
                                    outlined
                                    class="mt-6 BUO-Label-Small grey700--text"
                                >
                                    <span class="BUO-Label-Small-SemiBold"
                                        >De más de 3 millones de PDAs</span
                                    >, solo el {{ entity.benchmarkFormato }}% de
                                    la población tiene tu mismo perfil
                                </v-alert>
                            </v-card-text>
                        </v-card>

                        <BaseShareableBrand
                            :dark="false"
                            copy="Descubre tu perfil"
                        />
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

                <v-layout
                    align-center
                    justify-center
                    v-if="btns"
                    class="mr-5 mt-3"
                >
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
    </section>
</template>

<style scoped>
.bottom {
    border-radius: 0px 0px 60px 60px !important;
}

.shareable {
    max-width: 55% !important;
}
</style>
