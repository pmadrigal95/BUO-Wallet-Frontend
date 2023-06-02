<script>
/**
 * Descripción: Pantalla Mis habilidades
 *
 * @displayName BaseMenuCardDesktop
 */

export default {
    name: 'BaseMenuCardDesktop',

    props: {
        menuItems: {
            type: Array,
            required: true,
        },

        size: {
            type: String,
            default: '125',
        },

        imgSmall: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        $_goToModule(module) {
            if (module && module != undefined) {
                this.$router.push({
                    name: module,
                });
            }
        },
    },
};
</script>

<template>
    <!--Desktop-->
    <v-row v-if="$vuetify.breakpoint.mdAndUp" justify="center">
        <v-col v-for="(item, i) in menuItems" :key="i" cols="12" md="4">
            <v-hover v-slot="{ hover }" open-delay="200">
                <v-card
                    :elevation="hover ? 8 : 3"
                    :class="{ 'on-hover': hover }"
                    class="mx-2 rounded-lg"
                    max-height="100%"
                    max-width="100%"
                    @click="$_goToModule(item.module)"
                >
                    <v-row justify="end">
                        <v-col :cols="imgSmall ? '4' : undefined">
                            <v-avatar class="ma-3" :size="size" tile>
                                <v-img
                                    contain
                                    max-width="100%"
                                    :src="item.src"
                                    :lazy-src="item.src"
                                ></v-img>
                            </v-avatar>
                        </v-col>

                        <v-col>
                            <v-card flat text color="transparent">
                                <v-card-title
                                    class="BUO-Paragraph-Large buo-none-word-break"
                                    >{{ item.title }}</v-card-title
                                >

                                <v-card-subtitle
                                    v-if="item.subtitle"
                                    class="BUO-Label-Large buo-word-break"
                                    :class="[
                                        imgSmall
                                            ? 'Buo-Black text-end'
                                            : undefined,
                                    ]"
                                    >{{ item.subtitle }}</v-card-subtitle
                                >
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-hover>
        </v-col>
    </v-row>
</template>
