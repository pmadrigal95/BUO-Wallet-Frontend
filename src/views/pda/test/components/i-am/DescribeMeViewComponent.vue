<script>
/**
 * Descripción: Cuéntanos un poco más de ti. Redacta una pequeña descripción tuya.
 *
 * @displayName DescribeMeViewComponent
 */

import { mapGetters, mapActions } from 'vuex';

import httpService from '@/services/axios/httpService.js';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper.js';

import basePDATrackingStatus from '@/helpers/basePDATrackingStatus.js';

import { differenceInMinutes } from 'date-fns';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

export default {
    name: 'DescribeMeViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BaseCardViewComponent,
    },

    data() {
        return {
            color: baseSharedFnHelper.$_returnRandomPDAGradient(),
            loading: false,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user']),
    },

    methods: {
        ...mapActions('pda', ['$_set_pda_wallet']),

        $_goBack() {
            this.entity.step = 2;
        },

        $_open() {
            this.$refs['popUp'].$_openModal();
        },

        $_retry() {
            location.reload();
        },

        $_cancel() {
            this.$router.push({ name: 'HomeViewComponent' });
        },

        $_sendTestPDA() {
            this.$_sendToPDAAnalytics(this.user.userId);
            this.$_prepareObject();
            this.$_sendToApi();
        },

        $_sendToApi() {
            this.loading = true;
            httpService
                .post('pda/addTest', this.entity.pda)
                .then((response) => {
                    if (response != undefined) {
                        if (response.data) {
                            delete this.entity.iamList;
                            delete this.entity.peopleList;
                            delete this.entity.pda;
                            this.entity.step = 4;
                            this.$_set_pda_wallet(response.data);
                        } else {
                            this.$_open();
                        }
                    } else {
                        this.$_open();
                    }
                    this.loading = false;
                });
        },

        $_prepareObject() {
            if (
                !this.entity.pda.pdaData.endDate ||
                !this.entity.pda.pdaData.duration
            ) {
                this.entity.pda.pdaData.endDate = new Date();
                this.entity.pda.pdaData.duration = differenceInMinutes(
                    this.entity.pda.pdaData.endDate,
                    this.entity.pda.pdaData.startDate
                );
            }

            this.$_getWordsList();
        },

        $_getWordsList() {
            this.entity.pda.pdaData.wordsList = [];
            this.$_insertWordIntoList(this.entity.peopleList, 'A');
            this.$_insertWordIntoList(this.entity.iamList, 'N');
        },

        $_insertWordIntoList(array, type) {
            array.forEach((element) =>
                this.entity.pda.pdaData.wordsList.push({
                    type: type,
                    number: element.id,
                })
            );
        },

        $_sendToPDAAnalytics(userId) {
            basePDATrackingStatus.$_sendToPDAAnalytics(
                userId,
                basePDATrackingStatus.questionThree
            );
        },
    },
};
</script>

<template>
    <div>
        <BasePopUp
            ref="popUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '45%'"
            :isDrawer="false"
            scrollable
            persistent
            dark
        >
            <div slot="Content">
                <v-card flat>
                    <v-card-title class="BUO-Paragraph-Small-SemiBold">
                        Necesitamos conocerte un poco más...
                    </v-card-title>
                    <v-card-text class="BUO-Label-XSmall">
                        Vuelve a tomar el test seleccionando solamente las
                        palabras con las que realmente te identificas. <br />
                        Recuerda que debes responder en un lugar tranquilo y sin
                        prisa.
                    </v-card-text>
                    <v-card-actions>
                        <v-row>
                            <v-col cols="12">
                                <v-layout align-center justify-center>
                                    <v-btn
                                        color="primary"
                                        block
                                        @click="$_retry"
                                        class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                                        elevation="0"
                                        >Continuar</v-btn
                                    >
                                </v-layout>
                            </v-col>
                            <v-col cols="12">
                                <v-layout align-center justify-center>
                                    <v-btn
                                        block
                                        outlined
                                        @click="$_cancel"
                                        class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                                        elevation="0"
                                        >Intentarlo más tarde</v-btn
                                    >
                                </v-layout>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </div>
        </BasePopUp>
        <BaseSkeletonLoader v-if="loading" type="card, article" />
        <BaseCardViewComponent :btnAction="$_goBack" v-else>
            <div slot="card-text" :class="`rounded-lg ${color}`">
                <v-card dark flat color="transparent" v-if="entity.pda">
                    <v-card-subtitle class="buo-word-break">
                        <v-list-item two-line class="list" dark>
                            <v-list-item-avatar class="cleanBorder">
                                <v-img
                                    contain
                                    :height="
                                        $vuetify.breakpoint.mobile
                                            ? '60px'
                                            : '40px'
                                    "
                                    src="https://buo-resources.s3.us-east-2.amazonaws.com/wallet/pda-3.svg"
                                    lazy-src="
                                        https://buo-resources.s3.us-east-2.amazonaws.com/wallet/pda-3.svg
                                    "
                                >
                                </v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title
                                    class="buo-white-space BUO-Paragraph-Large-SemiBold"
                                    >Cuéntanos un poco más de ti. Redacta una
                                    pequeña descripción tuya.</v-list-item-title
                                >
                                <v-list-item-subtitle
                                    class="buo-white-space BUO-Paragraph-Small"
                                >
                                    Puedes hacerla tan corta o tan larga como
                                    quieras.
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card-subtitle>

                    <v-card-text>
                        <BaseForm
                            :method="$_sendTestPDA"
                            :enterSubmit="false"
                            labelBtn="Continuar"
                            block
                            color="black"
                            actionsColor="transparent"
                        >
                            <div slot="body">
                                <v-card
                                    light
                                    flat
                                    max-width="100%"
                                    max-height="100%"
                                    class="rounded-lg"
                                >
                                    <v-card-text>
                                        <BaseTextArea
                                            counter
                                            rows="4"
                                            :max="1000"
                                            clearable
                                            persistent-hint
                                            v-model.trim="
                                                entity.pda.pdaData.description
                                            "
                                        />
                                    </v-card-text>
                                </v-card>
                            </div>
                        </BaseForm>
                    </v-card-text>
                </v-card>
            </div>
        </BaseCardViewComponent>
    </div>
</template>

<style scoped>
.cleanBorder {
    border-radius: 0% !important;
}
</style>
