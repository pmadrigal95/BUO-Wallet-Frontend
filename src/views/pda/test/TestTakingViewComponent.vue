<script>
/**
 * Descripción: Pantalla PDA Test Taking
 *
 * @displayName TestTakingViewComponent
 */

import '@/css/pda.css';

import { mapGetters, mapActions } from 'vuex';

import httpService from '@/services/axios/httpService';

const PeopleSayViewComponent = () =>
    import('@/views/pda/test/components/people-say/PeopleSayViewComponent');

const IamViewComponent = () =>
    import('@/views/pda/test/components/i-am/IamViewComponent');

const DescribeMeViewComponent = () =>
    import('@/views/pda/test/components/i-am/DescribeMeViewComponent');

const ProfileViewComponent = () =>
    import('@/views/pda/test/components/shareable/ProfileViewComponent');

const RiskAxisViewComponent = () =>
    import('@/views/pda/test/components/shareable/RiskAxisViewComponent');

const PreviewPurchaseViewComponent = () =>
    import('@/views/pda/test/components/purchase/PreviewPurchaseViewComponent');

const InstructionsViewComponent = () =>
    import(
        '@/views/pda/test/components/instructions/InstructionsViewComponent'
    );

const AbilitiesPDAViewComponent = () =>
    import('@/views/pda/test/components/shareable/AbilitiesPDAViewComponent');

const PDAPaymentViewComponent = () =>
    import('@/views/pda/test/components/purchase/PDAPaymentViewComponent');

export default {
    name: 'TestTakingViewComponent',

    metaInfo: { title: 'Buo Psychometric Test Taking' },

    components: {
        PeopleSayViewComponent,
        IamViewComponent,
        DescribeMeViewComponent,
        ProfileViewComponent,
        RiskAxisViewComponent,
        PreviewPurchaseViewComponent,
        InstructionsViewComponent,
        AbilitiesPDAViewComponent,
        PDAPaymentViewComponent,
    },

    data() {
        return {
            entity: this.$_Object(),
            wordList: [],
            loading: false,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user']),
    },

    mounted() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.white;
        this.$_reviewStatus();
    },

    methods: {
        ...mapActions('pda', ['$_set_pda_wallet']),

        $_Object() {
            return {
                step: 0,
                iamList: [],
                peopleList: [],
                pda: {
                    subBase: undefined,
                    pdaData: {
                        individualId: undefined,
                        startDate: undefined,
                        endDate: undefined,
                        duration: undefined,
                        rwFlag: false,
                        sxFlag: false,
                        description: undefined,
                        wordsList: [],
                    },
                    sendMails: false,
                },
            };
        },

        $_getWords() {
            this.entity.pda.username = this.user.email;
            this.loading = true;
            httpService.get('pda/getWords').then((response) => {
                if (response != undefined) {
                    this.wordList = response.data;
                }
                this.loading = false;
            });
        },

        $_getPDAWallet(entity) {
            this.$_set_pda_wallet(entity);
            this.$_returnToWallet();
        },

        $_reviewStatus() {
            this.loading = true;
            httpService
                .get(`/pda/getTest/${this.user.email}`)
                .then((response) => {
                    if (response != undefined) {
                        if (response.data) {
                            this.$_getPDAWallet(response.data);
                        } else {
                            this.$_getWords();
                        }
                    }
                    this.loading = false;
                });
        },

        /**
         * Volver al Wallet
         */
        $_returnToWallet() {
            this.$router.push({
                name: 'PDAWalletViewComponent',
            });
        },
    },
};
</script>

<template>
    <div>
        <BaseSkeletonLoader v-if="loading" type="card, article" />
        <v-window v-model="entity.step" touchless v-else>
            <v-window-item :value="0">
                <InstructionsViewComponent :entity="entity" />
            </v-window-item>
            <v-window-item :value="1">
                <PeopleSayViewComponent :entity="entity" :wordList="wordList" />
            </v-window-item>

            <v-window-item :value="2">
                <IamViewComponent :entity="entity" :wordList="wordList" />
            </v-window-item>

            <v-window-item :value="3">
                <DescribeMeViewComponent :entity="entity" />
            </v-window-item>

            <v-window-item :value="4">
                <ProfileViewComponent :entity="entity" />
            </v-window-item>

            <v-window-item :value="5">
                <RiskAxisViewComponent :entity="entity" />
            </v-window-item>

            <v-window-item :value="6">
                <AbilitiesPDAViewComponent
                    v-if="entity.step == 6"
                    :entity="entity"
                />
            </v-window-item>

            <v-window-item :value="7">
                <PreviewPurchaseViewComponent :entity="entity" />
            </v-window-item>

            <v-window-item :value="8">
                <PDAPaymentViewComponent />
            </v-window-item>
        </v-window>
    </div>
</template>
