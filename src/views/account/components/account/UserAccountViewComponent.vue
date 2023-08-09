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

const UserBioViewComponent = () =>
    import('@/views/account/components/account/display/UserBioViewComponent');

export default {
    name: 'AccountViewComponent',

    components: {
        UserInfoViewComponent,
        UserContactViewComponent,
        UserAvatarViewComponent,
        UserBioViewComponent,
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
        <!-- Bio -->
        <UserBioViewComponent />
    </section>
</template>
