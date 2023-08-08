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
            loading: false,
            entity: {},
        };
    },

    computed: {
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
        this.$_getInformation();
    },

    methods: {
        $_getInformation() {
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
        <UserInfoEditorViewComponent ref="popUp" :entity="entity" />

        <BaseSkeletonLoader v-if="loading" type="article" />
        <v-layout justify-center v-else-if="entity.nombreCompleto">
            <section @click="$_open">
                <section class="BUO-Heading-Small grey700--text onHover">
                    {{ entity.nombreCompleto }}
                </section>
                <section class="BUO-Paragraph-Small grey600--text onHover">
                    {{ `${age} ${separator} ${country}` }}
                </section>
            </section>
        </v-layout>
    </section>
</template>

<style scoped>
.onHover:hover {
    cursor: pointer !important;
    color: #01aa71 !important;
}
</style>
