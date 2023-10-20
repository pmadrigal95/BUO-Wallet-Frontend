<script>
/**
 * Descripción: Pantalla Card Linkedln Cover
 *
 * @displayName LinkedlnCoverViewComponent
 */

const BaseAdvertisementMobileViewComponent = () =>
    import(
        '@/components/wallet/covers/advertisement/BaseAdvertisementMobileViewComponent'
    );

const BaseAdvertisementDesktopViewComponent = () =>
    import(
        '@/components/wallet/covers/advertisement/BaseAdvertisementDesktopViewComponent'
    );

export default {
    name: 'LinkedlnCoverViewComponent',

    components: {
        BaseAdvertisementMobileViewComponent,
        BaseAdvertisementDesktopViewComponent,
    },

    data() {
        return {
            componentProps: this.$_Object(),
        };
    },

    methods: {
        $_download() {
            this.$router.push({
                name: 'ShareableLinkedlnViewComponent',
            });
        },

        $_Object() {
            return {
                title: 'Comparte tu potencial',
                description:
                    'Descarga ahora, tus covers de Linkedin, muestra tus habilidades y destaca.',
                icon: 'close',
                fnButton: this.$_download,
                fnIcon: this.$_inactiveAdvertisement,
                imageDesktop:
                    'https://buo-resources.s3.us-east-2.amazonaws.com/wallet/circle-desktop.svg',
                imageMobile:
                    'https://buo-resources.s3.us-east-2.amazonaws.com/wallet/circle-mobile.svg',
            };
        },
    },
};
</script>

<template>
    <BaseAdvertisementMobileViewComponent
        v-if="$vuetify.breakpoint.mobile"
        :fnButton="componentProps.fnButton"
        :title="componentProps.title"
        :description="componentProps.description"
        :image="componentProps.imageMobile"
        :icon="componentProps.icon"
    />
    <BaseAdvertisementDesktopViewComponent
        v-else
        :fnButton="componentProps.fnButton"
        :title="componentProps.title"
        :description="componentProps.description"
        :image="componentProps.imageDesktop"
        :icon="componentProps.icon"
    />
</template>
