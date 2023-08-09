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

const UserContactViewComponent = () =>
    import(
        '@/views/account/components/account/display/UserContactViewComponent'
    );

export default {
    name: 'AccountViewComponent',

    components: {
        UserInfoViewComponent,
        UserContactViewComponent,
        UserAvatarViewComponent,
    },
};
</script>

<template>
    <section>
        <!-- Avatar -->
        <UserAvatarViewComponent />
        <!-- Personal Info -->
        <UserInfoViewComponent />
        <!-- Contact -->
        <UserContactViewComponent />
    </section>
</template>
