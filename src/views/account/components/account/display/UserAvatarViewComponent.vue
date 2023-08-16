<script>
/**
 * Descripción: Avatar de Cuenta
 *
 * @displayName UserAvatarViewComponent
 */

import { mapGetters, mapActions } from 'vuex';

import httpService from '@/services/axios/httpService';

const BaseAdvancedCropperDialog = () =>
    import('@/components/core/avatars/BaseAdvancedCropperDialog');

export default {
    name: 'UserAvatarViewComponent',

    components: {
        BaseAdvancedCropperDialog,
    },

    data() {
        return {
            loading: false,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'userAvatar']),

        customActionList() {
            return [
                {
                    title: 'Eliminar foto',
                    icon: 'delete-outline',
                    action: this.$_open,
                },
            ];
        },
    },

    methods: {
        ...mapActions('authentication', ['set_user_avatar']),

        $_setRequest(base64) {
            return {
                usuarioId: this.user.userId,
                fotoBase64: base64,
            };
        },

        $_sendToApi(base64) {
            this.loading = true;

            httpService
                .post('perfilUsuario/foto', this.$_setRequest(base64))
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        this.set_user_avatar(response?.data?.fotoEncoded);
                    }
                });
        },

        $_open() {
            this.$refs.popUp.$_openModal();
        },

        $_delete() {
            httpService
                .delete('perfilUsuario/foto', {
                    usuarioId: this.user.userId,
                })
                .then((response) => {
                    if (response != undefined) {
                        // this.$_updateModel();

                        this.$_open();
                    }
                });
        },
    },
};
</script>

<template>
    <v-layout justify-center>
        <!-- @Componente:  BaseDialog-->
        <BaseActionPopUp
            ref="popUp"
            action="delete"
            item="Foto de perfil"
            inset
            :fn="$_delete"
        />
        <BaseSkeletonLoader v-if="loading" type="avatar" />
        <BaseAdvancedCropperDialog
            :callback="$_sendToApi"
            :avatarColor="user.colorAvatar"
            :avatarDisplay="userAvatar"
            :customActionList="customActionList"
            v-else-if="userAvatar && user"
        />
    </v-layout>
</template>
