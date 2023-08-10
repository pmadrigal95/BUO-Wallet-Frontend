<script>
/**
 * Descripción: Pantalla de display sobre información principal
 *
 * @displayName UserInfoViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

const UserInfoEditorViewComponent = () =>
    import(
        '@/views/account/components/account/editor/UserInfoEditorViewComponent'
    );

export default {
    name: 'UserInfoViewComponent',

    components: {
        UserInfoEditorViewComponent,
    },

    data() {
        return {
            entity: {},
            loading: false,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user']),

        age() {
            return this.entity?.fechaNacimiento
                ? baseSharedFnHelper.$_getAge(
                      new Date(this.entity?.fechaNacimiento)
                  ) + ' años'
                : '';
        },

        country() {
            return this.entity?.nombrePais ? this.entity?.nombrePais : '';
        },

        separator() {
            return this.entity?.fechaNacimiento && this.entity?.nombrePais
                ? '-'
                : '';
        },
    },

    created() {
        this.$_sendToApi();
    },

    methods: {
        $_sendToApi() {
            this.loading = true;
            httpService
                .get(`perfilUsuario/intro/${this.user.userId}`)
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        this.entity = BaseArrayHelper.SetObject(
                            {},
                            response.data
                        );
                    }
                });
        },

        $_open() {
            this.$refs['popUp'].$_open();
        },
    },
};
</script>

<template>
    <section class="mt-n3">
        <UserInfoEditorViewComponent ref="popUp" v-model="entity" />

        <v-layout justify-center class="text-center">
            <BaseSkeletonLoader v-if="loading" type="list-item" />
            <section style="cursor: pointer" v-else-if="entity.nombreCompleto">
                <section
                    @click="$_open"
                    class="BUO-Heading-Small"
                    :class="[app ? 'white--text' : 'grey700--text']"
                >
                    {{ entity.nombreCompleto }}
                </section>
                <section
                    @click="$_open"
                    class="BUO-Paragraph-Small"
                    :class="[app ? 'blueProgress600--text' : 'grey600--text']"
                >
                    {{ `${age} ${separator} ${country}` }}
                </section>

                <section class="pt-2">
                    <v-btn
                        class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                        :class="[app ? 'grey700' : 'Buo-White-Background']"
                        elevation="0"
                        depressed
                        outlined
                        :color="app ? 'white' : 'primary'"
                        @click="$_open"
                    >
                        <span class="BUO-Paragraph-Small-SemiBold">
                            Editar
                        </span>
                        <v-icon small right dark> mdi-pencil </v-icon>
                    </v-btn>
                </section>
            </section>
        </v-layout>
    </section>
</template>
