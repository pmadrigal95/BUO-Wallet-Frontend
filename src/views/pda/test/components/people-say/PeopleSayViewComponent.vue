<script>
/**
 * Descripción: La gente dice que soy una persona...
 *
 * @displayName PeopleSayViewComponent
 */

import { mapGetters } from 'vuex';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseWordsListContainer = () =>
    import('@/views/pda/test/components/common/BaseWordsListContainer');

const BasePDAWordsList = () =>
    import('@/views/pda/test/components/common/BasePDAWordsList');

const BaseNotificationHelper = () =>
    import('@/views/pda/test/components/common/BaseNotificationHelper');

export default {
    name: 'PeopleSayViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },

        wordList: {
            type: Array,
            requiered: true,
        },
    },

    components: {
        BaseCardViewComponent,
        BaseWordsListContainer,
        BasePDAWordsList,
        BaseNotificationHelper,
    },

    computed: { ...mapGetters('theme', ['app']) },

    mounted() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.white;
    },

    methods: {
        $_goBack() {
            this.$router.push({
                name: 'HomeViewComponent',
            });
        },

        $_nextStep() {
            this.$refs['BaseNotificationHelper'].$_nextStep();
        },
    },
};
</script>

<template>
    <div v-if="entity.pda">
        <BaseNotificationHelper ref="BaseNotificationHelper" :entity="entity" />
        <BaseCardViewComponent :btnAction="$_goBack">
            <div slot="card-text">
                <BaseWordsListContainer
                    :list="entity.peopleList"
                    class="pt-5 pb-7"
                />
                <BasePDAWordsList
                    :list="wordList"
                    :containerList="entity.peopleList"
                />
                <v-btn
                    @click="$_nextStep"
                    block
                    dark
                    class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold mt-3"
                    elevation="0"
                    :color="app ? 'blue800' : 'black'"
                    >Continuar <v-icon right>mdi-arrow-right</v-icon></v-btn
                >
            </div>
        </BaseCardViewComponent>
    </div>
</template>
