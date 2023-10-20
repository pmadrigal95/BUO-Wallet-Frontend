<script>
/**
 * Descripción: Pantalla de portadas compartibles de Linkedln
 *
 * @displayName ShareableLinkedlnViewComponent
 */
import { mapGetters } from 'vuex';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const BUOCardDesktopViewComponent = () =>
    import(
        '@/views/shareables/linkedlnCover/components/BUO/BUOCardDesktopViewComponent'
    );

const BUOCardMobileViewComponent = () =>
    import(
        '@/views/shareables/linkedlnCover/components/BUO/BUOCardMobileViewComponent'
    );

const PDACardMobileViewComponent = () =>
    import(
        '@/views/shareables/linkedlnCover/components/PDA/PDACardMobileViewComponent'
    );

const PDACardDesktopViewComponent = () =>
    import(
        '@/views/shareables/linkedlnCover/components/PDA/PDACardDesktopViewComponent'
    );

export default {
    name: 'ShareableLinkedlnViewComponent',

    components: {
        BaseCardViewComponent,
        BaseCustomsButtonsGrid,
        BUOCardMobileViewComponent,
        PDACardMobileViewComponent,
        BUOCardDesktopViewComponent,
        PDACardDesktopViewComponent,
    },

    data() {
        return {
            selectedBuo: false,
            selectedPDA: false,
            profile: undefined,
            key: 0,
        };
    },

    computed: {
        profilePDA() {
            return [
                {
                    value: 'AMABLE',
                },
                {
                    value: 'AMIGABLE',
                },
                {
                    value: 'AUDAZ',
                },
                {
                    value: 'CAUTIVADORA',
                },
                {
                    value: 'COLABORADORA',
                },
                {
                    value: 'CONCRETA',
                },
                {
                    value: 'CONVINCENTE',
                },
                {
                    value: 'CREATIVA',
                },
                {
                    value: 'DETALLISTA',
                },
                {
                    value: 'DETERMINADA',
                },
                {
                    value: 'DINAMICA',
                },
                {
                    value: 'DIPLOMATICA',
                },
                {
                    value: 'ENCANTADORA',
                },
                {
                    value: 'INDAGADORA',
                },
                {
                    value: 'INFLUYENTE',
                },
                {
                    value: 'INTUITIVA',
                },
                {
                    value: 'INVESTIGADORA',
                },
                {
                    value: 'LOGICA',
                },
                {
                    value: 'PACIENTE',
                },
                {
                    value: 'PRECISA',
                },
                {
                    value: 'PROACTIVA',
                },
                {
                    value: 'PROMOTORA',
                },
                {
                    value: 'RECEPTIVA',
                },
                {
                    value: 'RESOLUTIVA',
                },
                {
                    value: 'SENSATA',
                },
                {
                    value: 'TENAZ',
                },
            ];
        },

        ...mapGetters('authentication', ['user']),
    },

    created() {
        this.$_updateCoverPDAColor();
    },

    methods: {
        $_selectCoverBuo() {
            this.selectedBuo = this.selectedBuo ? false : true;
        },

        $_selectCoverPDA() {
            this.selectedPDA = this.selectedPDA ? false : true;
        },

        $_getColorPDA() {
            const index = Math.floor(Math.random() * this.profilePDA.length);
            this.profile = this.profilePDA[index].value;
            this.key++;
        },

        $_updateCoverPDAColor() {
            setInterval(() => {
                this.$_getColorPDA();
            }, 5000);
        },

        $_download() {
            alert(
                `cover buo: ${this.selectedBuo} y cover pda: ${this.selectedPDA}`
            );
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="LinkedIn Cover"
        subtitle="Tu imagen de portada es la primera impresión que los demás tienen de ti."
    >
        <div slot="body">
            <v-card flat class="rounded-t-xl">
                <v-card-text>
                    <v-layout justify-end class="pa-3">
                        <BaseCustomsButtonsGrid
                            label="Descargar"
                            :fnMethod="$_download"
                            icon="mdi-download"
                        />
                        <BaseCustomsButtonsGrid
                            label="Descargar todo"
                            :outlined="false"
                            :fnMethod="$_download"
                            icon="mdi-download-multiple"
                            v-if="selectedBuo && selectedPDA"
                        />
                    </v-layout>

                    <v-row>
                        <v-col cols="12">
                            <BUOCardMobileViewComponent
                                :fn="$_selectCoverBuo"
                                :icon="
                                    this.selectedBuo
                                        ? 'mdi-radiobox-marked'
                                        : 'mdi-radiobox-blank'
                                "
                                v-if="$vuetify.breakpoint.mobile"
                            />
                            <BUOCardDesktopViewComponent
                                :fn="$_selectCoverBuo"
                                :icon="
                                    this.selectedBuo
                                        ? 'mdi-radiobox-marked'
                                        : 'mdi-radiobox-blank'
                                "
                                v-else
                            />
                        </v-col>
                    </v-row>

                    <v-row class="my-4" v-if="user.pdaCompleted">
                        <v-col cols="12">
                            <PDACardMobileViewComponent
                                :fn="$_selectCoverPDA"
                                :icon="
                                    this.selectedPDA
                                        ? 'mdi-radiobox-marked'
                                        : 'mdi-radiobox-blank'
                                "
                                key="key"
                                :profile="profile"
                                v-if="$vuetify.breakpoint.mobile"
                            />
                            <PDACardDesktopViewComponent
                                :fn="$_selectCoverPDA"
                                :icon="
                                    this.selectedPDA
                                        ? 'mdi-radiobox-marked'
                                        : 'mdi-radiobox-blank'
                                "
                                :profile="profile"
                                v-else
                            />
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </div>
    </BaseCardViewComponent>
</template>
