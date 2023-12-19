<script>
/**
 * Descripción: Pantalla de display sobre Bio Editor
 *
 * @displayName UserBioEditorViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

export default {
    name: 'UserBioEditorViewComponent',

    props: {
        value: {
            type: Object,
            required: true,
        },

        callback: {
            type: Function,
            required: true,
        },
    },

    data() {
        return {
            componentKey: 0,
            loading: false,
            temp: {},
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user']),
    },

    methods: {
        $_updateValue(event) {
            this.$emit('input', event);
        },

        $_mapperEntity(resp) {
            return {
                usuarioId: resp?.usuarioId,
                mostrarBio: resp?.mostrarBio,
                biografia: resp?.biografia,
                objetivo: resp?.objetivo,
                mostrarHabilidades: resp?.mostrarHabilidades,
            };
        },

        $_setToTemp() {
            this.temp = BaseArrayHelper.SetObject({}, this.value);
        },

        $_open() {
            this.$_setToTemp();
            this.$refs['popUp'].$_openModal();
        },

        $_setRequest() {
            return {
                objetivo: this.temp.objetivo,
                biografia: this.temp.biografia,
                mostrarHabilidades: this.temp.mostrarHabilidades,
                usuarioId: this.user.userId,
            };
        },

        $_setToEntity(resp) {
            this.$_updateValue(resp);
        },

        $_sendToApi() {
            this.loading = true;

            httpService
                .post('perfilUsuario', this.$_setRequest())
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        const resp = response.data;

                        this.$_setToEntity(this.$_mapperEntity(resp));

                        this.$_cancel();

                        this.callback();
                    }
                });
        },

        $_cancel() {
            this.$refs['popUp'].$_openModal();
            this.componentKey++;
        },
    },
};
</script>

<template>
    <BasePopUp
        ref="popUp"
        :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '60%'"
        :isDrawer="false"
        :key="componentKey"
    >
        <div slot="Content">
            <BaseSkeletonLoader v-if="loading" type="article" />
            <BaseForm
                :method="$_sendToApi"
                :cancel="$_cancel"
                v-else
                :block="$vuetify.breakpoint.mobile"
            >
                <div slot="body">
                    <section class="pb-5">
                        <span
                            class="BUO-Heading-XSmall"
                            :class="[app ? 'white--text' : 'grey700--text']"
                        >
                            Sobre mí
                        </span>
                    </section>
                    <v-row dense>
                        <v-col cols="12">
                            <span
                                class="BUO-Paragraph-Small"
                                :class="[app ? 'white--text' : 'black--text']"
                                >Regálanos una breve descripción sobre tí</span
                            >
                            <BaseTextArea
                                v-model="temp.biografia"
                                rows="4"
                                placeholder="Regálanos una breve descripción sobre tí"
                                clearable
                                :validate="['optionalText']"
                                :max="500"
                                :min="1"
                                counter="500"
                            />
                        </v-col>

                        <v-col cols="12">
                            <span
                                class="BUO-Paragraph-Small"
                                :class="[app ? 'white--text' : 'black--text']"
                                >Regálanos una breve descripción tus intereses
                                metas y objetivos profesionales</span
                            >
                            <BaseTextArea
                                v-model="temp.objetivo"
                                rows="4"
                                placeholder="Regálanos una breve descripción tus intereses metas y objetivos profesionales"
                                clearable
                                :validate="['optionalText']"
                                :max="500"
                                :min="1"
                                counter="500"
                            />
                        </v-col>
                        <v-col cols="12">
                            <BaseSwitch
                                v-model="temp.mostrarHabilidades"
                                label="Mostrar mis indicadores Buo Psychometric"
                            />
                        </v-col>
                    </v-row>
                </div>
            </BaseForm>
        </div>
    </BasePopUp>
</template>
