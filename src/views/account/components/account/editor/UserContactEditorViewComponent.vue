<script>
/**
 * Descripción: Pantalla de display sobre Contacto Editor
 *
 * @displayName UserContactEditorViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

export default {
    name: 'UserContactEditorViewComponent',

    props: {
        value: {
            type: Object,
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

        $_setToTemp() {
            this.temp = BaseArrayHelper.SetObject({}, this.value);
        },

        $_open() {
            this.$_setToTemp();
            this.$refs['popUp'].$_openModal();
        },

        $_setRequest() {
            return {
                correo: this.temp.correo,
                telefono: this.temp.telefono,
                websiteUrl: this.temp.websiteUrl,
                usuarioId: this.user.userId,
            };
        },

        $_setToEntity(resp) {
            this.$_updateValue(resp);
        },

        $_sendToApi() {
            this.loading = true;

            httpService
                .post('perfilUsuario/contacto', this.$_setRequest())
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        const resp = response.data;

                        this.$_setToEntity(resp);

                        this.$_cancel();
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
            <BaseForm :method="$_sendToApi" :cancel="$_cancel" v-else>
                <div slot="body">
                    <section class="pb-5">
                        <span
                            class="BUO-Heading-XSmall"
                            :class="[app ? 'white--text' : 'grey700--text']"
                        >
                            Contacto
                        </span>
                    </section>
                    <v-row dense>
                        <v-col cols="12">
                            <BaseInput
                                label="Email personal"
                                :validate="['email']"
                                v-model="temp.correo"
                                :min="1"
                                :max="125"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseInput
                                label="Teléfono"
                                :validate="['optionalNumber']"
                                v-model="temp.telefono"
                                :min="1"
                                :max="45"
                            />
                        </v-col>

                        <v-col cols="12">
                            <BaseInput
                                label="Website URL"
                                :validate="['optionalWeb']"
                                v-model="temp.websiteUrl"
                                :max="255"
                                :min="1"
                            />
                        </v-col>
                    </v-row>
                </div>
            </BaseForm>
        </div>
    </BasePopUp>
</template>
