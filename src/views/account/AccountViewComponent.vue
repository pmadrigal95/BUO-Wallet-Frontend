<script>
/**
 * Descripción: Pantalla Cuenta / Perfil de Usuario
 *
 * @displayName AccountViewComponent
 */

const UserAccountViewComponent = () =>
    import('@/views/account/components/account/UserAccountViewComponent');

export default {
    name: 'AccountViewComponent',

    metaInfo: { title: 'Mi Cuenta' },

    components: {
        UserAccountViewComponent,
    },

    methods: {},
};
</script>

<template>
    <UserAccountViewComponent />
</template>
