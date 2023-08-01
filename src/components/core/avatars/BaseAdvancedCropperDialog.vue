<script>
const BaseAdvancedCropper = () =>
    import('@/components/core/avatars/BaseAdvancedCropper');

export default {
    name: 'BaseAdvancedCropperDialog',

    components: {
        BaseAdvancedCropper,
    },

    data() {
        return {
            componentKey: 0,
        };
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
            <div slot="Content">
                <BaseAdvancedCropper />
            </div>
        </BasePopUp>
    </section>
</template>
