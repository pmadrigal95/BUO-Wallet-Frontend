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
    },
};
</script>

<template>
    <v-layout justify-center>
        <BaseSkeletonLoader v-if="loading" type="avatar" />
        <BaseAdvancedCropperDialog
            :callback="$_sendToApi"
            :avatarColor="user.colorAvatar"
            :avatarDisplay="userAvatar"
            v-else-if="userAvatar && user"
        />
    </v-layout>
</template>
