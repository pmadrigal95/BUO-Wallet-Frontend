<script>
/**
 * Descripción: Pantalla de Registro de Pais
 *
 * @displayName CountryViewComponent
 */

import { mapActions } from 'vuex';

import httpService from '@/services/axios/httpService.js';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

export default {
    name: 'CountryViewComponent',

    props: {
        /**
         * V-model
         */
        value: {
            type: Object,
            require: true,
        },
    },

    data() {
        return {
            loading: false,
        };
    },

    components: {
        BaseCardViewComponent,
    },

    created() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.white;
    },

    methods: {
        /**
         * Configuración authentication
         */
        ...mapActions('authentication', ['login']),

        $_sendToApi() {
            this.loading = true;
            httpService.post('user/update', this.value).then((response) => {
                if (response != undefined) {
                    this.login({
                        credentials: {
                            username: this.value.username,
                            password: this.value.password,
                        },
                        isNewUser: true,
                    });
                }
                this.loading = false;
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent>
        <div slot="card-subtitle">
            <v-card flat color="transparent">
                <v-card-text>
                    <br />
                    <v-layout justify-center align-center>
                        <BaseProgressLinear
                            :value="90"
                            color="greenB900"
                            title="Completa tu registro"
                            subtitle="2/2"
                            bottom
                        />
                    </v-layout>
                </v-card-text>

                <v-card-title
                    class="buo-word-break"
                    :class="[
                        $vuetify.breakpoint.smAndDown
                            ? 'BUO-Heading-Small'
                            : 'BUO-Heading-Medium',
                    ]"
                >
                    ¿Dónde vives?
                </v-card-title>

                <v-card-subtitle
                    class="buo-word-break"
                    :class="[
                        $vuetify.breakpoint.smAndDown
                            ? 'BUO-Paragraph-Medium'
                            : 'BUO-Paragraph-Large',
                    ]"
                >
                    Ingresa tu país de residencia
                </v-card-subtitle>
            </v-card>
        </div>
        <div slot="card-text">
            <BaseForm :method="$_sendToApi" labelBtn="Siguiente" block>
                <div slot="body">
                    <v-row>
                        <v-col cols="12">
                            <!-- @BaseSelect -->
                            <BaseSelect
                                label="País"
                                endpoint="pais/list"
                                itemText="nombre"
                                itemValue="id"
                                v-model="value.paisId"
                                :validate="['text']"
                            />
                        </v-col>
                    </v-row>
                </div>
            </BaseForm>
        </div>
    </BaseCardViewComponent>
</template>
