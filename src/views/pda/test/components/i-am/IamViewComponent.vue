<script>
/**
 * Descripción: Realmente soy una persona...
 *
 * @displayName IamViewComponent
 */

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseWordsListContainer = () =>
    import('@/views/pda/test/components/common/BaseWordsListContainer');

const BasePDAWordsList = () =>
    import('@/views/pda/test/components/common/BasePDAWordsList');

const BaseNotificationHelper = () =>
    import('@/views/pda/test/components/common/BaseNotificationHelper');

export default {
    name: 'IamViewComponent',

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

    methods: {
        $_goBack() {
            this.entity.step = 1;
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
                <BasePDAWordsList
                    :list="wordList"
                    :containerList="entity.iamList"
                />
                <BaseWordsListContainer
                    position="bottom"
                    :list="entity.iamList"
                    class="mt-6"
                />
                <v-btn
                    @click="$_nextStep"
                    block
                    dark
                    class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold mt-7"
                    elevation="0"
                    >Continuar <v-icon right>mdi-arrow-right</v-icon></v-btn
                >
            </div>
        </BaseCardViewComponent>
    </div>
</template>
