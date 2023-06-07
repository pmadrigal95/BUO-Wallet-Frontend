<script>
/**
 * Descripción: ContactCardViewComponent
 *
 * @displayName ContactCardViewComponent
 */

export default {
    name: 'ContactCardViewComponent',

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
        <v-expansion-panels flat v-if="entity.email">
            <v-expansion-panel>
                <v-expansion-panel-header>
                    <span
                        class="buo-word-break"
                        :class="[
                            $vuetify.breakpoint.smAndDown
                                ? 'BUO-Paragraph-Medium'
                                : 'BUO-Paragraph-Large',
                        ]"
                        >Contacto</span
                    >
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                    <v-list-item dense class="buo-headerAbility-position">
                        <v-list-item-avatar tile>
                            <v-icon>mdi-email-open-outline</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content class="ms-n3">
                            <v-list-item-title class="BUO-Paragraph-Medium">{{
                                entity.email
                            }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider
                ></v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
</template>
