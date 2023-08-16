<script>
import baseFnFile from '@/helpers/baseFnFile';

import baseLocalHelper from '@/helpers/baseLocalHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

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

        avatarSize: {
            type: [String, Number],
            default: 120,
        },

        avatarColor: {
            type: String,
            default: 'grey400',
        },

        avatarCss: {
            type: String,
            default: 'BUO-Display-Small',
        },

        avatarDisplay: {
            type: String,
            default: undefined,
        },
    },

    components: {
        BaseAdvancedCropper,
        BaseCardViewComponent,
    },

    data() {
        return {
            componentKey: 0,
            errorMessage: undefined,
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
                ...this.customActionList,
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
                this.errorMessage =
                    baseLocalHelper.$_MsgFileAllowedExtensionInvalid(
                        'Foto de perfil',
                        'una fotografía'
                    );

                baseNotificationsHelper.Message(true, this.errorMessage);
                return false;
            }

            if (
                !baseFnFile.$_isCorrectMime(
                    this.image['file'],
                    baseFnFile.$_extensionsName.imagenes
                )
            ) {
                this.errorMessage = baseLocalHelper.$_MsgFileAllowedMimeInvalid(
                    'Foto de perfil',
                    'una fotografía'
                );
                baseNotificationsHelper.Message(true, this.errorMessage);
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
            this.errorMessage = undefined;
        },
    },
};
</script>

<template>
    <section class="text-center justify-center align-center">
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

        <v-layout justify-center class="align-end pb-5">
            <v-avatar
                :size="avatarSize + 5"
                :color="errorMessage ? 'redError900' : 'transparent'"
            >
                <v-avatar :size="avatarSize" :color="avatarColor">
                    <v-icon
                        color="grey600"
                        :size="(avatarSize * 50) / 100"
                        v-if="!avatarDisplay"
                    >
                        mdi-account
                    </v-icon>

                    <span
                        :class="`white--text ${avatarCss}`"
                        v-if="avatarDisplay.length == 2"
                        >{{ avatarDisplay }}</span
                    >

                    <v-img
                        v-else
                        contain
                        :src="`data:image/jpeg;base64,${avatarDisplay}`"
                        :lazy-src="`data:image/jpeg;base64,${avatarDisplay}`"
                        alt="photoUrl"
                    >
                        <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                                <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-avatar>
            </v-avatar>

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

                <v-list dense v-for="(item, i) in actionList" :key="i">
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
        <section v-if="errorMessage" class="mt-n5 mb-3">
            <span class="BUO-Label-XSmall redError900--text text-center">{{
                errorMessage
            }}</span>
        </section>

        <input
            v-show="false"
            type="file"
            ref="file"
            @change="$_upload($event)"
            accept="image/*"
        />
    </section>
</template>
