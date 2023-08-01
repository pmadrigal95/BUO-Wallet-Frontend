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
};
</script>

<template>
    <BaseAdvancedCropperDialog />
</template>
