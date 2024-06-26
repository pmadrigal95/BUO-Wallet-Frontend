<script>
/**
 * Descripción: componente Container Link
 *
 * @displayName BaseContainerViewComponent
 */
import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import sharingLinks from '@/services/sharing/sharingLinks';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseSocialLinkSharing = () =>
    import('@/components/core/sharing/BaseSocialLinkSharing');

const ProfileCardViewComponent = () =>
    import(
        '@/views/shareables/buoWallet/components/myProfileLink/ProfileCardViewComponent'
    );

const ContactCardViewComponent = () =>
    import(
        '@/views/shareables/buoWallet/components/myProfileLink/ContactCardViewComponent'
    );

const myAbilitiesLinkViewComponent = () =>
    import(
        '@/views/shareables/buoWallet/components/myAbilitiesLink/myAbilitiesLinkViewComponent'
    );

const WorkExperienceCardViewComponent = () =>
    import(
        '@/views/shareables/buoWallet/components/myProfileLink/WorkExperienceCardViewComponent'
    );

const AcademicPreparationViewComponent = () =>
    import(
        '@/views/shareables/buoWallet/components/myProfileLink/AcademicPreparationViewComponent'
    );

export default {
    name: 'BaseContainerViewComponent',

    props: {
        entity: {
            type: Object,
            default: undefined,
        },
    },

    components: {
        BaseCardViewComponent,
        BaseSocialLinkSharing,
        ProfileCardViewComponent,
        ContactCardViewComponent,
        myAbilitiesLinkViewComponent,
        WorkExperienceCardViewComponent,
        AcademicPreparationViewComponent,
    },

    data() {
        return {
            link: undefined,
            loading: false,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user']),

        ...mapGetters('theme', ['app']),

        sharing() {
            return {
                url: this.link,
                title: `Perfil de ${this.user.name}`,
                copy: this.copyURL,
            };
        },
    },

    mounted() {
        this.$_requestLink();
    },

    methods: {
        $_requestLink() {
            if (this.user.shareableLinkURL) {
                this.link = this.user.shareableLinkURL;
            } else {
                this.loading = true;
                httpService
                    .post('user/createShareableLink', {
                        usuarioId: this.user.userId,
                    })
                    .then((response) => {
                        if (response != undefined) {
                            this.link = response.data;
                            this.loading = false;
                        }
                    });
            }
        },

        $_shareBuoWallet() {
            sharingLinks.$_share(
                this.link,
                `BUO ${this.user.name}`,
                this.$refs['BuoShareableLink'].$_open
            );
        },

        copyURL() {
            sharingLinks.$_copyLink(this.link);
        },
    },
};
</script>

<template>
    <BaseCardViewComponent v-if="entity">
        <div slot="card-text">
            <v-row justify="end" class="pb-2">
                <section v-if="!loading && link">
                    <BaseSocialLinkSharing
                        ref="BuoShareableLink"
                        v-if="link"
                        :sharing="sharing"
                    />
                    <v-btn
                        class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                        :class="[app ? 'grey700' : 'Buo-White-Background']"
                        elevation="0"
                        depressed
                        outlined
                        :color="app ? 'white' : 'primary'"
                        @click="$_shareBuoWallet"
                    >
                        <span> Compartir </span>
                        <v-icon small right dark>
                            mdi-share-variant-outline
                        </v-icon>
                    </v-btn>
                </section>
                <BaseSkeletonLoader v-else type="card, actions" />
            </v-row>
            <v-row justify="center" align-content="center">
                <ProfileCardViewComponent :entity="entity" />
            </v-row>
            <v-row justify="center" align-content="center" class="pt-6">
                <myAbilitiesLinkViewComponent :entity="entity" />
            </v-row>

            <WorkExperienceCardViewComponent class="pb-6 pt-3" />

            <AcademicPreparationViewComponent />

            <ContactCardViewComponent class="pt-6" />
        </div>
    </BaseCardViewComponent>
</template>
