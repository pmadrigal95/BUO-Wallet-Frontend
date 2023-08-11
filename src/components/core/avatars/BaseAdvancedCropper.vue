<script>
import { mapState } from 'vuex';

import { Cropper } from 'vue-advanced-cropper';

import 'vue-advanced-cropper/dist/style.css';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import BaseNavigationCropper from '@/components/core/avatars/BaseNavigationCropper.vue';

export default {
    name: 'BaseAdvancedCropperDialog',

    props: {
        blob: {
            type: String,
            requiered: true,
        },

        type: {
            type: String,
            requiered: true,
        },

        callback: {
            type: Function,
            requiered: true,
        },

        onCancel: {
            type: Function,
            default: undefined,
        },
    },

    components: {
        Cropper,
        BaseNavigationCropper,
    },

    data() {
        return {
            zoom: 0,
        };
    },

    computed: {
        ...mapState('theme', ['app']),
    },

    methods: {
        defaultSize({ imageSize }) {
            return {
                width: Math.min(imageSize.height, imageSize.width),
                height: Math.min(imageSize.height, imageSize.width),
            };
        },

        stencilSize({ boundaries }) {
            return {
                width: Math.min(boundaries.height, boundaries.width) - 48,
                height: Math.min(boundaries.height, boundaries.width) - 48,
            };
        },

        onChange() {
            const cropper = this.$refs.cropper;
            if (cropper) {
                const { coordinates, imageSize } = cropper;
                if (
                    imageSize.width / imageSize.height >
                    coordinates.width / coordinates.height
                ) {
                    // Determine the position of slider bullet
                    // It's 0 if the stencil has the maximum size and it's 1 if the has the minimum size
                    this.zoom =
                        (cropper.imageSize.height -
                            cropper.coordinates.height) /
                        (cropper.imageSize.height -
                            cropper.sizeRestrictions.minHeight);
                } else {
                    this.zoom =
                        (cropper.imageSize.width - cropper.coordinates.width) /
                        (cropper.imageSize.width -
                            cropper.sizeRestrictions.minWidth);
                }
            }
        },

        onZoom(value) {
            const cropper = this.$refs.cropper;
            if (cropper) {
                if (cropper.imageSize.height < cropper.imageSize.width) {
                    const minHeight = cropper.sizeRestrictions.minHeight;
                    const imageHeight = cropper.imageSize.height;
                    // Determine the current absolute zoom and the new absolute zoom
                    // to calculate the sought relative zoom value
                    cropper.zoom(
                        (imageHeight - this.zoom * (imageHeight - minHeight)) /
                            (imageHeight - value * (imageHeight - minHeight))
                    );
                } else {
                    const minWidth = cropper.sizeRestrictions.minWidth;
                    const imageWidth = cropper.imageSize.width;
                    cropper.zoom(
                        (imageWidth - this.zoom * (imageWidth - minWidth)) /
                            (imageWidth - value * (imageWidth - minWidth))
                    );
                }
            }
        },

        flip(x, y) {
            this.$refs.cropper.flip(x, y);
        },

        rotate90() {
            this.$refs.cropper.rotate(90);
        },

        crop() {
            try {
                const { canvas } = this.$refs.cropper.getResult();
                if (canvas) {
                    const base64 = canvas
                        .toDataURL('image/jpeg', 1.0)
                        .split(';base64,')[1];
                    this.callback(base64);
                }
            } catch (error) {
                console.error(error);
                baseNotificationsHelper.Message(true, error?.message);
            }
        },
    },
};
</script>

<template>
    <BaseForm
        :method="crop"
        :cancel="onCancel"
        :block="$vuetify.breakpoint.mobile"
    >
        <div slot="body">
            <div class="cropper-wrapper">
                <div
                    :style="{ backgroundImage: 'url(' + blob + ')' }"
                    class="image-background"
                ></div>
                <cropper
                    ref="cropper"
                    class="cropper"
                    background-class="cropper__background"
                    foreground-class="cropper__foreground"
                    image-restriction="stencil"
                    stencil-component="circle-stencil"
                    :stencil-size="stencilSize"
                    :stencil-props="{
                        lines: {},
                        handlers: {},
                        movable: false,
                        scalable: false,
                        aspectRatio: 1,
                    }"
                    :transitions="false"
                    :canvas="true"
                    :debounce="false"
                    :default-size="defaultSize"
                    :min-width="120"
                    :min-height="120"
                    :src="blob"
                    @change="onChange"
                />
                <BaseNavigationCropper :zoom="zoom" @change="onZoom" />
            </div>
        </div>

        <div slot="afterForm">
            <v-layout justify-end>
                <v-btn icon :color="app ? 'clouds' : 'black'">
                    <v-icon large @click="rotate90" small>mdi-refresh</v-icon>
                </v-btn>

                <v-btn icon :color="app ? 'clouds' : 'black'">
                    <v-icon @click="flip" small>mdi-flip-horizontal</v-icon>
                </v-btn>

                <v-btn icon :color="app ? 'clouds' : 'black'">
                    <v-icon @click="flip(false, true)" small
                        >mdi-flip-vertical</v-icon
                    >
                </v-btn>
            </v-layout>
        </div>
    </BaseForm>
</template>

<style lang="scss">
.cropper {
    height: auto;
    &__background {
        background-color: #edf2f4;
        border-radius: 20px;
    }
    &__foreground {
        background-color: #edf2f4;
        border-radius: 20px;
    }

    .cropper-wrapper {
        overflow: hidden;
        position: relative;
        height: 400px;
        background: black;
    }
    .cropper-background {
        background: none;
    }
    .image-background {
        position: absolute;
        width: calc(100% + 20px);
        height: calc(100% + 20px);
        left: -10px;
        top: -10px;
        background-size: cover;
        background-position: 50%;
        filter: blur(5px);
    }
}
</style>
