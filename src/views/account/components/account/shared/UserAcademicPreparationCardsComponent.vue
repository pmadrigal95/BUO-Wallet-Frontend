<script>
/**
 * Descripción: Card dinámico para mostrar puestos, títulos o certificaciones
 *
 * @displayName CardViewComponent
 *
 */
import { mapGetters } from 'vuex';

const BaseCardMenuViewComponent = () =>
    import('@/components/core/cards/BaseCardMenuViewComponent');

export default {
    name: 'UserAcademicPreparationCardsComponent',

    props: {
        list: {
            type: Array,
            requiered: true,
        },

        callback: {
            type: Function,
            required: true,
        },
    },

    components: {
        BaseCardMenuViewComponent,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        componentProps() {
            return {
                fontTypeSubtitle: this.app
                    ? 'BUO-Paragraph-Small-SemiBold white--text pb-0 pt-0'
                    : 'BUO-Paragraph-Small-SemiBold grey700--text pb-0 pt-0',
                fontTypeDescription: this.app
                    ? 'BUO-Paragraph-Small white--text pb-0'
                    : 'BUO-Paragraph-Small grey700--text pb-0',
                fontTypeFooterDescription: this.app
                    ? 'BUO-Label-XSmall blueProgress600--text pb-0 pl-2'
                    : 'BUO-Label-XSmall grey--text pb-0 pl-2',
                width: '235',
                heigh: '160',
                icon: 'pencil-outline',
                iconColor: this.app ? 'blueProgress600' : 'black',
            };
        },
    },

    methods: {
        $_callToAction({ id }) {
            this.callback({ id });
        },
    },
};
</script>

<template>
    <v-row dense>
        <v-slide-group>
            <v-slide-item v-for="(item, i) in list" :key="i">
                <v-card
                    @click.stop="$_callToAction({ id: item.id })"
                    class="transparent pt-4"
                    elevation="0"
                >
                    <BaseCardMenuViewComponent
                        :title="
                            item.nombre ? item.nombre : item.nombreCualificacion
                        "
                        :icon="componentProps.icon"
                        :iconColor="componentProps.iconColor"
                        :description="
                            item.nombreTituloAcademico
                                ? item.nombreTituloAcademico
                                : item.nombreOrganizacion
                        "
                        :footerDescription="
                            item.nombreLugarCompleto
                                ? item.nombreLugarCompleto
                                : item.fechaFormato
                        "
                        :fontTypeSubtitle="componentProps.fontTypeSubtitle"
                        :fontTypeDescription="
                            componentProps.fontTypeDescription
                        "
                        :fontTypeFooterDescription="
                            componentProps.fontTypeFooterDescription
                        "
                        :min-width="componentProps.width"
                        :min-height="componentProps.heigh"
                    />
                </v-card>
            </v-slide-item>
        </v-slide-group>
    </v-row>
</template>
