<script>
/**
 * Descripción: Pantalla de display Bio
 *
 * @displayName UserBioViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

const UserBioEditorViewComponent = () =>
    import(
        '@/views/account/components/account/editor/UserBioEditorViewComponent'
    );

const DisplaySectionViewComponent = () =>
    import(
        '@/views/account/components/account/shared/DisplaySectionViewComponent'
    );

export default {
    name: 'UserBioViewComponent',

    components: {
        DisplaySectionViewComponent,
        UserBioEditorViewComponent,
    },

    data() {
        return {
            entity: {},
            pdaList: [],
            loading: false,
            loadingPda: false,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user']),
    },

    created() {
        this.$_sendToApi();
    },

    methods: {
        $_mapperEntity(resp) {
            return {
                usuarioId: resp?.usuarioId,
                mostrarBio: resp?.mostrarBio,
                biografia: resp?.biografia,
                objetivo: resp?.objetivo,
                mostrarHabilidades: resp?.mostrarHabilidades,
            };
        },

        $_userSendToApi() {
            this.loading = true;
            httpService
                .get(`perfilUsuario/${this.user.userId}`)
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        this.entity = BaseArrayHelper.SetObject(
                            {},
                            this.$_mapperEntity(response.data)
                        );

                        this.entity.mostrarHabilidades && this.$_pdaSendToApi();
                    }
                });
        },

        $_pdaSendToApi() {
            if (this.entity.mostrarHabilidades && this.pdaList.length > 0)
                return;

            this.pdaList = [];

            if (!this.entity.mostrarHabilidades) return;

            this.loadingPda = true;
            httpService
                .get(`perfilUsuario/habilidadesPDA/${this.user.userId}`)
                .then((response) => {
                    this.loadingPda = false;
                    if (response != undefined) {
                        this.pdaList = BaseArrayHelper.SetObject(
                            [],
                            response.data
                        );
                    }
                });
        },

        $_sendToApi() {
            this.$_userSendToApi();
        },

        $_open() {
            this.$refs['popUp'].$_open();
        },
    },
};
</script>

<template>
    <section class="mt-6">
        <UserBioEditorViewComponent
            ref="popUp"
            v-model="entity"
            :callback="$_pdaSendToApi"
        />

        <v-layout justify-center>
            <BaseSkeletonLoader v-if="loading" type="card" />
            <v-card flat class="rounded" width="100%" height="100%" v-else>
                <v-card-text>
                    <section>
                        <v-layout
                            justify-space-between
                            align-center
                            class="pt-2"
                        >
                            <span
                                class="BUO-Paragraph-Large-SemiBold"
                                :class="[app ? 'white--text' : 'grey700--text']"
                                >Sobre mí</span
                            >
                            <v-btn
                                @click="$_open"
                                icon
                                :color="app ? 'clouds' : 'black'"
                            >
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                        </v-layout>
                        <DisplaySectionViewComponent
                            v-if="entity.mostrarBio != undefined"
                            section="BIO"
                            v-model="entity.mostrarBio"
                        />
                    </section>
                    <section v-if="entity.biografia" class="mb-4 pl-2">
                        <span
                            class="BUO-Paragraph-Small"
                            :class="[app ? 'white--text' : 'grey600--text']"
                            >{{ entity.biografia }}</span
                        >
                    </section>
                    <section v-if="entity.objetivo" class="mb-4 pl-2">
                        <h1
                            class="BUO-Paragraph-Small-SemiBold pb-1"
                            :class="[app ? 'white--text' : 'grey700--text']"
                        >
                            Objetivo profesional
                        </h1>
                        <span
                            class="BUO-Paragraph-Small"
                            :class="[app ? 'white--text' : 'grey600--text']"
                            >{{ entity.objetivo }}</span
                        >
                    </section>
                    <section
                        class="mb-4 pl-2"
                        v-else-if="
                            !entity.biografia &&
                            !entity.objetivo &&
                            pdaList.length == 0
                        "
                    >
                        <span
                            class="BUO-Paragraph-Small"
                            :class="[app ? 'white--text' : 'grey600--text']"
                            >Regalanos una breve descripción sobre tí, tus
                            intereses metas y objetivos profesionales</span
                        >
                    </section>
                    <section class="mb-1 pl-2">
                        <BaseSkeletonLoader v-if="loadingPda" type="card" />
                        <v-layout
                            justify-start
                            align-center
                            class="pt-2 pb-2"
                            v-else-if="
                                entity.mostrarHabilidades && pdaList.length > 0
                            "
                        >
                            <span
                                class="BUO-Paragraph-Small-SemiBold"
                                :class="[app ? 'white--text' : 'grey700--text']"
                                >Indicadores PDA</span
                            >
                        </v-layout>
                        <v-chip-group column>
                            <v-chip v-for="(item, i) in pdaList" :key="i">
                                <span
                                    class="BUO-Label-Small"
                                    :class="[
                                        app
                                            ? 'blueProgress600--text'
                                            : 'grey600--text',
                                    ]"
                                >
                                    {{ item }}
                                </span>
                            </v-chip>
                        </v-chip-group>
                    </section>
                </v-card-text>
            </v-card>
        </v-layout>
    </section>
</template>
