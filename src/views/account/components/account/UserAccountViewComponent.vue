<script>
/**
 * Descripción: UserAccountViewComponent Agrupacion de la Cuenta
 *
 * @displayName UserAccountViewComponent
 */

const UserAvatarViewComponent = () =>
    import(
        '@/views/account/components/account/display/UserAvatarViewComponent'
    );

const UserInfoViewComponent = () =>
    import('@/views/account/components/account/display/UserInfoViewComponent');

export default {
    name: 'AccountViewComponent',

    components: {
        UserAvatarViewComponent,
        UserInfoViewComponent,
    },
};
</script>

<template>
    <section>
        <UserAvatarViewComponent />
        <UserInfoViewComponent />
    </section>
</template>
