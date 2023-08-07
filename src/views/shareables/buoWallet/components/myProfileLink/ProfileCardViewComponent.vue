<script>
/**
 * Descripción: ProfileCardViewComponent
 *
 * @displayName ProfileCardViewComponent
 */

import { mapGetters } from 'vuex';

export default {
    name: 'ProfileCardViewComponent',

    props: {
        entity: {
            type: Object,
            default: undefined,
        },
    },

    computed: {
        ...mapGetters('theme', ['app']),
        /**
         * Nombre de Usuario
         */
        ...mapGetters('authentication', ['user', 'userAvatar']),
    },
};
</script>

<template>
    <v-card flat height="100%" width="100%" class="rounded-lg" v-if="entity">
        <v-card-subtitle v-if="entity.name && user && userAvatar">
            <v-avatar size="75" color="greenA700">
                <v-avatar :color="user.colorAvatar" size="70">
                    <span
                        class="white--text BUO-Paragraph-Medium-SemiBold"
                        v-if="userAvatar.length == 2"
                        >{{ userAvatar }}</span
                    >

                    <v-img
                        v-else
                        contain
                        :src="`data:image/jpeg;base64,${userAvatar}`"
                        :lazy-src="`data:image/jpeg;base64,${userAvatar}`"
                        alt="photoUrl"
                    >
                        <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                                <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img> </v-avatar
            ></v-avatar>
        </v-card-subtitle>
        <v-card-title
            v-if="entity.name"
            class="buo-word-break BUO-Heading-Small"
            :class="[app ? 'white--text' : 'grey700--text']"
        >
            {{ user.name }}
        </v-card-title>
    </v-card>
</template>
