<script>
/**
 * Descripción: Pantalla de portadas compartibles de Linkedln
 *
 * @displayName ShareableLinkedlnViewComponent
 */
const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const PDACardViewComponent = () =>
    import('@/views/shareables/linkedlnCover/components/PDACardViewComponent');

export default {
    name: 'ShareableLinkedlnViewComponent',

    components: {
        PDACardViewComponent,
        BaseCardViewComponent,
        BaseCustomsButtonsGrid,
    },

    methods: {
        $_download() {
            alert('hola');
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
                    <v-row justify="end" class="pa-3">
                        <BaseCustomsButtonsGrid
                            label="Descargar"
                            :outlined="false"
                            :fnMethod="$_download"
                            icon="mdi-download-circle-outline"
                        />
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <PDACardViewComponent :fn="$_download" />
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </div>
    </BaseCardViewComponent>
</template>
