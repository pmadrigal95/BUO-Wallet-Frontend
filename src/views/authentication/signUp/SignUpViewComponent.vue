<script>
/**
 * Descripción: Pantalla de Sign Up
 *
 * @displayName CustomerSignUpViewComponent
 */

import googleSDK from '@/services/socialMedia/google-SDK.js';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const AccountViewComponent = () =>
    import('@/views/authentication/signUp/components/AccountViewComponent');

const NameViewComponent = () =>
    import('@/views/authentication/signUp/components/NameViewComponent');

const CountryViewComponent = () =>
    import('@/views/authentication/signUp/components/CountryViewComponent');

export default {
    name: 'SignUpViewComponent',

    metaInfo: {
        title: 'Registro Cliente',
        script: [
            {
                src: googleSDK.$_Script,
                async: true,
                defer: true,
            },
        ],
    },

    components: {
        TheToolbar: () => import('@/layouts/authentication/TheAuthToolbar.vue'),
        AccountViewComponent,
        NameViewComponent,
        CountryViewComponent,
    },

    data() {
        return {
            entity: this.$_Object(),
        };
    },

    created() {
        baseSecurityHelper.$_logout();
        this.$_getObject();
    },

    methods: {
        /**
         * Obj de la pantalla
         */
        $_Object() {
            return {
                username: undefined,
                password: undefined,
                aceptaTerminos: undefined,
                signUpCode: undefined,
                step: 1,
            };
        },

        $_getObject() {
            let data = this.$router.currentRoute.params.data;
            if (data) {
                this.entity = { ...data };
            }
        },
    },
};
</script>

<template>
    <v-window v-model="entity.step" touchless>
        <v-window-item :value="1">
            <AccountViewComponent v-model="entity" />
        </v-window-item>
        <v-window-item :value="2">
            <TheToolbar />
            <NameViewComponent v-model="entity" />
        </v-window-item>
        <v-window-item :value="3">
            <TheToolbar />
            <CountryViewComponent v-model="entity" />
        </v-window-item>
    </v-window>
</template>
