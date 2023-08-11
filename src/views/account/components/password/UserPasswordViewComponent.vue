<script>
/**
 * Descripción: Pantalla Cambiar password User
 *
 * @displayName UserPasswordViewComponent
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

const BasePasswordInput = () =>
    import('@/components/core/forms/BasePasswordInput');

export default {
    name: 'UserPasswordViewComponent',

    props: {
        callback: {
            type: Function,
            requiered: true,
        },
    },

    components: { BasePasswordInput },

    data() {
        return {
            loading: false,
            entity: this.$_Object(),
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user']),
    },

    methods: {
        $_Object() {
            return {
                currentPassword: undefined,
                newPassword: undefined,
            };
        },

        $_setRequest() {
            return {
                ...this.entity,
                usuarioId: this.user.userId,
            };
        },

        $_validatePwd() {
            if (this.entity.currentPassword === this.entity.newPassword) {
                baseNotificationsHelper.Message(
                    true,
                    'Las contraseñas ingresadas no pueden ser las mismas. Por favor, elige una contraseña diferente.'
                );
                return true;
            }

            return false;
        },

        $_sendToApi() {
            if (this.$_validatePwd()) return;

            this.loading = true;

            httpService
                .post('user/changePassword', this.$_setRequest())
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        this.$_cancel();
                    }
                });
        },

        $_cancel() {
            this.entity = this.$_Object();
            this.callback();
        },
    },
};
</script>

<template>
    <BaseSkeletonLoader v-if="loading" type="article" />
    <BaseForm
        :method="$_sendToApi"
        :cancel="$_cancel"
        v-else
        :block="$vuetify.breakpoint.mobile"
    >
        <div slot="body">
            <v-row dense>
                <v-col cols="12">
                    <BaseInput
                        type="password"
                        label="Contraseña actual"
                        v-model.trim="entity.currentPassword"
                        :validate="['password']"
                    />
                </v-col>
            </v-row>
            <BasePasswordInput
                v-model.trim="entity.newPassword"
                title="Nueva contraseña"
            />
        </div>
    </BaseForm>
</template>
