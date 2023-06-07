<script>
/**
 * Descripción: ProfileCardViewComponent
 *
 * @displayName ProfileCardViewComponent
 */

export default {
    name: 'ProfileCardViewComponent',

    props: {
        entity: {
            type: Object,
            default: undefined,
        },
    },
};
</script>

<template>
    <v-card flat height="100%" width="100%" class="rounded-lg" v-if="entity">
        <v-card-subtitle v-if="entity.name">
            <v-avatar size="47" color="success">
                <v-avatar size="45" color="primary">
                    <span class="white--text">{{
                        entity.name.charAt(0).toUpperCase()
                    }}</span>
                </v-avatar></v-avatar
            >
        </v-card-subtitle>
        <v-card-title
            v-if="entity.name"
            class="buo-word-break"
            :class="[
                $vuetify.breakpoint.smAndDown
                    ? 'BUO-Heading-Small'
                    : 'BUO-Heading-Medium',
            ]"
        >
            {{ entity.name }}
        </v-card-title>
    </v-card>
</template>
