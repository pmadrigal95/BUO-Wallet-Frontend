<script>
/**
 * Descripción: Pantalla Cuenta / Perfil de Usuario
 *
 * @displayName AccountViewComponent
 */

import { mapGetters } from 'vuex';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const UserAccountViewComponent = () =>
    import('@/views/account/components/account/UserAccountViewComponent');

const UserPasswordViewComponent = () =>
    import('@/views/account/components/password/UserPasswordViewComponent');

export default {
    name: 'AccountViewComponent',

    metaInfo: { title: 'Mi Cuenta' },

    components: {
        BaseCardViewComponent,
        UserAccountViewComponent,
        UserPasswordViewComponent,
    },

    data() {
        return {
            step: 0,
        };
    },

    computed: { ...mapGetters('theme', ['app']) },

    watch: {
        /**
         * Actualizar
         */
        step: {
            handler(value) {
                this.$vuetify.theme.themes.light.background =
                    value === 0
                        ? this.$vuetify.theme.themes.light.clouds
                        : this.$vuetify.theme.themes.light.white;
            },
            immediate: true,
        },
    },

    methods: {
        $_goHome() {
            this.$router.push({
                name: 'HomeViewComponent',
            });
        },

        $_goAccount() {
            this.step = 0;
        },

        $_goChangePwd() {
            this.step = 1;
        },

        $_goBack() {
            if (this.step == 0) return this.$_goHome();

            if (this.step == 1) return this.$_goAccount();
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        :title="step != 0 ? 'Cambiar mi contraseña' : 'Mi Perfil'"
        :btnAction="$_goBack"
    >
        <div slot="card-text">
            <v-window v-model="step">
                <v-window-item :value="0">
                    <UserAccountViewComponent />
                </v-window-item>

                <v-window-item :value="1">
                    <UserPasswordViewComponent :callback="$_goAccount" />
                </v-window-item>
            </v-window>
        </div>

        <div slot="body" v-if="step == 0">
            <section
                class="buo-footer pt-1"
                :class="[app ? '#1e1e1e' : '#EEF4F9']"
            >
                <v-layout
                    :justify-end="!$vuetify.breakpoint.mobile"
                    :justify-center="$vuetify.breakpoint.mobile"
                >
                    <section>
                        <v-btn
                            class="ma-2 no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                            :class="[app ? 'grey700' : 'Buo-White-Background']"
                            elevation="0"
                            depressed
                            outlined
                            :color="app ? 'white' : 'primary'"
                            large
                            dark
                            :block="$vuetify.breakpoint.mobile"
                            @click="$_goChangePwd"
                        >
                            Cambiar mi contraseña</v-btn
                        >

                        <v-btn
                            class="ma-2 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                            elevation="0"
                            color="primary"
                            large
                            dark
                            :block="$vuetify.breakpoint.mobile"
                            depressed
                            :to="{ name: 'LoginViewComponent' }"
                        >
                            Cerrar sesión</v-btn
                        >
                    </section>
                </v-layout>
            </section>
        </div>
    </BaseCardViewComponent>
</template>
