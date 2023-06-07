<script>
/**
 * Descripción: myAbilitiesLinkViewComponent
 *
 * @displayName myAbilitiesLinkViewComponent
 */

const BaseShareableMyAbilitiesList = () =>
    import(
        '@/views/shareables/buoWallet/components/myAbilitiesLink/components/BaseShareableMyAbilitiesList'
    );

export default {
    name: 'myAbilitiesLinkViewComponent',

    props: {
        entity: {
            type: Object,
            default: undefined,
        },
    },

    computed: {
        abilitiesList() {
            return this.entity.habilidades.filter(
                (x) => x.porcentajeCertificado >= 0.5
            );
        },
    },

    components: {
        BaseShareableMyAbilitiesList,
    },
};
</script>

<template>
    <v-card flat height="100%" width="100%" class="rounded-lg" v-if="entity">
        <v-expansion-panels
            :value="0"
            flat
            v-if="entity.habilidades && abilitiesList"
        >
            <v-expansion-panel>
                <v-expansion-panel-header>
                    <span
                        class="buo-word-break"
                        :class="[
                            $vuetify.breakpoint.smAndDown
                                ? 'BUO-Paragraph-Medium'
                                : 'BUO-Paragraph-Large',
                        ]"
                        >Mis habilidades</span
                    >
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                    <BaseShareableMyAbilitiesList
                        :myAbilitiesList="abilitiesList"
                    />
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
</template>
