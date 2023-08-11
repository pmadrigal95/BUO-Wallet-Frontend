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

const DisplaySectionViewComponent = () =>
    import(
        '@/views/account/components/account/shared/DisplaySectionViewComponent'
    );

export default {
    name: 'UserAcademicPreparationDisplayComponent',

    props: {
        value: {
            required: true,
        },

        entity: {
            type: Object,
            required: true,
        },

        callback: {
            type: Function,
            required: true,
        },
    },

    components: {
        UserAcademicPreparationCardsComponent,
        DisplaySectionViewComponent,
    },

    data() {
        return {
            loading: false,
            isPublic: undefined,
        };
    },

    created() {
        this.isPublic = this.value;
    },

    watch: {
        isPublic(val, old) {
            if (val != old && val != this.value) {
                this.$_updateValue(val);
            }
        },
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },

    methods: {
        $_updateValue(event) {
            this.$emit('input', event);
        },

        $_new() {
            this.callback({ isEducation: this.entity.enum == 'EDUCACION' });
        },

        $_edit() {},
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
                            <v-btn
                                @click="$_new"
                                icon
                                :color="app ? 'clouds' : 'blue900'"
                            >
                                <v-icon>mdi-plus-circle</v-icon>
                            </v-btn>
                        </v-layout>
                        <DisplaySectionViewComponent
                            v-if="value != undefined"
                            :section="entity.enum"
                            v-model="isPublic"
                        />
                    </section>

                    <UserAcademicPreparationCardsComponent
                        :list="entity.list"
                    />
                </v-card-text>
            </v-card>
        </v-layout>
    </section>
</template>
