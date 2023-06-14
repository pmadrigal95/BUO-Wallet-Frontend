<script>
/**
 * Descripción: Instrucciones del PDA test taking
 *
 * @displayName InstructionsViewComponent
 */

import { mapGetters } from 'vuex';

import basePDATrackingStatus from '@/helpers/basePDATrackingStatus.js';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const ExploreBUOViewComponent = () =>
    import('@/components/wallet/ExploreBUOViewComponent');

export default {
    name: 'InstructionsViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BaseCardViewComponent,
        ExploreBUOViewComponent,
    },

    computed: {
        ...mapGetters('authentication', ['user']),
    },

    created() {
        //TODO: How to implement on vue router the background config
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.clouds;
    },

    methods: {
        $_goBack() {
            this.$router.push({
                name: 'HomeViewComponent',
            });
        },

        $_nextStep() {
            this.$_sendToPDAAnalytics(this.user.userId);
            this.entity.step = 1;
            this.entity.pda.pdaData.startDate = new Date();
        },

        $_sendToPDAAnalytics(userId) {
            basePDATrackingStatus.$_sendToPDAAnalytics(
                userId,
                basePDATrackingStatus.rules
            );
        },
    },
};
</script>

<template>
    <BaseCardViewComponent :btnAction="$_goBack" v-if="entity.pda">
        <div slot="card-text" class="rounded-lg color">
            <v-card dark flat color="transparent">
                <v-card-title class="buo-word-break BUO-Paragraph-Large">
                    El PDA Assessment ha sido diseñado para conocer a las
                    personas identificando los estilos naturales de
                    comportamiento.
                </v-card-title>
                <v-divider></v-divider>
                <v-card-subtitle class="buo-word-break BUO-Paragraph-Medium">
                    Fusionamos IA para descubrir tu perfil de comportamiento de
                    forma rápida, sencilla y científicamente validada con:
                </v-card-subtitle>

                <v-card-text>
                    <v-card dark flat color="greenB800" class="rounded-lg">
                        <v-card-text>
                            <v-list color="transparent">
                                <v-list-item class="buo-headerAbility-position"
                                    ><v-list-item-avatar>
                                        <v-btn color="greenB700" fab x-small>
                                            <v-icon>mdi-check</v-icon>
                                        </v-btn>
                                    </v-list-item-avatar>
                                    <v-list-item-content class="ms-n3">
                                        <v-list-item-title
                                            class="BUO-Paragraph-Medium buo-white-space"
                                            >Solo <b>3 preguntas</b>.
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item class="buo-headerAbility-position">
                                    <v-list-item-avatar>
                                        <v-btn color="greenB700" fab x-small>
                                            <v-icon>mdi-timer-outline</v-icon>
                                        </v-btn>
                                    </v-list-item-avatar>
                                    <v-list-item-content class="ms-n3">
                                        <v-list-item-title
                                            class="BUO-Paragraph-Medium buo-white-space"
                                            >En menos de <b>10 minutos</b>.
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-card-text>

                <v-card-title class="buo-word-break BUO-Heading-XSmall">
                    Es importante...
                </v-card-title>

                <v-card-text>
                    <v-list color="transparent">
                        <v-list-item class="buo-headerAbility-position"
                            ><v-list-item-avatar>
                                <v-icon>mdi-check</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content class="ms-n3">
                                <v-list-item-title
                                    class="BUO-Paragraph-Medium buo-white-space"
                                    >Completar el análisis en un ambiente
                                    tranquilo, sin distracciones ni
                                    interrupciones.
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item class="buo-headerAbility-position">
                            <v-list-item-avatar>
                                <v-icon>mdi-check</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content class="ms-n3">
                                <v-list-item-title
                                    class="BUO-Paragraph-Medium buo-white-space"
                                    >Responder de manera honesta, sincera y
                                    espontánea.
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card-text>

                <v-layout align-center justify-center>
                    <v-img
                        contain
                        height="30px"
                        src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/pda-brand.svg"
                        lazy-src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/pda-brand.svg"
                    />
                </v-layout>

                <v-card-text>
                    <br />
                    <v-btn
                        @click="$_nextStep"
                        block
                        dark
                        class="no-uppercase rounded-lg"
                        >Iniciar <v-icon right>mdi-arrow-right</v-icon></v-btn
                    >
                    <br />
                </v-card-text>
            </v-card>
        </div>

        <div slot="body">
            <ExploreBUOViewComponent v-if="$vuetify.breakpoint.mobile" />
        </div>
    </BaseCardViewComponent>
</template>

<style scoped>
.color {
    background: linear-gradient(135deg, #68cb57 43.23%, #589f55 100%);
}
</style>
