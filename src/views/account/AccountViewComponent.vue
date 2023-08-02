<script>
/**
 * Descripción: Pantalla Cuenta / Perfil de Usuario
 *
 * @displayName AccountViewComponent
 */

const BaseAdvancedCropperDialog = () =>
    import('@/components/core/avatars/BaseAdvancedCropperDialog');

export default {
    name: 'AccountViewComponent',

    metaInfo: { title: 'Mi Cuenta' },

    components: {
        BaseAdvancedCropperDialog,
    },

    methods: {
        test() {
            console.log('object');
        },
    },
};
</script>

<template>
    <BaseAdvancedCropperDialog :callback="test" />
</template>
