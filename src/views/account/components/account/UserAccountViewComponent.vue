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

const UserWorkExperienceViewComponent = () =>
    import(
        '@/views/account/components/account/display/UserWorkExperienceViewComponent'
    );

const UserAcademicPreparationViewComponent = () =>
    import(
        '@/views/account/components/account/display/UserAcademicPreparationViewComponent'
    );

export default {
    name: 'AccountViewComponent',

    components: {
        UserInfoViewComponent,
        UserContactViewComponent,
        UserAvatarViewComponent,
        UserBioViewComponent,
        UserWorkExperienceViewComponent,
        UserAcademicPreparationViewComponent,
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
        <!-- work Exp -->
        <UserWorkExperienceViewComponent />
        <!-- Academic Preparation -->
        <UserAcademicPreparationViewComponent />
    </section>
</template>
