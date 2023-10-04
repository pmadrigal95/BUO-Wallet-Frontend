<script>
/**
 * Descripción: Pantalla BUO Cover para versión móvil
 *
 * @displayName LinkedlnCardMobileViewComponent
 */

export default {
    name: 'LinkedlnCardMobileViewComponent',

    props: {
        color: {
            type: String,
            default: 'bg-buo',
        },

        image: {
            type: String,
            required: false,
        },

        title: {
            type: String,
            required: true,
        },

        styleTitle: {
            type: String,
            default: 'BUO-Heading-Small white--text',
        },

        description: {
            type: String,
            required: true,
        },

        styleDescription: {
            type: String,
            default: 'BUO-Paragraph-Medium white--text',
        },

        nameButton: {
            type: String,
            default: 'Descargar',
        },

        styleButton: {
            type: String,
            default: 'ml-n1 ma-2 no-uppercase rounded-lg',
        },

        colorButton: {
            type: String,
            default: 'blue900',
        },

        fnButton: {
            type: Function,
            required: true,
        },

        disabledButton: {
            type: Boolean,
            default: false,
        },

        icon: {
            type: String,
            required: false,
        },

        iconColor: {
            type: String,
            default: 'white',
        },

        smallIcon: {
            type: Boolean,
            default: false,
        },

        largeIcon: {
            type: Boolean,
            default: false,
        },

        xLargeIcon: {
            type: Boolean,
            default: false,
        },

        fnIcon: {
            type: Function,
            required: false,
        },
    },

    data() {
        return {
            showAdvertisement: true,
        };
    },

    methods: {
        $_fnButton() {
            this.fnButton();
        },

        $_closeAdvertisement() {
            this.showAdvertisement = false;
        },

        $_fnIcon() {
            if (this.fnIcon) this.fnIcon();
            else this.$_closeAdvertisement();
        },
    },
};
</script>

<template>
    <v-hover v-slot="{ hover }" open-delay="200" v-if="showAdvertisement">
        <v-card
            :elevation="hover ? 8 : 3"
            class="d-flex flex-column justify-center rounded-lg"
            :class="`${color}`"
        >
            <v-img height="233px" width="250px" :src="image" class="rounded-lg">
            </v-img>

            <v-row class="position-absolute pl-6 pr-10 d-flex" dense>
                <v-col cols="12">
                    <v-btn icon :color="iconColor" @click="$_fnIcon">
                        <v-icon
                            :small="smallIcon"
                            :x-large="xLargeIcon"
                            :large="largeIcon"
                            >mdi-{{ icon }}</v-icon
                        >
                    </v-btn>
                </v-col>
                <v-col cols="12" class="align-self-center">
                    <h2 :class="styleTitle">
                        {{ title }}
                    </h2>
                </v-col>
                <v-col cols="12">
                    <p :class="styleDescription">
                        {{ description }}
                    </p>
                </v-col>
                <v-col cols="12">
                    <v-btn
                        block
                        dark
                        depressed
                        :color="colorButton"
                        :class="styleButton"
                        @click="$_fnButton"
                        :disabled="disabledButton"
                    >
                        {{ nameButton }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-hover>
</template>

<style>
.bg-buo {
    background: linear-gradient(0.25turn, #6dc629, #01aa71);
}

.position-absolute {
    position: absolute;
}
</style>
