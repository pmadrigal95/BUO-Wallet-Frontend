<script>
/**
 * Descripción: Academic Preparation User
 *
 * @displayName UserAcademicPreparationDisplayComponent
 */

import { mapGetters } from 'vuex';

const UserAcademicPreparationCardsComponent = () =>
    import(
        '@/views/account/components/account/shared/UserAcademicPreparationCardsComponent'
    );

export default {
    name: 'UserAcademicPreparationDisplayComponent',

    props: {
        value: {
            type: Array,
            required: true,
        },

        entity: {
            type: Object,
            required: true,
        },
    },

    components: {
        UserAcademicPreparationCardsComponent,
    },

    data() {
        return {
            loading: false,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },

    methods: {
        $_open() {
            this.$refs['popUp'].$_open();
        },
    },
};
</script>

<template>
    <section class="mt-6" v-if="entity.list.length > 0">
        <v-layout justify-center>
            <v-card flat class="rounded" width="100%" height="100%">
                <v-card-text>
                    <section>
                        <v-layout
                            justify-space-between
                            align-center
                            class="pt-2"
                        >
                            <span
                                class="BUO-Paragraph-Large-SemiBold"
                                :class="[app ? 'white--text' : 'grey700--text']"
                                >{{ entity.title }}</span
                            >
                            <v-btn icon :color="app ? 'clouds' : 'blue900'">
                                <v-icon>mdi-plus-circle</v-icon>
                            </v-btn>
                        </v-layout>
                        <!-- <DisplaySectionViewComponent
                            v-if="entity.mostrarExperiencia != undefined"
                            section="EXPERIENCIA"
                            v-model="entity.mostrarExperiencia"
                        /> -->
                    </section>

                    <UserAcademicPreparationCardsComponent
                        :list="entity.list"
                    />
                </v-card-text>
            </v-card>
        </v-layout>
    </section>
</template>
