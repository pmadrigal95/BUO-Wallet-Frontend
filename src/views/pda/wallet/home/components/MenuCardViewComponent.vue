<script>
/**
 * Descripción: Menu PDA
 *
 * @displayName menuCardViewComponent
 */

export default {
    name: 'menuCardViewComponent',
    computed: {
        menuItems() {
            return [
                {
                    icon: 'account',
                    subtitle: 'Perfil Conductual',
                    module: 'PDAProfileViewComponent',
                },
                {
                    icon: 'heart',
                    subtitle: 'Comportamiento',
                    module: 'PDABehaviorsViewComponent',
                },
                {
                    icon: 'shield-star',
                    subtitle: 'Habilidades',
                    module: 'MyAbilitiesPDAViewComponent',
                },
            ];
        },
    },
};
</script>

<template>
    <v-layout justify-center v-if="$vuetify.breakpoint.mdAndUp">
        <v-hover
            v-slot="{ hover }"
            open-delay="200"
            v-for="(item, i) in menuItems"
            :key="i"
        >
            <v-card
                flat
                outlined
                :elevation="hover ? 8 : 0"
                :class="{ 'on-hover': hover }"
                class="mx-2 rounded-lg"
                width="228"
                :to="{ name: item.module }"
            >
                <v-card-title
                    ><v-icon color="primary" large style="padding-bottom: 7px"
                        >mdi-{{ item.icon }}</v-icon
                    ></v-card-title
                >
                <v-card-subtitle
                    class="BUO-Paragraph-Small-SemiBold Buo-Black"
                    >{{ item.subtitle }}</v-card-subtitle
                >
                <v-card-actions
                    ><v-btn
                        class="no-uppercase rounded-lg BUO-Label-XSmall-SemiBold"
                        text
                        color="blue800"
                    >
                        Ver más
                        <v-icon right>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-hover>
    </v-layout>
    <v-layout justify-center v-else-if="$vuetify.breakpoint.smAndDown">
        <v-slide-group>
            <v-slide-item v-for="(item, i) in menuItems" :key="i">
                <v-hover v-slot="{ hover }" open-delay="200">
                    <v-card
                        flat
                        outlined
                        :elevation="hover ? 8 : 0"
                        :class="{ 'on-hover': hover }"
                        class="mx-2 rounded-lg"
                        width="228"
                        :to="{ name: item.module }"
                    >
                        <v-card-title
                            ><v-icon
                                color="primary"
                                large
                                style="padding-bottom: 7px"
                                >mdi-{{ item.icon }}</v-icon
                            ></v-card-title
                        >
                        <v-card-subtitle
                            class="BUO-Paragraph-Small-SemiBold Buo-Black"
                            >{{ item.subtitle }}</v-card-subtitle
                        >
                        <v-card-actions
                            ><v-btn
                                class="no-uppercase rounded-lg BUO-Label-XSmall-SemiBold"
                                text
                                color="blue800"
                            >
                                Ver más
                                <v-icon right>mdi-chevron-right</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-hover>
            </v-slide-item>
        </v-slide-group>
    </v-layout>
</template>
