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
    <v-row>
        <v-col cols="12" md="9" offset-md="1">
            <UserAccountViewComponent />
        </v-col>
    </v-row>
</template>
