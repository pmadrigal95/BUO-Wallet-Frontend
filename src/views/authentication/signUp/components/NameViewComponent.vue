<script>
/**
 * Descripción: Pantalla de Registro de Persona
 *
 * @displayName NameViewComponent
 */

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

export default {
    name: 'NameViewComponent',

    props: {
        /**
         * V-model
         */
        value: {
            type: Object,
            require: true,
        },
    },

    components: {
        BaseCardViewComponent,
    },

    created() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.white;
    },

    methods: {
        $_sendToApi() {
            this.value.step = 3;
        },
    },
};
</script>

<template>
    <div>
        <br />
        <BaseCardViewComponent title="¡Bienvenido a la comunidad Buo!">
            <div slot="card-text">
                <v-card flat color="transparent">
                    <v-card-text>
                        <br />
                        <v-layout justify-center align-center>
                            <BaseProgressLinear
                                :value="50"
                                color="green900"
                                title="Completa tu registro"
                                subtitle="1/2"
                                bottom
                            />
                        </v-layout>
                    </v-card-text>

                    <v-card-title
                        class="buo-word-break"
                        :class="[
                            $vuetify.breakpoint.smAndDown
                                ? 'BUO-Heading-Small'
                                : 'BUO-Heading-Medium',
                        ]"
                    >
                        ¿Cómo te llamas?
                    </v-card-title>

                    <v-card-subtitle
                        class="buo-word-break"
                        :class="[
                            $vuetify.breakpoint.smAndDown
                                ? 'BUO-Paragraph-Medium'
                                : 'BUO-Paragraph-Large',
                        ]"
                    >
                        Ingresa tu nombre
                    </v-card-subtitle>
                </v-card>
                <BaseForm
                    :method="$_sendToApi"
                    labelBtn="Siguiente"
                    :login="true"
                >
                    <div slot="body">
                        <v-row>
                            <v-col cols="12">
                                <BaseInput
                                    label="Nombre"
                                    v-model.trim="value.nombre"
                                    :validate="['text']"
                                />
                            </v-col>

                            <v-col cols="12">
                                <BaseInput
                                    label="Apellidos"
                                    v-model.trim="value.apellidos"
                                    :validate="['text']"
                                />
                            </v-col>
                        </v-row>
                    </div>
                </BaseForm>
            </div>
        </BaseCardViewComponent>
    </div>
</template>
