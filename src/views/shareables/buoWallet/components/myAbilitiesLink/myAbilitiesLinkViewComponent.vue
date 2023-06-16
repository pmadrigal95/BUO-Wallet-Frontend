<script>
/**
 * Descripción: myAbilitiesLinkViewComponent
 *
 * @displayName myAbilitiesLinkViewComponent
 */

import { mapGetters } from 'vuex';

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
        ...mapGetters('theme', ['app']),

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
                        class="buo-word-break BUO-Paragraph-Large-SemiBold"
                        :class="[app ? 'white--text' : 'grey700--text']"
                        >Mis indicadores</span
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
