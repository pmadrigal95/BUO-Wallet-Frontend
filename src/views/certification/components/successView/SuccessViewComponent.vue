<script>
import baseSharedFnHelper from '@/helpers/baseSharedFnHelper.js';

const BaseNotificationCardTemplate = () =>
    import('@/components/core/cards/BaseNotificationCardTemplate');

export default {
    name: 'SuccessViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BaseNotificationCardTemplate,
    },

    created() {
        this.$_cleanQualifications();
    },

    watch: {
        'entity.step'() {
            if (this.entity.step == 5) {
                this.$_cleanQualifications();
            }
        },
    },

    methods: {
        $_goToMyAbilities() {
            this.$router.push({
                name: 'HomeViewComponent',
            });
        },

        $_continueCetification() {
            this.$vuetify.theme.themes.light.background =
                this.$vuetify.theme.themes.light.white;

            this.entity.step = 2;
        },

        $_cleanQualifications() {
            if (this.entity.qualifications) {
                if (this.entity.qualifications <= 0) {
                    delete this.entity.qualifications;
                }
                if (this.entity.type === 'new') {
                    if (this.$_reviewQualifications()) {
                        this.$_deleteQualification();
                    }
                } else if (this.entity.type === 'all') {
                    if (this.entity.qualifications) {
                        delete this.entity.qualifications;
                    }
                }
            }

            if (this.entity.header) {
                delete this.entity.header;
            }
        },

        $_reviewQualifications() {
            return baseSharedFnHelper.$_getObjectFromArray(
                this.entity.qualifications,
                this.entity.header.cualificacionId,
                'cualificacionId'
            );
        },

        $_deleteQualification() {
            this.entity.qualifications.splice(
                baseSharedFnHelper.$_returnCurrentIndex(
                    this.entity.qualifications,
                    this.entity.header.cualificacionId,
                    'cualificacionId'
                ),
                1
            );
        },
    },
};
</script>

<template>
    <BaseNotificationCardTemplate
        title="¡Felicidades!"
        subtitle="Tu indicador está en camino..."
        comment="Tu solicitud ha sido enviada. Una vez que sea aprobada, tu indicador aparecerá validada en tu Buo Wallet. ¡Sigue validando más indicadores!"
    >
        <div slot="btns">
            <v-row>
                <v-col
                    cols="12"
                    v-if="entity.type == 'new' && entity.qualifications"
                >
                    <v-layout
                        align-center
                        justify-center
                        v-if="entity.qualifications.length > 0"
                    >
                        <v-btn
                            @click="$_continueCetification"
                            class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                            color="primary"
                            elevation="0"
                            dark
                            :block="
                                $vuetify.breakpoint.smAndDown ? false : true
                            "
                            >Seguir validando</v-btn
                        >
                    </v-layout>
                </v-col>
                <v-col cols="12">
                    <v-layout align-center justify-center>
                        <v-btn
                            @click="$_goToMyAbilities"
                            color="primary"
                            elevation="0"
                            text
                            :block="
                                $vuetify.breakpoint.smAndDown ? false : true
                            "
                            class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                            >Ir a mi Buo Wallet</v-btn
                        >
                    </v-layout>
                </v-col>
            </v-row>
        </div>
    </BaseNotificationCardTemplate>
</template>
