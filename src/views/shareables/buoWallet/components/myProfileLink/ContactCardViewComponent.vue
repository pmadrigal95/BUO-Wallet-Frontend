<script>
/**
 * Descripción: ContactCardViewComponent
 *
 * @displayName ContactCardViewComponent
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

export default {
    name: 'ContactCardViewComponent',

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
            //TODO: Optimizar!!!
            let array = Object.entries(this.entity),
                result = [];

            array.forEach((item) => {
                if (
                    item[0] !== 'usuarioId' &&
                    item[0] !== 'mostrarContacto' &&
                    item[1] !== null &&
                    item[1] !== ''
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
            this.loading = true;
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
    <v-row justify="center" align-content="center">
        <BaseSkeletonLoader v-if="loading" type="card" />
        <v-card
            flat
            height="100%"
            width="100%"
            class="rounded-lg"
            v-else-if="entity.mostrarContacto"
        >
            <v-expansion-panels flat>
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <span
                            class="buo-word-break BUO-Paragraph-Large-SemiBold"
                            :class="[app ? 'white--text' : 'grey700--text']"
                            >Contacto</span
                        >
                    </v-expansion-panel-header>

                    <v-expansion-panel-content>
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
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
    </v-row>
</template>
