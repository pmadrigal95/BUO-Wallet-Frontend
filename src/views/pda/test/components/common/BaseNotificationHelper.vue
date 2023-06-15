<script>
/**
 * Descripción: Validacion de cantidad de Palabras
 *
 * @displayName BaseNotificationHelper
 */

import { mapGetters } from 'vuex';

import basePDATrackingStatus from '@/helpers/basePDATrackingStatus.js';

const firstMin = 19,
    secondMin = 20,
    step1 = 1,
    step2 = 2;

export default {
    name: 'BaseNotificationHelper',
    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    computed: {
        ...mapGetters('authentication', ['user']),

        message() {
            return this.entity.step === 1
                ? 'Para obtener un perfil más preciso, necesitas seleccionar más palabras.'
                : 'Para obtener un perfil más preciso, necesitas seleccionar al menos 20 palabras.';
        },
    },

    methods: {
        $_nextStep() {
            if (this.entity.step === step1) {
                this.$_validateFirstStep();
            } else if (this.entity.step === step2) {
                this.$_validateSecondStep();
            }
        },

        $_validateFirstStep() {
            if (
                this.entity.pda.pdaData.rwFlag == false &&
                this.entity.peopleList.length < firstMin
            ) {
                this.entity.pda.pdaData.rwFlag = true;
                this.$_open();
            } else {
                this.$_sendToPDAAnalytics();
                this.entity.step++;
            }
        },

        $_validateSecondStep() {
            if (
                /*this.entity.pda.pdaData.sxFlag == false &&*/
                this.entity.iamList.length < secondMin
            ) {
                this.entity.pda.pdaData.sxFlag = true;
                this.$_open();
            } else {
                this.$_sendToPDAAnalytics();
                this.entity.step++;
            }
        },

        $_continue() {
            this.$_sendToPDAAnalytics();
            this.entity.step++;
            this.$_open();
        },

        $_open() {
            this.$refs['popUp'].$_openModal();
        },

        $_sendToPDAAnalytics() {
            const result =
                this.entity.step == step1
                    ? basePDATrackingStatus.questionOne
                    : basePDATrackingStatus.questionTwo;

            basePDATrackingStatus.$_sendToPDAAnalytics(
                this.user.userId,
                result
            );
        },
    },
};
</script>

<template>
    <BasePopUp
        ref="popUp"
        :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '45%'"
        scrollable
        dark
        :isDrawer="false"
        v-if="entity.peopleList && entity.iamList"
    >
        <div slot="Content">
            <v-card flat>
                <v-card-title
                    class="buo-word-break BUO-Paragraph-Small-SemiBold"
                >
                    Necesitamos conocerte más.
                </v-card-title>
                <v-card-text class="buo-word-break BUO-Label-XSmall">
                    {{ message }}
                </v-card-text>
                <v-card-actions>
                    <v-row>
                        <v-col cols="12">
                            <v-layout align-center justify-center>
                                <v-btn
                                    color="primary"
                                    elevation="0"
                                    block
                                    @click="$_open"
                                    class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                                    >Seguir con selección</v-btn
                                >
                            </v-layout>
                        </v-col>
                        <v-col cols="12" v-if="entity.step != 2">
                            <v-layout align-center justify-center>
                                <v-btn
                                    outlined
                                    block
                                    @click="$_continue"
                                    class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                                    elevation="0"
                                    >Continuar</v-btn
                                >
                            </v-layout>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </div>
    </BasePopUp>
</template>
