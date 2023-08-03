<script>
import { Cropper } from 'vue-advanced-cropper';

import 'vue-advanced-cropper/dist/style.css';

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
    },
};
</script>

<template>
    <BaseForm :method="callback" :cancel="onCancel">
        <div slot="body">
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
                :canvas="false"
                :debounce="false"
                :default-size="defaultSize"
                :min-width="120"
                :min-height="120"
                :src="blob"
                @change="onChange"
            />
            <BaseNavigationCropper :zoom="zoom" @change="onZoom" />
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
}
</style>
