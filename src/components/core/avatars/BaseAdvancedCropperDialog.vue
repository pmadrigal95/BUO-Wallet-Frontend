<script>
import baseFnFile from '@/helpers/baseFnFile';

import baseLocalHelper from '@/helpers/baseLocalHelper';

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
            image: this.$_object(),
        };
    },

    computed: {
        actionList() {
            return [
                {
                    title: 'Cargar foto',
                    icon: 'account',
                    action: this.$_getFile,
                },
            ];
        },
    },

    destroyed() {
        // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
        if (this.image.src) {
            URL.revokeObjectURL(this.image.src);
        }
    },

    methods: {
        $_object() {
            return {
                src: undefined,
                type: undefined,
                file: undefined,
            };
        },

        forceRerender() {
            this.componentKey += 1;
        },

        $_open() {
            this.$refs['popUp'].$_openModal();
            this.forceRerender();
        },

        $_validateFile(file) {
            if (
                !baseFnFile.$_isCorrectExtension(
                    file,
                    baseFnFile.$_extensionsName.imagenes
                )
            ) {
                console.log(
                    baseLocalHelper.$_MsgFileAllowedExtensionInvalid(
                        'Foto de perfil',
                        'una fotografía'
                    )
                );
                return false;
            }

            if (
                !baseFnFile.$_isCorrectMime(
                    this.image['file'],
                    baseFnFile.$_extensionsName.imagenes
                )
            ) {
                console.log(
                    baseLocalHelper.$_MsgFileAllowedMimeInvalid(
                        'Foto de perfil',
                        'una fotografía'
                    )
                );
                return false;
            }

            return true;
        },

        $_validateUpload(result) {
            this.image = this.$_object();
            this.image = baseFnFile.$_uploadCallback(result);

            if (!this.$_validateFile(this.image['file'])) return;

            this.$_open();
        },

        $_upload(event) {
            baseFnFile.$_upload(event, this.$_validateUpload);
        },

        $_getFile() {
            this.$refs.file.click();
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
                    v-if="image && image.src && image.type"
                >
                    <div slot="card-text">
                        <BaseAdvancedCropper
                            :blob="image.src"
                            :type="image.type"
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

        <input
            v-show="false"
            type="file"
            ref="file"
            @change="$_upload($event)"
            accept="image/*"
        />
    </section>
</template>
