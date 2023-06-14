<script>
/**
 * Descripción: Pantalla de Login
 *
 * @displayName LoginViewComponent
 */
import { mapGetters, mapActions } from 'vuex';

import googleSDK from '@/services/socialMedia/google-SDK';

import facebookSDK from '@/services/socialMedia/facebook-SDK';

import baseLocalHelper from '@/helpers/baseLocalHelper';

import baseArrayHelper from '@/helpers/baseArrayHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const TheAuthentication = () =>
    import('@/layouts/authentication/TheAuthentication.vue');

const BaseCustomIconButton = () =>
    import('@/components/core/buttons/BaseCustomIconButton');

export default {
    name: 'LoginViewComponent',

    metaInfo: {
        title: 'Authentication',
        script: [
            {
                src: googleSDK.$_Script,
                async: true,
                defer: true,
            },
        ],
    },

    components: {
        TheAuthentication,
        BaseCustomIconButton,
    },

    data() {
        return {
            entity: this.$_Object(),
            showPassword: false,
            lblbtnLogin: baseLocalHelper.$_LabelBtnSigIn,
        };
    },

    computed: {
        ...mapGetters('authentication', ['loadingAuthentication']),

        ...mapGetters('security', ['loadingSecurity']),
    },

    created() {
        baseSecurityHelper.$_logout();
    },

    mounted() {
        setTimeout(function () {
            if (window.google) {
                googleSDK.$_googleRenderButton('googleAccess');
                googleSDK.$_googlePrompt();
            }
        }, 1500);
    },

    methods: {
        /**
         * Obj de la pantalla
         */
        $_Object() {
            return {
                username: undefined,
                password: undefined,
            };
        },

        /**
         * Configuración authentication
         */
        ...mapActions('authentication', ['login']),

        $_authenticate() {
            let object = baseArrayHelper.SetObject({}, this.entity);
            this.login({
                credentials: object,
            });
        },

        $_Password() {
            this.showPassword = !this.showPassword;
        },

        $_goToRoute() {
            baseSharedFnHelper.$_redirect('common/#/ResetPassword');
        },

        $_redirect(route) {
            this.$router.push({ name: route });
        },

        $_facebookAuth() {
            facebookSDK.$_facebookAuth();
        },
    },
};
</script>

<template>
    <TheAuthentication>
        <div slot="RenderBody">
            <v-row class="grey700--text">
                <v-col cols="12">
                    <v-card-text>
                        <v-col cols="12" sm="12" offset-md="1">
                            <h1 class="grey700--text BUO-Display-small">
                                ¡Hola!
                            </h1>

                            <div class="grey700--text BUO-Paragraph-Large pt-3">
                                Iniciar sesión
                            </div>
                        </v-col>
                        <v-row align-content="center" justify="center">
                            <v-col cols="12" sm="12" md="10">
                                <!-- @ Use Loanding... -->
                                <BaseSkeletonLoader
                                    v-if="
                                        loadingAuthentication || loadingSecurity
                                    "
                                    type="article, actions"
                                />
                                <BaseForm
                                    :method="$_authenticate"
                                    :labelBtn="lblbtnLogin"
                                    :block="true"
                                    v-else
                                >
                                    <div slot="body">
                                        <v-row>
                                            <v-col cols="12">
                                                <BaseInput
                                                    label="Email"
                                                    v-model="entity.username"
                                                    :validate="['email']"
                                                />
                                            </v-col>

                                            <v-col cols="12">
                                                <BaseInput
                                                    :type="
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    "
                                                    label="Contraseña"
                                                    :append-icon="
                                                        showPassword
                                                            ? 'mdi-eye'
                                                            : 'mdi-eye-off'
                                                    "
                                                    :clickAppend="$_Password"
                                                    v-model="entity.password"
                                                    :validate="['text']"
                                                />
                                                <div
                                                    class="BUO-Paragraph-Medium text-center"
                                                >
                                                    ¿Olvidaste tu contraseña?
                                                    <a
                                                        @click="$_goToRoute"
                                                        @click.stop
                                                        class="BUO-Paragraph-Medium-SemiBold"
                                                    >
                                                        Ingresa aquí
                                                    </a>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </div>
                                    <div slot="btns">
                                        <div class="mb-5">
                                            <h5
                                                class="text-center neutral--text mt-4 mb-3 BUO-Paragraph-Medium"
                                            >
                                                o inicia sesión con
                                            </h5>
                                            <v-row
                                                justify="center"
                                                align-content="center"
                                                class="pt-1"
                                            >
                                                <div
                                                    class="ma-1"
                                                    id="googleAccess"
                                                ></div>
                                                <BaseCustomIconButton
                                                    :fn="$_facebookAuth"
                                                />
                                            </v-row>
                                        </div>
                                        <div
                                            class="BUO-Paragraph-Medium text-center"
                                            @click="
                                                $_redirect(
                                                    'SignUpViewComponent'
                                                )
                                            "
                                            @click.stop
                                        >
                                            ¿Nuevo en BUO?
                                            <a
                                                class="BUO-Paragraph-Medium-SemiBold"
                                            >
                                                ¡Crea tu cuenta!
                                            </a>
                                        </div>
                                    </div>
                                </BaseForm>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-col>
            </v-row>
        </div>
    </TheAuthentication>
</template>
