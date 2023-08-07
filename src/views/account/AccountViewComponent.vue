<script>
/**
 * Descripción: Pantalla Cuenta / Perfil de Usuario
 *
 * @displayName AccountViewComponent
 */

import { mapGetters, mapActions } from 'vuex';

import httpService from '@/services/axios/httpService';

const BaseAdvancedCropperDialog = () =>
    import('@/components/core/avatars/BaseAdvancedCropperDialog');

export default {
    name: 'AccountViewComponent',

    metaInfo: { title: 'Mi Cuenta' },

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
    <BaseSkeletonLoader v-if="loading" type="avatar" />
    <BaseAdvancedCropperDialog
        :callback="$_sendToApi"
        :avatarColor="user.colorAvatar"
        :avatarDisplay="userAvatar"
        v-else-if="userAvatar && user"
    />
</template>
