<script>
const BaseAdvancedCropper = () =>
    import('@/components/core/avatars/BaseAdvancedCropper');

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

export default {
    name: 'BaseAdvancedCropperDialog',

    props: {
        customActionList: {
            type: Array,
            required: false,
        },

        callback: {
            type: Function,
            required: true,
        },
    },

    components: {
        BaseAdvancedCropper,
        BaseCardViewComponent,
    },

    data() {
        return {
            componentKey: 0,
        };
    },

    computed: {
        actionList() {
            return [
                {
                    title: 'Cargar foto',
                    icon: 'account',
                    action: this.$_open,
                },
            ];
        },
    },

    methods: {
        forceRerender() {
            this.componentKey += 1;
        },

        $_open() {
            this.$refs['popUp'].$_openModal();
            this.forceRerender();
        },
    },
};
</script>

<template>
    <section>
        <BasePopUp
            ref="popUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '60%'"
            :isDrawer="false"
        >
            <div slot="Content" class="pt-2">
                <BaseCardViewComponent
                    title="Foto de perfil"
                    class="mx-auto"
                    md="12"
                    offset="0"
                >
                    <div slot="card-text">
                        <BaseAdvancedCropper
                            :onCancel="$_open"
                            :callback="callback"
                        />
                    </div>
                </BaseCardViewComponent>
            </div>
        </BasePopUp>

        <v-layout class="align-end pb-5">
            <v-avatar size="120" color="primary"> </v-avatar>

            <v-menu bottom origin="center center" transition="scale-transition">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        absolute
                        class="ml-16"
                        fab
                        small
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon dark>mdi-camera-outline </v-icon>
                    </v-btn>
                </template>

                <v-list v-for="(item, i) in actionList" :key="i">
                    <v-list-item @click="item.action">
                        <v-list-item-icon>
                            <v-icon>mdi-{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="BUO-Paragraph-Small">{{
                                item.title
                            }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-layout>
    </section>
</template>
