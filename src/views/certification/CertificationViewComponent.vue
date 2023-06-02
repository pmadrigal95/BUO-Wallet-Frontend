<script>
/**
 * Descripción: Pantalla de Validar Certificacion
 *
 * @displayName CertificationViewComponent
 */

import { mapGetters } from 'vuex';

const SearchAbilityViewComponent = () =>
    import(
        '@/views/certification/components/searchAbility/SearchAbilityViewComponent'
    );

const SelectedAbilitiesViewComponent = () =>
    import(
        '@/views/certification/components/searchAbility/SelectedAbilitiesViewComponent'
    );

const AbilityViewComponent = () =>
    import(
        '@/views/certification/components/detailsAbility/AbilityViewComponent'
    );

const SetCompanyViewComponent = () =>
    import(
        '@/views/certification/components/detailsCompany/SetCompanyViewComponent'
    );

const SuccessViewComponent = () =>
    import('@/views/certification/components/successView/SuccessViewComponent');

export default {
    name: 'CertificationViewComponent',

    metaInfo: { title: 'Validar certificación' },

    components: {
        SearchAbilityViewComponent,
        SelectedAbilitiesViewComponent,
        AbilityViewComponent,
        SetCompanyViewComponent,
        SuccessViewComponent,
    },

    data() {
        return {
            entity: this.$_Object(),
            componentKey: 0,
        };
    },

    computed: {
        /**
         * Objecto de Wallet
         */
        ...mapGetters('wallet', ['buoWallet', 'getAbilityToApply']),
    },

    mounted() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.white;
    },

    watch: {
        '$route.params': {
            handler: function () {
                this.$_reviewParams();
            },
            deep: true,
            immediate: true,
        },
    },

    methods: {
        forceRerender() {
            this.componentKey += 1;
        },

        /**
         * Obj de la pantalla
         */
        $_Object() {
            return {
                step: 1,
                type: 'new',
            };
        },

        $_reviewParams() {
            this.forceRerender();
            const ID = this.$router.currentRoute.params.Id;
            const DATA = this.$router.currentRoute.params.data;

            if (ID) {
                this.$_setEditAbility(ID);
            }

            if (DATA) {
                this.$_setNewAbility(DATA);
            }
        },

        $_setEditAbility(ID) {
            if (this.buoWallet) {
                this.entity.type = 'edit';
                this.entity.step = 3;
                this.entity.header = { ...this.getAbilityToApply(ID) };
            } else {
                this.$_goBack();
            }
        },

        $_setNewAbility(DATA) {
            this.entity.type = 'new';
            this.entity.step = 3;
            this.entity.header = { ...DATA };
        },

        $_goBack() {
            this.$router.push({
                name: 'MyAbilitiesViewComponent',
            });
        },
    },
};
</script>

<template>
    <v-window v-model="entity.step" touchless :key="componentKey">
        <v-window-item :value="1">
            <br />
            <SearchAbilityViewComponent :entity="entity" />
        </v-window-item>

        <v-window-item :value="2">
            <br />
            <SelectedAbilitiesViewComponent :entity="entity" />
        </v-window-item>

        <v-window-item :value="3">
            <br />
            <AbilityViewComponent :entity="entity" />
        </v-window-item>

        <v-window-item :value="4">
            <br />
            <SetCompanyViewComponent :entity="entity" />
        </v-window-item>

        <v-window-item :value="5">
            <br />
            <SuccessViewComponent :entity="entity" />
        </v-window-item>
    </v-window>
</template>
