<script>
/**
 * Descripción: Pantalla de display sobre Contacto
 *
 * @displayName UserContactViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

export default {
    name: 'UserContactViewComponent',

    data() {
        return {
            entity: {},
            loading: false,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user']),

        contactList() {
            let array = Object.entries(this.entity),
                result = [];

            array.forEach((item) => {
                if (
                    item[0] !== 'usuarioId' &&
                    item[0] !== 'mostrarContacto' &&
                    item[1] !== null
                ) {
                    result.push({
                        key: item[0],
                        value: item[1],
                        ...this.$_setAddConfig(item[0]),
                    });
                }
            });

            return result;
        },
    },

    created() {
        this.$_sendToApi();
    },

    methods: {
        $_sendToApi() {
            httpService
                .get(`perfilUsuario/contacto/${this.user.userId}`)
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

        $_setAddConfig(key) {
            switch (key) {
                case 'correo':
                    return {
                        name: 'Email personal',
                        icon: 'email-outline',
                    };
                case 'telefono':
                    return {
                        name: 'Teléfono',
                        icon: 'cellphone',
                    };
                case 'websiteUrl':
                    return {
                        name: 'Website URL',
                        icon: 'web',
                    };
                default:
                    return {
                        name: 'Contacto',
                        icon: 'account-box-outline',
                    };
            }
        },
    },
};
</script>

<template>
    <section class="mt-6">
        <v-layout justify-center>
            <BaseSkeletonLoader v-if="loading" type="card" />
            <v-card flat class="rounded-t-xl" width="100%" height="100%" v-else>
                <v-card-text>
                    <section class="mb-4">
                        <v-layout
                            justify-space-between
                            align-center
                            class="pt-2"
                        >
                            <span
                                class="BUO-Paragraph-Large-SemiBold"
                                :class="[app ? 'white--text' : 'grey700--text']"
                                >Contacto</span
                            >
                            <v-btn icon :color="app ? 'clouds' : 'black'">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                        </v-layout>
                    </section>

                    <v-row dense>
                        <v-col
                            cols="12"
                            v-for="(contact, i) in contactList"
                            :key="i"
                            class="pl-2"
                        >
                            <v-tooltip left>
                                <template v-slot:activator="{ on, attrs }">
                                    <section
                                        class="BUO-Paragraph-Small pb-4"
                                        style="cursor: pointer"
                                        :class="[
                                            app
                                                ? 'white--text'
                                                : 'grey700--text',
                                        ]"
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon small class="pr-1">
                                            mdi-{{ contact.icon }}
                                        </v-icon>
                                        {{ contact.value }}
                                    </section>
                                </template>
                                <span>{{ contact.name }}</span>
                            </v-tooltip>
                            <v-divider
                                v-if="i < contactList.length - 1"
                            ></v-divider>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-layout>
    </section>
</template>