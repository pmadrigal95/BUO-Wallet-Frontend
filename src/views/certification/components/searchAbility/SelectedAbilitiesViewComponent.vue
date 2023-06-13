<script>
/**
 * Descripción: Pantalla de Buscar Habilidad
 *
 * @displayName SelectedAbilitiesViewComponent
 */
const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseCardTokens = () => import('@/components/wallet/BaseCardTokens');

export default {
    name: 'SelectedAbilitiesViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    created() {
        if (
            !this.entity ||
            !this.entity.qualifications ||
            this.entity.qualifications.length <= 0
        ) {
            this.entity.step = 1;
        }
    },

    components: {
        BaseCardViewComponent,
        BaseCardTokens,
    },

    methods: {
        $_goBack() {
            this.$_deleteProperty();
            this.entity.step = 1;
        },

        $_deleteProperty() {
            if (this.entity.header) {
                delete this.entity.header;
            }
        },

        $_selectOne(qualification) {
            this.entity.header = {
                cualificacionId: qualification.cualificacionId,
                listaTotalDisponibles: [],
                nombreCualificacion: qualification.nombreCualificacion,
                porcentajeCertificado: 0,
                proposito: qualification.proposito,
                totalDisponibles: 0,
            };

            this.entity.type = 'new';
            this.entity.step = 3;
        },

        $_selectAll() {
            this.entity.type = 'all';
            this.entity.step = 4;
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Valida tu primera indicador"
        subtitle="¡Te regalamos tus primeros 20 tokens para que puedas empezar a validar tus indicadores! Selecciona que indicador quieres validar primero."
        :btnAction="$_goBack"
    >
        <div slot="card-text">
            <BaseCardTokens />
        </div>

        <div slot="body">
            <v-card flat class="rounded-lg">
                <v-card-title class="BUO-Paragraph-Large buo-word-break">
                    Indicadores
                    <v-layout justify-end>
                        <v-btn
                            @click="$_selectAll"
                            class="no-uppercase rounded-lg"
                            text
                            elevation="0"
                            color="blue800"
                            :block="$vuetify.breakpoint.mobile"
                        >
                            Añadir a mis objetivos
                            <v-icon right>mdi-heart-outline</v-icon>
                        </v-btn>
                    </v-layout>
                </v-card-title>

                <v-card-text>
                    <span v-show="false"> {{ entity.step }}</span>
                    <v-list flat class="mt-5" color="transparent">
                        <v-list-item
                            v-for="qualification in entity.qualifications"
                            :key="qualification.cualificacionId"
                            link
                            @click="$_selectOne(qualification)"
                        >
                            <v-list-item-avatar size="45">
                                <v-icon color="primary" size="40"
                                    >mdi-plus-circle</v-icon
                                >
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title
                                    class="buo-word-break buo-white-space"
                                    >{{
                                        qualification.nombreCualificacion
                                    }}</v-list-item-title
                                >
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-icon>mdi-chevron-right</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </div>
    </BaseCardViewComponent>
</template>
