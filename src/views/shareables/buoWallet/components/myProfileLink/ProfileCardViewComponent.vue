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

    computed: { ...mapGetters('theme', ['app']) },
};
</script>

<template>
    <v-card flat height="100%" width="100%" class="rounded-lg" v-if="entity">
        <v-card-subtitle v-if="entity.name">
            <v-avatar size="47" color="greenA700">
                <v-avatar size="45" color="primary">
                    <span class="white--text">{{
                        entity.name.charAt(0).toUpperCase()
                    }}</span>
                </v-avatar></v-avatar
            >
        </v-card-subtitle>
        <v-card-title
            v-if="entity.name"
            class="buo-word-break BUO-Heading-Small"
            :class="[app ? 'white--text' : 'grey700--text']"
        >
            {{ entity.name }}
        </v-card-title>
    </v-card>
</template>
