<script>
/**
 * Descripción: Pantalla de Registro de Cuenta
 *
 * @displayName AccountViewComponent
 */
import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService.js';

import googleSDK from '@/services/socialMedia/google-SDK.js';

import facebookSDK from '@/services/socialMedia/facebook-SDK.js';

const TheAuthentication = () =>
    import('@/layouts/authentication/TheAuthentication.vue');

const BaseCustomIconButton = () =>
    import('@/components/core/buttons/BaseCustomIconButton');

const BaseReCaptchaForm = () =>
    import('@/components/core/forms/BaseReCaptchaForm');

const BasePasswordInput = () =>
    import('@/components/core/forms/BasePasswordInput');

export default {
    name: 'AccountViewComponent',

    props: {
        /**
         * V-model
         */
        value: {
            type: Object,
            require: true,
        },
    },

    components: {
        TheAuthentication,
        BasePasswordInput,
        BaseCustomIconButton,
        BaseReCaptchaForm,
    },

    data() {
        return {
            loading: false,
        };
    },

    computed: {
        ...mapGetters('authentication', ['loadingAuthentication']),
    },

    mounted() {
        this.$_reviewSignUpCode();

        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.white;

        setTimeout(function () {
            if (window.google) {
                googleSDK.$_googleRenderButton('googleAccess');
            }
        }, 1500);
    },

    methods: {
        $_reviewSignUpCode() {
            this.value.signUpCode = this.$router.currentRoute.params.Id;
        },

        $_sendToApi() {
            this.loading = true;
            httpService.post('user/save', this.value).then((response) => {
                if (response != undefined) {
                    this.value.id = response.data.id;
                    this.value.correo = response.data.correo;
                    this.value.nombre = response.data.nombre;
                    this.value.apellidos = response.data.apellidos;
                    this.value.paisId = response.data.paisId;
                    this.value.step = 2;
                }
                this.loading = false;
            });
        },

        open() {
            const url = `${window.location.origin}/termsAndConditions.html`;
            window.open(url, '_blank');
        },

        $_facebookAuth() {
            facebookSDK.$_facebookAuth();
        },

        $_goToRoute(route) {
            this.$router.push({ name: route });
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
                                Crea tu cuenta aquí
                            </div>
                        </v-col>
                        <v-row align-content="center" justify="center">
                            <v-col cols="12" sm="12" md="10">
                                <!-- @ Use Loanding... -->
                                <BaseSkeletonLoader
                                    v-if="loading || loadingAuthentication"
                                    type="article, actions"
                                />
                                <BaseReCaptchaForm
                                    block
                                    :method="$_sendToApi"
                                    labelBtn="Crear Cuenta"
                                    v-else
                                >
                                    <section
                                        slot="body"
                                        class="BUO-Paragraph-Medium"
                                    >
                                        <v-row>
                                            <v-col cols="12">
                                                <BaseInput
                                                    label="Email"
                                                    v-model.trim="
                                                        value.username
                                                    "
                                                    :validate="['email']"
                                                />
                                            </v-col>
                                        </v-row>

                                        <BasePasswordInput
                                            v-model.trim="value.password"
                                        />
                                        <v-row>
                                            <v-col cols="12">
                                                <v-checkbox
                                                    v-model="
                                                        value.aceptaTerminos
                                                    "
                                                    validate-on-blur
                                                    :rules="[
                                                        (v) =>
                                                            !!v ||
                                                            'Se requiere aceptar los Términos, Condiciones y Política de Privacidad para continuar',
                                                    ]"
                                                >
                                                    <template v-slot:label>
                                                        <section
                                                            class="BUO-Paragraph-Medium grey-700-text"
                                                        >
                                                            Estoy de Acuerdo con
                                                            los
                                                            <a
                                                                @click="open"
                                                                @click.stop
                                                                class="BUO-Paragraph-Medium-SemiBold"
                                                            >
                                                                Términos,
                                                                Condiciones y
                                                                Política de
                                                                Privacidad
                                                            </a>
                                                        </section>
                                                    </template>
                                                </v-checkbox>
                                            </v-col>
                                        </v-row>
                                    </section>

                                    <div slot="btns">
                                        <section class="mb-4">
                                            <h5
                                                class="text-center neutral--text mt-4 mb-3 BUO-Paragraph-Medium"
                                            >
                                                o crea tu cuenta con
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
                                        </section>
                                        <div
                                            class="BUO-Paragraph-Medium text-center"
                                            @click="
                                                $_goToRoute(
                                                    'LoginViewComponent'
                                                )
                                            "
                                            @click.stop
                                        >
                                            ¿Ya tienes cuenta?
                                            <a
                                                class="BUO-Paragraph-Medium-SemiBold"
                                            >
                                                Ingresa aquí
                                            </a>
                                        </div>
                                    </div>
                                </BaseReCaptchaForm>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-col>
            </v-row>
        </div>
    </TheAuthentication>
</template>
